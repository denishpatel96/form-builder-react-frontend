import React from "react";
import { SwitchTypeProperty } from "../PropertyTypes/SwitchTypeProperty";

export const HiddenProperty = ({
  value,
  onUpdate,
}: {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <SwitchTypeProperty
      path="hidden"
      value={value}
      onUpdate={onUpdate}
      title="Hidden"
      helperText="Hide element from the form"
    />
  );
};
