import { FormHelperText, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { StyledListItem } from "../Styles";
import PropTitle from "./PropTitle";

type CompactnessPropertyProps = {
  value: "small" | "medium" | undefined;
  onChange: (path: string, value: string) => void;
};

export const CompactnessProperty = ({ value, onChange }: CompactnessPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Compactness" />
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            fullWidth
            size="small"
            color="primary"
            value={value}
            exclusive
            onChange={(_, value: any) => value !== null && onChange("size", value)}
          >
            <ToggleButton value="small">Compact</ToggleButton>
            <ToggleButton value="medium">Normal</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <FormHelperText>Compact the input size.</FormHelperText>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
