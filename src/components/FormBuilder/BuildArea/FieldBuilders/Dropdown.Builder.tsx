import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { IDropdownProps } from "../../Types";

export interface IDropdownFieldBuilderProps {
  field: IDropdownProps;
}

export const DropdownFieldBuilder = ({ field }: IDropdownFieldBuilderProps) => {
  const defaultValue = field.multiple
    ? field.options.filter((op) => op.defaultChecked).map((op) => op.label) || []
    : field.options.find((op) => op.defaultChecked)?.label || "";
  return (
    <TextField
      select
      fullWidth
      SelectProps={{
        multiple: field.multiple,
        native: field.native,
        autoWidth: field.autoWidth,
      }}
      InputLabelProps={{ shrink: true }}
      // InputProps={{ readOnly: true }}
      id={field.id}
      label={field.label}
      variant={field.variant}
      value={defaultValue}
      title={field.title}
      error={field.error}
      required={field.required}
      size={field.size}
      helperText={field.helperText}
    >
      {field.options.map((op, index) => {
        return field.native ? (
          <option key={index} value={op.label}>
            {op.label}
          </option>
        ) : (
          <MenuItem key={index} value={op.label}>
            {op.label}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
