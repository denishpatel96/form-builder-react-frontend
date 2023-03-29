import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type OptionsLayoutPropertyProps = {
  value: boolean | undefined;
  onChange: (path: string, value: boolean | undefined) => void;
};

export const OptionsLayoutProperty = ({ value, onChange }: OptionsLayoutPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Horizontal Layout" />
        </Grid>
        <Grid item xs={12}>
          <Switch
            name={"row"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("row", e.target.checked)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormHelperText>Lay out the options horizontally.</FormHelperText>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
