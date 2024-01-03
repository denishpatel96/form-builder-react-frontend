import React from "react";
import { InputLabel, TextField } from "@mui/material";
import { Control, Controller, ControllerProps, FieldError } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { IShortTextProps } from "../../Types";
import { useFormError } from "./FormErrorProvider";
import { isRegExp } from "lodash";

export const ShortTextField = ({
  field,
  parseError,
  control,
}: {
  field: IShortTextProps;
  control?: Control<FieldValues, any>;
  parseError?: (error: FieldError) => string;
}): JSX.Element => {
  if (!field || field.hidden) {
    return <></>;
  }

  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  const {
    id,
    name,
    required,
    type,
    pattern,
    msgPattern,
    maxLength,
    minLength,
    msgLength,
    validateLength,
    validatePattern,
    defaultValue,
    helperText,
    label,
    margin,
    placeholder,
    title,
    size,
    variant,
  } = field;

  const validation: ControllerProps["rules"] = {
    required: required,
    ...(validatePattern && {
      pattern: { value: isRegExp(pattern) ? pattern : new RegExp(pattern), message: msgPattern },
    }),
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
        <>
          {variant === "top" && (
            <InputLabel required={required} htmlFor={id}>
              {label}
            </InputLabel>
          )}
          <TextField
            {...fieldProps}
            margin={margin}
            placeholder={placeholder}
            title={title}
            size={size}
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
            {...(variant !== "top" && {
              label: label,
              variant: variant,
            })}
          />
        </>
      )}
    />
  );
};
