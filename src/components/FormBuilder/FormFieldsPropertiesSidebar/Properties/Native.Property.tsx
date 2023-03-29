import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type NativePropertyProps = {
  value: boolean | undefined;
  onChange: (path: string, value: boolean | undefined) => void;
};

export const NativeProperty = ({ value, onChange }: NativePropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Native" />
          <FormHelperText>Use native control of the platform</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"native"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("native", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
