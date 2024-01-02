import React from "react";
import { ToggleTypeProperty } from "../PropertyTypes/ToggleTypeProperty";

export const MarginProperty = ({
  value,
  onUpdate,
}: {
  value: string | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <ToggleTypeProperty
      value={value}
      onUpdate={onUpdate}
      path="margin"
      title="Margin"
      helperText="Change the vertical spacing."
      options={[
        { value: "none", label: "None" },
        { value: "dense", label: "Dense" },
        { value: "normal", label: "Normal" },
      ]}
    />
  );
};
