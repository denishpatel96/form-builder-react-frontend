import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Grid, PaletteMode, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { StyledListItem } from "../Styles";

type ModePropertyProps = {
  value: PaletteMode | undefined;
  onChange: (path: string, value: boolean | undefined) => void;
};

export const ModeProperty = ({ value, onChange }: ModePropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="subtitle2">Mode</Typography>
        </Grid>
        <Grid item xs={6}>
          <ToggleButtonGroup
            fullWidth
            size="small"
            color="primary"
            value={value}
            exclusive
            onChange={(_, value: any) => value !== null && onChange("palette.mode", value)}
          >
            <ToggleButton value={"light"}>
              <LightModeOutlined />
            </ToggleButton>
            <ToggleButton value={"dark"}>
              <DarkModeOutlined />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
