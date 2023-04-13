import { List } from "@mui/material";
import React from "react";
import { IShortTextProps } from "../../Types";
import {
  CompactnessProperty,
  DefaultTextValueProperty,
  HelperTextProperty,
  HiddenProperty,
  HoverTextProperty,
  LabelProperty,
  LengthValidationProperty,
  MarginProperty,
  PatternValidationProperty,
  PlaceholderProperty,
  RequiredProperty,
  VariantProperty,
} from "../Properties";
import { WidthProperty } from "../Properties/Width.Property";

export interface IShortTextPropertiesProps {
  field: IShortTextProps;
}

export const ShortTextProperties = ({ field }: IShortTextPropertiesProps) => {
  const {
    colSpan,
    hidden,
    label,
    defaultValue,
    helperText,
    margin,
    title,
    required,
    size,
    variant,
    maxLength,
    minLength,
    msgLength,
    msgPattern,
    pattern,
    placeholder,
    validateLength,
    validatePattern,
  } = field;

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} />
      <PlaceholderProperty value={placeholder} />
      <HelperTextProperty value={helperText} />
      <DefaultTextValueProperty value={defaultValue} />
      <HoverTextProperty value={title} />
      <WidthProperty value={colSpan} />
      <RequiredProperty value={required} />
      <HiddenProperty value={hidden} />
      <VariantProperty value={variant} />
      <CompactnessProperty value={size} />
      <MarginProperty value={margin} />
      <LengthValidationProperty value={{ validateLength, minLength, maxLength, msgLength }} />
      <PatternValidationProperty value={{ validatePattern, pattern, msgPattern }} />
    </List>
  );
};
