import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { Mark } from "../../Types";
import { Add, Remove } from "@mui/icons-material";
import { NumericFormat } from "react-number-format";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type MarksPropertyProps = {
  value: boolean | undefined;
};

export const MarksProperty = ({ value }: MarksPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Marks" />
          <FormHelperText>Show marks on slider track</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"showMarks"}
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(changeFieldProp({ path: "showMarks", value: e.target.checked }));
              if (!e.target.checked) {
                dispatch(changeFieldProp({ path: "showCustomMarks", value: false }));
                dispatch(changeFieldProp({ path: "customMarks", value: [] }));
              }
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};

type CustomMarksPropertyProps = {
  value: {
    customMarks: Mark[];
    showCustomMarks: boolean;
    step: number | null | undefined;
    min: number;
    max: number;
  };
};

export const CustomMarksProperty = ({
  value: { step, customMarks, showCustomMarks, min, max },
}: CustomMarksPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Custom Marks" />
          <FormHelperText>Show marks only for custom values with label</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"showCustomMarks"}
            checked={showCustomMarks}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(changeFieldProp({ path: "showCustomMarks", value: e.target.checked }));
              if (!e.target.checked) {
                dispatch(changeFieldProp({ path: "customMarks", value: [] }));
              } else {
                dispatch(
                  changeFieldProp({
                    path: "customMarks",
                    value: [min, max].map((v) => ({ value: v, label: `${v}` })),
                  })
                );
              }
            }}
          />
        </Grid>
        {showCustomMarks && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {customMarks.length > 0 && (
                <React.Fragment>
                  <Grid item xs={6}>
                    <Typography pl={3} variant="overline">
                      Value
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="overline">Label</Typography>
                  </Grid>
                </React.Fragment>
              )}
              {customMarks.map((mark, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item xs={6} display={"flex"} alignItems={"center"}>
                      <IconButton
                        sx={{ width: 20, height: 20, mr: 1 }}
                        onClick={() => {
                          dispatch(
                            changeFieldProp({
                              path: "customMarks",
                              value: customMarks.filter((_, ind) => ind !== index),
                            })
                          );
                        }}
                      >
                        <Remove sx={{ widh: 15, height: 15 }} />
                      </IconButton>
                      <NumericFormat
                        name={`mark-${index}-value`}
                        variant="standard"
                        size="small"
                        customInput={TextField}
                        value={mark.value}
                        fullWidth
                        allowNegative
                        isAllowed={({ floatValue: v }) =>
                          v ? v <= Number.POSITIVE_INFINITY && v >= Number.NEGATIVE_INFINITY : true
                        }
                        onValueChange={({ floatValue: v }) => {
                          if (v === undefined) v = 0;
                          dispatch(
                            changeFieldProp({ path: `customMarks[${index}].value`, value: v })
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name={`$mark-${index}-label`}
                        variant="standard"
                        size="small"
                        value={mark.label}
                        fullWidth
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          dispatch(
                            changeFieldProp({
                              path: `customMarks[${index}].label`,
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </Grid>
                  </React.Fragment>
                );
              })}

              <Grid item xs={12}>
                <Button
                  size="small"
                  startIcon={<Add />}
                  onClick={() => {
                    dispatch(
                      changeFieldProp({
                        path: `customMarks`,
                        value: [...customMarks, { label: "", value: 0 }],
                      })
                    );
                  }}
                >
                  <Typography variant="body2">Add custom mark</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        {showCustomMarks && (
          <Grid item xs={12} display={"flex"} alignItems={"center"}>
            <FormControlLabel
              control={
                <Checkbox
                  name={"restrictSelectionToCustomMarks"}
                  checked={step === null}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      changeFieldProp({ path: "step", value: e.target.checked ? null : undefined })
                    )
                  }
                  size="small"
                />
              }
              label={<Typography variant="caption">Restrict selection to custom marks</Typography>}
            />
          </Grid>
        )}
      </Grid>
    </StyledListItem>
  );
};
