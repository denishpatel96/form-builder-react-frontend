import { FORM_ELEMENTS } from "../../../constants";
import { IShortTextProps } from "../Types";

export const getShortTextProps: Function = (elementCount: number): IShortTextProps => {
  return {
    fieldType: FORM_ELEMENTS.SHORT_TEXT,
    colSpan: 12,
    hidden: false,
    title: "",
    name: `q${elementCount}`,
    label: `Short Text label`,
    required: false,
    helperText: "",
    id: `q${elementCount}`,
    placeholder: "",
    margin: "none", //'dense','none','normal',
    size: "medium", // 'medium','small',string
    type: "text", // 'text','url','email','search','password'
    variant: "outlined", // 'filled','outlined','standard'
    defaultValue: "",
    //Length Validation
    validateLength: false,
    minLength: 0,
    maxLength: 0,
    msgLength: "Please enter minimum or maximum length",
    // Pattern Validation
    validatePattern: false,
    pattern: "",
    msgPattern: "Please enter valid text",
  };
};
