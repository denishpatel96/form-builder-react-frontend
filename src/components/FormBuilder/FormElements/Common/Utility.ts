import _ from "lodash";
import { FieldProps } from "./Types";

export const handlePropsChange: Function = (
  selectedFieldId: string,
  setFormFields: React.Dispatch<React.SetStateAction<FieldProps[]>>
) => {
  return (path: string, value: string | number | boolean | null) => {
    setFormFields((prev) => {
      if (selectedFieldId === null) return prev;
      const updated = [...prev];
      const index = updated.findIndex((f) => f.id === selectedFieldId);
      _.set(updated[index], path, value);
      return updated;
    });
  };
};
