import { Grid, SliderProps, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type ValueLabelDisplayPropertyProps = {
  value: SliderProps["valueLabelDisplay"];
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const ValueLabelDisplayProperty = ({ value, onUpdate }: ValueLabelDisplayPropertyProps) => {
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
            onChange={(_, value: any) => value !== null && onUpdate("valueLabelDisplay", value)}
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
