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

export const CheckboxGroupBuilder = ({ field }: { field: ICheckboxGroupProps }) => {
  const { error, required, label, row, title, id, size, helperText, options } = field;
  return (
    <FormControl
      fullWidth
      component={"fieldset"}
      error={error}
      variant="filled"
      required={required}
    >
      <FormLabel>{label}</FormLabel>
      <FormGroup row={row} title={title} id={id}>
        {options.map((op, index) => {
          return (
            <FormControlLabel
              key={index}
              label={op.label}
              control={
                <Checkbox
                  checked={op.defaultChecked}
                  value={op.label}
                  size={size}
                  required={required}
                />
              }
            />
          );
        })}
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
