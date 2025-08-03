import { FormHelperText, Grid, Switch, TextField } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type LengthValidationPropertyProps = {
  value: {
    validateLength: boolean;
    minLength?: string | number;
    maxLength?: string | number;
    msgLength?: string;
  };
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const LengthValidationProperty = ({
  value: { validateLength, minLength, maxLength, msgLength },
  onUpdate,
}: LengthValidationPropertyProps) => {
  // this state is necessary to track whether value has been updated since last request sent.
  const [msgUpdated, setMsgUpdated] = React.useState<boolean>(false);
  const [minUpdated, setMinUpdated] = React.useState<boolean>(false);
  const [maxUpdated, setMaxUpdated] = React.useState<boolean>(false);
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Length Validation" />
          <FormHelperText>Validate input for length before submission</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"validateLength"}
            checked={validateLength}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onUpdate("validateLength", e.target.checked)
            }
          />
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    setMsgUpdated(true);
                    onUpdate("msgLength", e.target.value, true);
                  }}
                  helperText={"Message to display when validation fails."}
                  onBlur={() => {
                    if (msgUpdated) {
                      setMsgUpdated(false);
                      onUpdate("msgLength", msgLength);
                    }
                  }}
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
                    onUpdate("minLength", +value, true);
                    setMinUpdated(true);
                  }}
                  onBlur={() => {
                    if (minUpdated) {
                      setMinUpdated(false);
                      onUpdate("minLength", minLength);
                    }
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
                    onUpdate("maxLength", +value, true);
                    setMaxUpdated(true);
                  }}
                  onBlur={() => {
                    if (maxUpdated) {
                      setMaxUpdated(false);
                      onUpdate("maxLength", maxLength);
                    }
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
