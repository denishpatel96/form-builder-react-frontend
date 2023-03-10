import { TextField } from "@mui/material";
import React from "react";
import { ITextProps } from "../../Types/Text";

export interface ITextFieldBuilderProps {
  field: ITextProps;
}

export const TextFieldBuilder = ({ field }: ITextFieldBuilderProps) => {
  const {
    name,
    id,
    label,
    defaultValue,
    helperText,
    margin,
    multiline,
    rows,
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
      InputLabelProps={{ shrink: true }}
      id={id}
      label={label}
      name={name}
      margin={margin}
      multiline={multiline}
      rows={rows}
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
