import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  selected: string[];
}

const initialState: FormState = {
  selected: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // select field
    selectFields: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
    },

    // multi de/select field
    // this handles the case of selection with ctrl and selection with shift keys
    toggleSelection: (
      state,
      action: PayloadAction<{ fieldId: string; contigous?: boolean; order: string[] }>
    ) => {
      if (action.payload.contigous) {
        // shift key is pressed
        // shift key let user select all the fields between last selction and current selection
        state.selected.push(action.payload.fieldId);
        const selectedIndices = state.selected.map((sId) =>
          action.payload.order.findIndex((id) => id === sId)
        );
        const startIndex = Math.min(...selectedIndices);
        const endIndex = Math.max(...selectedIndices);
        state.selected = [];
        action.payload.order.forEach((id, index) => {
          if (index >= startIndex && index <= endIndex) {
            state.selected.push(id);
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

    // reset
    resetFormState: () => initialState,
  },
});

export const { selectFields, toggleSelection, deselectFields, resetFormState } = formSlice.actions;
export default formSlice.reducer;
