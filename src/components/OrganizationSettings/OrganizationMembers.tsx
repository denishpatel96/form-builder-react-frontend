import { Add, Close, FilterList, Search } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControlLabel,
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
  Typography,
} from "@mui/material";
import { cloneDeep } from "lodash";
import React from "react";
import { useParams } from "react-router-dom";
import { ANIMATION_SKELETON } from "../../constants";
import { useGetOrgMemberInvitationsQuery, useGetOrgMembersQuery } from "../../store/features/api";
import ChangeOrgMemberRoleDropdown from "./ChangeOrgMemberRoleDropDown";
import CreateInvitationDialog from "./CreateInvitationDialog";
import ChangeOrgMemberInvitationDropDown from "./ChangeOrgMemberInvitationDropDown";

const OrganizationMembers = () => {
  const { orgId } = useParams() as { orgId: string };
  const [showMemberSearch, setShowMemberSearch] = React.useState<boolean>(false);
  const [showInvitationSearch, setShowInvitationSearch] = React.useState<boolean>(false);
  const [showFilters, setShowFilters] = React.useState<boolean>(false);
  const [searchMemberText, setSearchMemberText] = React.useState<string>("");
  const [searchInvitationText, setSearchInvitationText] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState<"updatedAt" | "firstName" | "lastName">("updatedAt");
  const {
    isLoading,
    isFetching,
    data: members,
    isSuccess,
    isError,
    error,
  } = useGetOrgMembersQuery(orgId);
  const {
    isLoading: isInvitesLoading,
    isFetching: isInvitesFetching,
    data: invitations,
    isSuccess: isInvitesSuccess,
    isError: isInvitesError,
    error: invitesError,
  } = useGetOrgMemberInvitationsQuery({ orgId });

  /// -------------------------- SKELETONS  --------------------------------------- ///
  const listHeaderSkeleton = (
    <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height={60} width="100%" />
  );
  const listSkeleton = [1, 2, 3, 4].map((item) => (
    <ListItem
      key={item}
      secondaryAction={
        <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height={30} width={100} />
      }
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <ListItemText
        sx={{ pl: 2 }}
        primary={
          <Skeleton
            key={item}
            variant="text"
            animation={ANIMATION_SKELETON}
            sx={{ my: 1 }}
            width={`${Math.floor(Math.random() * 61) + 30}%`}
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

  let membersSearchAndFilters, membersList, invitationsSearch, invitationsList;
  /// --------------------------  INVITATIONS ------------------------------------- ///
  if (isInvitesLoading || (isInvitesFetching && !invitations)) {
    invitationsSearch = listHeaderSkeleton;
    invitationsList = listSkeleton;
  } else if (isInvitesSuccess && invitations) {
    invitationsSearch = (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            height: 60,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {showInvitationSearch ? (
              <TextField
                autoFocus
                fullWidth
                onBlur={(e) => {
                  if (!searchInvitationText) {
                    setShowInvitationSearch(false);
                  } else {
                    e?.currentTarget.focus();
                  }
                }}
                placeholder="Find invitation by email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: searchInvitationText && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchInvitationText("")}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={searchInvitationText}
                onChange={(e) => setSearchInvitationText(e.target.value)}
              />
            ) : (
              <Typography pl={2}>Invitations Sent ({invitations.length})</Typography>
            )}
          </Box>

          {!showInvitationSearch && (
            <IconButton onClick={() => setShowInvitationSearch(true)}>
              <Search />
            </IconButton>
          )}
        </Box>
      </>
    );
    const filteredInvitations =
      invitations?.filter((m) =>
        m.email.toLowerCase().includes(searchInvitationText.toLowerCase())
      ) || [];
    invitationsList =
      filteredInvitations.length === 0 ? (
        <Box p={2}>
          {invitations.length === 0 ? (
            <Stack alignItems={"center"}>
              <Typography variant="subtitle2" textAlign={"center"}>
                No invitations found.
              </Typography>
              <Typography mb={2} variant="body2" textAlign={"center"}>
                Member invitations will appear here.
              </Typography>
            </Stack>
          ) : (
            <>
              <Typography variant="subtitle2" textAlign={"center"}>
                No matching invitations found.
              </Typography>
              <Typography variant="body2" textAlign={"center"}>
                Please try alternate words or remove filters.
              </Typography>
            </>
          )}
        </Box>
      ) : (
        filteredInvitations.map((m, index) => {
          return (
            <ListItem
              sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                ":hover": {
                  backgroundColor: (theme) =>
                    isInvitesFetching
                      ? theme.palette.action.disabledBackground
                      : theme.palette.action.hover,
                  cursor: "pointer",
                },
              }}
              key={index}
            >
              <ListItemText
                primary={<Typography variant="subtitle2">{m.email}</Typography>}
                secondary={
                  <Typography variant="caption">
                    Invited on {new Date(m.createdAt).toLocaleString()}
                  </Typography>
                }
              />
              <ChangeOrgMemberInvitationDropDown orgMemberInvitation={m} />
            </ListItem>
          );
        })
      );
  } else if (isInvitesError) {
    console.log("Error fetching invited members :", invitesError);
    membersList = <Alert severity="error">Error fetching invitations.</Alert>;
  }

  /// --------------------------  MEMBERS ------------------------------------- ///
  if (isLoading || (isFetching && !members)) {
    membersSearchAndFilters = listHeaderSkeleton;
    membersList = listSkeleton;
  } else if (isSuccess && members) {
    const sortedMembers = cloneDeep(members)?.sort((a, b) =>
      sortBy === "updatedAt" ? (a[sortBy] < b[sortBy] ? 1 : -1) : a[sortBy] > b[sortBy] ? 1 : -1
    );

    const filteredMembers =
      sortedMembers?.filter((m) =>
        `${m.firstName} ${m.lastName} ${m.email}`
          .toLowerCase()
          .includes(searchMemberText.toLowerCase())
      ) || [];

    const filtersApplied = sortBy !== "updatedAt";
    const handleClearFilters = () => {
      setSortBy("updatedAt");
      setShowFilters(false);
    };

    membersSearchAndFilters = (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            height: 60,
          }}
        >
          {filtersApplied && <Chip label="filters applied" onDelete={handleClearFilters} />}
          <Box sx={{ flexGrow: 1 }}>
            {showMemberSearch ? (
              <TextField
                autoFocus
                fullWidth
                onBlur={(e) => {
                  if (!searchMemberText) {
                    setShowMemberSearch(false);
                  } else {
                    e?.currentTarget.focus();
                  }
                }}
                placeholder="Find members"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: searchMemberText && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchMemberText("")}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={searchMemberText}
                onChange={(e) => setSearchMemberText(e.target.value)}
              />
            ) : (
              <Typography pl={2}>Organization Members ({members.length})</Typography>
            )}
          </Box>

          {!showMemberSearch && (
            <IconButton onClick={() => setShowMemberSearch(true)}>
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
        </Box>
        {showFilters && (
          <Stack
            p={2}
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="caption">Sort by</Typography>
            <RadioGroup
              row
              name="member-filter-sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "updatedAt" | "firstName" | "lastName")}
            >
              <FormControlLabel value="updatedAt" control={<Radio />} label="Recently Updated" />
              <FormControlLabel value="firstName" control={<Radio />} label="First Name" />
              <FormControlLabel value="lastName" control={<Radio />} label="Last Name" />
            </RadioGroup>
          </Stack>
        )}
      </>
    );
    membersList = (
      <>
        {isFetching && <LinearProgress />}
        {filteredMembers.length === 0 && (
          <Box
            p={2}
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            {members.length === 0 ? (
              <Stack alignItems={"center"}>
                <Typography variant="subtitle2" textAlign={"center"}>
                  No members found.
                </Typography>
                <Typography mb={2} variant="body2" textAlign={"center"}>
                  Members will appear here once they accept invitation.
                </Typography>
              </Stack>
            ) : (
              <>
                <Typography variant="subtitle2" textAlign={"center"}>
                  No matching members found.
                </Typography>
                <Typography variant="body2" textAlign={"center"}>
                  Please try alternate words or remove filters.
                </Typography>
              </>
            )}
          </Box>
        )}
        {filteredMembers.map((m, index) => {
          return (
            <ListItem
              sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                ":hover": {
                  backgroundColor: (theme) =>
                    isFetching
                      ? theme.palette.action.disabledBackground
                      : theme.palette.action.hover,
                  cursor: "pointer",
                },
              }}
              key={index}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle2">{`${m.firstName} ${m.lastName}`}</Typography>
                }
                secondary={
                  <Typography variant="caption">
                    Last edited {new Date(m.updatedAt).toLocaleString()}
                  </Typography>
                }
              />
              <ChangeOrgMemberRoleDropdown orgMember={m} />
            </ListItem>
          );
        })}
      </>
    );
  } else if (isError) {
    console.log("Error fetching organization members :", error);
    membersList = <Alert severity="error">Error fetching members.</Alert>;
  }

  return (
    <>
      <Box p={4}>
        <Typography variant="h4">Organization Members</Typography>
        <Typography mt={1}>Add members, edit member roles or remove members.</Typography>
        <CreateInvitationDialog
          button={
            <Button sx={{ mt: 3 }} startIcon={<Add />} variant="contained">
              Invite Member
            </Button>
          }
        />
      </Box>
      <Stack spacing={4} px={{ xs: 0, sm: 2, md: 3, lg: 4 }}>
        <Box
          sx={{
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          {invitationsSearch}
          <Box sx={{ width: "100%", overflow: "auto" }}>{invitationsList}</Box>
        </Box>
        <Box
          sx={{
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          {membersSearchAndFilters}
          <Box sx={{ width: "100%", overflow: "auto" }}>{membersList}</Box>
        </Box>
      </Stack>
    </>
  );
};

export default OrganizationMembers;
