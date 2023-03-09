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
  TEXT = "ctrl_text",
  RADIO = "ctrl_radio",
  CHECKBOX = "ctrl_checkbox",
  DROPDOWN = "ctrl_dropdown",
  FILE_UPLOAD = "ctrl_file_upload",
}

export const FORM_ELEMENTS_LIST = [
  { id: FORM_ELEMENTS.TEXT, label: "Text", icon: <Title /> },
  { id: FORM_ELEMENTS.RADIO, label: "Radio", icon: <RadioButtonChecked /> },
  { id: FORM_ELEMENTS.CHECKBOX, label: "Checkbox", icon: <CheckBox /> },
  { id: FORM_ELEMENTS.DROPDOWN, label: "Dropdown", icon: <ArrowDropDownCircleOutlined /> },
  { id: FORM_ELEMENTS.FILE_UPLOAD, label: "File Upload", icon: <FileUploadOutlined /> },
];
