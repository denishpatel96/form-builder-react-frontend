import { FormHelperText, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import PropTitle from "../Properties/PropTitle";
import { StyledListItem } from "../../Styles";

export const ToggleTypeProperty = ({
  title,
  path,
  helperText,
  value,
  onUpdate,
  options,
}: {
  title: string;
  path: string;
  helperText?: string;
  value: string | number | boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
  options: { value: string | number | boolean; label: string }[];
}) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text={title} />
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            fullWidth
            size="small"
            color="primary"
            value={value}
            exclusive
            onChange={(_, value: any) => value !== null && onUpdate(path, value)}
            aria-label="Platform"
          >
            {options.map((op, index) => (
              <ToggleButton key={index} value={op.value}>
                {op.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
        {helperText && (
          <Grid item xs={12}>
            <FormHelperText>{helperText}</FormHelperText>
          </Grid>
        )}
      </Grid>
    </StyledListItem>
  );
};
