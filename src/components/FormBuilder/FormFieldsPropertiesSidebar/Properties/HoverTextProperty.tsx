import React from "react";
import { TextTypeProperty } from "../PropertyTypes/TextTypeProperty";

export const HoverTextProperty = ({
  value,
  onUpdate,
}: {
  value: string | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <TextTypeProperty
      value={value}
      onUpdate={onUpdate}
      path={"title"}
      title={"Hover Text"}
      multiline
    />
  );
};
