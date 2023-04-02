import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";
import React from "react";
import { Drawer, Typography, Divider, Grid } from "@mui/material";
import { ELEMENT_CATEGORIES, FORM_ELEMENTS_LIST } from "../../../constants";
import {
  StyledFormFieldItem,
  StyledFormFieldItemDragOverlay,
  StyledFormFieldItemPlaceholder,
} from "./Styles";

interface IFormFieldsProps {
  isOpen: boolean;
  activeId?: UniqueIdentifier | null;
  onDrawerClick: () => void;
  onFieldAdd: (id: string) => void;
}

export const getCategoryColor = (category: ELEMENT_CATEGORIES) => {
  switch (category) {
    case ELEMENT_CATEGORIES.TEXT:
      return "info.main";
    case ELEMENT_CATEGORIES.CHOICE:
      return "success.main";
    default:
      return "transparent";
  }
};

const FormFieldsSidebar = ({ isOpen, activeId, onDrawerClick, onFieldAdd }: IFormFieldsProps) => {
  const activeElement = FORM_ELEMENTS_LIST.find((e) => e.id === activeId);
  return (
    <Drawer
      open={isOpen}
      onClick={onDrawerClick}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
        if (e?.key === "Escape" || e?.code === "Escape") {
          onDrawerClick();
        }
      }}
      anchor={"left"}
      variant={isOpen ? "persistent" : "temporary"}
      PaperProps={{
        sx: {
          width: 280,
          maxWidth: "90vw",
          ...(isOpen && { position: "relative" }),
        },
      }}
    >
      <Typography sx={{ height: 50, lineHeight: "50px" }} variant="subtitle1" textAlign={"center"}>
        Form Fields
      </Typography>
      <Divider />
      <Grid container spacing={2} justifyContent="center" p={1}>
        {FORM_ELEMENTS_LIST.map((element) => {
          const { isDragging, attributes, listeners, setNodeRef } = useDraggable({
            id: element.id,
          });
          return (
            <Grid
              item
              ref={setNodeRef}
              {...attributes}
              {...listeners}
              key={element.id}
              sx={{ height: 100, width: 100 }}
              onClick={(e) => {
                e.stopPropagation();
                onFieldAdd(element.id);
              }}
            >
              {isDragging ? (
                <StyledFormFieldItemPlaceholder />
              ) : (
                <StyledFormFieldItem
                  key={element.id}
                  sx={{
                    ".MuiSvgIcon-root": { color: getCategoryColor(element.category) },
                  }}
                >
                  {element.icon}
                  <Typography
                    pt={1}
                    color="grey.800"
                    variant="caption"
                    fontWeight={500}
                    textAlign={"center"}
                  >
                    {element.label}
                  </Typography>
                </StyledFormFieldItem>
              )}
            </Grid>
          );
        })}
      </Grid>
      <DragOverlay dropAnimation={null}>
        {activeId && activeElement && activeId.toString().includes("ctrl_") ? (
          <StyledFormFieldItemDragOverlay
            disablePadding
            sx={{
              ".MuiSvgIcon-root": { color: getCategoryColor(activeElement.category) },
              height: 84,
              width: 84,
            }}
          >
            {activeElement.icon}
            <Typography pt={1} variant="caption" fontWeight={500} textAlign={"center"}>
              {activeElement.label}
            </Typography>
          </StyledFormFieldItemDragOverlay>
        ) : null}
      </DragOverlay>
    </Drawer>
  );
};

export default FormFieldsSidebar;
