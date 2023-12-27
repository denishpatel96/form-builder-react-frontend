import { FORM_ELEMENTS } from "../../../constants";
import { IFieldProps } from "../Types";
import { getCheckboxProps } from "./getCheckboxProps";
import { getCheckboxGroupProps } from "./getCheckboxGroupProps";
import { getComboboxProps } from "./getComboboxProps";
import { getDropdownProps } from "./getDropdownProps";
import { getLongTextProps } from "./getLongTextProps";
import { getRadioProps } from "./getRadioProps";
import { getShortTextProps } from "./getShortTextProps";
import { getSliderProps } from "./getSliderProps";
import { getHeadingProps } from "./getHeadingProps";
export * from "./getFormDesignProps";

export const getField = (elementType: string, elementCount: number): IFieldProps | null => {
  let fieldToAdd: IFieldProps | null = null;
  switch (elementType) {
    case FORM_ELEMENTS.HEADING:
      fieldToAdd = getHeadingProps(elementCount);
      break;
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
