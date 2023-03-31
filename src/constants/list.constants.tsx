export enum THEME {
  DARK = "dark",
  LIGHT = "light",
}

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

export const FORM_ELEMENTS_LIST: { id: string; label: string; description?: string }[] = [
  { id: FORM_ELEMENTS.SHORT_TEXT, label: "Short Text", description: "Single line text input" },
  { id: FORM_ELEMENTS.LONG_TEXT, label: "Long Text", description: "Multiple line text area input" },
  {
    id: FORM_ELEMENTS.RADIO,
    label: "Radio Group",
    description: "Select one option from a set",
  },
  {
    id: FORM_ELEMENTS.CHECKBOX,
    label: "Checkbox",
    description: "Toggle state of a single item",
  },
  {
    id: FORM_ELEMENTS.CHECKBOX_GROUP,
    label: "Checkbox Group",
    description: "Select one or more items from a set",
  },
  {
    id: FORM_ELEMENTS.DROPDOWN,
    label: "Dropdown",
    description: "Select one or more option from a dropdown list",
  },
  {
    id: FORM_ELEMENTS.COMBOBOX,
    label: "Combobox",
    description: "Select one or more option from a searchable dropdown list",
  },
  {
    id: FORM_ELEMENTS.SLIDER,
    label: "Slider",
    description: "Make selections from a range of values on slider",
  },
  { id: FORM_ELEMENTS.FILE_UPLOAD, label: "File Upload" },
];
