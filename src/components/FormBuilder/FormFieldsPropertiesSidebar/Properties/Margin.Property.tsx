import {
  FormHelperText,
  Grid,
  TextFieldProps,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type MarginPropertyProps = {
  value: TextFieldProps["margin"];
  onChange: (path: string, value: TextFieldProps["margin"]) => void;
};

export const MarginProperty = ({ value, onChange }: MarginPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Margin" />
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            fullWidth
            size="small"
            color="primary"
            value={value}
            exclusive
            onChange={(_, value: any) => value !== null && onChange("margin", value)}
            aria-label="Platform"
          >
            <ToggleButton value="none">None</ToggleButton>
            <ToggleButton value="dense">Dense</ToggleButton>
            <ToggleButton value="normal">Normal</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <FormHelperText>Change the vertical spacing.</FormHelperText>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
