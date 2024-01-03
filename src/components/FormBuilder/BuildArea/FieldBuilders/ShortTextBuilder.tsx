import { InputLabel, TextField } from "@mui/material";
import React from "react";
import { IShortTextProps } from "../../Types";

export const ShortTextBuilder = ({ field }: { field: IShortTextProps }) => {
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
    <>
      {variant === "top" && (
        <InputLabel required={required} htmlFor={id}>
          {label}
        </InputLabel>
      )}
      <TextField
        fullWidth
        id={id}
        name={name}
        margin={margin}
        required={required}
        title={title}
        size={size}
        value={defaultValue}
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
