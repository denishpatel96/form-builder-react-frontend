import React from "react";
import { SwitchTypeProperty } from "../PropertyTypes/SwitchTypeProperty";

export const RequiredProperty = ({
  value,
  onUpdate,
}: {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <SwitchTypeProperty
      path="required"
      value={value}
      onUpdate={onUpdate}
      title="Required"
      helperText="Prevent submission if this field is empty"
    />
  );
};
