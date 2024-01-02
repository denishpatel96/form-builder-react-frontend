import React from "react";
import { SwitchTypeProperty } from "../PropertyTypes/SwitchTypeProperty";

export const OptionsLayoutProperty = ({
  value,
  onUpdate,
}: {
  value: boolean | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <SwitchTypeProperty
      path="row"
      value={value}
      onUpdate={onUpdate}
      title="Horizontal Layout"
      helperText="Lay out the options horizontally."
    />
  );
};
