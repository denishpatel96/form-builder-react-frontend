import { Stack, Typography, Box, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import Droppable from "../../Reusable/Droppable";
import { OpenWithOutlined } from "@mui/icons-material";
import { SortableContext } from "@dnd-kit/sortable";
import { DragOverlay, useDndMonitor, defaultDropAnimationSideEffects, Active } from "@dnd-kit/core";
import { DragCancelEvent, DragEndEvent, DragStartEvent } from "@dnd-kit/core/dist/types";
import { IFieldProps, IFormDesignProps } from "../Types";
import SortableItem from "./SortableItem";
import BuildAreaHeader from "./BuildAreaHeader";
import { getBuilder } from "./FieldBuilders";
import { getCustomTheme } from "../../../theme";
import { cloneDeep } from "lodash";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deselectFields } from "../../../store/features/formSlice";
import { useParams } from "react-router-dom";
import { useUpdateFormSchemaMutation } from "../../../store/features/api";
import RemoveFieldDialog from "./RemoveFieldDialog";

interface IBuildAreaProps {
  formFields: IFieldProps[];
  lastFieldId: number;
  formProperties: IFormDesignProps;
  onTogglePropertiesDrawer: () => void;
}

const BuildArea = ({
  formFields,
  lastFieldId,
  formProperties,
  onTogglePropertiesDrawer,
}: IBuildAreaProps) => {
  const dispatch = useAppDispatch();
  const { orgId, formId, workspaceId } = useParams() as {
    orgId: string;
    workspaceId: string;
    formId: string;
  };
  const customTheme = getCustomTheme({ ...cloneDeep(formProperties.palette) });
  const [active, setActive] = React.useState<Active | null>(null);
  const activeField = React.useMemo(
    () => formFields?.find((el) => el.id === active?.id),
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

  const [updateFormSchema] = useUpdateFormSchemaMutation();

  const handleDragCancel = (_event: DragCancelEvent) => {
    setActive(null);
  };

  const handleDuplicateFields = async ({
    placement,
    afterElementId,
  }: {
    placement?: "bottom" | "top" | "after";
    afterElementId?: string;
  }) => {
    const order = formFields.map((f) => f.id);
    const placementIndex: number =
      placement === "top"
        ? 0
        : placement === "bottom"
        ? order.length
        : order.findIndex((id) => id === (afterElementId || selected[0])) + 1;
    const cloneFields: IFieldProps[] = [];
    let updatedLastFieldId = lastFieldId;
    selected.forEach((id) => {
      const indexOfFieldToCopy = formFields.findIndex((f) => f.id === id);
      if (indexOfFieldToCopy !== -1) {
        const cloneField = cloneDeep(formFields[indexOfFieldToCopy]);
        updatedLastFieldId += 1;
        cloneField.id = cloneField.name = `q${updatedLastFieldId}`;
        cloneFields.push(cloneField);
      }
    });

    let updatedOrder = [...order];
    updatedOrder.splice(placementIndex, 0, ...cloneFields.map((f) => f.id));

    await updateFormSchema({
      orgId,
      workspaceId,
      formId,
      action: "ADD_FIELDS",
      lastFieldId: updatedLastFieldId,
      order: updatedOrder,
      fields: cloneFields,
    });
  };

  const handleRemoveFields = async (fieldIds: string[]) => {
    let updatedOrder = [...formFields.map((f) => f.id)];
    updatedOrder = updatedOrder.filter((id) => !fieldIds.includes(id));
    // send update request to server
    await updateFormSchema({
      orgId,
      workspaceId,
      formId,
      action: "DELETE_FIELDS",
      order: updatedOrder,
      fieldIds,
    });
  };

  const handleShowDeleteFieldDialog = () => {
    setConfirmDeleteFieldDialogOpen(true);
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

  const [confirmDeleteFieldDialogOpen, setConfirmDeleteFieldDialogOpen] =
    React.useState<boolean>(false);
  const [deleted, setDeleted] = React.useState<string[]>([]);
  const renderRemoveFieldDialog = () => {
    const fields = formFields.filter((f) => selected.includes(f.id));
    return (
      <RemoveFieldDialog
        isOpen={confirmDeleteFieldDialogOpen}
        fields={fields}
        onClose={() => setConfirmDeleteFieldDialogOpen(false)}
        onConfirm={async () => {
          const toBeDeleted = [...selected];
          setConfirmDeleteFieldDialogOpen(false);
          setDeleted(toBeDeleted);
          setTimeout(() => handleRemoveFields(toBeDeleted), 1000);
        }}
      />
    );
  };

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
      <form
        onKeyDown={(e: React.KeyboardEvent<HTMLFormElement> | undefined) => {
          if (e?.key === "Delete" || e?.code === "Delete") {
            console.log("Delete pressed");
            setConfirmDeleteFieldDialogOpen(true);
          }
        }}
      >
        <Grid
          container
          rowSpacing={`${formProperties.verticalSpacing}px`}
          columnSpacing={`${formProperties.horizontalSpacing}px`}
        >
          <SortableContext items={formFields.map((f) => f.id)}>
            {formFields.map((field) => {
              return (
                <SortableItem
                  key={field.id}
                  deleted={deleted.includes(field.id)}
                  field={field}
                  order={formFields.map((f) => f.id)}
                  onRenderField={getBuilder}
                  onDuplicateField={() => handleDuplicateFields({})}
                  onTogglePropertiesDrawer={onTogglePropertiesDrawer}
                  onShowDeleteFieldDialog={handleShowDeleteFieldDialog}
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
              {getBuilder(activeField)}
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
      <BuildAreaHeader
        formFields={formFields}
        formProperties={formProperties}
        onDuplicate={handleDuplicateFields}
        onShowDeleteFieldDialog={handleShowDeleteFieldDialog}
      />

      {renderRemoveFieldDialog()}
      <ThemeProvider theme={customTheme}>
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 500,
            width: "100%",
            position: "relative",
            overflowY: "auto",
            overflowX: "hidden",
            bgcolor: (theme) => theme.palette.background.default,
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
              overflowX: "hidden",
              padding: `${formProperties.verticalPadding}px ${formProperties.horizontalPadding}px`,
              height: "auto",
              width: "calc(100% - 48px)",
              maxWidth: formProperties.formWidth,
              bgcolor: (theme) => theme.palette.background.paper,
              boxShadow: (theme) => theme.shadows[10],
              // borderRadius: 2,
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
