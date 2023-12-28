import { Grid, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";
import { NumericFormat } from "react-number-format";

type SliderStepPropertyProps = {
  value: {
    step: number | null | undefined;
    min: number;
    max: number;
  };
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const SliderStepProperty = ({
  value: { step, min, max },
  onUpdate,
}: SliderStepPropertyProps) => {
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
              onUpdate(`step`, +value);
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
