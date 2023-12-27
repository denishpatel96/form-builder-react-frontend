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
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}

export const ComboboxProperties = ({ field, onUpdate }: IComboboxPropertiesProps) => {
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

  const commonProps = {
    onUpdate: onUpdate,
  };

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} {...commonProps} />
      <HelperTextProperty value={helperText} {...commonProps} />
      <OptionsProperty value={{ useCalcValues, options }} {...commonProps} />
      <DropdownDefaultValueProperty value={{ multiple, options, defaultValue }} {...commonProps} />
      <HoverTextProperty value={title} {...commonProps} />
      <WidthProperty value={colSpan} {...commonProps} />
      <RequiredProperty value={required} {...commonProps} />
      <MultipleProperty value={multiple} {...commonProps} />
      <HiddenProperty value={hidden} {...commonProps} />
      <VariantProperty value={variant} {...commonProps} />
      <CompactnessProperty value={size} {...commonProps} />
    </List>
  );
};
