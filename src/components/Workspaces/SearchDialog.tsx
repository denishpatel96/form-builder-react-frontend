import { SearchOutlined } from "@mui/icons-material";
import { Autocomplete, Box, Button, Dialog, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import { Workspace } from "../../store/features/api";

const SearchDialog = ({
  workspaces,
  onSelect,
}: {
  workspaces: Workspace[];
  onSelect: (id: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [filterText, setFilterText] = React.useState<string>("");
  const options = workspaces.map((option) => {
    return {
      category: "WORKSPACE",
      name: option.name,
      id: option.id,
    };
  });
  const handleClickOpen = () => {
    setOpen(true);
    setFilterText("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button fullWidth startIcon={<SearchOutlined />} variant="outlined" onClick={handleClickOpen}>
        <Typography variant="body2">Search workspace or form</Typography>
      </Button>
      <Dialog fullWidth sx={{ minHeight: 500 }} open={open} onClose={handleClose}>
        <Autocomplete
          id="search-input"
          options={options}
          filterOptions={(ops) =>
            ops.filter(
              (op) => filterText && op.name.toLowerCase().includes(filterText.toLowerCase())
            )
          }
          groupBy={(option) => option.category}
          onChange={(_e, v) => {
            if (v && v.id) {
              onSelect(v.id);
              handleClose();
            }
          }}
          getOptionLabel={(option) => option.name}
          sx={{ width: "100%" }}
          renderGroup={(params) => (
            <Box component="li" sx={{ padding: 3 }} key={params.key}>
              <Typography variant="overline" py={2}>
                {params.group}
              </Typography>
              <Box component={"ul"}>{params.children}</Box>
            </Box>
          )}
          // disablePortal
          noOptionsText={
            <Stack spacing={1} p={2}>
              <Typography textAlign={"center"} variant="h4">
                No workspace or form found.
              </Typography>
              <Typography textAlign={"center"}>
                Please check spelling or use more general words.
              </Typography>
            </Stack>
          }
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              InputProps={{ ...params.InputProps, startAdornment: <SearchOutlined /> }}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search workspace or form"
            />
          )}
        />
      </Dialog>
    </div>
  );
};

export default SearchDialog;
