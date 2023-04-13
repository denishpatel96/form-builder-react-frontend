import { FORM_ELEMENTS } from "../../../constants";
import { FieldProps } from "../Types";
import { getCheckboxProps } from "./Checkbox.Utility";
import { getCheckboxGroupProps } from "./CheckboxGroup.Utility";
import { getComboboxProps } from "./Combobox.Utility";
import { getDropdownProps } from "./Dropdown.Utility";
import { getLongTextProps } from "./LongText.Utility";
import { getRadioProps } from "./Radio.Utility";
import { getShortTextProps } from "./ShortText.Utility";
import { getSliderProps } from "./Slider.Utility";

export * from "./Checkbox.Utility";
export * from "./CheckboxGroup.Utility";
export * from "./Radio.Utility";
export * from "./ShortText.Utility";
export * from "./LongText.Utility";
export * from "./Dropdown.Utility";
export * from "./Combobox.Utility";
export * from "./Slider.Utility";
export * from "./FormDesign.Utility";

export const getField = (elementType: string, elementCount: number): FieldProps | null => {
  let fieldToAdd: FieldProps | null = null;
  switch (elementType) {
    case FORM_ELEMENTS.SHORT_TEXT:
      fieldToAdd = getShortTextProps(elementCount);
      break;
    case FORM_ELEMENTS.LONG_TEXT:
      fieldToAdd = getLongTextProps(elementCount);
      break;
    case FORM_ELEMENTS.RADIO:
      fieldToAdd = getRadioProps(elementCount);
      break;
    case FORM_ELEMENTS.CHECKBOX:
      fieldToAdd = getCheckboxProps(elementCount);
      break;
    case FORM_ELEMENTS.CHECKBOX_GROUP:
      fieldToAdd = getCheckboxGroupProps(elementCount);
      break;
    case FORM_ELEMENTS.DROPDOWN:
      fieldToAdd = getDropdownProps(elementCount);
      break;
    case FORM_ELEMENTS.COMBOBOX:
      fieldToAdd = getComboboxProps(elementCount);
      break;
    case FORM_ELEMENTS.SLIDER:
      fieldToAdd = getSliderProps(elementCount);
      break;
  }
  return fieldToAdd;
};
