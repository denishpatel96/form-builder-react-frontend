import { Grid, SliderProps, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type ValueLabelDisplayPropertyProps = {
  value: SliderProps["valueLabelDisplay"];
  onChange: (path: string, value: SliderProps["valueLabelDisplay"]) => void;
};

export const ValueLabelDisplayProperty = ({ value, onChange }: ValueLabelDisplayPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Value Label Display" />
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            fullWidth
            size="small"
            color="primary"
            value={value}
            exclusive
            onChange={(_, value: any) => value !== null && onChange("valueLabelDisplay", value)}
          >
            <ToggleButton value="off">Off</ToggleButton>
            <ToggleButton value="auto">Auto</ToggleButton>
            <ToggleButton value="on">On</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
