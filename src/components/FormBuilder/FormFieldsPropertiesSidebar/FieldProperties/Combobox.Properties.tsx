import React from "react";
import { List } from "@mui/material";
import { IComboboxProps } from "../../Types";
import {
  CompactnessProperty,
  DropdownDefaultValueProperty,
  HelperTextProperty,
  HiddenProperty,
  HoverTextProperty,
  LabelProperty,
  MultipleProperty,
  OptionsProperty,
  RequiredProperty,
  VariantProperty,
  WidthProperty,
} from "../Properties";

export interface IComboboxPropertiesProps {
  field: IComboboxProps;
}

export const ComboboxProperties = ({ field }: IComboboxPropertiesProps) => {
  const {
    colSpan,
    hidden,
    label,
    helperText,
    required,
    options,
    size,
    title,
    useCalcValues,
    multiple,
    variant,
  } = field;

  const defaultValue = multiple
    ? options.filter((op) => op.defaultChecked).map((op) => op.label) || []
    : options.find((op) => op.defaultChecked)?.label || "";

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} />
      <HelperTextProperty value={helperText} />
      <OptionsProperty value={{ useCalcValues, options }} />
      <DropdownDefaultValueProperty value={{ multiple, options, defaultValue }} />
      <HoverTextProperty value={title} />
      <WidthProperty value={colSpan} />
      <RequiredProperty value={required} />
      <MultipleProperty value={multiple} />
      <HiddenProperty value={hidden} />
      <VariantProperty value={variant} />
      <CompactnessProperty value={size} />
    </List>
  );
};
