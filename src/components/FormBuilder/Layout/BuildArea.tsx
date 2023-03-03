import {
  Stack,
  Typography,
  TextField,
  Box,
  IconButton,
  Grid,
  Badge,
  Alert,
  Chip,
  Tooltip,
} from "@mui/material";
import React from "react";
import { FORM_ELEMENTS, FORM_ELEMENTS_LIST } from "../../../constants";
import Droppable from "../../Reusable/Droppable";
import {
  Delete,
  DeleteOutlined,
  DragIndicator,
  OpenWithOutlined,
  SettingsOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import RemoveFieldDialog from "../Dialogs/RemoveFieldDialog";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DragOverlay,
  useSensor,
  useSensors,
  KeyboardSensor,
  PointerSensor,
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import Sortable from "../../Reusable/Sortable";
import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core/dist/types";

interface IBuildAreaProps {
  formFields: any[];
  setFormFields: React.Dispatch<React.SetStateAction<any[]>>;
  onFieldRemove: (index: number) => void;
  onFieldSelect: React.Dispatch<React.SetStateAction<number | null>>;
  selectedFormFieldIndex: number | null;
  onTogglePropertiesDrawer: () => void;
}

const BuildArea = ({
  formFields,
  setFormFields,
  onFieldRemove,
  onFieldSelect,
  selectedFormFieldIndex,
  onTogglePropertiesDrawer,
}: IBuildAreaProps) => {
  const [hoveredFieldIndex, setHoveredFieldIndex] = React.useState<number | null>(null);
  const [confirmDeleteFieldDialogOpen, setConfirmDeleteFieldDialogOpen] =
    React.useState<boolean>(false);

  const buttons = (index: number): JSX.Element => (
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
          onFieldSelect(index);
          onTogglePropertiesDrawer();
        }}
      >
        <SettingsOutlined sx={{ width: 20, height: 20 }} />
      </IconButton>
    </Stack>
  );

  const [activeId, setActiveId] = React.useState<UniqueIdentifier>("");
  const activeField = formFields.find((el) => el.props.id === activeId);
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      let newIndex = null;
      setFormFields((prev) => {
        const oldIndex = prev.findIndex((el) => el.props.id === active.id);
        newIndex = prev.findIndex((el) => el.props.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });

      onFieldSelect(newIndex);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
          >
            <Grid container spacing={1}>
              <SortableContext items={formFields} strategy={rectSortingStrategy}>
                {formFields.map((field, index) => {
                  const { hidden, colSpan, fieldType, props } = field;
                  const type = FORM_ELEMENTS_LIST.find((el) => el.id === fieldType)?.label;
                  const fieldName = `${props.label} (${type})`;
                  return (
                    <Grid
                      item
                      xs={12}
                      md={colSpan}
                      key={props.id}
                      component="div"
                      id={`${props.name}-container`}
                      onMouseOver={() => {
                        setHoveredFieldIndex(index);
                      }}
                      onMouseLeave={() => {
                        setHoveredFieldIndex(null);
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Sortable id={props.id}>
                        {hoveredFieldIndex === index && (
                          <IconButton sx={{ cursor: "move", height: 25, width: 25 }}>
                            <DragIndicator sx={{ height: 20, width: 20 }} />
                          </IconButton>
                        )}
                      </Sortable>
                      <Box
                        pt={1}
                        flexGrow={1}
                        onClick={(e) => {
                          e.stopPropagation();
                          onFieldSelect(index);
                        }}
                      >
                        {fieldType === FORM_ELEMENTS.TEXT && (
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            {...props}
                            InputProps={{
                              readOnly: true,
                              startAdornment: hidden && (
                                <Tooltip title="Hidden : This will not be visible in the form.">
                                  <VisibilityOffOutlined color="disabled" />
                                </Tooltip>
                              ),
                            }}
                            error={!props.label}
                            focused={selectedFormFieldIndex === index}
                          />
                        )}
                      </Box>

                      {hoveredFieldIndex === index && buttons(index)}

                      <RemoveFieldDialog
                        isOpen={confirmDeleteFieldDialogOpen}
                        fieldName={fieldName}
                        onClose={() => setConfirmDeleteFieldDialogOpen(false)}
                        onConfirm={() => {
                          setConfirmDeleteFieldDialogOpen(false);
                          onFieldRemove(index);
                        }}
                      />
                    </Grid>
                  );
                })}
              </SortableContext>
            </Grid>
            <DragOverlay dropAnimation={null}>
              {activeId ? (
                <Box p={1} width={400}>
                  {activeField?.fieldType === FORM_ELEMENTS.TEXT && (
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      {...activeField?.props}
                      focused
                      InputProps={{ readOnly: true }}
                      error={!activeField?.props.label}
                    />
                  )}
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
