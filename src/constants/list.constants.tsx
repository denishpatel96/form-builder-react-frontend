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
  SLIDER = "ctrl_slider",
  SWITCH = "ctrl_switch",
  RATING = "ctrl_rating",
  FILE_UPLOAD = "ctrl_fileupload",
}

export const FORM_ELEMENTS_LIST: { id: string; label: string; description?: string }[] = [
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
  { id: FORM_ELEMENTS.SLIDER, label: "Slider" },
  { id: FORM_ELEMENTS.FILE_UPLOAD, label: "File Upload" },
];
