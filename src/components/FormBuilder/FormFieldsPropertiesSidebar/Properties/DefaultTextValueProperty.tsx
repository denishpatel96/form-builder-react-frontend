import React from "react";
import { TextTypeProperty } from "../PropertyTypes/TextTypeProperty";

type DefaultTextValuePropertyProps = {
  value: string | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const DefaultTextValueProperty = ({ value, onUpdate }: DefaultTextValuePropertyProps) => {
  return (
    <TextTypeProperty
      value={value}
      onUpdate={onUpdate}
      path={"defaultValue"}
      title={"Default Value"}
    />
  );
};
