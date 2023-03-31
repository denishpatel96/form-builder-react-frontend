import { List } from "@mui/material";
import React from "react";
import { IShortTextProps, IFieldPropertiesChangeFunc } from "../../Types";
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
  onPropsChange: IFieldPropertiesChangeFunc;
}

export const ShortTextProperties = ({ field, onPropsChange }: IShortTextPropertiesProps) => {
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
      <LabelProperty value={label} onChange={onPropsChange} />
      <PlaceholderProperty value={placeholder} onChange={onPropsChange} />
      <HelperTextProperty value={helperText} onChange={onPropsChange} />
      <DefaultTextValueProperty value={defaultValue} onChange={onPropsChange} />
      <HoverTextProperty value={title} onChange={onPropsChange} />
      <WidthProperty value={colSpan} onChange={onPropsChange} />
      <RequiredProperty value={required} onChange={onPropsChange} />
      <HiddenProperty value={hidden} onChange={onPropsChange} />
      <VariantProperty value={variant} onChange={onPropsChange} />
      <CompactnessProperty value={size} onChange={onPropsChange} />
      <MarginProperty value={margin} onChange={onPropsChange} />
      <LengthValidationProperty
        value={{ validateLength, minLength, maxLength, msgLength }}
        onChange={onPropsChange}
      />
      <PatternValidationProperty
        value={{ validatePattern, pattern, msgPattern }}
        onChange={onPropsChange}
      />
    </List>
  );
};
