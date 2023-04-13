import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type DefaultCheckedPropertyProps = {
  value: boolean | undefined;
};

export const DefaultCheckedProperty = ({ value }: DefaultCheckedPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Default Checked" />
          <FormHelperText>Make checkbox checked by default</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"defaultChecked"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(changeFieldProp({ path: "defaultChecked", value: e.target.checked }))
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
