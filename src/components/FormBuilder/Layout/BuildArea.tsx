import { Stack, Typography, Box, IconButton, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { FORM_ELEMENTS, FORM_ELEMENTS_LIST } from "../../../constants";
import Droppable from "../../Reusable/Droppable";
import {
  DeleteOutlined,
  DragIndicator,
  OpenWithOutlined,
  SettingsOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import RemoveFieldDialog from "../Dialogs/RemoveFieldDialog";
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
  Over,
} from "@dnd-kit/core";
import Sortable from "../../Reusable/Sortable";
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
  const theme = useTheme();
  const [hoveredFieldIndex, setHoveredFieldIndex] = React.useState<number | null>(null);
  const [confirmDeleteFieldDialogOpen, setConfirmDeleteFieldDialogOpen] =
    React.useState<boolean>(false);

  const buttons = (id: string): JSX.Element => (
    <Stack>
      <IconButton
        title="Remove"
        size="small"
        color="error"
        sx={{ width: 25, height: 25 }}
        onClick={(e) => {
          e.stopPropagation();
          setConfirmDeleteFieldDialogOpen(true);
        }}
      >
        <DeleteOutlined sx={{ width: 20, height: 20 }} />
      </IconButton>
      <IconButton
        title="Properties"
        size="small"
        sx={{ width: 25, height: 25 }}
        onClick={(e) => {
          e.stopPropagation();
          onFieldSelect(id);
          onTogglePropertiesDrawer();
        }}
      >
        <SettingsOutlined sx={{ width: 20, height: 20 }} />
      </IconButton>
    </Stack>
  );

  const [active, setActive] = React.useState<Active | null>(null);
  const [over, setOver] = React.useState<Over | null>(null);
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
    setOver(over);
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
      setOver(null);
    }
  };

  const handleDragCancel = (event: DragCancelEvent) => {
    setActive(null);
    setOver(null);
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

  const renderDragHandle = (index: number) => {
    return (
      hoveredFieldIndex === index && (
        <IconButton sx={{ cursor: "move", height: 25, width: 25 }}>
          <DragIndicator sx={{ height: 20, width: 20 }} />
        </IconButton>
      )
    );
  };

  const renderRemoveFieldDialog = (index: number, fieldName: string) => {
    return (
      <RemoveFieldDialog
        isOpen={confirmDeleteFieldDialogOpen}
        fieldName={fieldName}
        onClose={() => setConfirmDeleteFieldDialogOpen(false)}
        onConfirm={() => {
          setConfirmDeleteFieldDialogOpen(false);
          onFieldRemove(index);
        }}
      />
    );
  };

  const hiddenWarning = (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center", p: 1 }}>
      <WarningAmberOutlined color="warning" sx={{ width: 15, height: 15 }} />
      <Typography pl={1} variant="caption" color={"warning.main"}>
        This field is hidden so it will not appear in the form.
      </Typography>
    </Box>
  );

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
            <Grid component={"ul"} container spacing={1}>
              <SortableContext items={formFields.map((f) => f.id)} strategy={rectSortingStrategy}>
                {formFields.map((field, index) => {
                  const { colSpan, fieldType, label, id, name } = field;
                  const type = FORM_ELEMENTS_LIST.find((el) => el.id === fieldType)?.label;
                  const fieldName = `${label} (${type})`;

                  return (
                    <Grid
                      component="li"
                      item
                      xs={12}
                      md={colSpan}
                      key={id}
                      id={`${name}-container`}
                      onMouseOver={() => {
                        setHoveredFieldIndex(index);
                      }}
                      onMouseLeave={() => {
                        setHoveredFieldIndex(null);
                      }}
                      sx={{
                        width: "100%",
                        height: "auto",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        ...(hoveredFieldIndex === index && {
                          backgroundColor: theme.palette.action.hover,
                        }),
                        ...(selectedFieldId === id && {
                          borderLeftColor: theme.palette.secondary.light,
                          borderLeftWidth: 4,
                          borderLeftStyle: "solid",
                          boxShadow: theme.shadows[2],
                        }),
                        ...(id === over?.id &&
                          (formFields.findIndex((el) => el.id === active?.id) < index
                            ? {
                                borderBottomColor: theme.palette.secondary.light,
                                borderBottomWidth: 4,
                                borderBottomStyle: "dotted",
                              }
                            : {
                                borderTopColor: theme.palette.secondary.light,
                                borderTopWidth: 4,
                                borderTopStyle: "dotted",
                              })),
                      }}
                    >
                      <Box
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Sortable id={id}>{renderDragHandle(index)}</Sortable>
                        <Stack
                          sx={{
                            flexGrow: 1,
                            p: 1,
                            ...(field.hidden && selectedFieldId !== id && { opacity: 0.5 }),
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onFieldSelect(id);
                          }}
                        >
                          {renderElement(field)}
                        </Stack>

                        {hoveredFieldIndex === index && buttons(id)}

                        {renderRemoveFieldDialog(index, fieldName)}
                      </Box>

                      {selectedFieldId === id && field.hidden && hiddenWarning}
                    </Grid>
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
                <Box p={1} width={400}>
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
