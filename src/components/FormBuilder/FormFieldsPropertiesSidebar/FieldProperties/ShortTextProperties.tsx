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
import { WidthProperty } from "../Properties/WidthProperty";

export interface IShortTextPropertiesProps {
  field: IShortTextProps;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}

export const ShortTextProperties = ({ field, onUpdate }: IShortTextPropertiesProps) => {
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

  const commonProps = {
    onUpdate: onUpdate,
  };

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} {...commonProps} />
      <PlaceholderProperty value={placeholder} {...commonProps} />
      <HelperTextProperty value={helperText} {...commonProps} />
      <DefaultTextValueProperty value={defaultValue} {...commonProps} />
      <HoverTextProperty value={title} {...commonProps} />
      <WidthProperty value={colSpan} {...commonProps} />
      <RequiredProperty value={required} {...commonProps} />
      <HiddenProperty value={hidden} {...commonProps} />
      <VariantProperty value={variant} {...commonProps} />
      <CompactnessProperty value={size} {...commonProps} />
      <MarginProperty value={margin} {...commonProps} />
      <LengthValidationProperty
        value={{ validateLength, minLength, maxLength, msgLength }}
        {...commonProps}
      />
      <PatternValidationProperty
        value={{ validatePattern, pattern, msgPattern }}
        {...commonProps}
      />
    </List>
  );
};
