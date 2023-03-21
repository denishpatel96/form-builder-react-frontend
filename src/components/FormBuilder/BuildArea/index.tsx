import { Stack, Typography, Box, Grid, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { FORM_ELEMENTS } from "../../../constants";
import Droppable from "../../Reusable/Droppable";
import { OpenWithOutlined } from "@mui/icons-material";
import { SortableContext } from "@dnd-kit/sortable";
import { DragOverlay, useDndMonitor, defaultDropAnimationSideEffects, Active } from "@dnd-kit/core";
import { DragCancelEvent, DragEndEvent, DragStartEvent } from "@dnd-kit/core/dist/types";
import {
  TextFieldBuilder,
  RadioFieldBuilder,
  CheckboxFieldBuilder,
  DropdownFieldBuilder,
  ComboboxFieldBuilder,
} from "./FieldBuilders";
import {
  ITextProps,
  IRadioProps,
  FieldProps,
  ICheckboxProps,
  IDropdownProps,
  IComboboxProps,
} from "../Types";
import SortableItem from "./SortableItem";
import BuildAreaHeader from "./BuildAreaHeader";

interface IBuildAreaProps {
  formFields: FieldProps[];
  setFormFields: React.Dispatch<React.SetStateAction<FieldProps[]>>;
  onFieldRemove: (id: string) => void;
  onFieldSelect: React.Dispatch<React.SetStateAction<string>>;
  selectedFieldId: string;
  setSelectedFieldId: React.Dispatch<React.SetStateAction<string>>;
  onTogglePropertiesDrawer: () => void;
}

export const renderElement = (field?: FieldProps) => {
  if (!field) return <></>;
  const { fieldType } = field;
  return (
    <>
      {fieldType === FORM_ELEMENTS.TEXT && <TextFieldBuilder field={field as ITextProps} />}
      {fieldType === FORM_ELEMENTS.RADIO && <RadioFieldBuilder field={field as IRadioProps} />}
      {fieldType === FORM_ELEMENTS.DROPDOWN && (
        <DropdownFieldBuilder field={field as IDropdownProps} />
      )}
      {fieldType === FORM_ELEMENTS.CHECKBOX && (
        <CheckboxFieldBuilder field={field as ICheckboxProps} />
      )}
      {fieldType === FORM_ELEMENTS.COMBOBOX && (
        <ComboboxFieldBuilder field={field as IComboboxProps} />
      )}
    </>
  );
};

const BuildArea = ({
  formFields,
  setFormFields,
  onFieldRemove,
  onFieldSelect,
  selectedFieldId,
  setSelectedFieldId,
  onTogglePropertiesDrawer,
}: IBuildAreaProps) => {
  const theme = useTheme();
  const [active, setActive] = React.useState<Active | null>(null);
  const activeField = React.useMemo(
    () => formFields.find((el) => el.id === active?.id),
    [formFields, active]
  );
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

  const handleDragCancel = (event: DragCancelEvent) => {
    setActive(null);
  };

  React.useEffect(() => {
    console.count("useEffect");
    console.log("selected id", selectedFieldId);
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
      <Droppable id="form-builder" style={{ width: "100%", height: "calc(100% - 60px)" }}>
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
        <Grid container spacing={1}>
          <SortableContext items={formFields.map((f) => f.id)}>
            {formFields.map((field, index) => {
              return (
                <SortableItem
                  key={index}
                  field={field}
                  renderElement={renderElement}
                  selectedFieldId={selectedFieldId}
                  onFieldSelect={onFieldSelect}
                  onFieldRemove={onFieldRemove}
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
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
              }}
            >
              {renderElement(activeField)}
            </Box>
          ) : null}
        </DragOverlay>
      </form>
    );

  return (
    <Box style={{ flexGrow: 1, display: "flex", minWidth: 500 }}>
      <Container style={{ height: "100%" }}>
        <BuildAreaHeader formFields={formFields} />
        <Box
          sx={{
            p: 2,
            height: `calc(100vh - 70px)`,
            overflow: "auto",
            bgcolor: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
          }}
          onClick={() => setSelectedFieldId("")}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
            if (e?.key === "Escape" || e?.code === "Escape") {
              setSelectedFieldId("");
            }
          }}
        >
          {renderFormArea()}
        </Box>
      </Container>
    </Box>
  );
};

export default BuildArea;
