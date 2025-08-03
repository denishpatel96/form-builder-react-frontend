import { List } from "@mui/material";
import React from "react";
import { IHeadingProps } from "../../Types";
import {
  HeadingProperty,
  HeadingSizeProperty,
  HiddenProperty,
  SubheaderProperty,
} from "../Properties";
import { WidthProperty } from "../Properties/WidthProperty";

export const HeadingProperties = ({
  field,
  onUpdate,
}: {
  field: IHeadingProps;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  const { colSpan, size, hidden, label, subheader } = field;

  const commonProps = {
    onUpdate: onUpdate,
  };

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <HeadingProperty value={label} {...commonProps} />
      <HeadingSizeProperty value={size} {...commonProps} />
      <SubheaderProperty value={subheader} {...commonProps} />
      <WidthProperty value={colSpan} {...commonProps} />
      <HiddenProperty value={hidden} {...commonProps} />
    </List>
  );
};
