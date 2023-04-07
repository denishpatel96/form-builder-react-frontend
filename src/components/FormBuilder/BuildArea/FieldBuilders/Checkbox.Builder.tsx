import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel } from "@mui/material";
import React from "react";
import { ICheckboxProps } from "../../Types/Checkbox";

export interface ICheckboxFieldBuilderProps {
  field: ICheckboxProps;
}

export const CheckboxFieldBuilder = ({ field }: ICheckboxFieldBuilderProps) => {
  const { helperText, label, defaultChecked, size, required } = field;
  return (
    <FormControl component={"fieldset"} fullWidth required={required}>
      <FormControlLabel
        label={<FormLabel>{`${label}${required ? " *" : ""}`}</FormLabel>}
        control={
          <Checkbox
            id={field.id}
            checked={defaultChecked}
            value={label}
            size={size}
            required={required}
          />
        }
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
