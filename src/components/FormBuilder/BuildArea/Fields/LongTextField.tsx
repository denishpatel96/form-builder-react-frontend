import React from "react";
import { TextField } from "@mui/material";
import { Control, Controller, ControllerProps, FieldError } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { ILongTextProps } from "../../Types";
import { useFormError } from "./FormErrorProvider";

export const LongTextField = ({
  field,
  parseError,
  control,
}: {
  field: ILongTextProps;
  control?: Control<FieldValues, any>;
  parseError?: (error: FieldError) => string;
}): JSX.Element => {
  if (!field || field.hidden) {
    return <></>;
  }
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  const {
    name,
    required,
    type,
    maxLength,
    minLength,
    msgLength,
    validateLength,
    defaultValue,
    helperText,
    label,
    margin,
    maxRows,
    minRows,
    placeholder,
    title,
    size,
    variant,
  } = field;

  const validation: ControllerProps["rules"] = {
    required: required,
    ...(validateLength && {
      maxLength: { value: maxLength, message: msgLength },
      minLength: { value: minLength, message: msgLength },
    }),
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      defaultValue={defaultValue}
      render={({ field: fieldProps, fieldState: { error } }) => (
        <TextField
          {...fieldProps}
          label={label}
          margin={margin}
          maxRows={maxRows}
          minRows={minRows}
          multiline
          placeholder={placeholder}
          title={title}
          size={size}
          variant={variant}
          fullWidth
          name={name}
          required={required}
          type={type}
          error={!!error}
          helperText={
            error
              ? typeof customErrorFn === "function"
                ? customErrorFn(error)
                : error.message
              : helperText
          }
        />
      )}
    />
  );
};
