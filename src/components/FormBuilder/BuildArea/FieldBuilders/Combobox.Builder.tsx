import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { IComboboxProps } from "../../Types";

export interface IComboboxFieldBuilderProps {
  field: IComboboxProps;
}

export const ComboboxFieldBuilder = ({ field }: IComboboxFieldBuilderProps) => {
  const defaultValue = field.multiple
    ? field.options.filter((op) => op.defaultChecked) || []
    : field.options.find((op) => op.defaultChecked) || null;
  return (
    <Autocomplete
      fullWidth
      disablePortal
      multiple={field.multiple}
      id={field.id}
      options={field.options}
      value={defaultValue}
      readOnly={true}
      renderInput={(params) => (
        <TextField
          {...params}
          label={field.label}
          name={field.name}
          variant={field.variant}
          InputLabelProps={{ shrink: true }}
          required={field.required}
          helperText={field.helperText}
          title={field.title}
          size={field.size}
        />
      )}
    />
  );
};
