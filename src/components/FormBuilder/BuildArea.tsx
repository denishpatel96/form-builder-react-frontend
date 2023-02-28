import { Stack, Typography, TextField, Button, Box, IconButton } from "@mui/material";
import React from "react";
import { FORM_ELEMENTS } from "../../constants";
import Droppable from "./Droppable";
import { Delete, DeleteOutlined, OpenWithOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface IBuildAreaProps {
  formFields: any[];
  onFieldClick: (field: any) => void;
  selectedFormFieldIndex: number | null;
}

const BuildArea = ({ formFields, onFieldClick, selectedFormFieldIndex }: IBuildAreaProps) => {
  const theme = useTheme();
  const activeFieldStyle: React.CSSProperties = {
    borderStyle: "double",
    borderWidth: 1,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
  };
  return (
    <Droppable id="form-builder" style={{ width: "100%", height: "calc(100% - 60px)" }}>
      {formFields.length === 0 ? (
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
      ) : (
        <form>
          {formFields.map((field, index) => {
            const { fieldType, fieldProps } = field;
            switch (fieldType) {
              case FORM_ELEMENTS.TEXT:
                return (
                  <Box
                    component={"div"}
                    style={{ width: "100%", height: "auto", position: "relative" }}
                  >
                    <Box
                      component={"div"}
                      id={`${fieldProps.name}-container`}
                      key={index}
                      onClick={() => onFieldClick(index)}
                      style={{
                        padding: 10,
                        width: "100%",
                        height: "100%",
                        ...(selectedFormFieldIndex === index && activeFieldStyle),
                      }}
                    >
                      <TextField InputLabelProps={{ shrink: true }} {...fieldProps} />
                    </Box>
                    {/* <Box
                      component={"div"}
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: "translateY(-100%)",
                        zIndex: 9,
                        position: "absolute",
                        backgroundColor: "red",
                        opacity: 0.3,
                      }}
                    >
                      <IconButton>
                        <DeleteOutlined />
                      </IconButton>
                    </Box> */}
                  </Box>
                );

              default:
                return <></>;
            }
          })}
        </form>
      )}
    </Droppable>
  );
};

export default BuildArea;
