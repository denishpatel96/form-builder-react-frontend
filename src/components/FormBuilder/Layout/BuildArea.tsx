import { Stack, Typography, TextField, Button, Box } from "@mui/material";
import React from "react";
import { FORM_ELEMENTS, FORM_ELEMENTS_LIST } from "../../../constants";
import Droppable from "../../Reusable/Droppable";
import { DeleteOutlined, OpenWithOutlined, SettingsOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import RemoveFieldDialog from "../Dialogs/RemoveFieldDialog";

interface IBuildAreaProps {
  formFields: any[];
  onFieldRemove: (index: number) => void;
  onFieldSelect: (index: number) => void;
  selectedFormFieldIndex: number | null;
  onTogglePropertiesDrawer: () => void;
}

const BuildArea = ({
  formFields,
  onFieldRemove,
  onFieldSelect,
  selectedFormFieldIndex,
  onTogglePropertiesDrawer,
}: IBuildAreaProps) => {
  const theme = useTheme();
  const [hoveredFieldIndex, setHoveredFieldIndex] = React.useState<number | null>(null);
  const activeFieldStyle: React.CSSProperties = {
    borderStyle: "double",
    borderWidth: 1,
    borderColor: theme.palette.grey[900],
    borderRadius: theme.shape.borderRadius,
  };
  const [confirmDeleteFieldDialogOpen, setConfirmDeleteFieldDialogOpen] =
    React.useState<boolean>(false);

  const buttons = (index: number): JSX.Element => (
    <Box
      px={1}
      onClick={(e) => {
        e.stopPropagation();
        onFieldSelect(index);
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        transform: "translateY(50%)",
      }}
    >
      <Button
        size="small"
        color="error"
        startIcon={<DeleteOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          setConfirmDeleteFieldDialogOpen(true);
        }}
      >
        Remove
      </Button>
      <Button
        size="small"
        startIcon={<SettingsOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onFieldSelect(index);
          onTogglePropertiesDrawer();
        }}
      >
        Properties
      </Button>
    </Box>
  );

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
            const { fieldType, props } = field;
            const type = FORM_ELEMENTS_LIST.find((el) => el.id === fieldType)?.label;
            const fieldName = `${props.label} (${type})`;
            return (
              <Box
                component="div"
                id={`${props.name}-container`}
                key={index}
                onMouseOver={() => {
                  setHoveredFieldIndex(index);
                }}
                onMouseLeave={() => {
                  setHoveredFieldIndex(null);
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  cursor: "move",
                  ...(selectedFormFieldIndex === index && activeFieldStyle),
                }}
              >
                <Box p={1}>
                  {fieldType === FORM_ELEMENTS.TEXT && (
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      {...props}
                      InputProps={{ readOnly: true }}
                      error={!props.label}
                    />
                  )}
                </Box>
                {hoveredFieldIndex === index && buttons(index)}

                <RemoveFieldDialog
                  isOpen={confirmDeleteFieldDialogOpen}
                  fieldName={fieldName}
                  onClose={() => setConfirmDeleteFieldDialogOpen(false)}
                  onConfirm={() => {
                    setConfirmDeleteFieldDialogOpen(false);
                    onFieldRemove(index);
                  }}
                />
              </Box>
            );
          })}
        </form>
      )}
    </Droppable>
  );
};

export default BuildArea;
