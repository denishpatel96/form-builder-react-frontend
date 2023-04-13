import { Grid, SliderProps, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type SliderTrackPropertyProps = {
  value: SliderProps["track"];
};

export const SliderTrackProperty = ({ value }: SliderTrackPropertyProps) => {
  const dispatch = useAppDispatch();
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
            onChange={(_, value: any) =>
              value !== null && dispatch(changeFieldProp({ path: "track", value }))
            }
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
