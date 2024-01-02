import { Cancel } from "@mui/icons-material";
import { Box, Chip, InputLabel, MenuItem, TextField, Tooltip } from "@mui/material";
import { without } from "lodash";
import React from "react";
import { Controller } from "react-hook-form";
import { Control, FieldValues } from "react-hook-form/dist/types";
import { IDropdownProps } from "../../Types";

export const DropdownField = ({
  field,
  control,
}: {
  field: IDropdownProps;
  control: Control<FieldValues, any>;
}) => {
  if (!field || field.hidden) {
    return <></>;
  }

  const {
    id,
    multiple,
    name,
    options,
    required,
    autoWidth,
    error,
    helperText,
    label,
    native,
    size,
    title,
    variant,
  } = field;
  const defaultValue = multiple
    ? options.filter((op) => op.defaultChecked).map((op) => op.label) || []
    : options.find((op) => op.defaultChecked)?.label || "";
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={{
        required: required,
      }}
      render={({ field: fieldProps }) => {
        return (
          <>
            {variant === "top" && <InputLabel htmlFor={id}>{label}</InputLabel>}
            <TextField
              {...fieldProps}
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
                            <Chip
                              key={v}
                              label={v}
                              deleteIcon={
                                <Cancel onMouseDown={(event) => event.stopPropagation()} />
                              }
                              onDelete={() => fieldProps.onChange(without(value as string[], v))}
                            />
                          </Tooltip>
                        ))}
                      </Box>
                    ) : (
                      (value as string)
                    );
                  },
                }),
              }}
              id={id}
              name={name}
              defaultValue={defaultValue}
              title={title}
              error={error}
              required={required}
              size={size}
              helperText={helperText}
              {...(variant !== "top" && {
                label: label,
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
      }}
    />
  );
};
