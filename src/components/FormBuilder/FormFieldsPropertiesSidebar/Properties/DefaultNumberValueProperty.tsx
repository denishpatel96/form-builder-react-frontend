import { Clear } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { NumericFormat } from "react-number-format";

type DefaultNumberValuePropertyProps = {
  value: {
    defaultValue: number | number[];
    min: number;
    max: number;
  };
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const DefaultNumberValueProperty = ({
  value: { defaultValue, min, max },
  onUpdate,
}: DefaultNumberValuePropertyProps) => {
  const isRangeSlider = Array.isArray(defaultValue);
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Default Value" />
        </Grid>
        {isRangeSlider ? (
          defaultValue?.map((value, index) => {
            return (
              <Grid item xs={6} key={index}>
                <NumericFormat
                  name={"defaultValue"}
                  variant="standard"
                  size="small"
                  customInput={TextField}
                  value={value}
                  label={index ? "End" : "Start"}
                  fullWidth
                  min={min}
                  max={max}
                  isAllowed={({ floatValue: v }) => (v ? v <= max && v >= min : true)}
                  InputProps={{
                    endAdornment: value !== null && value !== undefined && (
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          onUpdate(`defaultValue[${index}]`, min);
                        }}
                      >
                        <Clear sx={{ height: 15, width: 15 }} />
                      </IconButton>
                    ),
                  }}
                  onValueChange={({ value }) => {
                    onUpdate(`defaultValue[${index}]`, +value);
                  }}
                />
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <NumericFormat
              name={"defaultValue"}
              variant="standard"
              size="small"
              customInput={TextField}
              value={defaultValue}
              fullWidth
              min={min}
              max={max}
              isAllowed={({ floatValue: v }) => (v ? v <= max && v >= min : true)}
              InputProps={{
                endAdornment: defaultValue !== null && defaultValue !== undefined && (
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => {
                      onUpdate(`defaultValue`, min);
                    }}
                  >
                    <Clear sx={{ height: 15, width: 15 }} />
                  </IconButton>
                ),
              }}
              onValueChange={({ value }) => {
                onUpdate(`defaultValue`, +value);
              }}
            />
          </Grid>
        )}
      </Grid>
    </StyledListItem>
  );
};
