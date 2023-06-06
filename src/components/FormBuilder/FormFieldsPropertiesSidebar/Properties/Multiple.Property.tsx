import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/formSlice";

type MultiplePropertyProps = {
  value: boolean | undefined;
};

export const MultipleProperty = ({ value }: MultiplePropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Multiple Selections" />
          <FormHelperText>Allow multiple selection</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"multiple"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(changeFieldProp({ path: "multiple", value: e.target.checked }))
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
