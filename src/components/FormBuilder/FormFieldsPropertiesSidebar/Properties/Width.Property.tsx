import { Grid, Slider } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type WidthPropertyProps = {
  value: 3 | 4 | 6 | 8 | 9 | 12;
};

export const WidthProperty = ({ value }: WidthPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Width" />
        </Grid>
        <Grid item xs={12}>
          <Slider
            aria-label="Form element width"
            value={value}
            valueLabelDisplay="auto"
            onChange={(_, value) => {
              dispatch(changeFieldProp({ path: "colSpan", value: value as number }));
            }}
            step={null}
            marks={[3, 4, 6, 8, 9, 12].map((el) => ({ value: el, label: el }))}
            min={0}
            max={12}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
