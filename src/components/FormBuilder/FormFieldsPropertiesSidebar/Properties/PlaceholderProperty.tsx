import React from "react";
import { TextTypeProperty } from "../PropertyTypes/TextTypeProperty";

export const PlaceholderProperty = ({
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
      path={"placeholder"}
      title={"Placeholder"}
    />
  );
};
