import { Grid, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { NumericFormat } from "react-number-format";

type NumberValueRangePropertyProps = {
  value: {
    min: number;
    max: number;
  };
  onChange: (path: string, value: number | undefined) => void;
};

export const NumberValueRangeProperty = ({
  value: { min, max },
  onChange,
}: NumberValueRangePropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Maximum Value Range" />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat
            name={"min"}
            variant="standard"
            size="small"
            label="Min"
            customInput={TextField}
            value={min}
            fullWidth
            allowNegative
            isAllowed={({ floatValue: v }) =>
              v ? v <= Number.POSITIVE_INFINITY && v >= Number.NEGATIVE_INFINITY : true
            }
            onValueChange={({ floatValue: v }) => {
              if (v === undefined) v = 0;
              onChange("min", v);
            }}
            onBlur={() => {
              if (min > max) {
                onChange("max", min);
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat
            name={"max"}
            variant="standard"
            size="small"
            label="Max"
            customInput={TextField}
            value={max}
            fullWidth
            allowNegative
            isAllowed={({ floatValue: v }) =>
              v ? v <= Number.POSITIVE_INFINITY && v >= Number.NEGATIVE_INFINITY : true
            }
            onValueChange={({ floatValue: v }) => {
              if (v === undefined) v = 0;
              onChange("max", v);
            }}
            onBlur={() => {
              if (min > max) {
                onChange("min", max);
              }
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
