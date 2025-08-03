import React from "react";
import { Box, Chip, InputLabel, MenuItem, TextField, Tooltip } from "@mui/material";
import { IDropdownProps } from "../../Types";

export const DropdownBuilder = ({ field }: { field: IDropdownProps }) => {
  const {
    id,
    options,
    multiple,
    required,
    helperText,
    size,
    autoWidth,
    native,
    title,
    error,
    variant,
    label,
  } = field;
  const defaultValue = multiple
    ? options.filter((op) => op.defaultChecked).map((op) => op.label) || []
    : options.find((op) => op.defaultChecked)?.label || "";
  return (
    <>
      {variant === "top" && (
        <InputLabel required={required} htmlFor={id}>
          {label}
        </InputLabel>
      )}
      <TextField
        select
        fullWidth
        SelectProps={{
          multiple: multiple,
          native: native,
          autoWidth: autoWidth,
          ...(!native && {
            renderValue: (value: unknown) => {
              return multiple ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(value as string[]).map((v, i) => (
                    <Tooltip title={v} key={i}>
                      <Chip key={v} label={v} />
                    </Tooltip>
                  ))}
                </Box>
              ) : (
                (value as string)
              );
            },
          }),
        }}
        InputLabelProps={{ shrink: true }}
        InputProps={{ readOnly: true }}
        id={id}
        value={defaultValue}
        title={title}
        error={error}
        required={required}
        size={size}
        helperText={helperText}
        {...(variant !== "top" && {
          label: label,
          InputLabelProps: { shrink: true },
          variant: variant,
        })}
      >
        {options.map((op, index) => {
          return native ? (
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
    </>
  );
};
