import { List } from "@mui/material";
import React from "react";
import { IRadioProps } from "../../Types";
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
}

export const RadioProperties = ({ field }: IRadioPropertiesProps) => {
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
      <LabelProperty value={label} />
      <HelperTextProperty value={helperText} />
      <OptionsProperty value={{ useCalcValues, options }} />
      <RadioDefaultValueProperty value={defaultValue} options={options} />
      <OptionsLayoutProperty value={row} />
      <HoverTextProperty value={title} />
      <WidthProperty value={colSpan} />
      <RequiredProperty value={required} />
      <HiddenProperty value={hidden} />
      <CompactnessProperty value={size} />
    </List>
  );
};
