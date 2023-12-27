import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type MultiplePropertyProps = {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const MultipleProperty = ({ value, onUpdate }: MultiplePropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Multiple Selections" />
          <FormHelperText>Allow multiple selection</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"multiple"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onUpdate("multiple", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
