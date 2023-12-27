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
import { WidthProperty } from "../Properties/WidthProperty";

export interface ILongTextPropertiesProps {
  field: ILongTextProps;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}

export const LongTextProperties = ({ field, onUpdate }: ILongTextPropertiesProps) => {
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

  const commonProps = {
    onUpdate: onUpdate,
  };

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} {...commonProps} />
      <PlaceholderProperty value={placeholder} {...commonProps} />
      <HelperTextProperty value={helperText} {...commonProps} />
      <DefaultTextValueProperty value={defaultValue} {...commonProps} />
      <RowsCountProperty value={{ minRows, maxRows }} {...commonProps} />
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
    </List>
  );
};
