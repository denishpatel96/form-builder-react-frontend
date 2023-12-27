import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel } from "@mui/material";
import React from "react";
import { ICheckboxProps } from "../../Types/Checkbox";

export interface ICheckboxBuilderProps {
  field: ICheckboxProps;
}

export const CheckboxBuilder = ({ field }: ICheckboxBuilderProps) => {
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
