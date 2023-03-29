import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type RequiredPropertyProps = {
  value: boolean | undefined;
  onChange: (path: string, value: boolean | undefined) => void;
};

export const RequiredProperty = ({ value, onChange }: RequiredPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Required" />
          <FormHelperText>Prevent submission if this field is empty</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"required"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("required", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
