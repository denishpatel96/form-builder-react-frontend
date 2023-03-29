import { FormHelperText, Grid, Switch, TextField } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type LengthValidationPropertyProps = {
  value: {
    validateLength: boolean;
    minLength?: string | number;
    maxLength?: string | number;
    msgLength?: string;
  };
  onChange: (path: string, value: boolean | number | string | undefined) => void;
};

export const LengthValidationProperty = ({
  value: { validateLength, minLength, maxLength, msgLength },
  onChange,
}: LengthValidationPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Length Validation" />
        </Grid>
        <Grid item xs={12}>
          <Switch
            name={"validateLength"}
            checked={validateLength}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("validateLength", e.target.checked)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormHelperText>Validate input for length before submission</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          {validateLength && (
            <Grid container spacing={1} pt={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name={"msgLength"}
                  label={"Message"}
                  variant="standard"
                  value={msgLength}
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    onChange("msgLength", e.target.value)
                  }
                  helperText={"Message to display when validation fails."}
                />
              </Grid>
              <Grid item xs={6}>
                <NumericFormat
                  size="small"
                  name={"minLength"}
                  label={"Min"}
                  fullWidth
                  allowNegative={false}
                  variant="standard"
                  value={minLength}
                  customInput={TextField}
                  onValueChange={({ value }) => {
                    onChange("minLength", +value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <NumericFormat
                  size="small"
                  name={"maxLength"}
                  label={"Max"}
                  fullWidth
                  allowNegative={false}
                  variant="standard"
                  value={maxLength}
                  customInput={TextField}
                  onValueChange={({ value }) => {
                    onChange("maxLength", +value);
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
