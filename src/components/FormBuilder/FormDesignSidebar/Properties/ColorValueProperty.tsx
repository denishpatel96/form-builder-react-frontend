import { Grid, Typography } from "@mui/material";
import React from "react";
import { StyledListItem } from "../../Styles";
import ColorPicker from "../../../Reusable/ColorPicker";

type ColorValuePropertyProps = {
  label: string;
  name: string;
  path: string;
  value: string | undefined;
  defaultValue: string | undefined;
  onChange: (path: string, value: string | undefined) => void;
};

export const ColorValueProperty = ({
  label,
  name,
  path,
  value,
  defaultValue,
  onChange,
}: ColorValuePropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="subtitle2">{label}</Typography>
        </Grid>
        <Grid item xs={9} display="flex" justifyContent="center">
          <ColorPicker
            textFieldProps={{ variant: "standard" }}
            name={name}
            color={value || defaultValue}
            onChange={(_, color) => onChange(path, color)}
          />
        </Grid>
        <Grid item xs={3} display="flex" justifyContent="flex-end">
          {value !== undefined && value !== defaultValue ? (
            <Typography
              sx={{ cursor: "pointer" }}
              color={"primary"}
              variant="subtitle2"
              onClick={() => onChange(path, defaultValue)}
            >
              Reset
            </Typography>
          ) : (
            <Typography variant="subtitle2" fontStyle={"italic"}>
              Auto
            </Typography>
          )}
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
