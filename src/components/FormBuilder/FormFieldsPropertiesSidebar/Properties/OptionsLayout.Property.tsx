import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type OptionsLayoutPropertyProps = {
  value: boolean | undefined;
};

export const OptionsLayoutProperty = ({ value }: OptionsLayoutPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Horizontal Layout" />
          <FormHelperText>Lay out the options horizontally.</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"row"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(changeFieldProp({ path: "row", value: e.target.checked }))
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
