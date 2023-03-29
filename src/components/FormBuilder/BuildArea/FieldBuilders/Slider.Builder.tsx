import React from "react";
import { FormControl, FormHelperText, FormLabel, Slider, Stack } from "@mui/material";
import { ISliderProps } from "../../Types";

export interface ISliderFieldBuilderProps {
  field: ISliderProps;
}

export const SliderFieldBuilder = ({ field }: ISliderFieldBuilderProps) => {
  const {
    id,
    defaultValue,
    label,
    helperText,
    size,
    title,
    name,
    showMarks,
    showCustomMarks,
    customMarks,
    step,
    min,
    max,
    track,
    valueLabelDisplay,
    valueLabelFormat: { prefix, suffix },
  } = field;
  return (
    <FormControl component={"fieldset"} fullWidth>
      <FormLabel>{label}</FormLabel>
      <Stack direction={"row"} p={3}>
        <Slider
          id={id}
          value={defaultValue}
          name={name}
          title={title}
          size={size}
          marks={showMarks ? (showCustomMarks ? customMarks : true) : false}
          step={step}
          min={min}
          max={max}
          aria-label={label?.toString()}
          valueLabelDisplay={valueLabelDisplay}
          getAriaValueText={(v: number) => `${v}`}
          track={track}
          valueLabelFormat={(v: number) => `${prefix} ${v} ${suffix}`.trim()}
        />
      </Stack>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
