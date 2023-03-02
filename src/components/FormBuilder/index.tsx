import React from "react";
import { DndContext } from "@dnd-kit/core";
import { DragEndEvent, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core/dist/types";
import BuildArea from "./Layout/BuildArea";
import FormElementsSidebar from "./Layout/FormElementsSidebar";
import { DRAWER_WIDTH_DESKTOP, DRAWER_WIDTH_TABLET, FORM_ELEMENTS } from "../../constants";
import FormElementPropertiesSidebar from "./Layout/FormElementPropertiesSidebar";
import { Box, Typography, Divider, Button, Drawer, Container, TextFieldProps } from "@mui/material";
import {
  handlePropsChange,
  getProps,
  handleValidationsChange,
} from "./FormElements/TextField/TextFieldUtility";
import FormPreviewModal from "./Layout/FormPreviewModal";

interface IFormBuilderProps {}

export type IFieldPropertiesChange = (
  name: string,
  value: string | number | boolean | null
) => void;

export type IFieldValidationsChange = (
  validationType: string,
  name: string,
  value: string | number | boolean | null
) => void;

export interface ITextProps {
  fieldType: UniqueIdentifier;
  hidden: boolean;
  props: TextFieldProps;
  validations?: {
    // Length Validation
    lengthValidation?: {
      required: boolean;
      min: number;
      max: number;
      message: string;
    };
    // Pattern Validation
    patternValidation?: {
      required: boolean;
      pattern: string;
      message: string;
    };
  };
}

const FormBuilder = (props: IFormBuilderProps) => {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const [selectedFormFieldIndex, setSelectedFormFieldIndex] = React.useState<number | null>(0);
  const [elementCount, setElementCount] = React.useState<number>(0);
  const [isPropertiesOpen, setIsPropertiesOpen] = React.useState<boolean>(false);
  const [formFields, setFormFields] = React.useState<any[]>([getProps("text", 999)]);

  const onTextFieldPropsChange = handlePropsChange(selectedFormFieldIndex, setFormFields);
  const onTextFieldValidationsChange = handleValidationsChange(
    selectedFormFieldIndex,
    setFormFields
  );

  const handleAddFormField = (elementId: UniqueIdentifier) => {
    if (!elementId) return;
    switch (elementId) {
      case FORM_ELEMENTS.TEXT:
        setFormFields((prev) => [...prev, getProps(elementId, elementCount)]);
        setElementCount((prev) => prev + 1);
        break;
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    // console.log("Drag start:", event);
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // console.log("Drag end:", event);
    const { active, over } = event;
    if (over) {
      handleAddFormField(active.id);
    }
    setActiveId(null);
  };

  const handleFieldRemove = (fieldIndex: number) => {
    setFormFields((prev) => {
      let updated = [...prev];
      updated.splice(fieldIndex, 1);
      return updated;
    });
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} autoScroll={false}>
      <Box style={{ minHeight: 500, height: "100vh", display: "flex" }}>
        <Drawer
          open
          anchor={"left"}
          variant="persistent"
          PaperProps={{
            sx: {
              width: 200,
              position: "relative",
            },
          }}
        >
          <Typography sx={{ height: 50, lineHeight: "50px", pl: 2 }} variant="overline">
            Form Elements
          </Typography>
          <Divider />
          <FormElementsSidebar activeId={activeId} />
        </Drawer>
        <Box style={{ flexGrow: 1 }}>
          <Container style={{ height: "100%" }}>
            <Box style={{ padding: 10, height: 60 }}>
              <Button color="secondary">Save</Button>
              <FormPreviewModal formFields={formFields} />
            </Box>
            <BuildArea
              formFields={formFields}
              onFieldRemove={handleFieldRemove}
              selectedFormFieldIndex={selectedFormFieldIndex}
              onFieldSelect={setSelectedFormFieldIndex}
              onTogglePropertiesDrawer={() => setIsPropertiesOpen((prev) => !prev)}
            />
          </Container>
        </Box>
        <Drawer
          open={isPropertiesOpen}
          onClose={() => setIsPropertiesOpen(false)}
          anchor={"right"}
          // TODO: remove in production
          variant="permanent"
          //
          PaperProps={{
            sx: {
              width: { xs: DRAWER_WIDTH_TABLET, md: DRAWER_WIDTH_DESKTOP },
              overflow: "hidden",
              // TODO: remove in production
              position: "relative",
              //
            },
          }}
          sx={{
            ".MuiBackdrop-root": {
              backgroundColor: "transparent",
            },
          }}
        >
          <FormElementPropertiesSidebar
            field={selectedFormFieldIndex !== null ? formFields[selectedFormFieldIndex] : null}
            onPropsChange={onTextFieldPropsChange}
            onValidationsChange={onTextFieldValidationsChange}
            onClosePropertiesDrawer={() => setIsPropertiesOpen(false)}
          />
        </Drawer>
      </Box>
    </DndContext>
  );
};

export default FormBuilder;
