import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type NativePropertyProps = {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const NativeProperty = ({ value, onUpdate }: NativePropertyProps) => {
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
              onUpdate("native", e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
