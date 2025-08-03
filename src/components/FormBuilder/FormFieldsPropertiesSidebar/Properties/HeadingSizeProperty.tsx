import React from "react";
import { ToggleTypeProperty } from "../PropertyTypes/ToggleTypeProperty";

export const HeadingSizeProperty = ({
  value,
  onUpdate,
}: {
  value: "small" | "default" | "large" | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <ToggleTypeProperty
      value={value}
      onUpdate={onUpdate}
      path="size"
      title="Heading Font Size"
      options={[
        { value: "small", label: "Small" },
        { value: "default", label: "Default" },
        { value: "large", label: "Large" },
      ]}
    />
  );
};
