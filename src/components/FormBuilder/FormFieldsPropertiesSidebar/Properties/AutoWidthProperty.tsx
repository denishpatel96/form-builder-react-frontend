import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type AutoWidthPropertyProps = {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const AutoWidthProperty = ({ value, onUpdate }: AutoWidthPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Auto Width" />
          <FormHelperText>Adjust dropdown width automatically</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"autoWidth"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onUpdate("autoWidth", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
