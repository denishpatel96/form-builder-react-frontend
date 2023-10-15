import { Add, Close, FilterList, Search } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { cloneDeep } from "lodash";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ANIMATION_SKELETON, ROUTE_FORM_BUILDER } from "../../constants";
import { useGetFormsByWorkspaceQuery } from "../../store/features/api";
import CreateFormDialog from "./CreateFormDialog";
import FormMenu from "./FormMenu";

type WorkspaceFormsProps = {};

const WorkspaceForms = (_props: WorkspaceFormsProps) => {
  const navigate = useNavigate();
  const { orgId, workspaceId } = useParams() as { orgId: string; workspaceId: string };
  const [showSearch, setShowSearch] = React.useState<boolean>(false);
  const [showFilters, setShowFilters] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState<"updatedAt" | "name">("updatedAt");
  const {
    isLoading: isFormsLoading,
    isFetching: isFormsFetching,
    isSuccess: isFormsSuccess,
    isError: isFormsError,
    data: forms,
    error: formsError,
  } = useGetFormsByWorkspaceQuery({ orgId, workspaceId }, { skip: !(orgId && workspaceId) });

  let formSearchAndFilters, formsList;
  if (isFormsLoading || (isFormsFetching && !forms)) {
    formSearchAndFilters = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height={60} width="100%" />
    );
    formsList = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
      <ListItem
        key={item}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ pr: 1 }}>
          <Skeleton variant="circular" animation={ANIMATION_SKELETON} width={20} height={20} />
        </Box>
        <ListItemText
          sx={{ pl: 2 }}
          primary={
            <Skeleton
              key={item}
              variant="text"
              animation={ANIMATION_SKELETON}
              sx={{ my: 1 }}
              width={`${Math.floor(Math.random() * 71) + 30}%`}
            />
          }
          secondary={
            <Skeleton
              key={item}
              variant="text"
              animation={ANIMATION_SKELETON}
              sx={{ my: 1 }}
              width="40%"
              height={10}
            />
          }
        />
      </ListItem>
    ));
  } else if (isFormsSuccess && forms) {
    const sortedForms = cloneDeep(forms)?.sort((a, b) =>
      sortBy === "updatedAt" ? (a[sortBy] < b[sortBy] ? 1 : -1) : a[sortBy] > b[sortBy] ? 1 : -1
    );

    const filteredforms =
      sortedForms?.filter((f) => f.name.toLowerCase().includes(searchText.toLowerCase())) || [];

    const filtersApplied = sortBy !== "updatedAt";
    const handleClearFilters = () => {
      setSortBy("updatedAt");
      setShowFilters(false);
    };

    formSearchAndFilters = (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            height: 60,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {showSearch ? (
              <TextField
                autoFocus
                fullWidth
                onBlur={(e) => {
                  if (!searchText) {
                    setShowSearch(false);
                  } else {
                    e?.currentTarget.focus();
                  }
                }}
                placeholder="Find forms"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: searchText && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchText("")}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            ) : (
              <Typography pl={2}>Forms ({forms.length})</Typography>
            )}
          </Box>

          {!showSearch && (
            <IconButton onClick={() => setShowSearch(true)}>
              <Search />
            </IconButton>
          )}
          <IconButton
            sx={{
              ...(showFilters && { backgroundColor: (theme) => theme.palette.action.selected }),
            }}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <FilterList />
          </IconButton>
          <CreateFormDialog
            button={
              <IconButton>
                <Add />
              </IconButton>
            }
          />
        </Box>

        {filtersApplied && (
          <Box sx={{ p: 1, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Chip label="filters applied" onDelete={handleClearFilters} />
          </Box>
        )}

        {showFilters && (
          <Grid
            container
            p={2}
            spacing={2}
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Grid item xs={12}>
              <Stack>
                <Typography variant="caption">Sort by</Typography>
                <RadioGroup
                  name="forms-filter-sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "updatedAt" | "name")}
                >
                  <FormControlLabel
                    value="updatedAt"
                    control={<Radio />}
                    label="Recently Updated"
                  />
                  <FormControlLabel value="name" control={<Radio />} label="Name" />
                </RadioGroup>
              </Stack>
            </Grid>
          </Grid>
        )}
      </>
    );
    formsList = (
      <>
        {isFormsFetching && <LinearProgress />}

        {filteredforms.length === 0 && (
          <Box p={2}>
            {forms.length === 0 ? (
              <Stack alignItems={"center"}>
                <Typography variant="subtitle2" textAlign={"center"}>
                  No forms found.
                </Typography>
                <Typography mb={2} variant="body2" textAlign={"center"}>
                  forms will appear here once created.
                </Typography>
                <CreateFormDialog button={<Button startIcon={<Add />}>Create Form</Button>} />
              </Stack>
            ) : (
              <>
                <Typography variant="subtitle2" textAlign={"center"}>
                  No matching forms found.
                </Typography>
                <Typography variant="body2" textAlign={"center"}>
                  Please try alternate words or remove filters.
                </Typography>
              </>
            )}
          </Box>
        )}
        {filteredforms.map((f, index) => {
          return (
            <ListItem
              sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                ":hover": {
                  backgroundColor: (theme) =>
                    isFormsLoading
                      ? theme.palette.action.disabledBackground
                      : theme.palette.action.hover,
                  cursor: "pointer",
                },
              }}
              key={index}
              onClick={() => {
                if (!isFormsFetching) {
                  navigate(
                    ROUTE_FORM_BUILDER.replace(":orgId", orgId)
                      .replace(":workspaceId", workspaceId)
                      .replace(":formId", f.formId)
                  );
                }
              }}
            >
              <ListItemText
                primary={<Typography>{f.name}</Typography>}
                secondary={
                  <Box pt={1}>
                    <Typography component={"span"} variant="caption">
                      Created on{" "}
                    </Typography>
                    <Tooltip title={new Date(f.createdAt).toLocaleTimeString()}>
                      <Typography variant="caption" component={"span"}>
                        {new Date(f.createdAt).toLocaleDateString()} {" , "}
                      </Typography>
                    </Tooltip>
                    <Typography variant="caption">
                      {f.responseCount === 0
                        ? "No responses"
                        : `${f.responseCount} ${f.responseCount === 1 ? "response" : "responses"}`}
                    </Typography>
                  </Box>
                }
              />
              <FormMenu form={f} />
            </ListItem>
          );
        })}
      </>
    );
  } else if (isFormsError) {
    console.log("Error fetching forms :", formsError);
    formsList = <Alert severity="error">Error occured. Please reload the page.</Alert>;
  }

  return (
    <Stack mt={4} spacing={4} px={{ xs: 0, sm: 2, md: 3, lg: 4 }}>
      <Box
        sx={{
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        {formSearchAndFilters}
        <Box sx={{ width: "100%", overflow: "auto" }}>{formsList}</Box>
      </Box>
    </Stack>
  );
};

export default WorkspaceForms;
