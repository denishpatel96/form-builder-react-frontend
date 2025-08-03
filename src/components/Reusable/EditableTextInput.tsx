import { TextField, Typography, TypographyProps } from "@mui/material";
import React from "react";

type EditableTextInputProps = {
  text: string;
  onConfirmChange: (text: string) => void;
  typographyProps: TypographyProps;
};

const EditableTextInput = ({ text, typographyProps, onConfirmChange }: EditableTextInputProps) => {
  const [editMode, setEditMode] = React.useState<Boolean>(false);
  const [newText, setNewText] = React.useState<string>(text);
  return editMode ? (
    <TextField
      value={newText}
      onChange={(e) => setNewText(e.target.value)}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
        if (e?.key === "Escape" || e?.code === "Escape") {
          setEditMode(false);
        } else if (e?.key === "Enter" || e?.code === "Enter") {
          onConfirmChange(newText);
          setEditMode(false);
        }
      }}
    />
  ) : (
    <div
      onClick={() => {
        setNewText(text);
        setEditMode(true);
      }}
    >
      <Typography {...typographyProps}>{text}</Typography>
    </div>
  );
};

export default EditableTextInput;
