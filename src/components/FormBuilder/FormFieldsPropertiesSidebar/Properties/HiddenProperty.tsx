import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type HiddenPropertyProps = {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const HiddenProperty = ({ value, onUpdate }: HiddenPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Hidden" />
          <FormHelperText>Hide element from the form</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"hidden"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onUpdate("hidden", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
