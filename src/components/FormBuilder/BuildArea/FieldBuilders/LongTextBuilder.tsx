import { TextField } from "@mui/material";
import React from "react";
import { ILongTextProps } from "../../Types";

export interface ILongTextBuilderProps {
  field: ILongTextProps;
}

export const LongTextBuilder = ({ field }: ILongTextBuilderProps) => {
  const {
    name,
    id,
    label,
    defaultValue,
    helperText,
    margin,
    maxRows,
    minRows,
    title,
    required,
    size,
    variant,
    placeholder,
  } = field;
  return (
    <TextField
      fullWidth
      multiline
      InputLabelProps={{ shrink: true }}
      id={id}
      label={label}
      name={name}
      margin={margin}
      minRows={minRows}
      maxRows={maxRows}
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
