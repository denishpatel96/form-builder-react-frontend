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

export interface ICheckboxGroupBuilderProps {
  field: ICheckboxGroupProps;
}

export const CheckboxGroupBuilder = ({ field }: ICheckboxGroupBuilderProps) => {
  return (
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
