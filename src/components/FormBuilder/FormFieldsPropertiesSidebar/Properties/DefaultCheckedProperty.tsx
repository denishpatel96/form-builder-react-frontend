import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type DefaultCheckedPropertyProps = {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const DefaultCheckedProperty = ({ value, onUpdate }: DefaultCheckedPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Default Checked" />
          <FormHelperText>Make checkbox checked by default</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"defaultChecked"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onUpdate("defaultChecked", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
