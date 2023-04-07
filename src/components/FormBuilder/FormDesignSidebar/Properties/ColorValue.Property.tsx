import { Button, Grid, Typography } from "@mui/material";
import React, { CSSProperties } from "react";
import { StyledListItem } from "../Styles";
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
          {value !== undefined ? (
            <Button onClick={() => onChange(path, undefined)}>Reset</Button>
          ) : (
            <Typography fontStyle={"italic"} fontWeight={500}>
              Auto
            </Typography>
          )}
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
