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
}

export const CheckboxProperties = ({ field }: ICheckboxPropertiesProps) => {
  const { colSpan, hidden, label, helperText, required, size, title, defaultChecked } = field;

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} />
      <HelperTextProperty value={helperText} />
      <DefaultCheckedProperty value={defaultChecked} />
      <HoverTextProperty value={title} />
      <WidthProperty value={colSpan} />
      <RequiredProperty value={required} />
      <HiddenProperty value={hidden} />
      <CompactnessProperty value={size} />
    </List>
  );
};
