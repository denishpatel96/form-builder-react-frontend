import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type RequiredPropertyProps = {
  value: boolean | undefined;
};

export const RequiredProperty = ({ value }: RequiredPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Required" />
          <FormHelperText>Prevent submission if this field is empty</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"required"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(changeFieldProp({ path: "required", value: e.target.checked }))
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
