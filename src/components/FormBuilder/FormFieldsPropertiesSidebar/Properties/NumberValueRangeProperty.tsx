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
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const NumberValueRangeProperty = ({
  value: { min, max },
  onUpdate,
}: NumberValueRangePropertyProps) => {
  // this state is necessary to track whether value has been updated since last request sent.
  const [minUpdated, setMinUpdated] = React.useState<boolean>(false);
  const [maxUpdated, setMaxUpdated] = React.useState<boolean>(false);
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
              setMinUpdated(true);
              onUpdate("min", v, true);
            }}
            onBlur={() => {
              if (min > max) {
                onUpdate("max", min, true);
              }
              if (minUpdated) {
                setMinUpdated(false);
                onUpdate("min", min);
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
              setMaxUpdated(true);
              onUpdate("max", v);
            }}
            onBlur={() => {
              if (min > max) {
                onUpdate("min", max);
              }
              if (maxUpdated) {
                onUpdate("max", max);
              }
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
