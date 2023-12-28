import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type RequiredPropertyProps = {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const RequiredProperty = ({ value, onUpdate }: RequiredPropertyProps) => {
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
              onUpdate("required", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
