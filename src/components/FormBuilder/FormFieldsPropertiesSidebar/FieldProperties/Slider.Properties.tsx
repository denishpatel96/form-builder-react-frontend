import { List } from "@mui/material";
import React from "react";
import { ISliderProps } from "../../Types";
import {
  CompactnessProperty,
  CustomMarksProperty,
  DefaultNumberValueProperty,
  HelperTextProperty,
  HiddenProperty,
  HoverTextProperty,
  LabelProperty,
  ValueLabelDisplayProperty,
  MarksProperty,
  NumberValueRangeProperty,
  RangeSliderProperty,
  SliderTrackProperty,
  SliderStepProperty,
  ValueLabelFormatProperty,
} from "../Properties";
import { WidthProperty } from "../Properties/Width.Property";

export interface ISliderPropertiesProps {
  field: ISliderProps;
}

export const SliderProperties = ({ field }: ISliderPropertiesProps) => {
  const {
    colSpan,
    hidden,
    label,
    defaultValue,
    helperText,
    title,
    size,
    min,
    max,
    showMarks,
    showCustomMarks,
    customMarks,
    step,
    valueLabelDisplay,
    valueLabelFormat,
    track,
  } = field;

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} />
      <HelperTextProperty value={helperText} />
      <RangeSliderProperty value={defaultValue} />
      <DefaultNumberValueProperty value={{ defaultValue: defaultValue as number[], min, max }} />
      <NumberValueRangeProperty value={{ min, max }} />
      {step !== null && <SliderStepProperty value={{ min, max, step }} />}
      <MarksProperty value={showMarks} />
      {showMarks && (
        <CustomMarksProperty value={{ step, customMarks, showCustomMarks, min, max }} />
      )}
      <SliderTrackProperty value={track} />
      <ValueLabelDisplayProperty value={valueLabelDisplay} />
      <ValueLabelFormatProperty value={valueLabelFormat} />
      <HoverTextProperty value={title} />
      <WidthProperty value={colSpan} />
      <HiddenProperty value={hidden} />
      <CompactnessProperty value={size} />
    </List>
  );
};
