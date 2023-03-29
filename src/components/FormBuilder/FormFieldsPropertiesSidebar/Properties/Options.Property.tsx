import { Add, Remove } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ISelectableOptionProps, IRadioOptionProps } from "../../Types";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type OptionsPropertyProps = {
  value: {
    useCalcValues: boolean;
    options: IRadioOptionProps[] | ISelectableOptionProps[];
  };
  onChange: (
    path: string,
    value: boolean | string | IRadioOptionProps[] | ISelectableOptionProps[]
  ) => void;
};

export const OptionsProperty = ({
  value: { useCalcValues, options },
  onChange,
}: OptionsPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Options" />
        </Grid>
        <Grid item xs={12} display={"flex"} alignItems={"center"}>
          <FormControlLabel
            control={
              <Checkbox
                name={"useCalcValues"}
                checked={useCalcValues}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange("useCalcValues", e.target.checked)
                }
                size="small"
              />
            }
            label={
              <Typography variant="caption">
                Assign values that can be used in calculations
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {useCalcValues && (
              <>
                <Grid item xs={8}>
                  <Typography pl={3} variant="overline">
                    Label
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="overline">Value</Typography>
                </Grid>
              </>
            )}
            {options.map((op, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={useCalcValues ? 8 : 12} display={"flex"} alignItems={"center"}>
                    <IconButton
                      sx={{ width: 20, height: 20, mr: 1 }}
                      onClick={() => {
                        onChange(
                          "options",
                          options.filter((_, ind) => ind !== index)
                        );
                      }}
                    >
                      <Remove sx={{ widh: 15, height: 15 }} />
                    </IconButton>
                    <TextField
                      name={`$op-${index}-label`}
                      variant="standard"
                      size="small"
                      value={op.label}
                      fullWidth
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        onChange(`options[${index}].label`, e.target.value)
                      }
                    />
                  </Grid>
                  {useCalcValues && (
                    <Grid item xs={4}>
                      <TextField
                        name={`$op-${index}-calc-value`}
                        variant="standard"
                        size="small"
                        value={op.value}
                        fullWidth
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          onChange(`options[${index}].value`, e.target.value)
                        }
                      />
                    </Grid>
                  )}
                </React.Fragment>
              );
            })}

            <Grid item xs={12}>
              <Button
                size="small"
                startIcon={<Add />}
                onClick={() => {
                  onChange(`options`, [...options, { label: "", value: "" }]);
                }}
              >
                <Typography variant="body2">Add option</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
