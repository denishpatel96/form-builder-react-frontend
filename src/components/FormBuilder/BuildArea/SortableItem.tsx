import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Box, Grid, IconButton, Typography, Grow } from "@mui/material";
import { lighten, useTheme } from "@mui/material/styles";
import { IFieldProps } from "../Types";
import {
  ContentCopyOutlined,
  DeleteOutlined,
  DragIndicator,
  SettingsOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { StyledFormFieldItemPlaceholder } from "../Styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toggleSelection, selectFields } from "../../../store/features/formSlice";
interface ISortableItemProps {
  field: IFieldProps;
  order: string[];
  deleted: boolean;
  onRenderField: (field?: IFieldProps) => JSX.Element;
  onDuplicateField: () => void;
  onTogglePropertiesDrawer: () => void;
  onShowDeleteFieldDialog: () => void;
}

const SortableItem = ({
  field,
  order,
  deleted,
  onRenderField,
  onDuplicateField,
  onTogglePropertiesDrawer,
  onShowDeleteFieldDialog,
}: ISortableItemProps) => {
  const theme = useTheme();
  const [hoveredFieldId, setHoveredFieldId] = React.useState<string>("");
  const { colSpan, id, name } = field;

  const selected = useAppSelector((state) => state.form.selected);
  const dispatch = useAppDispatch();

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

  const renderButtonsPanel = () => {
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
          justifyContent: "space-between",
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            pt: 4,
            display: "flex",
            animationName: "slide-left",
            animationDuration: "500ms",
            animationIterationCount: 1,
            animationTimingFunction: "ease-out",
            "@keyframes slide-left": {
              "0%": { transform: "translateX(20px)", opacity: 0 },
              "100%": { transform: "translateX(0px)", opacity: 1 },
            },
          }}
        >
          {hoveredFieldId === id && <DragIndicator color="disabled" />}
        </Box>

        {selected.length === 1 && selected[0] === id && (
          <Box
            sx={{
              mr: 2,
              borderRadius: "15px 15px 0 0",
              display: "flex",
              justifyContent: "center",
              borderColor: "action.hover",
              borderWidth: "2px 2px 0 2px",
              borderStyle: "solid",
              height: 25,
              animationName: "slide-out",
              animationDuration: "500ms",
              animationIterationCount: 1,
              animationTimingFunction: "ease-out",
              "@keyframes slide-out": {
                "0%": { transform: "translateY(20px)", opacity: 0 },
                "100%": { transform: "translateY(0px)", opacity: 1 },
              },
            }}
          >
            <IconButton
              title="Properties"
              sx={{ width: 30, height: 30 }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(selectFields([id]));
                onTogglePropertiesDrawer();
              }}
            >
              <SettingsOutlined sx={{ width: 20, height: 20 }} />
            </IconButton>
            <IconButton
              title="Duplicate"
              sx={{ width: 30, height: 30 }}
              onClick={(e) => {
                e.stopPropagation();
                onDuplicateField();
              }}
            >
              <ContentCopyOutlined sx={{ width: 18, height: 18 }} />
            </IconButton>
            <IconButton
              title="Remove"
              color="error"
              sx={{ width: 30, height: 30 }}
              onClick={(e) => {
                e.stopPropagation();
                onShowDeleteFieldDialog();
              }}
            >
              <DeleteOutlined sx={{ width: 20, height: 20 }} />
            </IconButton>
          </Box>
        )}
      </Box>
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
    <>
      <Grow
        in={!deleted}
        timeout={{
          enter: 750,
          exit: 750,
        }}
      >
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
            userSelect: "none",
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
                backgroundColor: lighten(theme.palette.background.paper, 0.25),
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
              flexDirection: "column",
              borderRadius: 2,
              ...(hoveredFieldId === id && {
                backgroundColor: theme.palette.action.hover,
              }),
              ...(selected.includes(id) && {
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
                ...(field.hidden && !selected.includes(id) && { opacity: 0.5 }),
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (selected.length === 1 && selected[0] === id) {
                  onTogglePropertiesDrawer();
                } else if (selected.length >= 1 && (e.ctrlKey || e.shiftKey)) {
                  dispatch(toggleSelection({ fieldId: id, contigous: e.shiftKey, order }));
                } else {
                  dispatch(selectFields([id]));
                }
              }}
            >
              {(selected.includes(id) || hoveredFieldId === id) &&
                !isDragging &&
                renderButtonsPanel()}
              {onRenderField(field)}
            </Box>

            {selected.includes(id) && field.hidden && hiddenWarning}
          </Box>
        </Grid>
      </Grow>
      {active?.id.toString().includes("ctrl_") && isOver && (
        <Grid item xs={12} height={80}>
          <StyledFormFieldItemPlaceholder />
        </Grid>
      )}
    </>
  );
};

export default SortableItem;
