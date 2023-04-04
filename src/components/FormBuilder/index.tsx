import React from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragCancelEvent,
  UniqueIdentifier,
  Over,
  pointerWithin,
  Active,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import BuildArea from "./BuildArea";
import FormFieldsSidebar from "./FormFieldsSideBar";
import { FORM_ELEMENTS } from "../../constants";
import FormFieldPropertiesSidebar from "./FormFieldsPropertiesSidebar";
import { Box, IconButton, Typography } from "@mui/material";
import {
  getCheckboxProps,
  getShortTextProps,
  getRadioProps,
  getDropdownProps,
  getComboboxProps,
  getSliderProps,
  getCheckboxGroupProps,
  getLongTextProps,
} from "./Utility";
import { handlePropsChange } from "./Utility/Common.Utility";
import { FieldProps } from "./Types";
import FormDesignSidebar from "./FormDesignSidebar";
import { AddOutlined, PaletteOutlined } from "@mui/icons-material";

const FormBuilder = () => {
  const [over, setOver] = React.useState<Over | null>(null);
  const [active, setActive] = React.useState<Active | null>(null);
  const [selectedFieldId, setSelectedFieldId] = React.useState<string>("");
  const [elementCount, setElementCount] = React.useState<number>(9);
  const [isPropertiesOpen, setIsPropertiesOpen] = React.useState<boolean>(false);
  const [isFormFieldsOpen, setIsFormFieldsOpen] = React.useState<boolean>(true);
  const [isFormDesignOpen, setIsFormDesignOpen] = React.useState<boolean>(false);
  const [formFields, setFormFields] = React.useState<FieldProps[]>([
    getShortTextProps(FORM_ELEMENTS.SHORT_TEXT, 1),
    getLongTextProps(FORM_ELEMENTS.LONG_TEXT, 2),
    getRadioProps(FORM_ELEMENTS.RADIO, 3),
    getCheckboxProps(FORM_ELEMENTS.CHECKBOX, 4),
    getCheckboxGroupProps(FORM_ELEMENTS.CHECKBOX_GROUP, 5),
    getDropdownProps(FORM_ELEMENTS.DROPDOWN, 6),
    getComboboxProps(FORM_ELEMENTS.COMBOBOX, 7),
    getSliderProps(FORM_ELEMENTS.SLIDER, 8),
  ]);

  const onPropsChange = handlePropsChange(selectedFieldId, setFormFields);

  const handleAddFormField = (
    elementId: UniqueIdentifier,
    addAfterElementId: UniqueIdentifier = ""
  ) => {
    if (!elementId) return;
    let fieldToAdd: FieldProps | null = null;
    switch (elementId) {
      case FORM_ELEMENTS.SHORT_TEXT:
        fieldToAdd = getShortTextProps(elementId, elementCount);
        break;
      case FORM_ELEMENTS.LONG_TEXT:
        fieldToAdd = getLongTextProps(elementId, elementCount);
        break;
      case FORM_ELEMENTS.RADIO:
        fieldToAdd = getRadioProps(elementId, elementCount);
        break;
      case FORM_ELEMENTS.CHECKBOX:
        fieldToAdd = getCheckboxProps(elementId, elementCount);
        break;
      case FORM_ELEMENTS.CHECKBOX_GROUP:
        fieldToAdd = getCheckboxGroupProps(elementId, elementCount);
        break;
      case FORM_ELEMENTS.DROPDOWN:
        fieldToAdd = getDropdownProps(elementId, elementCount);
        break;
      case FORM_ELEMENTS.COMBOBOX:
        fieldToAdd = getComboboxProps(elementId, elementCount);
        break;
      case FORM_ELEMENTS.SLIDER:
        fieldToAdd = getSliderProps(elementId, elementCount);
        break;
    }

    if (fieldToAdd !== null) {
      const fieldId = fieldToAdd.id;
      setFormFields((prev) => {
        const updated = [...prev];
        if (addAfterElementId) {
          updated.splice(
            updated.findIndex((i) => i.id === addAfterElementId) + 1,
            0,
            fieldToAdd as FieldProps
          );
        } else {
          updated.push(fieldToAdd as FieldProps);
        }
        return updated;
      });
      setElementCount((prev) => prev + 1);
      setSelectedFieldId(fieldId);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    //console.log("drag started");
    const { active } = event;
    setActive(active);
  };

  const handleDragCancel = (event: DragCancelEvent) => {
    //console.log("drag cancelled");
    setActive(null);
    setOver(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    //console.log("drag ended", event);
    const { active, over } = event;
    if (over) {
      handleAddFormField(active.id, over.id);
    }
    setActive(null);
    setOver(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    //console.log("drag over", event);
    const { active, over } = event;
    if (over && active.id !== over.id && !active.id.toString().includes("ctrl_")) {
      // If element is dragged within sortable list
      // element should just move to index of over element.
      setFormFields((prev) => {
        const oldIndex = prev.findIndex((el) => el.id === active.id);
        const newIndex = prev.findIndex((el) => el.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      setSelectedFieldId(active.id.toString());
    }
    setOver(event?.over);
  };

  const handleFieldRemove = (fieldId: string) => {
    setFormFields((prev) => {
      let updated = [...prev];
      updated = updated.filter((f) => f.id !== fieldId);
      return updated;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const renderFormDesignButton = () => {
    return (
      <Box
        onClick={() => setIsFormDesignOpen((prev) => !prev)}
        sx={{
          position: "absolute",
          height: 40,
          width: 40,
          zIndex: 12,
          cursor: "pointer",
          borderRadius: "20px 0 0 20px",
          right: 0,
          top: 60,
          boxShadow: (theme) => theme.shadows[1],
          background: `linear-gradient(to right, #fc5c7d, #6a82fb)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ":hover": {
            boxShadow: (theme) => theme.shadows[5],
            transition: "width 500ms ease",
            width: 100,
            ":after": {
              content: '"Form Designer"',
              fontWeight: 500,
              color: "white",
              fontSize: 12,
              textAlign: "center",
            },
          },
        }}
      >
        <IconButton>
          <PaletteOutlined sx={{ color: "white" }} />
        </IconButton>
      </Box>
    );
  };

  const renderFormFieldsButton = () => {
    return (
      <Box
        onClick={() => setIsFormFieldsOpen((prev) => !prev)}
        sx={{
          position: "absolute",
          height: 40,
          width: 100,
          zIndex: 12,
          cursor: "pointer",
          borderRadius: "0 20px 20px 0",
          left: 0,
          top: 60,
          boxShadow: (theme) => theme.shadows[1],
          background: (theme) => theme.palette.background.paper,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateX(-60px)",
          transition: "500ms ease",
          ":hover": {
            boxShadow: (theme) => theme.shadows[5],
            transform: "translateX(0px)",
            transition: "500ms ease",
          },
        }}
      >
        <Typography variant="caption" fontWeight={500} textAlign={"center"}>
          Add Elements
        </Typography>
        <IconButton color="primary">
          <AddOutlined />
        </IconButton>
      </Box>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
      autoScroll={!!over}
      collisionDetection={pointerWithin}
    >
      <Box
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
          if ((e?.key === "s" || e?.code === "KeyS") && e.ctrlKey) {
            e.preventDefault();
            alert("Save Document");
          }
        }}
        style={{
          minHeight: 500,
          height: "100vh",
          width: "100%",
          display: "flex",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        {renderFormFieldsButton()}
        <FormFieldsSidebar
          activeId={active?.id?.toString() || ""}
          onDrawerClick={() => setSelectedFieldId("")}
          onFieldAdd={(elementId) => handleAddFormField(elementId, selectedFieldId)}
          isOpen={isFormFieldsOpen}
          setIsOpen={setIsFormFieldsOpen}
        />
        <BuildArea
          formFields={formFields}
          onFieldRemove={handleFieldRemove}
          selectedFieldId={selectedFieldId}
          setSelectedFieldId={setSelectedFieldId}
          onFieldSelect={setSelectedFieldId}
          onTogglePropertiesDrawer={() => setIsPropertiesOpen((prev) => !prev)}
        />
        <FormFieldPropertiesSidebar
          field={formFields.find((f) => f.id === selectedFieldId)}
          onPropsChange={onPropsChange}
          onTogglePin={() => setIsPropertiesOpen(true)}
          isOpen={isPropertiesOpen}
          setIsOpen={setIsPropertiesOpen}
        />

        {renderFormDesignButton()}
        <FormDesignSidebar
          setIsOpen={setIsFormDesignOpen}
          onPropsChange={onPropsChange}
          isOpen={isFormDesignOpen}
        />
      </Box>
    </DndContext>
  );
};

export default FormBuilder;
