import { InputLabel, TextField } from "@mui/material";
import React from "react";
import { ILongTextProps } from "../../Types";

export const LongTextBuilder = ({ field }: { field: ILongTextProps }) => {
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
    <>
      {variant === "top" && (
        <InputLabel required={required} htmlFor={id}>
          {label}
        </InputLabel>
      )}
      <TextField
        fullWidth
        multiline
        id={id}
        name={name}
        margin={margin}
        required={required}
        title={title}
        size={size}
        value={defaultValue}
        minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        InputProps={{ readOnly: true }}
        helperText={helperText}
        error={!label}
        {...(variant !== "top" && {
          label: label,
          InputLabelProps: { shrink: true },
          variant: variant,
        })}
      />
    </>
  );
};
