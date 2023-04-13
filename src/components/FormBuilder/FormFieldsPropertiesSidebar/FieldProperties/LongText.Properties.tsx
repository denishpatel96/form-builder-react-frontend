import { List } from "@mui/material";
import React from "react";
import { ILongTextProps } from "../../Types";
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
}

export const LongTextProperties = ({ field }: ILongTextPropertiesProps) => {
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
      <LabelProperty value={label} />
      <PlaceholderProperty value={placeholder} />
      <HelperTextProperty value={helperText} />
      <DefaultTextValueProperty value={defaultValue} />
      <RowsCountProperty value={{ minRows, maxRows }} />
      <HoverTextProperty value={title} />
      <WidthProperty value={colSpan} />
      <RequiredProperty value={required} />
      <HiddenProperty value={hidden} />
      <VariantProperty value={variant} />
      <CompactnessProperty value={size} />
      <MarginProperty value={margin} />
      <LengthValidationProperty value={{ validateLength, minLength, maxLength, msgLength }} />
    </List>
  );
};
