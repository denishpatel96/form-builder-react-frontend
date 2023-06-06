import {
  ContentCopyOutlined,
  DeleteOutlined,
  DeselectOutlined,
  SelectAllOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { deselectFields, selectAll } from "../../../../../store/features/formSlice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import DuplicateMenu from "./DuplicateMenu";

type Props = {};

const BatchOpsPanel = (props: Props) => {
  const dispatch = useAppDispatch();
  const { fields, selected } = useAppSelector((state) => state.form);
  const selectedCount = selected.length;
  const fieldsCount = fields.length;
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
              dispatch(selectAll());
            }}
          >
            Select All
          </Button>
        )}
      </Box>
      <Box sx={{ display: "flex", columnGap: 1, alignItems: "center" }}>
        <DuplicateMenu />
        <Button size="small" variant="outlined" color="error" startIcon={<DeleteOutlined />}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default BatchOpsPanel;
