import React from "react";
import {
  Title,
  RadioButtonChecked,
  CheckBox,
  ArrowDropDownCircleOutlined,
  FileUploadOutlined,
  InputOutlined,
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
  COMBOBOX = "ctrl_combobox",
  FILE_UPLOAD = "ctrl_fileupload",
}

export const FORM_ELEMENTS_LIST = [
  { id: FORM_ELEMENTS.TEXT, label: "Text", description: "Single / Multiline Text Input" },
  { id: FORM_ELEMENTS.RADIO, label: "Radio", description: "Single Choice" },
  {
    id: FORM_ELEMENTS.CHECKBOX,
    label: "Checkbox",
    description: "Multiple Choice",
  },
  { id: FORM_ELEMENTS.DROPDOWN, label: "Dropdown", description: "Single / Multiple Choice" },
  {
    id: FORM_ELEMENTS.COMBOBOX,
    label: "Combobox",
    description: "Searchable Single / Multiple Choice",
  },
  { id: FORM_ELEMENTS.FILE_UPLOAD, label: "File Upload" },
];
