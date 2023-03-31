import { Checkbox, FormControl, FormControlLabel, FormHelperText } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { Control, ControllerProps, FieldError, FieldValues } from "react-hook-form/dist/types";
import { ICheckboxProps } from "../../../Types";
import { useFormError } from "./FormErrorProvider";

export const CheckboxElement = ({
  field,
  control,
  parseError,
}: {
  field: ICheckboxProps;
  control: Control<FieldValues, any>;
  parseError?: (error: FieldError) => string;
}) => {
  if (!field || field.hidden) {
    return <></>;
  }
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  const { helperText, label, defaultChecked, required, size, title } = field;
  const validation: ControllerProps["rules"] = {
    required: required ? "Please fill out this field" : "",
  };

  return (
    <Controller
      name={field.name}
      control={control}
      rules={validation}
      defaultValue={defaultChecked}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl component={"fieldset"} fullWidth error={!!error} required={required}>
            <FormControlLabel
              label={`${label}${required ? "*" : ""}`}
              title={title}
              control={
                <Checkbox
                  checked={!!value}
                  onChange={() => onChange(!value)}
                  value={label}
                  size={size}
                  required={required}
                />
              }
            />
            <FormHelperText error={!!error}>
              {error
                ? typeof customErrorFn === "function"
                  ? customErrorFn(error)
                  : error.message
                : helperText}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
