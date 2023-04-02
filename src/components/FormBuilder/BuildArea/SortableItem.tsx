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
  EditOutlined,
  SettingsOutlined,
  TuneOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import RemoveFieldDialog from "./RemoveFieldDialog";
import { StyledFormFieldItemPlaceholder } from "../FormFieldsSideBar/Styles";

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
        sx={{
          position: "absolute",
          cursor: "move",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 10,
          display: "flex",
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            pt: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <DragIndicator sx={{ transform: "rotate(90deg)" }} color="disabled" />
        </Box>
        {renderButtons()}
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
    <Box
      sx={{
        pt: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <IconButton
        title="Properties"
        size="small"
        sx={{ width: 30, height: 30 }}
        onClick={(e) => {
          e.stopPropagation();
          onFieldSelect(id);
          onTogglePropertiesDrawer();
        }}
      >
        <TuneOutlined sx={{ width: 20, height: 20 }} />
      </IconButton>
      <IconButton
        title="Remove"
        size="small"
        color="error"
        sx={{ ml: 1, width: 30, height: 30 }}
        onClick={(e) => {
          e.stopPropagation();
          setConfirmDeleteFieldDialogOpen(true);
        }}
      >
        <DeleteOutlined sx={{ width: 20, height: 20 }} />
      </IconButton>
    </Box>
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
    <>
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
            }),
          ...(isDragging && {
            ":before": {
              content: '""',
              position: "absolute",
              zIndex: 11,
              height: "95%",
              width: "100%",
              borderRadius: 2,
              backgroundColor: theme.palette.grey[200],
              border: `2px dashed ${theme.palette.secondary.main}`,
            },
          }),
        }}
      >
        <Box
          {...listeners}
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
            ...(hoveredFieldId === id && {
              pr: 2,
              pt: 3,
              backgroundColor: theme.palette.action.hover,
            }),
            ...(selectedFieldId === id && {
              pr: 2,
              pt: 3,
              borderLeftColor: theme.palette.secondary.light,
              borderLeftWidth: 4,
              borderLeftStyle: "solid",
              backgroundColor: theme.palette.action.hover,
            }),
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              p: 1,
              ...(field.hidden && selectedFieldId !== id && { opacity: 0.5 }),
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (selectedFieldId === id) {
                onTogglePropertiesDrawer();
              } else {
                onFieldSelect(id);
              }
            }}
          >
            {(selectedFieldId === id || hoveredFieldId === id) && renderDragHandle()}
            {renderElement(field)}
          </Box>

          {renderRemoveFieldDialog()}
        </Box>

        {selectedFieldId === id && field.hidden && hiddenWarning}
      </Grid>
      {active?.id.toString().includes("ctrl_") && isOver && (
        <Grid item xs={12} height={80}>
          <StyledFormFieldItemPlaceholder />
        </Grid>
      )}
    </>
  );
};

export default SortableItem;
