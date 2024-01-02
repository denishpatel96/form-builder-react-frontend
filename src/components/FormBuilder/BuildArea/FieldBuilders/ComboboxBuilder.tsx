import React from "react";
import { Autocomplete, InputLabel, TextField } from "@mui/material";
import { IComboboxProps } from "../../Types";

export const ComboboxBuilder = ({ field }: { field: IComboboxProps }) => {
  const { multiple, id, name, options, helperText, label, variant, required, title, size } = field;
  const defaultValue = multiple
    ? options.filter((op) => op.defaultChecked) || []
    : options.find((op) => op.defaultChecked) || null;
  return (
    <>
      {variant === "top" && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <Autocomplete
        fullWidth
        disablePortal
        multiple={multiple}
        id={id}
        options={options}
        value={defaultValue}
        readOnly={true}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            InputLabelProps={{ shrink: true }}
            required={required}
            helperText={helperText}
            title={title}
            size={size}
            {...(variant !== "top" && {
              label: label,
              InputLabelProps: { shrink: true },
              variant: variant,
            })}
          />
        )}
      />
    </>
  );
};
