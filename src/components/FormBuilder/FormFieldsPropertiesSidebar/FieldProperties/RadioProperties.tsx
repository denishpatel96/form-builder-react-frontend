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

export const RadioProperties = ({
  field,
  onUpdate,
}: {
  field: IRadioProps;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
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

  const commonProps = {
    onUpdate: onUpdate,
  };

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} {...commonProps} />
      <HelperTextProperty value={helperText} {...commonProps} />
      <OptionsProperty value={{ useCalcValues, options }} {...commonProps} />
      <RadioDefaultValueProperty value={defaultValue} options={options} {...commonProps} />
      <OptionsLayoutProperty value={row} {...commonProps} />
      <HoverTextProperty value={title} {...commonProps} />
      <WidthProperty value={colSpan} {...commonProps} />
      <RequiredProperty value={required} {...commonProps} />
      <HiddenProperty value={hidden} {...commonProps} />
      <CompactnessProperty value={size} {...commonProps} />
    </List>
  );
};
