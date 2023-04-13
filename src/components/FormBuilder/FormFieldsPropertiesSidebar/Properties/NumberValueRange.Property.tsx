import { Grid, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { NumericFormat } from "react-number-format";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type NumberValueRangePropertyProps = {
  value: {
    min: number;
    max: number;
  };
};

export const NumberValueRangeProperty = ({
  value: { min, max },
}: NumberValueRangePropertyProps) => {
  const dispatch = useAppDispatch();
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
              dispatch(changeFieldProp({ path: "min", value: v }));
            }}
            onBlur={() => {
              if (min > max) {
                dispatch(changeFieldProp({ path: "max", value: min }));
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
              dispatch(changeFieldProp({ path: "max", value: v }));
            }}
            onBlur={() => {
              if (min > max) {
                dispatch(changeFieldProp({ path: "min", value: max }));
              }
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
