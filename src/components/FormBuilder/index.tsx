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
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { getFormDesignProps } from "./Utility";
import _ from "lodash";
import { IFormDesignProps } from "./Types";
import FormDesignSidebar from "./FormDesignSidebar";
import { AddOutlined, PaletteOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addField, deselectFields, fetchFields, moveField } from "../../store/features/formSlice";
import { DRAWER_WIDTH_DESKTOP, DRAWER_WIDTH_TABLET, REQUEST_STATUS } from "../../constants";
import Spinner from "../Reusable/Spinner";

const FormBuilder = () => {
  const dispatch = useAppDispatch();
  const [over, setOver] = React.useState<Over | null>(null);
  const [active, setActive] = React.useState<Active | null>(null);

  const {
    fields: formFields,
    selected,
    reqStatus,
    reqError,
  } = useAppSelector((state) => state.form);
  const [isPropertiesOpen, setIsPropertiesOpen] = React.useState<boolean>(false);
  const [isFormFieldsOpen, setIsFormFieldsOpen] = React.useState<boolean>(true);
  const [isFormDesignOpen, setIsFormDesignOpen] = React.useState<boolean>(false);

  const [formProperties, setFormProperties] = React.useState<IFormDesignProps>(
    getFormDesignProps()
  );

  const handleFormDesignPropsChange = (path: string, value: any) => {
    setFormProperties((prev) => {
      const updated = { ...prev };
      _.set(updated, path, value);
      return updated;
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    //console.log("drag started");
    const { active } = event;
    setActive(active);
  };

  const handleDragCancel = (event: DragCancelEvent) => {
    //console.log("drag cancelled");
    setActive(null);
    setOver(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    //console.log("drag ended", event)
    const { active, over } = event;
    if (over && active.id !== over.id && active.id.toString().includes("ctrl_")) {
      console.log("event", active, over);
      dispatch(addField({ elementType: active.id.toString(), addAfter: over.id.toString() }));
    }
    setActive(null);
    setOver(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // console.log("drag over", event);
    const { active, over } = event;
    if (over && active.id !== over.id && !active.id.toString().includes("ctrl_")) {
      console.log("moving");
      // If element is dragged within sortable list
      // element should just move to index of over element.
      dispatch(moveField({ activeId: active.id.toString(), overId: over.id.toString() }));
    }
    setOver(event?.over);
  };

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

  React.useEffect(() => {
    if (reqStatus === REQUEST_STATUS.IDLE) {
      dispatch(fetchFields());
    }
  }, [dispatch, fetchFields]);

  return (
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
          height: "100vh",
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
        {reqStatus === REQUEST_STATUS.LOADING ? (
          <Spinner />
        ) : (
          <BuildArea
            formFields={formFields}
            formProperties={formProperties}
            onTogglePropertiesDrawer={() => setIsPropertiesOpen((prev) => !prev)}
          />
        )}
        <FormFieldPropertiesSidebar
          field={selected.length === 1 ? formFields.find((f) => f.id === selected[0]) : null}
          onTogglePin={() => setIsPropertiesOpen(true)}
          isOpen={isPropertiesOpen}
          setIsOpen={setIsPropertiesOpen}
        />
      </Box>
    </DndContext>
  );
};

export default FormBuilder;
