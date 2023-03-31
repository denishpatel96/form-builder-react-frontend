import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type DefaultCheckedPropertyProps = {
  value: boolean | undefined;
  onChange: (path: string, value: boolean | undefined) => void;
};

export const DefaultCheckedProperty = ({ value, onChange }: DefaultCheckedPropertyProps) => {
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
              onChange("defaultChecked", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
