export * from "./Checkbox.Builder";
export * from "./CheckboxGroup.Builder";
export * from "./Radio.Builder";
export * from "./ShortText.Builder";
export * from "./LongText.Builder";
export * from "./Dropdown.Builder";
export * from "./Combobox.Builder";
export * from "./Slider.Builder";

import {
  RadioFieldBuilder,
  CheckboxFieldBuilder,
  DropdownFieldBuilder,
  ComboboxFieldBuilder,
  SliderFieldBuilder,
  CheckboxGroupFieldBuilder,
  LongTextFieldBuilder,
  ShortTextFieldBuilder,
} from "./";
import {
  IShortTextProps,
  IRadioProps,
  FieldProps,
  ICheckboxProps,
  IDropdownProps,
  IComboboxProps,
  ISliderProps,
  ICheckboxGroupProps,
  ILongTextProps,
} from "../../Types";
import { FORM_ELEMENTS } from "../../../../constants";
import React from "react";

export const getFieldBuilder = (field?: FieldProps) => {
  if (!field) return <></>;
  const { fieldType } = field;
  return (
    <>
      {fieldType === FORM_ELEMENTS.SHORT_TEXT && (
        <ShortTextFieldBuilder field={field as IShortTextProps} />
      )}
      {fieldType === FORM_ELEMENTS.LONG_TEXT && (
        <LongTextFieldBuilder field={field as ILongTextProps} />
      )}
      {fieldType === FORM_ELEMENTS.RADIO && <RadioFieldBuilder field={field as IRadioProps} />}
      {fieldType === FORM_ELEMENTS.DROPDOWN && (
        <DropdownFieldBuilder field={field as IDropdownProps} />
      )}
      {fieldType === FORM_ELEMENTS.CHECKBOX && (
        <CheckboxFieldBuilder field={field as ICheckboxProps} />
      )}
      {fieldType === FORM_ELEMENTS.CHECKBOX_GROUP && (
        <CheckboxGroupFieldBuilder field={field as ICheckboxGroupProps} />
      )}
      {fieldType === FORM_ELEMENTS.COMBOBOX && (
        <ComboboxFieldBuilder field={field as IComboboxProps} />
      )}
      {fieldType === FORM_ELEMENTS.SLIDER && <SliderFieldBuilder field={field as ISliderProps} />}
    </>
  );
};
