import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { FORM_ELEMENTS_LIST } from "../../../constants";
import { useTheme } from "@mui/material/styles";
import { FieldProps } from "../Types";
import {
  DeleteOutlined,
  DragIndicator,
  SettingsOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import RemoveFieldDialog from "./RemoveFieldDialog";

interface ISortableItemProps {
  field: FieldProps;
  renderElement: (field?: FieldProps) => JSX.Element;
  onFieldRemove: (id: string) => void;
  onFieldSelect: React.Dispatch<React.SetStateAction<string>>;
  selectedFieldId: string;
  onTogglePropertiesDrawer: () => void;
}

const SortableItem = ({
  field,
  renderElement,
  onFieldRemove,
  onFieldSelect,
  selectedFieldId,
  onTogglePropertiesDrawer,
}: ISortableItemProps) => {
  const theme = useTheme();
  const [hoveredFieldId, setHoveredFieldId] = React.useState<string>("");
  const { colSpan, fieldType, label, id, name } = field;

  const type = FORM_ELEMENTS_LIST.find((el) => el.id === fieldType)?.label;
  const fieldName = `${label} (${type})`;

  const [confirmDeleteFieldDialogOpen, setConfirmDeleteFieldDialogOpen] =
    React.useState<boolean>(false);

  const { active, isOver, isDragging, attributes, listeners, setNodeRef, transition } = useSortable(
    {
      id,
      transition: {
        duration: 600, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    }
  );

  // This is used to move other elements as you drag the element.
  // This is not stable currently for variable size of elements so avoiding it.
  // TODO : Try to use it in future if necessary support is added.
  // transform: CSS.Translate.toString(transform),
  const containerStyle = { transition };

  const renderDragHandle = () => {
    return (
      <Box
        {...listeners}
        sx={{
          cursor: "move",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 25,
        }}
      >
        <DragIndicator color="secondary" sx={{ height: 20, width: 20 }} />
      </Box>
    );
  };

  const renderRemoveFieldDialog = () => {
    return (
      <RemoveFieldDialog
        isOpen={confirmDeleteFieldDialogOpen}
        fieldName={fieldName}
        onClose={() => setConfirmDeleteFieldDialogOpen(false)}
        onConfirm={() => {
          setConfirmDeleteFieldDialogOpen(false);
          onFieldRemove(id);
        }}
      />
    );
  };

  const renderButtons = (): JSX.Element => (
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

  const hiddenWarning = (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center", p: 1 }}>
      <WarningAmberOutlined color="warning" sx={{ width: 15, height: 15 }} />
      <Typography pl={1} variant="caption" color={"warning.main"}>
        This field is hidden so it will not appear in the form.
      </Typography>
    </Box>
  );

  return (
    <Grid
      ref={setNodeRef}
      style={containerStyle}
      {...attributes}
      item
      xs={12}
      md={colSpan}
      key={id}
      id={`${name}-container`}
      onMouseOver={() => {
        setHoveredFieldId(id);
      }}
      onMouseLeave={() => {
        setHoveredFieldId("");
      }}
      sx={{
        width: "100%",
        height: "auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...(active?.id.toString().includes("ctrl_") &&
          isOver && {
            backgroundColor: theme.palette.action.hover,
            ":after": {
              content: '"Drop here to add after this element"',
              lineHeight: 1.5,
              color: theme.palette.secondary.main,
              fontWeight: 600,
              fontSize: "0.85rem",
              p: 1,
            },
          }),
        opacity: isDragging ? 0 : 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          alignItems: "center",
          ...(hoveredFieldId === id && {
            backgroundColor: theme.palette.action.hover,
          }),
          ...(selectedFieldId === id && {
            borderLeftColor: theme.palette.secondary.light,
            borderLeftWidth: 4,
            borderLeftStyle: "solid",
            boxShadow: theme.shadows[2],
          }),
        }}
      >
        {(selectedFieldId === id || hoveredFieldId === id) && renderDragHandle()}
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
            ...(field.hidden && selectedFieldId !== id && { opacity: 0.5 }),
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (selectedFieldId === id) {
              onTogglePropertiesDrawer();
            } else {
              onFieldSelect(id);
            }
          }}
        >
          {renderElement(field)}
        </Box>

        {(selectedFieldId === id || hoveredFieldId === id) && renderButtons()}

        {renderRemoveFieldDialog()}
      </Box>

      {selectedFieldId === id && field.hidden && hiddenWarning}
    </Grid>
  );
};

export default SortableItem;
