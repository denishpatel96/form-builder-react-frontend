import { List } from "@mui/material";
import React from "react";
import { ILongTextProps, IFieldPropertiesChangeFunc } from "../../Types";
import {
  CompactnessProperty,
  DefaultTextValueProperty,
  HelperTextProperty,
  HiddenProperty,
  HoverTextProperty,
  LabelProperty,
  LengthValidationProperty,
  MarginProperty,
  PlaceholderProperty,
  RequiredProperty,
  RowsCountProperty,
  VariantProperty,
} from "../Properties";
import { WidthProperty } from "../Properties/Width.Property";

export interface ILongTextPropertiesProps {
  field: ILongTextProps;
  onPropsChange: IFieldPropertiesChangeFunc;
}

export const LongTextProperties = ({ field, onPropsChange }: ILongTextPropertiesProps) => {
  const {
    colSpan,
    hidden,
    label,
    defaultValue,
    helperText,
    margin,
    maxRows,
    minRows,
    title,
    required,
    size,
    variant,
    maxLength,
    minLength,
    msgLength,
    placeholder,
    validateLength,
  } = field;

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} onChange={onPropsChange} />
      <PlaceholderProperty value={placeholder} onChange={onPropsChange} />
      <HelperTextProperty value={helperText} onChange={onPropsChange} />
      <DefaultTextValueProperty value={defaultValue} onChange={onPropsChange} />
      <RowsCountProperty value={{ minRows, maxRows }} onChange={onPropsChange} />
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
    </List>
  );
};
