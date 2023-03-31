import { TextFieldProps } from "@mui/material";

export interface IShortTextProps {
  fieldType: string | number;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  id: string;
  name: string;
  defaultValue: string;
  value?: string;
  title?: string;
  label: string;
  helperText?: string;
  placeholder?: string;
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
