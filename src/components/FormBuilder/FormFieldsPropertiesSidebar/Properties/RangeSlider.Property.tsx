import { FormHelperText, Grid, Switch } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/formSlice";

type RangeSliderPropertyProps = {
  value: number | number[];
};

export const RangeSliderProperty = ({ value }: RangeSliderPropertyProps) => {
  const dispatch = useAppDispatch();
  const isRangeSlider = Array.isArray(value);
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Range Slider" />
          <FormHelperText>Used to set the start and end of a range</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"rangeSlider"}
            checked={isRangeSlider}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(
                changeFieldProp({
                  path: "defaultValue",
                  value: isRangeSlider ? value[0] : [value, 0],
                })
              )
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
