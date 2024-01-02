import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "../Properties/PropTitle";
import { StyledListItem } from "../../Styles";

export const SwitchTypeProperty = ({
  title,
  helperText,
  path,
  value,
  onUpdate,
}: {
  title: string;
  helperText: string | undefined;
  path: string;
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text={title} />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={path}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(path, e.target.checked)}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
