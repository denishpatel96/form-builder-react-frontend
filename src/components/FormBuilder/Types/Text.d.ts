import { TextFieldProps } from "@mui/material";

export interface ITextProps {
  fieldType: string | number;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  id: string;
  name: string;
  defaultValue: TextFieldProps["defaultValue"];
  value?: TextFieldProps["value"];
  title: TextFieldProps["title"];
  label: TextFieldProps["label"];
  helperText: TextFieldProps["helperText"];
  placeholder: TextFieldProps["placeholder"];
  multiline: TextFieldProps["multiline"];
  minRows: TextFieldProps["minRows"];
  rows: TextFieldProps["rows"];
  maxRows: TextFieldProps["maxRows"];
  margin: TextFieldProps["margin"];
  size: TextFieldProps["size"];
  type: TextFieldProps["type"];
  variant: TextFieldProps["variant"];
  required: TextFieldProps["required"];
  // Length Validation
  validateLength: boolean;
  minLength: number;
  maxLength: number;
  msgLength: string;
  // Pattern Validation
  validatePattern: boolean;
  pattern: string;
  msgPattern: string;
}
