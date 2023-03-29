import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type AutoWidthPropertyProps = {
  value: boolean | undefined;
  onChange: (path: string, value: boolean | undefined) => void;
};

export const AutoWidthProperty = ({ value, onChange }: AutoWidthPropertyProps) => {
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
              onChange("autoWidth", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
