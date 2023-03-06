import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { FORM_ELEMENTS_LIST } from "../../../constants";
import { useTheme } from "@mui/material/styles";
import { FieldProps } from "../FormElements/Common/Types";
import {
  DeleteOutlined,
  DragIndicator,
  SettingsOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import RemoveFieldDialog from "../Dialogs/RemoveFieldDialog";

interface ISortableItemProps {
  index: number;
  field: FieldProps;
  renderElement: (field?: FieldProps) => JSX.Element;
  setHoveredFieldIndex: React.Dispatch<React.SetStateAction<number | null>>;
  hoveredFieldIndex: number | null;
  onFieldRemove: (index: number) => void;
  onFieldSelect: React.Dispatch<React.SetStateAction<string>>;
  setConfirmDeleteFieldDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFieldId: string;
  confirmDeleteFieldDialogOpen: boolean;
  onTogglePropertiesDrawer: () => void;
}

const SortableItem = ({
  index,
  field,
  renderElement,
  hoveredFieldIndex,
  setHoveredFieldIndex,
  onFieldRemove,
  onFieldSelect,
  selectedFieldId,
  confirmDeleteFieldDialogOpen,
  setConfirmDeleteFieldDialogOpen,
  onTogglePropertiesDrawer,
}: ISortableItemProps) => {
  const theme = useTheme();
  const { colSpan, fieldType, label, id, name } = field;
  const type = FORM_ELEMENTS_LIST.find((el) => el.id === fieldType)?.label;
  const fieldName = `${label} (${type})`;

  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    transition: {
      duration: 600, // milliseconds
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const containerStyle = { transform: CSS.Translate.toString(transform), transition };

  const renderDragHandle = (index: number) => {
    return hoveredFieldIndex === index ? (
      <IconButton {...listeners} sx={{ cursor: "move", height: 25, width: 25 }}>
        <DragIndicator sx={{ height: 20, width: 20 }} />
      </IconButton>
    ) : (
      <></>
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

  const renderButtons = (id: string): JSX.Element => (
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
        opacity: isDragging ? 0 : 1,
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
        {renderDragHandle(index)}
        <Box
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
        </Box>

        {hoveredFieldIndex === index && renderButtons(id)}

        {renderRemoveFieldDialog(index, fieldName)}
      </Box>

      {selectedFieldId === id && field.hidden && hiddenWarning}
    </Grid>
  );
};

export default SortableItem;
