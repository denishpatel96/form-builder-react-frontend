import { FormHelperText, Grid, Switch, TextField } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/formSlice";

type LengthValidationPropertyProps = {
  value: {
    validateLength: boolean;
    minLength?: string | number;
    maxLength?: string | number;
    msgLength?: string;
  };
};

export const LengthValidationProperty = ({
  value: { validateLength, minLength, maxLength, msgLength },
}: LengthValidationPropertyProps) => {
  const dispatch = useAppDispatch();
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
              dispatch(changeFieldProp({ path: "validateLength", value: e.target.checked }))
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    dispatch(changeFieldProp({ path: "msgLength", value: e.target.value }))
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
                    dispatch(changeFieldProp({ path: "minLength", value: +value }));
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
                    dispatch(changeFieldProp({ path: "maxLength", value: +value }));
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
