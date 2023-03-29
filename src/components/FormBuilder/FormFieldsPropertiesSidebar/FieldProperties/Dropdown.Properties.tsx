import React from "react";
import { List } from "@mui/material";
import { IDropdownProps, IFieldPropertiesChangeFunc } from "../../Types";
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
  onPropsChange: IFieldPropertiesChangeFunc;
}

export const DropdownProperties = ({ field, onPropsChange }: IDropdownPropertiesProps) => {
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
      <LabelProperty value={label} onChange={onPropsChange} />
      <HelperTextProperty value={helperText} onChange={onPropsChange} />
      <OptionsProperty value={{ options, useCalcValues }} onChange={onPropsChange} />
      <DropdownDefaultValueProperty
        value={{ multiple, options, defaultValue }}
        onChange={onPropsChange}
      />
      <HoverTextProperty value={title} onChange={onPropsChange} />
      <WidthProperty value={colSpan} onChange={onPropsChange} />
      <AutoWidthProperty value={autoWidth} onChange={onPropsChange} />
      <RequiredProperty value={required} onChange={onPropsChange} />
      <MultipleProperty value={multiple} onChange={onPropsChange} />
      <NativeProperty value={native} onChange={onPropsChange} />
      <HiddenProperty value={hidden} onChange={onPropsChange} />
      <VariantProperty value={variant} onChange={onPropsChange} />
      <CompactnessProperty value={size} onChange={onPropsChange} />
    </List>
  );
};
