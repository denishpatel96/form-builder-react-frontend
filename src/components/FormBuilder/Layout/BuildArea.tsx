import { Stack, Typography, Box, Grid } from "@mui/material";
import React from "react";
import { FORM_ELEMENTS } from "../../../constants";
import Droppable from "../../Reusable/Droppable";
import { OpenWithOutlined } from "@mui/icons-material";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  DragOverlay,
  useSensor,
  useSensors,
  KeyboardSensor,
  PointerSensor,
  DndContext,
  closestCenter,
  defaultDropAnimationSideEffects,
  Active,
} from "@dnd-kit/core";
import {
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core/dist/types";
import TextFieldBuilder from "../FormElements/TextField/TextFieldBuilder";
import RadioFieldBuilder from "../FormElements/Radio/RadioFieldBuilder";
import { ITextProps } from "../FormElements/TextField/Text";
import { IRadioProps } from "../FormElements/Radio/Radio";
import { FieldProps } from "../FormElements/Common/Types";
import SortableItem from "./SortableItem";

interface IBuildAreaProps {
  formFields: FieldProps[];
  setFormFields: React.Dispatch<React.SetStateAction<FieldProps[]>>;
  onFieldRemove: (index: number) => void;
  onFieldSelect: React.Dispatch<React.SetStateAction<string>>;
  selectedFieldId: string;
  onTogglePropertiesDrawer: () => void;
}

const BuildArea = ({
  formFields,
  setFormFields,
  onFieldRemove,
  onFieldSelect,
  selectedFieldId,
  onTogglePropertiesDrawer,
}: IBuildAreaProps) => {
  const [hoveredFieldIndex, setHoveredFieldIndex] = React.useState<number | null>(null);
  const [confirmDeleteFieldDialogOpen, setConfirmDeleteFieldDialogOpen] =
    React.useState<boolean>(false);

  const [active, setActive] = React.useState<Active | null>(null);
  const activeField = React.useMemo(
    () => formFields.find((el) => el.id === active?.id),
    [formFields, active]
  );
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActive(active);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    console.log("over ", over?.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFormFields((prev) => {
        const oldIndex = prev.findIndex((el) => el.id === active.id);
        const newIndex = prev.findIndex((el) => el.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      onFieldSelect(active.id.toString());
      setActive(null);
    }
  };

  const handleDragCancel = (event: DragCancelEvent) => {
    setActive(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const renderElement = (field?: FieldProps) => {
    if (!field) return <></>;
    const { fieldType } = field;
    return (
      <>
        {fieldType === FORM_ELEMENTS.TEXT && <TextFieldBuilder field={field as ITextProps} />}
        {fieldType === FORM_ELEMENTS.RADIO && <RadioFieldBuilder field={field as IRadioProps} />}
      </>
    );
  };

  return (
    <Droppable id="form-builder" style={{ width: "100%", height: "calc(100% - 60px)" }}>
      {formFields.length === 0 ? (
        <Stack
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OpenWithOutlined />
          <Typography>Drag element here</Typography>
        </Stack>
      ) : (
        <form>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragCancel={handleDragCancel}
          >
            <Grid container spacing={1}>
              <SortableContext items={formFields.map((f) => f.id)}>
                {formFields.map((field, index) => {
                  return (
                    <SortableItem
                      index={index}
                      field={field}
                      renderElement={renderElement}
                      hoveredFieldIndex={hoveredFieldIndex}
                      setHoveredFieldIndex={setHoveredFieldIndex}
                      selectedFieldId={selectedFieldId}
                      onFieldSelect={onFieldSelect}
                      onFieldRemove={onFieldRemove}
                      confirmDeleteFieldDialogOpen={confirmDeleteFieldDialogOpen}
                      setConfirmDeleteFieldDialogOpen={setConfirmDeleteFieldDialogOpen}
                      onTogglePropertiesDrawer={onTogglePropertiesDrawer}
                    />
                  );
                })}
              </SortableContext>
            </Grid>
            <DragOverlay
              dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                  styles: {
                    active: {
                      opacity: "0.4",
                    },
                  },
                }),
              }}
            >
              {active?.id ? (
                <Box p={1} width={200}>
                  {renderElement(activeField)}
                </Box>
              ) : null}
            </DragOverlay>
          </DndContext>
        </form>
      )}
    </Droppable>
  );
};

export default BuildArea;
