import { Box, Divider, Grid, TextField, TextFieldProps, Typography } from "@mui/material";
import React from "react";
import { StyledListItem } from "../Styles";
import { NumericFormat } from "react-number-format";

type NumberValuePropertyProps = {
  label: string;
  name: string;
  path: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (path: string, value: number | undefined) => void;
  InputProps?: TextFieldProps["InputProps"];
};

export const NumberValueProperty = ({
  label,
  name,
  path,
  value,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  onChange,
  InputProps,
}: NumberValuePropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="subtitle2">{label}</Typography>
        </Grid>
        <Grid item xs={12}>
          <NumericFormat
            name={name}
            variant="standard"
            customInput={TextField}
            InputProps={InputProps}
            value={value}
            fullWidth
            min={min}
            max={max}
            isAllowed={({ floatValue: v }) => (v ? v <= max && v >= min : true)}
            onValueChange={({ value }) => {
              onChange(path, +value);
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
