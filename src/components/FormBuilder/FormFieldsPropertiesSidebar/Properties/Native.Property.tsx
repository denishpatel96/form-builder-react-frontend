import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/formSlice";

type NativePropertyProps = {
  value: boolean | undefined;
};

export const NativeProperty = ({ value }: NativePropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Native" />
          <FormHelperText>Use native control of the platform</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"native"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(changeFieldProp({ path: "native", value: e.target.checked }))
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
