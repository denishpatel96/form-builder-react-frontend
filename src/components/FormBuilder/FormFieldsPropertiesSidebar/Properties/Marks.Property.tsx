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

type MarksPropertyProps = {
  value: boolean | undefined;
  onChange: (path: string, value: number | string | boolean | Mark[] | undefined) => void;
};

export const MarksProperty = ({ value, onChange }: MarksPropertyProps) => {
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
              onChange("showMarks", e.target.checked);
              if (!e.target.checked) {
                onChange("showCustomMarks", false);
                onChange("customMarks", []);
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
  onChange: (path: string, value: number | string | boolean | Mark[] | null | undefined) => void;
};

export const CustomMarksProperty = ({
  value: { step, customMarks, showCustomMarks, min, max },
  onChange,
}: CustomMarksPropertyProps) => {
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
              onChange("showCustomMarks", e.target.checked);
              if (!e.target.checked) {
                onChange("customMarks", []);
              } else {
                onChange(
                  "customMarks",
                  [min, max].map((v) => ({ value: v, label: `${v}` }))
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
                          onChange(
                            "customMarks",
                            customMarks.filter((_, ind) => ind !== index)
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
                          onChange(`customMarks[${index}].value`, v);
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
                          onChange(`customMarks[${index}].label`, e.target.value)
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
                    onChange(`customMarks`, [...customMarks, { label: "", value: 0 }]);
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
                    onChange("step", e.target.checked ? null : undefined)
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
