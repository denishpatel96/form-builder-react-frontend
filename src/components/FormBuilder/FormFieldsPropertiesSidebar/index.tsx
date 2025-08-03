import { ChevronRightOutlined, InfoOutlined } from "@mui/icons-material";
import { Typography, Divider, Box, IconButton, Drawer } from "@mui/material";
import React from "react";
import {
  DRAWER_WIDTH_DESKTOP,
  DRAWER_WIDTH_TABLET,
  FORM_ELEMENTS,
  FORM_ELEMENTS_LIST,
} from "../../../constants";
import {
  CheckboxProperties,
  CheckboxGroupProperties,
  RadioProperties,
  DropdownProperties,
  ComboboxProperties,
  SliderProperties,
  ShortTextProperties,
  LongTextProperties,
  HeadingProperties,
} from "./FieldProperties";
import {
  IFieldProps,
  IShortTextProps,
  IRadioProps,
  ICheckboxProps,
  IDropdownProps,
  IComboboxProps,
  ISliderProps,
  ICheckboxGroupProps,
  ILongTextProps,
  IHeadingProps,
} from "../Types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import api, { useUpdateFormSchemaMutation } from "../../../store/features/api";
import { useParams } from "react-router-dom";
import { cloneDeep, set } from "lodash";

type IFormFieldProps = {
  field: IFieldProps | undefined | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormFieldPropertiesSidebar = ({ field, isOpen, setIsOpen }: IFormFieldProps) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.form.selected);
  const { orgId, formId, workspaceId } = useParams() as {
    orgId: string;
    workspaceId: string;
    formId: string;
  };

  if (isOpen && !field) {
    setIsOpen(false);
  }

  const [updateFormSchema] = useUpdateFormSchemaMutation();

  const updatePaths = (item: any, path: string, value: any) => {
    set(item, path, value);
    if (path === "showMarks" && value === false) {
      set(item, "customMarks", []);
      set(item, "step", undefined);
      set(item, "showCustomMarks", false);
    }
  };

  const handleUpdate = async (path: string, value: any, isLocalUpdate: boolean = false) => {
    if (selected.length === 1) {
      if (isLocalUpdate) {
        dispatch(
          api.util.updateQueryData(
            "getFormSchema",
            { orgId, workspaceId, formId },
            (draftedFormSchema) => {
              const index = draftedFormSchema.fields.findIndex((f) => f.id === selected[0]);
              updatePaths(draftedFormSchema.fields[index], path, value);
            }
          )
        );
      } else if (field) {
        let updatedField = cloneDeep(field);
        updatePaths(updatedField, path, value);
        await updateFormSchema({
          orgId,
          workspaceId,
          formId,
          action: "UPDATE_FIELDS",
          fields: [updatedField],
        });
      }
    }
  };

  const element = FORM_ELEMENTS_LIST.find((el) => el.id === field?.fieldType);

  const commonProps = {
    onUpdate: handleUpdate,
  };

  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      anchor={"right"}
      PaperProps={{
        sx: {
          width: { xs: DRAWER_WIDTH_TABLET, md: DRAWER_WIDTH_DESKTOP },
          overflow: "hidden",
        },
      }}
      variant={isOpen ? "persistent" : "temporary"}
      sx={{
        ".MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Box
        sx={{
          maxHeight: 50,
          minHeight: 50,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => setIsOpen(false)} sx={{ ml: "auto" }}>
          <ChevronRightOutlined />
        </IconButton>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {element?.icon({ height: 25, width: 25 })}
          <Typography pl={1} variant="subtitle1" textAlign={"center"}>
            {element ? `${element.label} Properties` : "Field Properties"}
          </Typography>
        </Box>
      </Box>
      <Divider />
      {!field && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InfoOutlined color="secondary" sx={{ height: 30, width: 30 }} />
          <Typography variant="caption" textAlign={"center"}>
            Please select element from left to inspect properties.
          </Typography>
        </Box>
      )}
      {field && field.fieldType === FORM_ELEMENTS.HEADING && (
        <HeadingProperties field={field as IHeadingProps} {...commonProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.SHORT_TEXT && (
        <ShortTextProperties field={field as IShortTextProps} {...commonProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.LONG_TEXT && (
        <LongTextProperties field={field as ILongTextProps} {...commonProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.RADIO && (
        <RadioProperties field={field as IRadioProps} {...commonProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.CHECKBOX && (
        <CheckboxProperties field={field as ICheckboxProps} {...commonProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.CHECKBOX_GROUP && (
        <CheckboxGroupProperties field={field as ICheckboxGroupProps} {...commonProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.DROPDOWN && (
        <DropdownProperties field={field as IDropdownProps} {...commonProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.COMBOBOX && (
        <ComboboxProperties field={field as IComboboxProps} {...commonProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.SLIDER && (
        <SliderProperties field={field as ISliderProps} {...commonProps} />
      )}
    </Drawer>
  );
};

export default FormFieldPropertiesSidebar;
