import React from "react";
import {
  Title,
  RadioButtonChecked,
  CheckBox,
  ArrowDropDownCircleOutlined,
  FileUploadOutlined,
} from "@mui/icons-material";

export enum THEME {
  DARK = "dark",
  LIGHT = "light",
}

export enum FORM_ELEMENTS {
  TEXT = "text",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  DROPDOWN = "dropdown",
  FILE_UPLOAD = "file-upload",
}

export const FORM_ELEMENTS_LIST = [
  { id: "text", label: "Text", icon: <Title /> },
  { id: "radio", label: "Radio", icon: <RadioButtonChecked /> },
  { id: "checkbox", label: "Checkbox", icon: <CheckBox /> },
  { id: "dropdown", label: "Dropdown", icon: <ArrowDropDownCircleOutlined /> },
  { id: "file-upload", label: "File Upload", icon: <FileUploadOutlined /> },
];
