import { ITextProps } from "../..";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";

export const getTextProps: Function = (
  elementId: UniqueIdentifier,
  elementCount: number
): ITextProps => {
  return {
    fieldType: elementId,
    colSpan: 12,
    hidden: false,
    props: {
      title: "",
      name: `input_${elementCount}`,
      label: `Question_${elementCount}`,
      required: false,
      defaultValue: "",
      disabled: false,
      error: false,
      fullWidth: true,
      helperText: "",
      id: `input_${elementCount}`,
      placeholder: "",
      multiline: false,
      minRows: 1,
      rows: 2,
      maxRows: 2,
      margin: "none", //'dense','none','normal',
      size: "medium", // 'medium','small',string
      sx: {}, // additional CSS
      type: "text", // 'text','url','email','search','password'
      variant: "outlined", // 'filled','outlined','standard'
    },
    validations: {
      lengthValidation: {
        required: false,
        min: 0,
        max: 0,
        message: "Please enter minimum or maximun length",
      },
      patternValidation: {
        required: false,
        pattern: "",
        message: "Please enter valid text",
      },
    },
  };
};

export const handleTextPropsChange: Function = (
  selectedFormFieldIndex: number | null,
  setFormFields: React.Dispatch<React.SetStateAction<any[]>>
) => {
  return (
    propType: "general" | "default" | "lengthValidation" | "patternValidation",
    name: string,
    value: string | number | boolean | null
  ) => {
    setFormFields((prev) => {
      if (selectedFormFieldIndex === null) return prev;
      const updated = [...prev];
      if (propType === "default") {
        updated[selectedFormFieldIndex].props[name] = value;
      } else if (propType === "lengthValidation" || propType === "patternValidation") {
        updated[selectedFormFieldIndex].validations[propType][name] = value;
      } else {
        updated[selectedFormFieldIndex][name] = value;
      }
      return updated;
    });
  };
};
