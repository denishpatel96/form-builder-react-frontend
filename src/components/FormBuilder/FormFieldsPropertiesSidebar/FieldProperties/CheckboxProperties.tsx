import React from "react";
import { List } from "@mui/material";
import { ICheckboxProps } from "../../Types";
import {
  CompactnessProperty,
  DefaultCheckedProperty,
  HelperTextProperty,
  HiddenProperty,
  HoverTextProperty,
  LabelProperty,
  RequiredProperty,
  WidthProperty,
} from "../Properties";

export interface ICheckboxPropertiesProps {
  field: ICheckboxProps;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}

export const CheckboxProperties = ({ field, onUpdate }: ICheckboxPropertiesProps) => {
  const { colSpan, hidden, label, helperText, required, size, title, defaultChecked } = field;
  const commonProps = {
    onUpdate: onUpdate,
  };
  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} {...commonProps} />
      <HelperTextProperty value={helperText} {...commonProps} />
      <DefaultCheckedProperty value={defaultChecked} {...commonProps} />
      <HoverTextProperty value={title} {...commonProps} />
      <WidthProperty value={colSpan} {...commonProps} />
      <RequiredProperty value={required} {...commonProps} />
      <HiddenProperty value={hidden} {...commonProps} />
      <CompactnessProperty value={size} {...commonProps} />
    </List>
  );
};
