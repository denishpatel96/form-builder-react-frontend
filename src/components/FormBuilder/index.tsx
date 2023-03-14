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
import { Box } from "@mui/material";
import { getCheckboxProps, getTextProps, getRadioProps } from "./Utility";
import { handlePropsChange } from "./Utility/Common.Utility";
import { FieldProps } from "./Types";

const FormBuilder = () => {
  const [over, setOver] = React.useState<Over | null>(null);
  const [active, setActive] = React.useState<Active | null>(null);
  const [selectedFieldId, setSelectedFieldId] = React.useState<string>("");
  const [elementCount, setElementCount] = React.useState<number>(4);
  const [isPropertiesOpen, setIsPropertiesOpen] = React.useState<boolean>(false);
  const [isPropertiesPinned, setIsPropertiesPinned] = React.useState<boolean>(true);
  const [formFields, setFormFields] = React.useState<FieldProps[]>([
    getTextProps(FORM_ELEMENTS.TEXT, 1),
    getRadioProps(FORM_ELEMENTS.RADIO, 2),
    getCheckboxProps(FORM_ELEMENTS.CHECKBOX, 3),
  ]);

  const onPropsChange = handlePropsChange(selectedFieldId, setFormFields);

  const handleAddFormField = (elementId: UniqueIdentifier) => {
    if (!elementId) return;
    let fieldToAdd: FieldProps | null = null;
    switch (elementId) {
      case FORM_ELEMENTS.TEXT:
        fieldToAdd = getTextProps(elementId, elementCount);
        break;
      case FORM_ELEMENTS.RADIO:
        fieldToAdd = getRadioProps(elementId, elementCount);
        break;
      case FORM_ELEMENTS.CHECKBOX:
        fieldToAdd = getCheckboxProps(elementId, elementCount);
        break;
    }
    if (fieldToAdd !== null) {
      const fieldId = fieldToAdd.id;
      setFormFields((prev) => [...prev, fieldToAdd as FieldProps]);
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
      handleAddFormField(active.id);
    }
    if (over && active.id !== over.id) {
      const isAddingItem = active.id.toString().includes("ctrl_");
      // If dragging from left panel to build area
      // newly added element should appear after over element.
      // e.g. newIndex + 1
      // If element is dragged within sortable list
      // element should just move to index of over element.
      setFormFields((prev) => {
        const oldIndex = prev.findIndex((el) => el.id === active.id);
        const newIndex = prev.findIndex((el) => el.id === over.id);
        return arrayMove(prev, oldIndex, isAddingItem ? newIndex + 1 : newIndex);
      });
      if (!isAddingItem) setSelectedFieldId(active.id.toString());
    }
    setActive(null);
    setOver(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    //console.log("drag over", event);
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
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      <Box style={{ minHeight: 500, height: "100vh", display: "flex" }}>
        <FormFieldsSidebar
          activeId={active?.id?.toString() || ""}
          setSelectedFieldId={setSelectedFieldId}
        />
        <BuildArea
          formFields={formFields}
          setFormFields={setFormFields}
          onFieldRemove={handleFieldRemove}
          selectedFieldId={selectedFieldId}
          setSelectedFieldId={setSelectedFieldId}
          onFieldSelect={setSelectedFieldId}
          onTogglePropertiesDrawer={() => setIsPropertiesOpen((prev) => !prev)}
        />
        <FormFieldPropertiesSidebar
          field={formFields.find((f) => f.id === selectedFieldId)}
          onPropsChange={onPropsChange}
          onClosePropertiesDrawer={() => setIsPropertiesOpen(false)}
          isPinned={isPropertiesPinned}
          onTogglePin={() => {
            setIsPropertiesOpen(true);
            setIsPropertiesPinned((prev) => !prev);
          }}
          isOpen={isPropertiesOpen}
          setIsOpen={setIsPropertiesOpen}
        />
      </Box>
    </DndContext>
  );
};

export default FormBuilder;
