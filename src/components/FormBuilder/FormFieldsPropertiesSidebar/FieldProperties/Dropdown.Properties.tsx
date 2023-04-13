import React from "react";
import { List } from "@mui/material";
import { IDropdownProps } from "../../Types";
import {
  AutoWidthProperty,
  CompactnessProperty,
  DropdownDefaultValueProperty,
  HelperTextProperty,
  HiddenProperty,
  HoverTextProperty,
  LabelProperty,
  MultipleProperty,
  NativeProperty,
  OptionsProperty,
  RequiredProperty,
  VariantProperty,
  WidthProperty,
} from "../Properties";

export interface IDropdownPropertiesProps {
  field: IDropdownProps;
}

export const DropdownProperties = ({ field }: IDropdownPropertiesProps) => {
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
    autoWidth,
    multiple,
    native,
    variant,
  } = field;

  const defaultValue = multiple
    ? options.filter((op) => op.defaultChecked).map((op) => op.label) || []
    : options.find((op) => op.defaultChecked)?.label || "";

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} />
      <HelperTextProperty value={helperText} />
      <OptionsProperty value={{ options, useCalcValues }} />
      <DropdownDefaultValueProperty value={{ multiple, options, defaultValue }} />
      <HoverTextProperty value={title} />
      <WidthProperty value={colSpan} />
      <AutoWidthProperty value={autoWidth} />
      <RequiredProperty value={required} />
      <MultipleProperty value={multiple} />
      <NativeProperty value={native} />
      <HiddenProperty value={hidden} />
      <VariantProperty value={variant} />
      <CompactnessProperty value={size} />
    </List>
  );
};
