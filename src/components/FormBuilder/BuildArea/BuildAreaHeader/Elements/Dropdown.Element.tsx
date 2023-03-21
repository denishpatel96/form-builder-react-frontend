import { Cancel } from "@mui/icons-material";
import { Box, Chip, MenuItem, TextField, Tooltip } from "@mui/material";
import { without } from "lodash";
import React from "react";
import { Controller } from "react-hook-form";
import { Control, FieldValues } from "react-hook-form/dist/types";
import { IDropdownProps } from "../../../Types";

export const DropdownElement = ({
  field,
  control,
}: {
  field: IDropdownProps;
  control: Control<FieldValues, any>;
}) => {
  const defaultValue = field.multiple
    ? field.options.filter((op) => op.defaultChecked).map((op) => op.label) || []
    : field.options.find((op) => op.defaultChecked)?.label || "";
  return (
    <Controller
      name={field.name}
      defaultValue={defaultValue}
      control={control}
      rules={{
        required: field.required,
      }}
      render={({ field: fieldProps }) => {
        return (
          <TextField
            {...fieldProps}
            select
            fullWidth
            SelectProps={{
              multiple: field.multiple,
              native: field.native,
              autoWidth: field.autoWidth,
              ...(!field.native && {
                renderValue: (value: unknown) => {
                  return field.multiple ? (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(value as string[]).map((v, i) => (
                        <Tooltip title={v} key={i}>
                          <Chip
                            key={v}
                            label={v}
                            deleteIcon={<Cancel onMouseDown={(event) => event.stopPropagation()} />}
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
            id={field.id}
            name={field.name}
            label={field.label}
            variant={field.variant}
            defaultValue={defaultValue}
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
      }}
    />
  );
};
