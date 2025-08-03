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
import { WidthProperty } from "../Properties/WidthProperty";

export const SliderProperties = ({
  field,
  onUpdate,
}: {
  field: ISliderProps;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
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

  const commonProps = {
    onUpdate: onUpdate,
  };

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} {...commonProps} />
      <HelperTextProperty value={helperText} {...commonProps} />
      <RangeSliderProperty value={defaultValue} {...commonProps} />
      <DefaultNumberValueProperty
        value={{ defaultValue: defaultValue as number[], min, max }}
        {...commonProps}
      />
      <NumberValueRangeProperty value={{ min, max }} {...commonProps} />
      {step !== null && <SliderStepProperty value={{ min, max, step }} {...commonProps} />}
      <MarksProperty value={showMarks} {...commonProps} />
      {showMarks && (
        <CustomMarksProperty
          value={{ step, customMarks, showCustomMarks, min, max }}
          {...commonProps}
        />
      )}
      <SliderTrackProperty value={track} {...commonProps} />
      <ValueLabelDisplayProperty value={valueLabelDisplay} {...commonProps} />
      <ValueLabelFormatProperty value={valueLabelFormat} {...commonProps} />
      <HoverTextProperty value={title} {...commonProps} />
      <WidthProperty value={colSpan} {...commonProps} />
      <HiddenProperty value={hidden} {...commonProps} />
      <CompactnessProperty value={size} {...commonProps} />
    </List>
  );
};
