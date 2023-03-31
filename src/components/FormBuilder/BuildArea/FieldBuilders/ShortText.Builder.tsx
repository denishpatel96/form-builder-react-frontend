import { TextField } from "@mui/material";
import React from "react";
import { IShortTextProps } from "../../Types";

export interface IShortTextFieldBuilderProps {
  field: IShortTextProps;
}

export const ShortTextFieldBuilder = ({ field }: IShortTextFieldBuilderProps) => {
  const {
    name,
    id,
    label,
    defaultValue,
    helperText,
    margin,
    title,
    required,
    size,
    variant,
    placeholder,
  } = field;
  return (
    <TextField
      fullWidth
      InputLabelProps={{ shrink: true }}
      id={id}
      label={label}
      name={name}
      margin={margin}
      required={required}
      title={title}
      size={size}
      variant={variant}
      value={defaultValue}
      placeholder={placeholder}
      InputProps={{ readOnly: true }}
      helperText={helperText}
      error={!label}
    />
  );
};
