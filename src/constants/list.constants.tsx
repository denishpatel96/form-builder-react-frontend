import {
  ArrowDropDownCircleOutlined,
  CheckBoxOutlined,
  CommitOutlined,
  RadioButtonCheckedOutlined,
  TextFieldsOutlined,
  TitleOutlined,
} from "@mui/icons-material";
import React from "react";
import { CheckGroupIcon } from "../components/CustomIcons";

export enum FORM_ELEMENTS {
  SHORT_TEXT = "ctrl_short_text",
  LONG_TEXT = "ctrl_long_text",
  RADIO = "ctrl_radio",
  CHECKBOX = "ctrl_checkbox",
  CHECKBOX_GROUP = "ctrl_checkbox_group",
  DROPDOWN = "ctrl_dropdown",
  COMBOBOX = "ctrl_combobox",
  SLIDER = "ctrl_slider",
  SWITCH = "ctrl_switch",
  RATING = "ctrl_rating",
  FILE_UPLOAD = "ctrl_fileupload",
}

export enum ELEMENT_CATEGORIES {
  TEXT = "text",
  CHOICE = "choice",
  RATING = "rating",
}

const formElementIconProps = { sx: { height: 35, width: 35 } };
export const FORM_ELEMENTS_LIST: {
  id: string;
  label: string;
  description?: string;
  icon?: any;
  category: ELEMENT_CATEGORIES;
}[] = [
  {
    id: FORM_ELEMENTS.SHORT_TEXT,
    label: "Short Text",
    description: "Single line text input",
    icon: <TitleOutlined {...formElementIconProps} />,
    category: ELEMENT_CATEGORIES.TEXT,
  },
  {
    id: FORM_ELEMENTS.LONG_TEXT,
    label: "Long Text",
    description: "Multiple line text area input",
    icon: <TextFieldsOutlined {...formElementIconProps} />,
    category: ELEMENT_CATEGORIES.TEXT,
  },
  {
    id: FORM_ELEMENTS.CHECKBOX,
    label: "Checkbox",
    description: "Toggle state of a single item",
    icon: <CheckBoxOutlined {...formElementIconProps} />,
    category: ELEMENT_CATEGORIES.CHOICE,
  },
  {
    id: FORM_ELEMENTS.CHECKBOX_GROUP,
    label: "CheckGroup",
    description: "Select one or more items from a set",
    icon: <CheckGroupIcon {...formElementIconProps} />,
    category: ELEMENT_CATEGORIES.CHOICE,
  },
  {
    id: FORM_ELEMENTS.DROPDOWN,
    label: "Dropdown",
    description: "Select one or more option from a dropdown list",
    icon: <ArrowDropDownCircleOutlined {...formElementIconProps} />,
    category: ELEMENT_CATEGORIES.CHOICE,
  },
  {
    id: FORM_ELEMENTS.COMBOBOX,
    label: "Combobox",
    description: "Select one or more option from a searchable dropdown list",
    icon: <ArrowDropDownCircleOutlined {...formElementIconProps} />,
    category: ELEMENT_CATEGORIES.CHOICE,
  },
  {
    id: FORM_ELEMENTS.RADIO,
    label: "RadioGroup",
    description: "Select one option from a set",
    icon: <RadioButtonCheckedOutlined {...formElementIconProps} />,
    category: ELEMENT_CATEGORIES.CHOICE,
  },
  {
    id: FORM_ELEMENTS.SLIDER,
    label: "Slider",
    description: "Make selections from a range of values on slider",
    icon: <CommitOutlined {...formElementIconProps} />,
    category: ELEMENT_CATEGORIES.CHOICE,
  },
];
