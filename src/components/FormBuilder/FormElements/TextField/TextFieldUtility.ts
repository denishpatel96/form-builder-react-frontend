import { ITextProps } from "../..";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";

export const getTextFieldProps: Function = (
  elementId: UniqueIdentifier,
  elementCount: number
): ITextProps => {
  return {
    fieldType: elementId,
    fieldProps: {
      name: `input-${elementCount}`,
      label: "Question Label",
      required: false,
      defaultValue: "",
      disabled: false,
      error: false,
      fullWidth: true,
      helperText: "",
      id: `input-${elementCount}`,
      placeholder: "Example answer here",
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
  };
};

export const getTextFieldChangeProps: Function = (
  selectedFormFieldIndex: number | null,
  setFormFields: React.Dispatch<React.SetStateAction<any[]>>
) => {
  // Field Change Methods
  const handleChange = (name: string, value: string | number | boolean | null) => {
    setFormFields((prev) => {
      if (selectedFormFieldIndex === null) return prev;
      const updated = [...prev];
      updated[selectedFormFieldIndex].fieldProps[name] = value;
      return updated;
    });
  };

  return handleChange;
};
