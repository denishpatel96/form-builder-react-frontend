import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FieldProps } from "../../../components/FormBuilder/Types";

interface FormState {
  fields: FieldProps[];
}

const initialState: FormState = {
  fields: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    fetchFields: (state) => {
      // fetch fields from server
    },
    updateFields: (state, action: PayloadAction<{ fields: FieldProps[] }>) => {
      // push changes to server
    },
  },
});

export const { fetchFields, updateFields } = formSlice.actions;
export default formSlice.reducer;
