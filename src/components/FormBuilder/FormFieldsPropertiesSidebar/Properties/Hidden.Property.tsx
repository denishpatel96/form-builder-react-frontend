import { Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type HiddenPropertyProps = {
  value: boolean | undefined;
  onChange: (path: string, value: boolean | undefined) => void;
};

export const HiddenProperty = ({ value, onChange }: HiddenPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Hidden" />
        </Grid>
        <Grid item xs={12}>
          <Switch
            name={"hidden"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("hidden", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
