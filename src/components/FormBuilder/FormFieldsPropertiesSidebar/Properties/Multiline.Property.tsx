import { FormHelperText, Grid, Switch, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type MultilinePropertyProps = {
  value: {
    multiline: TextFieldProps["multiline"];
    rows: TextFieldProps["rows"];
    maxRows: TextFieldProps["maxRows"];
    minRows: TextFieldProps["minRows"];
  };
  onChange: (path: string, value: boolean | number | undefined) => void;
};

export const MultilineProperty = ({ value, onChange }: MultilinePropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Multiline" />
        </Grid>
        <Grid item xs={12}>
          <Switch
            name={"multiline"}
            checked={value.multiline}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                onChange("patternValidation.required", false);
              }
              onChange("multiline", e.target.checked);
            }}
            inputProps={{ "aria-label": "text-required-property" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormHelperText>Create textarea with multiple lines</FormHelperText>
        </Grid>
        <Grid item>
          {value.multiline && (
            <Grid container spacing={1} pt={2}>
              <Grid item xs={12}>
                <NumericFormat
                  size="small"
                  name={"rows"}
                  label={"Rows"}
                  fullWidth
                  allowNegative={false}
                  variant="standard"
                  value={value.rows}
                  customInput={TextField}
                  onValueChange={({ value }) => {
                    onChange("rows", +value);
                  }}
                  helperText={"Fix number of rows"}
                />
              </Grid>
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
                  onValueChange={({ value }) => {
                    onChange("rows", 0);
                    onChange("minRows", +value);
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
                  onValueChange={({ value }) => {
                    onChange("rows", 0);
                    onChange("maxRows", +value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormHelperText>Or you can define min rows and max rows.</FormHelperText>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
