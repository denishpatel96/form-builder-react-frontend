import { FormHelperText, Grid, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
type RowsCountPropertyProps = {
  value: {
    maxRows: TextFieldProps["maxRows"];
    minRows: TextFieldProps["minRows"];
  };
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const RowsCountProperty = ({ value, onUpdate }: RowsCountPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Number of Rows" />
        </Grid>
        <Grid item>
          <Grid container spacing={1} pt={2}>
            <Grid item xs={6}>
              <NumericFormat
                size="small"
                name={"minRows"}
                label={"Min"}
                fullWidth
                allowNegative={false}
                variant="standard"
                value={value.minRows}
                customInput={TextField}
                onValueChange={({ floatValue }) => {
                  onUpdate("rows", 0);
                  onUpdate("minRows", floatValue);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <NumericFormat
                size="small"
                name={"maxRows"}
                label={"Max"}
                fullWidth
                allowNegative={false}
                variant="standard"
                value={value.maxRows}
                customInput={TextField}
                onValueChange={({ floatValue }) => {
                  onUpdate("rows", 0);
                  onUpdate("maxRows", floatValue);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Set min and max rows bound</FormHelperText>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
