import {
  ContentCopyOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignCenterOutlined,
  VerticalAlignTopOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { duplicateFields } from "../../../../../store/features/form/formSlice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import MenuPopover from "../../../../Reusable/MenuPopover";

type Props = {};

const DuplicateMenu = (props: Props) => {
  const anchorRef = React.useRef(null);
  const dispatch = useAppDispatch();
  const { fields } = useAppSelector((state) => state.form);
  const [open, setOpen] = React.useState<boolean>(false);
  const [afterFieldId, setAfterFieldId] = React.useState<string>("");
  const [showAfterFieldScreen, setShowAfterFieldScreen] = React.useState<boolean>(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAfterFieldId("");
    setShowAfterFieldScreen(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 250, p: 1 }}
      >
        {showAfterFieldScreen ? (
          <Stack spacing={1}>
            <Typography variant="caption">Select field after which duplicate fields go.</Typography>
            <Divider />
            <TextField
              fullWidth
              select
              value={afterFieldId}
              onChange={(e) => setAfterFieldId(e.target.value)}
            >
              {fields.map((f) => {
                return (
                  <MenuItem key={f.id} value={f.id}>
                    {f.label}
                  </MenuItem>
                );
              })}
            </TextField>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                size="small"
                onClick={() => {
                  setAfterFieldId("");
                  setShowAfterFieldScreen(false);
                }}
              >
                Back
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  dispatch(duplicateFields({ placement: "after", afterElementId: afterFieldId }));
                  handleClose();
                }}
              >
                Duplicate
              </Button>
            </Box>
          </Stack>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                dispatch(duplicateFields({ placement: "top" }));
                handleClose();
              }}
            >
              <ListItemIcon>
                <VerticalAlignTopOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>to Top</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(duplicateFields({ placement: "bottom" }));
                handleClose();
              }}
            >
              <ListItemIcon>
                <VerticalAlignBottomOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>to Bottom</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => setShowAfterFieldScreen(true)}>
              <ListItemIcon>
                <VerticalAlignCenterOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>after Field</ListItemText>
            </MenuItem>
          </>
        )}
      </MenuPopover>
      <Button
        ref={anchorRef}
        onClick={handleOpen}
        variant="outlined"
        size="small"
        startIcon={<ContentCopyOutlined />}
      >
        Duplicate
      </Button>
    </>
  );
};

export default DuplicateMenu;
