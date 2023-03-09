import { Stack, Typography, Box, Grid } from "@mui/material";
import React from "react";
import { FORM_ELEMENTS } from "../../../constants";
import Droppable from "../../Reusable/Droppable";
import { OpenWithOutlined } from "@mui/icons-material";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DragOverlay, useDndMonitor, defaultDropAnimationSideEffects, Active } from "@dnd-kit/core";
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
  onFieldRemove: (id: string) => void;
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
  const [hoveredFieldId, setHoveredFieldId] = React.useState<string>("");
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
      // avoid field selection if field is being added by dragging.
      if (!(active?.id as string)?.includes("ctrl_")) {
        onFieldSelect(active.id.toString());
      }
      setActive(null);
    }
  };

  const handleDragCancel = (event: DragCancelEvent) => {
    setActive(null);
  };

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

  useDndMonitor({
    onDragCancel: handleDragCancel,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragOver: handleDragOver,
  });

  return formFields.length === 0 ? (
    <Droppable id="form-builder" style={{ width: "100%", height: "calc(100% - 60px)" }}>
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
    </Droppable>
  ) : (
    <form>
      <Grid container spacing={1}>
        <SortableContext items={formFields.map((f) => f.id)}>
          {formFields.map((field, index) => {
            return (
              <SortableItem
                key={index}
                field={field}
                renderElement={renderElement}
                hoveredFieldId={hoveredFieldId}
                setHoveredFieldId={setHoveredFieldId}
                selectedFieldId={selectedFieldId}
                onFieldSelect={onFieldSelect}
                onFieldRemove={onFieldRemove}
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
    </form>
  );
};

export default BuildArea;
