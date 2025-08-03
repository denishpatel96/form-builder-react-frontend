import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { Control, ControllerProps, FieldError, FieldValues } from "react-hook-form/dist/types";
import { ICheckboxGroupProps } from "../../Types";
import { useFormError } from "./FormErrorProvider";

export const CheckboxGroupField = ({
  field,
  control,
  parseError,
}: {
  field: ICheckboxGroupProps;
  control: Control<FieldValues, any>;
  parseError?: (error: FieldError) => string;
}) => {
  if (!field || field.hidden) {
    return <></>;
  }

  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  const { helperText, label, options, required, row, size, title } = field;
  const validation: ControllerProps["rules"] = {
    required: required ? "Please fill out this field" : "",
  };

  const defaultValue = options.filter((op) => op.defaultChecked).map((op) => op.label) || [];
  return (
    <Controller
      name={field.name}
      control={control}
      rules={validation}
      defaultValue={defaultValue}
      render={({
        field: { value = options.length === 1 ? "" : [], onChange },
        fieldState: { error },
      }) => {
        return (
          <FormControl component={"fieldset"} fullWidth error={!!error} required={required}>
            <FormLabel>{label}</FormLabel>
            <FormGroup row={row} title={title}>
              {options.map((op, index) => {
                const isChecked = value.findIndex((item: string) => item === op.label) !== -1;
                return (
                  <FormControlLabel
                    name={field.name}
                    key={index}
                    label={op.label}
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={() => {
                          let newVal = [...value];
                          newVal = isChecked
                            ? newVal.filter((v: string) => v !== op.label)
                            : [...newVal, op.label];
                          onChange(newVal);
                        }}
                        value={op.label}
                        size={size}
                        required={required}
                      />
                    }
                  />
                );
              })}
            </FormGroup>
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
