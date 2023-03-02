import { ITextProps } from "../..";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";

export const getProps: Function = (
  elementId: UniqueIdentifier,
  elementCount: number
): ITextProps => {
  return {
    fieldType: elementId,
    hidden: false,
    props: {
      title: "",
      name: `input-${elementCount}`,
      label: "Question Label",
      required: false,
      defaultValue: "",
      disabled: false,
      error: false,
      fullWidth: true,
      helperText: "",
      id: `input-${elementCount}`,
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

export const handlePropsChange: Function = (
  selectedFormFieldIndex: number | null,
  setFormFields: React.Dispatch<React.SetStateAction<any[]>>
) => {
  // Field Change Methods
  return (name: string, value: string | number | boolean | null) => {
    setFormFields((prev) => {
      if (selectedFormFieldIndex === null) return prev;
      const updated = [...prev];
      updated[selectedFormFieldIndex].props[name] = value;
      return updated;
    });
  };
};

export const handleValidationsChange: Function = (
  selectedFormFieldIndex: number | null,
  setFormFields: React.Dispatch<React.SetStateAction<any[]>>
) => {
  // Field Change Methods
  return (validationType: string, name: string, value: string | number | boolean | null) => {
    setFormFields((prev) => {
      if (selectedFormFieldIndex === null) return prev;
      const updated = [...prev];
      updated[selectedFormFieldIndex].validations[validationType][name] = value;
      return updated;
    });
  };
};
