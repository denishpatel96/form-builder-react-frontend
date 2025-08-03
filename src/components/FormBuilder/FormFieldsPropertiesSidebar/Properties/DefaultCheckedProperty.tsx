import React from "react";
import { SwitchTypeProperty } from "../PropertyTypes/SwitchTypeProperty";

export const DefaultCheckedProperty = ({
  value,
  onUpdate,
}: {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <SwitchTypeProperty
      path="defaultChecked"
      value={value}
      onUpdate={onUpdate}
      title="Default Checked"
      helperText="Make checkbox checked by default"
    />
  );
};
