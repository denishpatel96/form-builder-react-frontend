import { FORM_ELEMENTS } from "../../../constants";
import { ILongTextProps } from "../Types";

export const getLongTextProps: Function = (elementCount: number): ILongTextProps => {
  return {
    fieldType: FORM_ELEMENTS.LONG_TEXT,
    colSpan: 12,
    hidden: false,
    title: "",
    name: `q${elementCount}`,
    label: `Long Text label`,
    required: false,
    helperText: "",
    id: `q${elementCount}`,
    placeholder: "",
    minRows: 3,
    maxRows: undefined,
    margin: "none", //'dense','none','normal',
    size: "medium", // 'medium','small',string
    type: "text", // 'text','url','email','search','password'
    variant: "top", // 'filled','outlined','standard','top'
    defaultValue: "",
    //Length Validation
    validateLength: false,
    minLength: 0,
    maxLength: 0,
    msgLength: "Please enter minimum or maximun length",
  };
};
