import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type OptionsLayoutPropertyProps = {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const OptionsLayoutProperty = ({ value, onUpdate }: OptionsLayoutPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Horizontal Layout" />
          <FormHelperText>Lay out the options horizontally.</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"row"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate("row", e.target.checked)}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
