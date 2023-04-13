import { FormHelperText, Grid, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type RowsCountPropertyProps = {
  value: {
    maxRows: TextFieldProps["maxRows"];
    minRows: TextFieldProps["minRows"];
  };
};

export const RowsCountProperty = ({ value }: RowsCountPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Number of Rows" />
        </Grid>
        <Grid item>
          <Grid container spacing={1} pt={2}>
            <Grid item xs={6}>
              <NumericFormat
                size="small"
                name={"minRows"}
                label={"Min"}
                fullWidth
                allowNegative={false}
                variant="standard"
                value={value.minRows}
                customInput={TextField}
                onValueChange={({ floatValue }) => {
                  dispatch(changeFieldProp({ path: "rows", value: 0 }));
                  dispatch(changeFieldProp({ path: "minRows", value: floatValue }));
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <NumericFormat
                size="small"
                name={"maxRows"}
                label={"Max"}
                fullWidth
                allowNegative={false}
                variant="standard"
                value={value.maxRows}
                customInput={TextField}
                onValueChange={({ floatValue }) => {
                  dispatch(changeFieldProp({ path: "rows", value: 0 }));
                  dispatch(changeFieldProp({ path: "maxRows", value: floatValue }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Set min and max rows bound</FormHelperText>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
