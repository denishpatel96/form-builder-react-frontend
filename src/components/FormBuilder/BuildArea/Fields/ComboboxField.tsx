import { Control, Controller, ControllerProps, FieldError, FieldValues } from "react-hook-form";
import { Autocomplete, InputLabel, TextField } from "@mui/material";
import { useFormError } from "./FormErrorProvider";
import { IComboboxProps } from "../../Types";
import React from "react";

export const ComboboxField = ({
  field,
  control,
  parseError,
}: {
  field: IComboboxProps;
  control?: Control<FieldValues, any>;
  parseError?: (error: FieldError) => string;
}) => {
  if (!field || field.hidden) {
    return <></>;
  }
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;

  const { id, name, required, multiple, options, label, helperText, variant, size, title } = field;

  const validation: ControllerProps["rules"] = {
    required: required ? "Please fill out this field" : "",
  };
  const defaultValue = multiple
    ? options.filter((op) => op.defaultChecked) || []
    : options.find((op) => op.defaultChecked) || null;
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      defaultValue={defaultValue}
      render={({ field: { onChange }, fieldState: { error } }) => {
        return (
          <>
            {variant === "top" && (
              <InputLabel required={required} htmlFor={id}>
                {label}
              </InputLabel>
            )}
            <Autocomplete
              onChange={(_, value, __) => {
                onChange(value);
              }}
              multiple={multiple}
              options={options}
              disableCloseOnSelect={!!multiple}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    id={id}
                    name={name}
                    error={!!error}
                    helperText={
                      error
                        ? typeof customErrorFn === "function"
                          ? customErrorFn(error)
                          : error.message
                        : helperText
                    }
                    size={size}
                    title={title}
                    {...(variant !== "top" && {
                      label: label,
                      variant: variant,
                    })}
                  />
                );
              }}
            />
          </>
        );
      }}
    />
  );
};
