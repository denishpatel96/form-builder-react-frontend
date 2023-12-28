import { Grid, SliderProps, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type SliderTrackPropertyProps = {
  value: SliderProps["track"];
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const SliderTrackProperty = ({ value, onUpdate }: SliderTrackPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Track" />
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            fullWidth
            size="small"
            color="primary"
            value={value}
            exclusive
            onChange={(_, value: any) => value !== null && onUpdate("track", value)}
          >
            <ToggleButton value={false}>Hidden</ToggleButton>
            <ToggleButton value="normal">Visible</ToggleButton>
            <ToggleButton value="inverted">Inverted</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
