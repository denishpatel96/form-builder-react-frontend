import React from "react";
import { List } from "@mui/material";
import { ICheckboxGroupProps } from "../../Types";
import {
  CheckboxGroupDefaultValueProperty,
  CompactnessProperty,
  HelperTextProperty,
  HiddenProperty,
  HoverTextProperty,
  LabelProperty,
  OptionsLayoutProperty,
  OptionsProperty,
  RequiredProperty,
  WidthProperty,
} from "../Properties";

export interface ICheckboxGroupPropertiesProps {
  field: ICheckboxGroupProps;
}

export const CheckboxGroupProperties = ({ field }: ICheckboxGroupPropertiesProps) => {
  const { colSpan, hidden, label, helperText, required, options, row, size, title, useCalcValues } =
    field;

  const defaultValue = options.filter((op) => op.defaultChecked).map((op) => op.label);
  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} />
      <HelperTextProperty value={helperText} />
      <OptionsProperty value={{ useCalcValues, options }} />
      <CheckboxGroupDefaultValueProperty value={defaultValue} options={options} />
      <OptionsLayoutProperty value={row} />
      <HoverTextProperty value={title} />
      <WidthProperty value={colSpan} />
      <RequiredProperty value={required} />
      <HiddenProperty value={hidden} />
      <CompactnessProperty value={size} />
    </List>
  );
};
