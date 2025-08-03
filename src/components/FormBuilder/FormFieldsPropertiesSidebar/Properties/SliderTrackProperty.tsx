import React from "react";
import { ToggleTypeProperty } from "../PropertyTypes/ToggleTypeProperty";

export const SliderTrackProperty = ({
  value,
  onUpdate,
}: {
  value: "normal" | "inverted" | false | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  return (
    <ToggleTypeProperty
      value={value}
      onUpdate={onUpdate}
      path="track"
      title="Track"
      options={[
        { value: false, label: "Hidden" },
        { value: "normal", label: "Visible" },
        { value: "inverted", label: "Inverted" },
      ]}
    />
  );
};
