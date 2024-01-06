import React from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragCancelEvent,
  Over,
  pointerWithin,
  Active,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import BuildArea from "./BuildArea";
import FormFieldsSidebar from "./FormFieldsSideBar";
import FormFieldPropertiesSidebar from "./FormFieldsPropertiesSidebar";
import { Alert, Box, Button, IconButton, Typography } from "@mui/material";
import { getField, getFormDesignProps } from "./Utility";
import { set } from "lodash";
import { IFormDesignProps } from "./Types";
import FormDesignSidebar from "./FormDesignSidebar";
import { AddOutlined, PaletteOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deselectFields, selectFields } from "../../store/features/formSlice";
import { DRAWER_WIDTH_DESKTOP, DRAWER_WIDTH_TABLET, ROUTE_WORKSPACES } from "../../constants";
import Spinner from "../Reusable/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import api, { useGetFormSchemaQuery, useUpdateFormSchemaMutation } from "../../store/features/api";
import { sortArray } from "../../helpers/functions";

const FormBuilder = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [over, setOver] = React.useState<Over | null>(null);
  const [active, setActive] = React.useState<Active | null>(null);
  const { selected } = useAppSelector((state) => state.form);
  const { username } = useAppSelector((state) => state.auth);
  const { orgId, formId, workspaceId } = useParams() as {
    orgId: string;
    workspaceId: string;
    formId: string;
  };

  const {
    isLoading,
    isFetching,
    data: formSchema,
    isError,
    error,
  } = useGetFormSchemaQuery(
    { orgId, workspaceId, formId },
    { skip: !(orgId && workspaceId && formId) }
  );

  const [updateFormSchema] = useUpdateFormSchemaMutation();

  const [isPropertiesOpen, setIsPropertiesOpen] = React.useState<boolean>(false);
  const [isFormFieldsOpen, setIsFormFieldsOpen] = React.useState<boolean>(true);
  const [isFormDesignOpen, setIsFormDesignOpen] = React.useState<boolean>(false);

  const [formProperties, setFormProperties] = React.useState<IFormDesignProps>(
    getFormDesignProps()
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  let buildArea = <Spinner />;
  if (formSchema && !(isFetching || isLoading)) {
    const { fields, lastFieldId } = formSchema;
    const handleFormDesignPropsChange = (path: string, value: any) => {
      setFormProperties((prev) => {
        const updated = { ...prev };
        set(updated, path, value);
        return updated;
      });
    };

    const handleDragStart = (event: DragStartEvent) => {
      //console.log("drag started");
      const { active } = event;
      setActive(active);
      dispatch(selectFields([active.id.toString()]));
    };

    const handleDragCancel = (_event: DragCancelEvent) => {
      //console.log("drag cancelled");
      setActive(null);
      setOver(null);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
      //console.log("drag ended", event)
      const { active, over } = event;
      // move field
      // TODO: Inefficient code, it must only run when there is actual change in index.
      if (!active.id.toString().includes("ctrl_")) {
        await updateFormSchema({
          orgId,
          workspaceId,
          formId,
          action: "MOVE_FIELDS",
          order: fields.map((f) => f.id),
        });
      }

      // add field
      if (over && active.id !== over.id && active.id.toString().includes("ctrl_")) {
        console.log("event", active, over);
        const fieldToAdd = getField(active.id.toString(), lastFieldId + 1);

        if (fieldToAdd) {
          const fieldId = fieldToAdd.id;
          const addAfter = over.id.toString();
          let updatedOrder = [...fields.map((f) => f.id)];
          if (addAfter) {
            updatedOrder.splice(
              updatedOrder.findIndex((id: string) => id === addAfter) + 1,
              0,
              fieldId
            );
          } else {
            updatedOrder.push(fieldId);
          }

          await updateFormSchema({
            orgId,
            workspaceId,
            formId,
            action: "ADD_FIELDS",
            lastFieldId: lastFieldId + 1,
            order: updatedOrder,
            fields: [fieldToAdd],
          });
        }
      }
      setActive(null);
      setOver(null);
    };

    const handleDragOver = async (event: DragOverEvent) => {
      const { active, over } = event;
      // move field updating local cache only
      if (over && active.id !== over.id && !active.id.toString().includes("ctrl_")) {
        let updatedOrder = fields.map((f) => f.id);
        const oldIndex = updatedOrder.findIndex((id) => id === active.id.toString());
        const newIndex = updatedOrder.findIndex((id) => id === over.id.toString());
        const id = updatedOrder.splice(oldIndex, 1);
        updatedOrder.splice(newIndex, 0, ...id);

        dispatch(
          api.util.updateQueryData(
            "getFormSchema",
            { orgId, workspaceId, formId },
            (draftedFormSchema) => {
              draftedFormSchema.fields = sortArray(draftedFormSchema.fields, updatedOrder);
            }
          )
        );
      }

      setOver(event?.over);
    };

    const renderFormDesignButton = () => {
      return (
        <Box
          onClick={() => {
            setIsFormDesignOpen((prev) => !prev);
            setIsFormFieldsOpen(false);
          }}
          sx={{
            position: "absolute",
            height: 40,
            width: 100,
            zIndex: 12,
            cursor: "pointer",
            borderRadius: "0 20px 20px 0",
            left: isFormFieldsOpen ? { xs: DRAWER_WIDTH_TABLET, xl: DRAWER_WIDTH_DESKTOP } : 0,
            top: 60,
            boxShadow: (theme) => theme.shadows[1],
            background: `linear-gradient(to right, #fc5c7d, #6a82fb)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translateX(-60px)",
            transition: "200ms ease",
            ":hover": {
              boxShadow: (theme) => theme.shadows[5],
              transform: "translateX(0px)",
              transition: "200ms ease",
            },
          }}
        >
          <Typography variant="caption" fontWeight={500} textAlign={"center"} color="white">
            Form Designer
          </Typography>
          <IconButton>
            <PaletteOutlined sx={{ color: "white" }} />
          </IconButton>
        </Box>
      );
    };

    const renderFormFieldsButton = () => {
      return (
        <Box
          onClick={() => {
            setIsFormFieldsOpen((prev) => !prev);
            setIsFormDesignOpen(false);
          }}
          sx={{
            position: "absolute",
            height: 40,
            width: 100,
            zIndex: 12,
            cursor: "pointer",
            borderRadius: "0 20px 20px 0",
            left: isFormDesignOpen ? { xs: DRAWER_WIDTH_TABLET, xl: DRAWER_WIDTH_DESKTOP } : 0,
            top: 110,
            boxShadow: (theme) => theme.shadows[1],
            background: (theme) => theme.palette.background.paper,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translateX(-60px)",
            transition: "200ms ease",
            ":hover": {
              boxShadow: (theme) => theme.shadows[5],
              transform: "translateX(0px)",
              transition: "200ms ease",
            },
          }}
        >
          <Typography variant="caption" fontWeight={500} textAlign={"center"}>
            Add Elements
          </Typography>
          <IconButton color="primary">
            <AddOutlined />
          </IconButton>
        </Box>
      );
    };

    buildArea = (
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragCancel={handleDragCancel}
        autoScroll={!!over}
        collisionDetection={pointerWithin}
      >
        <Box
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
            if ((e?.key === "s" || e?.code === "KeyS") && e.ctrlKey) {
              e.preventDefault();
              alert("Save Document");
            }
          }}
          style={{
            minHeight: 500,
            height: "100%",
            width: "100%",
            display: "flex",
            position: "relative",
          }}
        >
          {renderFormFieldsButton()}
          <FormFieldsSidebar
            activeId={active?.id?.toString() || ""}
            onDrawerClick={() => dispatch(deselectFields())}
            isOpen={isFormFieldsOpen}
            setIsOpen={setIsFormFieldsOpen}
          />
          {renderFormDesignButton()}
          <FormDesignSidebar
            setIsOpen={setIsFormDesignOpen}
            formProperties={formProperties}
            onPropsChange={handleFormDesignPropsChange}
            isOpen={isFormDesignOpen}
          />
          <BuildArea
            formFields={fields}
            lastFieldId={lastFieldId}
            formProperties={formProperties}
            onTogglePropertiesDrawer={() => setIsPropertiesOpen(true)}
          />
          <FormFieldPropertiesSidebar
            field={selected.length === 1 ? fields.find((f) => f.id === selected[0]) : null}
            isOpen={isPropertiesOpen}
            setIsOpen={setIsPropertiesOpen}
          />
        </Box>
      </DndContext>
    );
  } else if (isError) {
    console.log("Error fetching form details :", error);
    buildArea = (
      <>
        <Alert severity="error">Error fetching form details.</Alert>
        <Button onClick={() => navigate(ROUTE_WORKSPACES.replace(":orgId", username))}>
          Go to Workspaces
        </Button>
      </>
    );
  }

  return buildArea;
};

export default FormBuilder;
