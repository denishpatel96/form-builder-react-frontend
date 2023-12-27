import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "lodash";
import { IFieldProps } from "../../components/FormBuilder/Types";
import { API_URL, REQUEST_STATUS } from "../../constants";
import { CookieStorage } from "../../helpers/cookieStorage";

interface FormState {
  lastFieldId: number;
  selected: string[];
  fields: IFieldProps[];
  reqStatus: REQUEST_STATUS;
}

const initialState: FormState = {
  lastFieldId: 0,
  selected: [],
  fields: [],
  reqStatus: REQUEST_STATUS.IDLE,
};

export interface FormSchema {
  workspaceId: string;
  formId: string;
  fields: any[];
  lastFieldId: number;
}

export const updateFormSchema = async ({
  orgId,
  workspaceId,
  formId,
  action,
  order,
  fields,
  lastFieldId,
}: {
  orgId: string;
  workspaceId: string;
  formId: string;
  action: "ADD_FIELDS" | "DELETE_FIELDS" | "MOVE_FIELDS" | "UPDATE_FIELDS";
  order?: string[];
  fields?: any[];
  lastFieldId?: number;
}) => {
  const token = CookieStorage.getItem("idT");
  let body: string;
  const commonParams = { orgId, workspaceId, formId, action };
  if (token) {
    switch (action) {
      case "ADD_FIELDS":
        body = JSON.stringify({ ...commonParams, order, fields, lastFieldId });
        break;
      case "DELETE_FIELDS":
        body = JSON.stringify({ ...commonParams, fields });
        break;
      case "MOVE_FIELDS":
        body = JSON.stringify({ ...commonParams, order });
        break;
      case "UPDATE_FIELDS":
        body = JSON.stringify({ ...commonParams, fields });
        break;
    }

    fetch(`${API_URL}/formSchemas`, {
      method: "PUT",
      headers: { authorization: token },
      body,
    }).catch((error) => console.log("Error updating form schema : ", error));
  }
  return [];
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // select field
    selectFields: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
    },

    // select all fields
    selectAll: (state) => {
      state.selected = state.fields.map((f) => f.id);
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
});

export const {
  selectFields,
  selectAll,
  toggleSelection,
  deselectFields,
  resetFormState,
  changeFieldProp,
} = formSlice.actions;
export default formSlice.reducer;
