import React from "react";
import { List } from "@mui/material";
import { ICheckboxProps, IFieldPropertiesChangeFunc } from "../../Types";
import {
  CheckboxDefaultValueProperty,
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

export interface ICheckboxPropertiesProps {
  field: ICheckboxProps;
  onPropsChange: IFieldPropertiesChangeFunc;
}

export const CheckboxProperties = ({ field, onPropsChange }: ICheckboxPropertiesProps) => {
  const { colSpan, hidden, label, helperText, required, options, row, size, title, useCalcValues } =
    field;

  const defaultValue = options.filter((op) => op.defaultChecked).map((op) => op.label);
  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} onChange={onPropsChange} />
      <HelperTextProperty value={helperText} onChange={onPropsChange} />
      <OptionsProperty value={{ useCalcValues, options }} onChange={onPropsChange} />
      <CheckboxDefaultValueProperty
        value={defaultValue}
        options={options}
        onChange={onPropsChange}
      />
      <OptionsLayoutProperty value={row} onChange={onPropsChange} />
      <HoverTextProperty value={title} onChange={onPropsChange} />
      <WidthProperty value={colSpan} onChange={onPropsChange} />
      <RequiredProperty value={required} onChange={onPropsChange} />
      <HiddenProperty value={hidden} onChange={onPropsChange} />
      <CompactnessProperty value={size} onChange={onPropsChange} />
    </List>
  );
};
