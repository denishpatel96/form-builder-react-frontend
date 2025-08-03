import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { Control, FieldValues } from "react-hook-form/dist/types";
import { IRadioProps } from "../../Types";

export const RadioField = ({
  field,
  control,
}: {
  field: IRadioProps;
  control: Control<FieldValues, any>;
}) => {
  if (!field || field.hidden) {
    return <></>;
  }

  const { helperText, label, name, options, required, row, size, title, defaultValue } = field;

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={{
        required,
      }}
      render={({ field: fieldProps, fieldState }) => {
        return (
          <FormControl
            component={"fieldset"}
            fullWidth
            error={!!fieldState.error}
            required={required}
          >
            <FormLabel>{label}</FormLabel>
            <RadioGroup row={row} title={title} {...fieldProps}>
              {options.map((op, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={op.label}
                    label={op.label}
                    control={<Radio size={size} required={required} />}
                  />
                );
              })}
            </RadioGroup>
            <FormHelperText error={!!fieldState.error}>
              {fieldState.error?.message || helperText}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
