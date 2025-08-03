import { ArrowBack, Refresh } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_WORKSPACE } from "../../constants";
import {
  FormResponse,
  useGetFormResponsesQuery,
  useGetFormsByWorkspaceQuery,
  useGetFormSchemaQuery,
} from "../../store/features/api";
import Appbar from "../Reusable/Appbar";
import UserMenu from "../Reusable/UserMenu";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";

const FormResponseDataTables = () => {
  const navigate = useNavigate();
  const { orgId, formId, workspaceId } = useParams() as {
    orgId: string;
    workspaceId: string;
    formId: string;
  };

  const { isError: isSchemaError, data: schema } = useGetFormSchemaQuery(
    { orgId, workspaceId, formId },
    { skip: !(orgId && workspaceId && formId) }
  );

  const { data: forms } = useGetFormsByWorkspaceQuery(
    { orgId, workspaceId },
    { skip: !(orgId && workspaceId) }
  );

  const {
    isLoading,
    isFetching,
    isError,
    data: responses = [],
    refetch,
  } = useGetFormResponsesQuery(
    { orgId, workspaceId, formId },
    { skip: !(orgId && workspaceId && formId) }
  );

  const columns = useMemo<MRT_ColumnDef<FormResponse>[]>(
    () =>
      schema?.fields.length
        ? schema.fields.map((field) => ({
            header: field.label,
            Header: ({ column }) => (
              <Tooltip title={column.columnDef.header}>
                <div
                  style={{
                    maxWidth: 100,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {column.columnDef.header}
                </div>
              </Tooltip>
            ),
            accessorFn: (row: FormResponse) =>
              row.data[field.id]
                ? field.fieldType === "ctrl_checkbox_group"
                  ? `${row.data[field.id].join("|")}`
                  : `${row.data[field.id]}`
                : "",
            id: field.id,
          }))
        : [],
    [schema]
  );

  const table = useMaterialReactTable({
    columns,
    enableColumnResizing: true,
    data: responses,
    muiTableBodyCellProps: {
      sx: {
        background: (theme) => theme.palette.background.paper,
      },
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={() => refetch()}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    rowCount: responses?.length ?? 0,
    state: {
      isLoading,
      showAlertBanner: isError || isSchemaError,
      showProgressBars: isFetching,
    },
  });

  const activeForm = forms?.find((form) => form.formId === formId);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <Appbar>
          <Box sx={{ flexGrow: 1 }} />
          <UserMenu />
        </Appbar>
        <Box
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            width: "100%",
          }}
        >
          <Button
            startIcon={<ArrowBack />}
            onClick={() =>
              navigate(
                ROUTE_WORKSPACE.replace(":orgId", orgId).replace(":workspaceId", workspaceId)
              )
            }
          >
            Workspaces
          </Button>
        </Box>
        <Card
          sx={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <CardHeader
            title={`${activeForm ? `${activeForm.name} ` : ""}Responses (${responses?.length})`}
          />
          <CardContent>
            <MaterialReactTable table={table} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FormResponseDataTables;
