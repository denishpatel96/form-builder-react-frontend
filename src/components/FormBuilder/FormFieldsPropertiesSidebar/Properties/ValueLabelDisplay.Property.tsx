import { Grid, SliderProps, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/formSlice";

type ValueLabelDisplayPropertyProps = {
  value: SliderProps["valueLabelDisplay"];
};

export const ValueLabelDisplayProperty = ({ value }: ValueLabelDisplayPropertyProps) => {
  const dispatch = useAppDispatch();
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
            onChange={(_, value: any) =>
              value !== null && dispatch(changeFieldProp({ path: "valueLabelDisplay", value }))
            }
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
