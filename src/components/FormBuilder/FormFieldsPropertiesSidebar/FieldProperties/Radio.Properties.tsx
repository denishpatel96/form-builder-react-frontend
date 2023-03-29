import { List } from "@mui/material";
import React from "react";
import { IRadioProps } from "../../Types";
import { IFieldPropertiesChangeFunc } from "../../Types/Common";
import {
  CompactnessProperty,
  HelperTextProperty,
  HiddenProperty,
  HoverTextProperty,
  LabelProperty,
  OptionsLayoutProperty,
  OptionsProperty,
  RadioDefaultValueProperty,
  RequiredProperty,
  WidthProperty,
} from "../Properties";

export interface IRadioPropertiesProps {
  field: IRadioProps;
  onPropsChange: IFieldPropertiesChangeFunc;
}

export const RadioProperties = ({ field, onPropsChange }: IRadioPropertiesProps) => {
  const {
    colSpan,
    hidden,
    label,
    helperText,
    required,
    options,
    row,
    size,
    title,
    useCalcValues,
    defaultValue,
  } = field;

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} onChange={onPropsChange} />
      <HelperTextProperty value={helperText} onChange={onPropsChange} />
      <OptionsProperty value={{ useCalcValues, options }} onChange={onPropsChange} />
      <RadioDefaultValueProperty value={defaultValue} onChange={onPropsChange} options={options} />
      <OptionsLayoutProperty value={row} onChange={onPropsChange} />
      <HoverTextProperty value={title} onChange={onPropsChange} />
      <WidthProperty value={colSpan} onChange={onPropsChange} />
      <RequiredProperty value={required} onChange={onPropsChange} />
      <HiddenProperty value={hidden} onChange={onPropsChange} />
      <CompactnessProperty value={size} onChange={onPropsChange} />
    </List>
  );
};
