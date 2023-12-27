import { DeleteOutlined, DeselectOutlined, SelectAllOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { deselectFields, selectFields } from "../../../../../store/features/formSlice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { IFieldProps } from "../../../Types";
import DuplicateMenu from "./DuplicateMenu";

interface IBatchOpsPanel {
  formFields: IFieldProps[];
  onShowDeleteFieldDialog: () => void;
  onDuplicate: ({
    placement,
    afterElementId,
  }: {
    placement: "bottom" | "top" | "after";
    afterElementId?: string;
  }) => void;
}

const BatchOpsPanel = ({ onDuplicate, onShowDeleteFieldDialog, formFields }: IBatchOpsPanel) => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((state) => state.form);
  const selectedCount = selected.length;
  const fieldsCount = formFields.length;
  if (selectedCount <= 1) {
    return <></>;
  }
  return (
    <Box sx={{ display: "flex", columnGap: 2, alignItems: "center" }}>
      <Box
        sx={{
          pr: 2,
          display: "flex",
          columnGap: 1,
          alignItems: "center",
          borderRight: "1px solid grey",
        }}
      >
        <Typography variant="overline">{`${selectedCount} / ${fieldsCount} selected`}</Typography>
        {fieldsCount === selectedCount ? (
          <Button
            size="small"
            variant="outlined"
            startIcon={<DeselectOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deselectFields());
            }}
          >
            Deselect
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            startIcon={<SelectAllOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(selectFields(formFields.map((f) => f.id)));
            }}
          >
            Select All
          </Button>
        )}
      </Box>
      <Box sx={{ display: "flex", columnGap: 1, alignItems: "center" }}>
        <DuplicateMenu onDuplicate={onDuplicate} />
        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteOutlined />}
          onClick={() => onShowDeleteFieldDialog()}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default BatchOpsPanel;
