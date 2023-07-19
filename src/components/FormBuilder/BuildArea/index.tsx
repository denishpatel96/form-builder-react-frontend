import { Stack, Typography, Box, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import Droppable from "../../Reusable/Droppable";
import { OpenWithOutlined } from "@mui/icons-material";
import { SortableContext } from "@dnd-kit/sortable";
import { DragOverlay, useDndMonitor, defaultDropAnimationSideEffects, Active } from "@dnd-kit/core";
import { DragCancelEvent, DragEndEvent, DragStartEvent } from "@dnd-kit/core/dist/types";
import { FieldProps, IFormDesignProps } from "../Types";
import SortableItem from "./SortableItem";
import BuildAreaHeader from "./BuildAreaHeader";
import { getFieldBuilder } from "./FieldBuilders";
import { getCustomTheme } from "../../../theme";
import { cloneDeep } from "lodash";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deselectFields } from "../../../store/features/formSlice";

interface IBuildAreaProps {
  formFields: FieldProps[];
  formProperties: IFormDesignProps;
  onTogglePropertiesDrawer: () => void;
}

const BuildArea = ({ formFields, formProperties, onTogglePropertiesDrawer }: IBuildAreaProps) => {
  const dispatch = useAppDispatch();
  const customTheme = getCustomTheme({ ...cloneDeep(formProperties.palette) });
  const [active, setActive] = React.useState<Active | null>(null);
  const activeField = React.useMemo(
    () => formFields.find((el) => el.id === active?.id),
    [formFields, active]
  );

  const selected = useAppSelector((state) => state.form.selected);
  const selectedFieldId = selected[0];

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

  const handleDragCancel = (_event: DragCancelEvent) => {
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
      <Droppable
        id="form-builder"
        style={{ width: "100%", maxWidth: formProperties.formWidth, height: "100%" }}
      >
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
        <Grid
          container
          rowSpacing={`${formProperties.verticalSpacing}px`}
          columnSpacing={`${formProperties.horizontalSpacing}px`}
        >
          <SortableContext items={formFields.map((f) => f.id)}>
            {formFields.map((field, index) => {
              return (
                <SortableItem
                  key={index}
                  field={field}
                  renderElement={getFieldBuilder}
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
                bgcolor: (theme) => theme.palette.background.paper,
                boxShadow: (theme) => theme.shadows[10],
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
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 500,
        maxWidth: "100%",
        position: "relative",
      }}
    >
      <BuildAreaHeader formFields={formFields} formProperties={formProperties} />

      <ThemeProvider theme={customTheme}>
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 500,
            width: "100%",
            position: "relative",
            overflowY: "auto",
            overflowX: "hidden",
            bgcolor: customTheme.palette?.background?.default,
            backgroundImage: `url(${formProperties.pageImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
            if (e?.key === "Escape" || e?.code === "Escape") {
              dispatch(deselectFields());
            }
          }}
          onClick={() => dispatch(deselectFields())}
        >
          <Box
            sx={{
              margin: "24px auto",
              padding: `${formProperties.verticalPadding}px ${formProperties.horizontalPadding}px`,
              height: "auto",
              width: "calc(100% - 48px)",
              maxWidth: formProperties.formWidth,
              bgcolor: (theme) => theme.palette.background.paper,
              boxShadow: (theme) => theme.shadows[1],
              borderRadius: 2,
              ".MuiTypography-root": {
                color: (theme) => theme.palette.text.secondary,
              },
              backgroundImage: `url(${formProperties.formImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {renderFormArea()}
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default BuildArea;
