import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import React from "react";
import { ICheckboxProps } from "../../Types/Checkbox";

export interface ICheckboxFieldBuilderProps {
  field: ICheckboxProps;
}

export const CheckboxFieldBuilder = ({ field }: ICheckboxFieldBuilderProps) => {
  return field.options.length === 1 ? (
    <FormControlLabel
      label={`${field.options[0].label}${field.required ? " *" : ""}`}
      control={
        <Checkbox
          checked={field.options[0].defaultChecked}
          value={field.options[0].label}
          size={field.size}
          required={field.required}
        />
      }
    />
  ) : (
    <FormControl
      fullWidth
      component={"fieldset"}
      error={field.error}
      variant="filled"
      required={field.required}
    >
      <FormLabel>{field.label}</FormLabel>
      <FormGroup row={field.row} title={field.title}>
        {field.options.map((op, index) => {
          return (
            <FormControlLabel
              key={index}
              label={op.label}
              control={
                <Checkbox
                  checked={op.defaultChecked}
                  value={op.label}
                  size={field.size}
                  required={field.required}
                />
              }
            />
          );
        })}
      </FormGroup>
      <FormHelperText>{field.helperText}</FormHelperText>
    </FormControl>
  );
};
