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
import { changeFieldProp } from "../../../../store/features/formSlice";

type VariantPropertyProps = {
  value: TextFieldProps["variant"];
};

export const VariantProperty = ({ value }: VariantPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Variant" />
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            fullWidth
            size="small"
            color="primary"
            value={value}
            exclusive
            onChange={(_, value: any) =>
              value !== null && dispatch(changeFieldProp({ path: "variant", value }))
            }
            aria-label="Platform"
          >
            <ToggleButton value="standard">Standard</ToggleButton>
            <ToggleButton value="outlined">Outlined</ToggleButton>
            <ToggleButton value="filled">Filled</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <FormHelperText>Change the style of text input.</FormHelperText>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
