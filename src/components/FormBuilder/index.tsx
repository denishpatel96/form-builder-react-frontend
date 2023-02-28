import React from "react";
import { DndContext } from "@dnd-kit/core";
import { DragEndEvent, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core/dist/types";
import BuildArea from "./BuildArea";
import FormElements from "./FormElements";
import { DRAWER_WIDTH, FORM_ELEMENTS } from "../../constants";
import FormElementProperties from "./FormElementProperties";
import { Box, Typography, Divider, Button, Drawer, Container, TextFieldProps } from "@mui/material";
import {
  getTextFieldChangeProps,
  getTextFieldProps,
} from "./FormElements/TextField/TextFieldUtility";

interface IFormBuilderProps {}

export type IFieldPropertiesChange = (
  name: string,
  value: string | number | boolean | null
) => void;

export interface ITextProps {
  fieldType: UniqueIdentifier;
  fieldProps: TextFieldProps;
}

const FormBuilder = (props: IFormBuilderProps) => {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const [selectedFormFieldIndex, setSelectedFormFieldIndex] = React.useState<number | null>(0);
  const [elementCount, setElementCount] = React.useState<number>(0);

  const [formFields, setFormFields] = React.useState<any[]>([getTextFieldProps("text", 999)]);

  const onTextFieldPropsChange = getTextFieldChangeProps(selectedFormFieldIndex, setFormFields);

  const handleAddFormField = (elementId: UniqueIdentifier) => {
    if (!elementId) return;
    switch (elementId) {
      case FORM_ELEMENTS.TEXT:
        setFormFields((prev) => [...prev, getTextFieldProps(elementId, elementCount)]);
        setElementCount((prev) => prev + 1);
        break;
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    // console.log("Drag start:", event);
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // /console.log("Drag end:", event);
    const { active, over } = event;
    if (over) {
      handleAddFormField(active.id);
    }
    setActiveId(null);
  };

  const handleFieldClick = (fieldIndex: number) => {
    console.log("fieldIndex", fieldIndex);
    setSelectedFormFieldIndex(fieldIndex);
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
              border: "none",
              position: "relative",
            },
          }}
        >
          <Typography
            sx={{ height: 50, lineHeight: "50px", textAlign: "center" }}
            variant="overline"
          >
            Form Elements
          </Typography>
          <Divider />
          <FormElements activeId={activeId} />
        </Drawer>
        <Box style={{ flexGrow: 1 }}>
          <Container style={{ height: "100%" }}>
            <Box style={{ padding: 10, height: 60 }}>
              <Button>Save</Button>
              <Button>Preview</Button>
            </Box>
            <BuildArea
              formFields={formFields}
              onFieldClick={handleFieldClick}
              selectedFormFieldIndex={selectedFormFieldIndex}
            />
          </Container>
        </Box>
        <Drawer
          open
          anchor={"right"}
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              border: "none",
              position: "relative",
            },
          }}
        >
          <FormElementProperties
            field={selectedFormFieldIndex !== null ? formFields[selectedFormFieldIndex] : null}
            onFieldPropsChange={onTextFieldPropsChange}
          />
        </Drawer>
      </Box>
    </DndContext>
  );
};

export default FormBuilder;
