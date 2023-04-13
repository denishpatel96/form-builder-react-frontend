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
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type MarginPropertyProps = {
  value: TextFieldProps["margin"];
};

export const MarginProperty = ({ value }: MarginPropertyProps) => {
  const dispatch = useAppDispatch();
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
            onChange={(_, value: any) =>
              value !== null && dispatch(changeFieldProp({ path: "margin", value }))
            }
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
