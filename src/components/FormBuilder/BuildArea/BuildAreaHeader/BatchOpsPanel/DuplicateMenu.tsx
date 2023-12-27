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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { sortArray } from "../../../../../helpers/functions";
import { useGetFormSchemaQuery } from "../../../../../store/features/api";
import { useAppSelector } from "../../../../../store/hooks";
import MenuPopover from "../../../../Reusable/MenuPopover";

interface IDuplicateMenu {
  onDuplicate: ({
    placement,
    afterElementId,
  }: {
    placement: "bottom" | "top" | "after";
    afterElementId?: string;
  }) => void;
}

const DuplicateMenu = ({ onDuplicate }: IDuplicateMenu) => {
  const { orgId, formId, workspaceId } = useParams() as {
    orgId: string;
    workspaceId: string;
    formId: string;
  };
  const anchorRef = React.useRef(null);
  const { data: formSchema } = useGetFormSchemaQuery(
    { orgId, workspaceId, formId },
    { skip: !(orgId && workspaceId && formId) }
  );
  const selected = useAppSelector((state) => state.form.selected);

  const [open, setOpen] = React.useState<boolean>(false);
  const [afterFieldId, setAfterFieldId] = React.useState<string>("");
  const [showAfterFieldScreen, setShowAfterFieldScreen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setAfterFieldId(selected[selected.length - 1]);
  }, [selected]);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
        {showAfterFieldScreen && formSchema ? (
          <Stack spacing={1}>
            <Typography variant="caption">Select field after which duplicate fields go.</Typography>
            <Divider />
            <TextField
              fullWidth
              select
              value={afterFieldId}
              onChange={(e) => setAfterFieldId(e.target.value)}
            >
              {sortArray(formSchema.fields, formSchema.order).map((f, i) => {
                return (
                  <MenuItem key={f.id} value={f.id}>
                    {i + 1}. {f.label}
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
                  onDuplicate({ placement: "after", afterElementId: afterFieldId });

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
                onDuplicate({ placement: "top" });
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
                onDuplicate({ placement: "bottom" });
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
