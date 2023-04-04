import { Stack, Typography, Box, Grid, Container, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import Droppable from "../../Reusable/Droppable";
import { AddOutlined, OpenWithOutlined, Palette, PaletteOutlined } from "@mui/icons-material";
import { SortableContext } from "@dnd-kit/sortable";
import { DragOverlay, useDndMonitor, defaultDropAnimationSideEffects, Active } from "@dnd-kit/core";
import { DragCancelEvent, DragEndEvent, DragStartEvent } from "@dnd-kit/core/dist/types";
import { FieldProps } from "../Types";
import SortableItem from "./SortableItem";
import BuildAreaHeader from "./BuildAreaHeader";
import { getFieldBuilder } from "./FieldBuilders";

interface IBuildAreaProps {
  formFields: FieldProps[];
  onFieldRemove: (id: string) => void;
  onFieldSelect: React.Dispatch<React.SetStateAction<string>>;
  selectedFieldId: string;
  setSelectedFieldId: React.Dispatch<React.SetStateAction<string>>;
  onTogglePropertiesDrawer: () => void;
}

const BuildArea = ({
  formFields,
  onFieldRemove,
  onFieldSelect,
  selectedFieldId,
  setSelectedFieldId,
  onTogglePropertiesDrawer,
}: IBuildAreaProps) => {
  const theme = useTheme();
  const [active, setActive] = React.useState<Active | null>(null);
  const activeField = React.useMemo(
    () => formFields.find((el) => el.id === active?.id),
    [formFields, active]
  );
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActive(active);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActive(null);
    }
  };

  const handleDragCancel = (event: DragCancelEvent) => {
    setActive(null);
  };

  React.useEffect(() => {
    if (selectedFieldId) {
      document.getElementById(selectedFieldId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedFieldId]);

  useDndMonitor({
    onDragCancel: handleDragCancel,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
  });

  const renderFormArea = (): JSX.Element =>
    formFields.length === 0 ? (
      <Droppable id="form-builder" style={{ width: "100%", height: "100%" }}>
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
                  renderElement={getFieldBuilder}
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
                  opacity: "0.6",
                },
              },
            }),
          }}
        >
          {active?.id && !active.id.toString().includes("ctrl_") ? (
            <Box
              sx={{
                p: 2,
                minWidth: 200,
                cursor: "move",
                transform: "rotate(1deg)",
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.shadows[10],
                borderRadius: 2,
              }}
            >
              {getFieldBuilder(activeField)}
            </Box>
          ) : null}
        </DragOverlay>
      </form>
    );

  return (
    <Box
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 500,
        maxWidth: "100%",
        position: "relative",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <BuildAreaHeader formFields={formFields} />

      <Box
        sx={{
          p: 5,
          m: 4,
          height: "auto",
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
          borderRadius: 2,
        }}
        onClick={() => setSelectedFieldId("")}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
          if (e?.key === "Escape" || e?.code === "Escape") {
            setSelectedFieldId("");
          }
        }}
      >
        {renderFormArea()}
      </Box>
    </Box>
  );
};

export default BuildArea;
