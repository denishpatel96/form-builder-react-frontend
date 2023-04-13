import { FormHelperText, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { changeFieldProp } from "../../../../store/features/form/formSlice";
import { useAppDispatch } from "../../../../store/hooks";
import { StyledListItem } from "../Styles";
import PropTitle from "./PropTitle";

type CompactnessPropertyProps = {
  value: "small" | "medium" | undefined;
};

export const CompactnessProperty = ({ value }: CompactnessPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Compactness" />
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            fullWidth
            size="small"
            color="primary"
            value={value}
            exclusive
            onChange={(_, value: any) =>
              value !== null && dispatch(changeFieldProp({ path: "size", value }))
            }
          >
            <ToggleButton value="small">Compact</ToggleButton>
            <ToggleButton value="medium">Normal</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <FormHelperText>Compact the input size.</FormHelperText>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
