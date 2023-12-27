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
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}

export const DropdownProperties = ({ field, onUpdate }: IDropdownPropertiesProps) => {
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

  const commonProps = {
    onUpdate: onUpdate,
  };

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} {...commonProps} />
      <HelperTextProperty value={helperText} {...commonProps} />
      <OptionsProperty value={{ options, useCalcValues }} {...commonProps} />
      <DropdownDefaultValueProperty value={{ multiple, options, defaultValue }} {...commonProps} />
      <HoverTextProperty value={title} {...commonProps} />
      <WidthProperty value={colSpan} {...commonProps} />
      <AutoWidthProperty value={autoWidth} {...commonProps} />
      <RequiredProperty value={required} {...commonProps} />
      <MultipleProperty value={multiple} {...commonProps} />
      <NativeProperty value={native} {...commonProps} />
      <HiddenProperty value={hidden} {...commonProps} />
      <VariantProperty value={variant} {...commonProps} />
      <CompactnessProperty value={size} {...commonProps} />
    </List>
  );
};
