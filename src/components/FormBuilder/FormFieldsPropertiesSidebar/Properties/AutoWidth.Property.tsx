import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/formSlice";

type AutoWidthPropertyProps = {
  value: boolean | undefined;
};

export const AutoWidthProperty = ({ value }: AutoWidthPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Auto Width" />
          <FormHelperText>Adjust dropdown width automatically</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"autoWidth"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(changeFieldProp({ path: "autoWidth", value: e.target.checked }))
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
