import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";
import React from "react";
import { Drawer, Typography, Divider, Grid, Box, IconButton } from "@mui/material";
import { DRAWER_WIDTH_DESKTOP, DRAWER_WIDTH_TABLET, FORM_ELEMENTS_LIST } from "../../../constants";
import {
  StyledFormFieldItem,
  StyledFormFieldItemDragOverlay,
  StyledFormFieldItemPlaceholder,
} from "./Styles";
import { ChevronLeftOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addField } from "../../../store/features/formSlice";

interface IFormFieldsProps {
  isOpen: boolean;
  activeId?: UniqueIdentifier | null;
  onDrawerClick: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormFieldsSidebar = ({ isOpen, activeId, onDrawerClick, setIsOpen }: IFormFieldsProps) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.form.selected);
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
          width: { xs: DRAWER_WIDTH_TABLET, xl: DRAWER_WIDTH_DESKTOP },
          ...(isOpen && { position: "relative" }),
        },
      }}
    >
      <Box
        sx={{
          height: 50,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ height: 50, lineHeight: "50px" }}
            variant="subtitle1"
            textAlign={"center"}
          >
            Form Fields
          </Typography>
        </Box>
        <IconButton onClick={() => setIsOpen(false)} sx={{ ml: "auto" }}>
          <ChevronLeftOutlined />
        </IconButton>
      </Box>
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
                dispatch(
                  addField({
                    elementType: element.id,
                    addAfter: selected.length === 1 ? selected[0] : undefined,
                  })
                );
              }}
            >
              {isDragging ? (
                <StyledFormFieldItemPlaceholder />
              ) : (
                <StyledFormFieldItem key={element.id}>
                  {element.icon()}
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
          <StyledFormFieldItemDragOverlay disablePadding sx={{ height: 84, width: 84 }}>
            {activeElement.icon()}
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
