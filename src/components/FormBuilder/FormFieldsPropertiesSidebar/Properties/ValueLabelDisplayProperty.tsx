import React from "react";
import { ToggleTypeProperty } from "../PropertyTypes/ToggleTypeProperty";

export const ValueLabelDisplayProperty = ({
  value,
  onUpdate,
}: {
  value: "auto" | "on" | "off" | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <ToggleTypeProperty
      value={value}
      onUpdate={onUpdate}
      path="valueLabelDisplay"
      title="Value Label Display"
      options={[
        { value: "off", label: "Off" },
        { value: "auto", label: "Auto" },
        { value: "on", label: "On" },
      ]}
    />
  );
};
