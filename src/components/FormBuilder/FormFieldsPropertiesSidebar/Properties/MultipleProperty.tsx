import React from "react";
import { SwitchTypeProperty } from "../PropertyTypes/SwitchTypeProperty";

export const MultipleProperty = ({
  value,
  onUpdate,
}: {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <SwitchTypeProperty
      path="multiple"
      value={value}
      onUpdate={onUpdate}
      title="Multiple Selections"
      helperText="Allow multiple selection"
    />
  );
};
