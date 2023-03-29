import { FormControl, FormHelperText, FormLabel, Slider, Stack } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { Control, FieldValues } from "react-hook-form/dist/types";
import { ISliderProps } from "../../../Types";

export const SliderElement = ({
  field,
  control,
}: {
  field: ISliderProps;
  control: Control<FieldValues, any>;
}) => {
  if (!field || field.hidden) {
    return <></>;
  }

  const {
    id,
    helperText,
    label,
    name,
    size,
    title,
    defaultValue,
    showMarks,
    showCustomMarks,
    customMarks,
    step,
    min,
    max,
    track,
    valueLabelDisplay,
  } = field;

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl component={"fieldset"} fullWidth error={!!error}>
            <FormLabel>{label}</FormLabel>
            <Stack direction={"row"} p={1}>
              <Slider
                id={id}
                onChange={(_ev, value, _activeThumb) => {
                  onChange(value);
                }}
                value={value}
                title={title}
                size={size}
                marks={showMarks ? (showCustomMarks ? customMarks : true) : false}
                step={step}
                min={min}
                max={max}
                valueLabelDisplay={valueLabelDisplay}
                track={track}
              />
            </Stack>
            <FormHelperText error={!!error}>{error?.message || helperText}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
