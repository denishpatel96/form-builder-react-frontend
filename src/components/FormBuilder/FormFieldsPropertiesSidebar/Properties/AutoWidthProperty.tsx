import React from "react";
import { SwitchTypeProperty } from "../PropertyTypes/SwitchTypeProperty";

export const AutoWidthProperty = ({
  value,
  onUpdate,
}: {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <SwitchTypeProperty
      path="autoWidth"
      value={value}
      onUpdate={onUpdate}
      title="Auto Width"
      helperText="Adjust dropdown width automatically"
    />
  );
};
