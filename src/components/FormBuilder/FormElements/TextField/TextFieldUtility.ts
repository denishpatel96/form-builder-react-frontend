import { ITextProps } from "./Text";

export const getTextProps: Function = (
  elementId: string | number,
  elementCount: number
): ITextProps => {
  return {
    fieldType: elementId,
    colSpan: 12,
    hidden: false,
    title: "",
    name: `input_text_${elementCount}`,
    label: `Question_${elementCount}`,
    required: false,
    helperText: "",
    id: `input_text_${elementCount}`,
    placeholder: "",
    multiline: false,
    minRows: 1,
    rows: 2,
    maxRows: 2,
    margin: "none", //'dense','none','normal',
    size: "medium", // 'medium','small',string
    type: "text", // 'text','url','email','search','password'
    variant: "outlined", // 'filled','outlined','standard'
    defaultValue: "",
    //Length Validation
    validateLength: false,
    minLength: 0,
    maxLength: 0,
    msgLength: "Please enter minimum or maximun length",
    // Pattern Validation
    validatePattern: false,
    pattern: "",
    msgPattern: "Please enter valid text",
  };
};

export const validateText = (field: ITextProps, value: string) => {
  let error = false;
  let errorMessage = null;
  const { validateLength, maxLength, minLength, msgLength, validatePattern, pattern, msgPattern } =
    field;
  if (value) {
    if (
      validateLength &&
      ((minLength && value.length < minLength) || (maxLength && value.length > maxLength))
    ) {
      error = true;
      errorMessage = msgLength;
    }
    const regEx = new RegExp(pattern);
    if (validatePattern && !regEx.test(value)) {
      error = true;
      errorMessage = msgPattern;
    }
  }

  return { error, errorMessage };
};
