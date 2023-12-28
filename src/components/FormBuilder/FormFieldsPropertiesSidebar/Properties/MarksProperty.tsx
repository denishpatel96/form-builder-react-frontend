import {
  Button,
  Checkbox,
  ClickAwayListener,
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
import { StyledListItem } from "../../Styles";
import { Mark } from "../../Types";
import { Add, Remove } from "@mui/icons-material";
import { NumericFormat } from "react-number-format";

type MarksPropertyProps = {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const MarksProperty = ({ value, onUpdate }: MarksPropertyProps) => {
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
              if (!e.target.checked) {
                onUpdate("customMarks", [], true);
                onUpdate("showCustomMarks", false, true);
              }
              onUpdate("showMarks", e.target.checked);
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
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const CustomMarksProperty = ({
  value: { step, customMarks, showCustomMarks, min, max },
  onUpdate,
}: CustomMarksPropertyProps) => {
  // this state is necessary to track whether value has been updated since last request sent.
  const [updated, setUpdated] = React.useState<boolean>(false);
  return (
    <ClickAwayListener
      onClickAway={() => {
        if (updated) {
          setUpdated(false);
          onUpdate("showCustomMarks", showCustomMarks);
        }
      }}
    >
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
                setUpdated(true);
                onUpdate("showCustomMarks", e.target.checked, true);
                if (!e.target.checked) {
                  onUpdate("customMarks", [], true);
                } else {
                  onUpdate(
                    "customMarks",
                    [min, max].map((v) => ({ value: v, label: `${v}` })),
                    true
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
                            setUpdated(true);
                            onUpdate(
                              "customMarks",
                              customMarks.filter((_, ind) => ind !== index),
                              true
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
                            v
                              ? v <= Number.POSITIVE_INFINITY && v >= Number.NEGATIVE_INFINITY
                              : true
                          }
                          onValueChange={({ floatValue: v }) => {
                            if (v === undefined) v = 0;
                            setUpdated(true);
                            onUpdate(`customMarks[${index}].value`, v, true);
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
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                          ) => {
                            setUpdated(true);
                            onUpdate(`customMarks[${index}].label`, e.target.value, true);
                          }}
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
                      setUpdated(true);
                      onUpdate(`customMarks`, [...customMarks, { label: "", value: 0 }], true);
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUpdated(true);
                      onUpdate("step", e.target.checked ? null : undefined, true);
                    }}
                    size="small"
                  />
                }
                label={
                  <Typography variant="caption">Restrict selection to custom marks</Typography>
                }
              />
            </Grid>
          )}
        </Grid>
      </StyledListItem>
    </ClickAwayListener>
  );
};
