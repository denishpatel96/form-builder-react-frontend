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
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}

export const CheckboxGroupProperties = ({ field, onUpdate }: ICheckboxGroupPropertiesProps) => {
  const { colSpan, hidden, label, helperText, required, options, row, size, title, useCalcValues } =
    field;

  const defaultValue = options.filter((op) => op.defaultChecked).map((op) => op.label);
  const commonProps = {
    onUpdate: onUpdate,
  };
  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} {...commonProps} />
      <HelperTextProperty value={helperText} {...commonProps} />
      <OptionsProperty value={{ useCalcValues, options }} {...commonProps} />
      <CheckboxGroupDefaultValueProperty value={defaultValue} options={options} {...commonProps} />
      <OptionsLayoutProperty value={row} {...commonProps} />
      <HoverTextProperty value={title} {...commonProps} />
      <WidthProperty value={colSpan} {...commonProps} />
      <RequiredProperty value={required} {...commonProps} />
      <HiddenProperty value={hidden} {...commonProps} />
      <CompactnessProperty value={size} {...commonProps} />
    </List>
  );
};
