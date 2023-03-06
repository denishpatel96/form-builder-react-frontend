import React from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { DragEndEvent, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core/dist/types";
import BuildArea from "./Layout/BuildArea";
import FormElementsSidebar from "./Layout/FormElementsSidebar";
import { DRAWER_WIDTH_DESKTOP, DRAWER_WIDTH_TABLET, FORM_ELEMENTS } from "../../constants";
import FormElementPropertiesSidebar from "./Layout/FormElementPropertiesSidebar";
import { Box, Typography, Divider, Button, Drawer, Container } from "@mui/material";
import { getTextProps } from "./FormElements/TextField/TextFieldUtility";
import FormPreviewModal from "./Layout/FormPreviewModal";
import { handlePropsChange } from "./FormElements/Common/Utility";
import { getRadioProps } from "./FormElements/Radio/RadioFieldUtility";
import { FieldProps } from "./FormElements/Common/Types";

const FormBuilder = () => {
  const [activeId, setActiveId] = React.useState<string>("");
  const [selectedFieldId, setSelectedFieldId] = React.useState<string>("");
  const [elementCount, setElementCount] = React.useState<number>(0);
  const [isPropertiesOpen, setIsPropertiesOpen] = React.useState<boolean>(false);
  const [isPropertiesPinned, setIsPropertiesPinned] = React.useState<boolean>(true);
  const [formFields, setFormFields] = React.useState<FieldProps[]>([
    getTextProps("text", 999),
    getRadioProps("radio", 998),
  ]);

  const onPropsChange = handlePropsChange(selectedFieldId, setFormFields);

  const handleAddFormField = (elementId: UniqueIdentifier) => {
    if (!elementId) return;
    switch (elementId) {
      case FORM_ELEMENTS.TEXT:
        setFormFields((prev) => [...prev, getTextProps(elementId, elementCount)]);
        setElementCount((prev) => prev + 1);
        break;
      case FORM_ELEMENTS.RADIO:
        setFormFields((prev) => [...prev, getRadioProps(elementId, elementCount)]);
        setElementCount((prev) => prev + 1);
        break;
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      handleAddFormField(active.id);
    }
    setActiveId("");
  };

  const handleFieldRemove = (fieldIndex: number) => {
    setFormFields((prev) => {
      let updated = [...prev];
      updated.splice(fieldIndex, 1);
      return updated;
    });
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      autoScroll={false}
      collisionDetection={closestCenter}
    >
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
        <Box style={{ flexGrow: 1, display: "flex" }}>
          <Container style={{ height: "100%" }}>
            <Box style={{ padding: 10, height: 60 }}>
              <Button color="secondary">Save</Button>
              <FormPreviewModal formFields={formFields} />
            </Box>
            <Box style={{ padding: 10, height: `calc(100vh - 60px)`, overflow: "auto" }}>
              <BuildArea
                formFields={formFields}
                setFormFields={setFormFields}
                onFieldRemove={handleFieldRemove}
                selectedFieldId={selectedFieldId}
                onFieldSelect={setSelectedFieldId}
                onTogglePropertiesDrawer={() => setIsPropertiesOpen((prev) => !prev)}
              />
            </Box>
          </Container>
        </Box>
        <Drawer
          open={isPropertiesOpen}
          onClose={() => setIsPropertiesOpen(false)}
          anchor={"right"}
          variant={isPropertiesPinned ? "permanent" : "temporary"}
          PaperProps={{
            sx: {
              width: { xs: DRAWER_WIDTH_TABLET, md: DRAWER_WIDTH_DESKTOP },
              overflow: "hidden",
              ...(isPropertiesPinned && { position: "relative" }),
            },
          }}
          sx={{
            ".MuiBackdrop-root": {
              backgroundColor: "transparent",
            },
          }}
        >
          <FormElementPropertiesSidebar
            field={formFields.find((f) => f.id === selectedFieldId)}
            onPropsChange={onPropsChange}
            onClosePropertiesDrawer={() => setIsPropertiesOpen(false)}
            isPinned={isPropertiesPinned}
            onTogglePin={() => {
              setIsPropertiesOpen(true);
              setIsPropertiesPinned((prev) => !prev);
            }}
          />
        </Drawer>
      </Box>
    </DndContext>
  );
};

export default FormBuilder;
