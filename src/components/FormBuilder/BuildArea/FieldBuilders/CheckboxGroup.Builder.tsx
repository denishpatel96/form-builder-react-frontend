import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import React from "react";
import { ICheckboxGroupProps } from "../../Types";

export interface ICheckboxGroupFieldBuilderProps {
  field: ICheckboxGroupProps;
}

export const CheckboxGroupFieldBuilder = ({ field }: ICheckboxGroupFieldBuilderProps) => {
  return field.options.length === 1 ? (
    <FormControlLabel
      label={`${field.options[0].label}${field.required ? " *" : ""}`}
      control={
        <Checkbox
          id={field.id}
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
      <FormGroup row={field.row} title={field.title} id={field.id}>
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
