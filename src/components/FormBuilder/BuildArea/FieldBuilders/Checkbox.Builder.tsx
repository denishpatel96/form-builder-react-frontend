import { Checkbox, FormControl, FormControlLabel, FormHelperText } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { ICheckboxProps } from "../../Types/Checkbox";

export interface ICheckboxFieldBuilderProps {
  field: ICheckboxProps;
}

export const CheckboxFieldBuilder = ({ field }: ICheckboxFieldBuilderProps) => {
  const { helperText, label, defaultChecked, size, required } = field;
  const theme = useTheme();
  return (
    <FormControl component={"fieldset"} fullWidth required={required}>
      <FormControlLabel
        label={`${label}${required ? " *" : ""}`}
        sx={{ color: theme.palette.grey[600], fontWeight: 400 }}
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
