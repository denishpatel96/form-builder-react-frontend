import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set, cloneDeep } from "lodash";
import { FieldProps } from "../../components/FormBuilder/Types";
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
} from "../../components/FormBuilder/Utility";
import { REQUEST_STATUS } from "../../constants";

interface FormState {
  count: number;
  selected: string[];
  fields: FieldProps[];
  reqStatus: REQUEST_STATUS;
  reqError?: string;
}

const initialState: FormState = {
  count: 8,
  selected: [],
  fields: [],
  reqStatus: REQUEST_STATUS.IDLE,
};

export const fetchFields = createAsyncThunk("form/fetchFields", async () => {
  // const response = await client.get('/fakeApi/posts')
  return [
    getShortTextProps(1),
    getLongTextProps(2),
    getRadioProps(3),
    getCheckboxProps(4),
    getCheckboxGroupProps(5),
    getDropdownProps(6),
    getComboboxProps(7),
    getSliderProps(8),
  ];
});

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
      state.selected = [action.payload.fieldId];
    },

    // select all fields
    selectAll: (state) => {
      state.selected = state.fields.map((f) => f.id);
    },

    // multi de/select field
    // this handles the case of selection with ctrl and selection with shift keys
    toggleSelection: (state, action: PayloadAction<{ fieldId: string; contigous?: boolean }>) => {
      if (action.payload.contigous) {
        // shift key is pressed
        // shift key let user select all the fields between last selction and current selection
        state.selected.push(action.payload.fieldId);
        const selectedIndices = state.selected.map((id) =>
          state.fields.findIndex((f) => f.id === id)
        );
        const startIndex = Math.min(...selectedIndices);
        const endIndex = Math.max(...selectedIndices);
        state.selected = [];
        state.fields.forEach((f, index) => {
          if (index >= startIndex && index <= endIndex) {
            state.selected.push(f.id);
          }
        });
      } else {
        // ctrl key is pressed
        // ctrl key let user select/deselect field one by one
        if (state.selected.includes(action.payload.fieldId)) {
          state.selected = state.selected.filter((id) => id !== action.payload.fieldId);
        } else {
          state.selected.push(action.payload.fieldId);
        }
      }
    },

    // deselect all fields
    deselectFields: (state) => {
      state.selected = [];
    },

    // duplicate field/s
    duplicateFields: (
      state,
      action: PayloadAction<
        | {
            fieldIds?: string[];
            placement?: "top" | "bottom" | "after";
            afterElementId?: string;
          }
        | undefined
      >
    ) => {
      const { fieldIds, placement, afterElementId } = action?.payload || {};

      const fieldIdsToClone: string[] = fieldIds || state.selected;

      const cloneFields: FieldProps[] = [];
      const placementIndex: number =
        placement === "top"
          ? 0
          : placement === "bottom"
          ? state.fields.length
          : state.fields.findIndex((f) => f.id === (afterElementId || fieldIdsToClone[0])) + 1;
      fieldIdsToClone.forEach((id) => {
        const indexOfFieldToCopy = state.fields.findIndex((f) => f.id === id);
        if (indexOfFieldToCopy !== -1) {
          const cloneField = cloneDeep(state.fields[indexOfFieldToCopy]);
          cloneField.id = cloneField.name = `q${state.count + 1}`;
          cloneFields.push(cloneField);
          state.count++;
        }
      });

      state.selected = cloneFields.map((f) => f.id);
      state.fields.splice(placementIndex, 0, ...cloneFields);
    },

    // add field
    addField: (state, action: PayloadAction<{ elementType: string; addAfter?: string }>) => {
      const fieldToAdd = getField(action.payload.elementType, state.count + 1);

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
        state.selected = [fieldId];
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

      state.selected = [action.payload.activeId];
    },

    // edit properties of selected field
    changeFieldProp: (state, action: PayloadAction<{ path: string; value: any }>) => {
      if (state.selected.length === 1) {
        const index = state.fields.findIndex((f) => f.id === state.selected[0]);
        set(state.fields[index], action.payload.path, action.payload.value);
      }
    },

    // reset
    resetFormState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFields.pending, (state) => {
        state.reqStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(fetchFields.fulfilled, (state, action) => {
        state.reqStatus = REQUEST_STATUS.SUCCEEDED;
        // Add any fetched posts to the array
        state.fields = action.payload;
      })
      .addCase(fetchFields.rejected, (state, action) => {
        state.reqStatus = REQUEST_STATUS.FAILED;
        state.reqError = action.error.message;
      });
  },
});

export const {
  incrementCount,
  selectField,
  selectAll,
  toggleSelection,
  deselectFields,
  duplicateFields,
  addField,
  removeField,
  moveField,
  resetFormState,
  changeFieldProp,
} = formSlice.actions;
export default formSlice.reducer;
