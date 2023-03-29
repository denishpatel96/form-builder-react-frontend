import { List } from "@mui/material";
import React from "react";
import { ISliderProps } from "../../Types";
import { IFieldPropertiesChangeFunc } from "../../Types/Common";
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
  onPropsChange: IFieldPropertiesChangeFunc;
}

export const SliderProperties = ({ field, onPropsChange }: ISliderPropertiesProps) => {
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
      <LabelProperty value={label} onChange={onPropsChange} />
      <HelperTextProperty value={helperText} onChange={onPropsChange} />
      <RangeSliderProperty value={defaultValue} onChange={onPropsChange} />
      <DefaultNumberValueProperty
        value={{ defaultValue: defaultValue as number[], min, max }}
        onChange={onPropsChange}
      />
      <NumberValueRangeProperty value={{ min, max }} onChange={onPropsChange} />
      {step !== null && <SliderStepProperty value={{ min, max, step }} onChange={onPropsChange} />}
      <MarksProperty value={showMarks} onChange={onPropsChange} />
      {showMarks && (
        <CustomMarksProperty
          value={{ step, customMarks, showCustomMarks }}
          onChange={onPropsChange}
        />
      )}
      <SliderTrackProperty value={track} onChange={onPropsChange} />
      <ValueLabelDisplayProperty value={valueLabelDisplay} onChange={onPropsChange} />
      <ValueLabelFormatProperty value={valueLabelFormat} onChange={onPropsChange} />
      <HoverTextProperty value={title} onChange={onPropsChange} />
      <WidthProperty value={colSpan} onChange={onPropsChange} />
      <HiddenProperty value={hidden} onChange={onPropsChange} />
      <CompactnessProperty value={size} onChange={onPropsChange} />
    </List>
  );
};
