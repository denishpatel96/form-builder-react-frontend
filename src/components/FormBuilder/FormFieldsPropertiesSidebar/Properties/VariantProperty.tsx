import React from "react";
import { ToggleTypeProperty } from "../PropertyTypes/ToggleTypeProperty";

export const VariantProperty = ({
  value,
  onUpdate,
}: {
  value: "filled" | "standard" | "outlined" | "top";
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <ToggleTypeProperty
      value={value}
      onUpdate={onUpdate}
      path="variant"
      title="Variant"
      helperText="Change the style of text input."
      options={[
        { value: "top", label: "Top" },
        { value: "standard", label: "Standard" },
        { value: "outlined", label: "Outlined" },
        { value: "filled", label: "Filled" },
      ]}
    />
  );
};
