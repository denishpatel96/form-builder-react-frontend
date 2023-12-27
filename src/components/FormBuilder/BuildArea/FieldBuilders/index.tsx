export * from "./CheckboxBuilder";
export * from "./CheckboxGroupBuilder";
export * from "./RadioBuilder";
export * from "./ShortTextBuilder";
export * from "./LongTextBuilder";
export * from "./DropdownBuilder";
export * from "./ComboboxBuilder";
export * from "./SliderBuilder";

import {
  RadioBuilder,
  CheckboxBuilder,
  DropdownBuilder,
  ComboboxBuilder,
  SliderBuilder,
  CheckboxGroupBuilder,
  LongTextBuilder,
  ShortTextBuilder,
} from "./";
import {
  IShortTextProps,
  IRadioProps,
  IFieldProps,
  ICheckboxProps,
  IDropdownProps,
  IComboboxProps,
  ISliderProps,
  ICheckboxGroupProps,
  ILongTextProps,
  IHeadingProps,
} from "../../Types";
import { FORM_ELEMENTS } from "../../../../constants";
import React from "react";
import { HeadingBuilder } from "./HeadingBuilder";

export const getBuilder = (field?: IFieldProps) => {
  if (!field) return <></>;
  const { fieldType } = field;
  return (
    <>
      {fieldType === FORM_ELEMENTS.HEADING && <HeadingBuilder field={field as IHeadingProps} />}
      {fieldType === FORM_ELEMENTS.SHORT_TEXT && (
        <ShortTextBuilder field={field as IShortTextProps} />
      )}
      {fieldType === FORM_ELEMENTS.LONG_TEXT && <LongTextBuilder field={field as ILongTextProps} />}
      {fieldType === FORM_ELEMENTS.RADIO && <RadioBuilder field={field as IRadioProps} />}
      {fieldType === FORM_ELEMENTS.DROPDOWN && <DropdownBuilder field={field as IDropdownProps} />}
      {fieldType === FORM_ELEMENTS.CHECKBOX && <CheckboxBuilder field={field as ICheckboxProps} />}
      {fieldType === FORM_ELEMENTS.CHECKBOX_GROUP && (
        <CheckboxGroupBuilder field={field as ICheckboxGroupProps} />
      )}
      {fieldType === FORM_ELEMENTS.COMBOBOX && <ComboboxBuilder field={field as IComboboxProps} />}
      {fieldType === FORM_ELEMENTS.SLIDER && <SliderBuilder field={field as ISliderProps} />}
    </>
  );
};
