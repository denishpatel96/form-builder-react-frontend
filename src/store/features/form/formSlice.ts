import { arrayMove } from "@dnd-kit/sortable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { FieldProps } from "../../../components/FormBuilder/Types";
import {
  getCheckboxGroupProps,
  getCheckboxProps,
  getComboboxProps,
  getDropdownProps,
  getField,
  getLongTextProps,
  getRadioProps,
  getShortTextProps,
  getSliderProps,
} from "../../../components/FormBuilder/Utility";
import { FORM_ELEMENTS } from "../../../constants";

interface FormState {
  count: number;
  selectedFieldId: string;
  fields: FieldProps[];
}

const initialState: FormState = {
  count: 9,
  selectedFieldId: "",
  fields: [
    getShortTextProps(1),
    getLongTextProps(2),
    getRadioProps(3),
    getCheckboxProps(4),
    getCheckboxGroupProps(5),
    getDropdownProps(6),
    getComboboxProps(7),
    getSliderProps(8),
  ],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // added element count (including deleted ones)
    incrementCount: (state) => {
      state.count++;
    },

    // select field
    selectField: (state, action: PayloadAction<{ fieldId: string }>) => {
      state.selectedFieldId = action.payload.fieldId;
    },

    // add field
    addField: (state, action: PayloadAction<{ elementType: string; addAfter?: string }>) => {
      const fieldToAdd = getField(action.payload.elementType, state.count);

      if (fieldToAdd) {
        const fieldId = fieldToAdd.id;

        if (action.payload.addAfter) {
          state.fields.splice(
            state.fields.findIndex((i) => i.id === action.payload.addAfter) + 1,
            0,
            fieldToAdd
          );
        } else {
          state.fields.push(fieldToAdd as FieldProps);
        }

        state.count++;
        state.selectedFieldId = fieldId;
      }
    },

    // remove field
    removeField: (state, action: PayloadAction<{ fieldId: string }>) => {
      state.fields = state.fields.filter((f) => f.id !== action.payload.fieldId);
    },

    // when field is dragged over another field and dropped
    // then move dragged field before that (over) field
    moveField: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const oldIndex = state.fields.findIndex((el) => el.id === action.payload.activeId);
      const newIndex = state.fields.findIndex((el) => el.id === action.payload.overId);
      const element = state.fields.splice(oldIndex, 1);
      state.fields.splice(newIndex, 0, element[0]);

      state.selectedFieldId = action.payload.activeId;
    },

    // edit properties of selected field
    changeFieldProp: (state, action: PayloadAction<{ path: string; value: any }>) => {
      if (state.selectedFieldId !== null) {
        const index = state.fields.findIndex((f) => f.id === state.selectedFieldId);
        _.set(state.fields[index], action.payload.path, action.payload.value);
      }
    },
  },
});

export const { incrementCount, selectField, addField, removeField, moveField, changeFieldProp } =
  formSlice.actions;
export default formSlice.reducer;
