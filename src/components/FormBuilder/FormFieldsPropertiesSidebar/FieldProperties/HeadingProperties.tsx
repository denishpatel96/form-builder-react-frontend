import { List } from "@mui/material";
import React from "react";
import { IHeadingProps } from "../../Types";
import { HiddenProperty, LabelProperty } from "../Properties";
import { WidthProperty } from "../Properties/WidthProperty";

export const HeadingProperties = ({
  field,
  onUpdate,
}: {
  field: IHeadingProps;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  const { colSpan, hidden, label } = field;

  const commonProps = {
    onUpdate: onUpdate,
  };

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} {...commonProps} />
      <WidthProperty value={colSpan} {...commonProps} />
      <HiddenProperty value={hidden} {...commonProps} />
    </List>
  );
};
