import { Grid, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { NumericFormat } from "react-number-format";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/formSlice";

type SliderStepPropertyProps = {
  value: {
    step: number | null | undefined;
    min: number;
    max: number;
  };
};

export const SliderStepProperty = ({ value: { step, min, max } }: SliderStepPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Step" />
        </Grid>
        <Grid item xs={12}>
          <NumericFormat
            name={"step"}
            variant="standard"
            size="small"
            customInput={TextField}
            value={step}
            fullWidth
            min={min}
            max={max}
            allowNegative={false}
            isAllowed={({ floatValue: v }) => (v ? v <= max - min : true)}
            onValueChange={({ value }) => {
              dispatch(changeFieldProp({ path: `step`, value: +value }));
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
