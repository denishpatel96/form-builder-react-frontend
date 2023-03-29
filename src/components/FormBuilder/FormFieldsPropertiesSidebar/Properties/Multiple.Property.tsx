import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type MultiplePropertyProps = {
  value: boolean | undefined;
  onChange: (path: string, value: boolean | undefined) => void;
};

export const MultipleProperty = ({ value, onChange }: MultiplePropertyProps) => {
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
              onChange("multiple", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
