import React, { useEffect, useMemo, useState } from "react";
import useCourses from "../../hooks/useCourses";
import _ from "lodash";
import { DataGrid, GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MiModal from "../../../base/components/MiModal";
import { useForm } from "react-hook-form";
import useCourseMutation from "../../hooks/useCourseMutation";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import UpdateModal from "../../container/UpdateModal";
import AddModal from "../../container/AddModal";
import { SET_TIMEOUT } from "../../../base/constants";
import useDeletedCourses from "../../hooks/useDeletedCourses";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";

const TrashPage = () => {
  const [items, setItems] = useState<any>([]);
  const [selectedIds, setSelectedIds] = useState([]);
  console.log("🚀 ~ file: index.tsx:27 ~ selectedIds:", selectedIds);
  const [updateItem, setUpdateItem] = useState<any>(undefined);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);
  const handleClose = () => setShowUpdate(false);
  const theme = useTheme();

  const { data, refetch } = useDeletedCourses();
  const { mForeceDelete, mRestore } = useCourseMutation();

  // ========== init data==============
  useEffect(() => {
    if (data?.data?.data?.courses) {
      const newItems = data?.data?.data?.courses;
      if (!_.isEqual(newItems, items)) {
        setItems(newItems);
      }
    } else {
      setItems([]);
    }
  }, [data]);

  const handleSelectionModelChange = (ids: any) => {
    setSelectedIds(ids);
  };

  // ========== handle Table ==========

  const handleClickRestore = (_id: number) => {
    if (_id) {
      const params = {
        ids: [_id],
      };
      mRestore.mutate(params, {
        onSuccess: () => {
          setTimeout(() => {
            refetch && refetch();
          }, SET_TIMEOUT);
        },
      });
    }
  };

  const handleRestoreAll = () => {
    const params = {
      ids: selectedIds,
    };
    mRestore.mutate(params, {
      onSuccess: () => {
        setTimeout(() => {
          refetch && refetch();
        }, SET_TIMEOUT);
      },
    });
  };

  const handleForceDeleteCourse = (_id: number) => {
    if (_id) {
      const params = {
        ids: [_id],
      };
      mForeceDelete.mutate(params, {
        onSuccess: () => {
          setTimeout(() => {
            refetch && refetch();
          }, SET_TIMEOUT);
        },
      });
    }
  };

  const handleForceDeleteAll = () => {
    const params = {
      ids: selectedIds,
    };
    mForeceDelete.mutate(params, {
      onSuccess: () => {
        setTimeout(() => {
          refetch && refetch();
        }, SET_TIMEOUT);
      },
    });
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 400,
      flex: 1,
      renderHeader: (params: GridColumnHeaderParams) => {
        return (
          <Typography fontSize={"0.9rem"} fontWeight={600}>
            {params?.colDef?.headerName}
          </Typography>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      renderHeader: (params: GridColumnHeaderParams) => {
        return (
          <Typography fontSize={"0.9rem"} fontWeight={600}>
            {params?.colDef?.headerName}
          </Typography>
        );
      },
    },
    {
      field: "level",
      headerName: "Level",
      width: 100,
      renderHeader: (params: GridColumnHeaderParams) => {
        return (
          <Typography fontSize={"0.9rem"} fontWeight={600}>
            {params?.colDef?.headerName}
          </Typography>
        );
      },
    },
    {
      field: "videoid",
      headerName: "Video Id",
      width: 120,
      renderHeader: (params: GridColumnHeaderParams) => {
        return (
          <Typography fontSize={"0.9rem"} fontWeight={600}>
            {params?.colDef?.headerName}
          </Typography>
        );
      },
    },
    {
      field: "deletedAt",
      headerName: "Deleted at",
      width: 140,
      valueGetter: (params) => {
        const value =
          new Date(params.row.deletedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }) +
          " " +
          new Date(params.row.deletedAt).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        return value;
      },
      renderHeader: (params: GridColumnHeaderParams) => {
        return (
          <Typography fontSize={"0.9rem"} fontWeight={600}>
            {params?.colDef?.headerName}
          </Typography>
        );
      },
    },
    {
      field: "update",
      headerName: "",
      width: 50,
      renderCell: (params) => {
        return (
          <IconButton
            size="small"
            color="primary"
            onClick={(e: any) => {
              e.stopPropagation();
              handleClickRestore(params.row?._id || 0);
            }}
          >
            <RestoreOutlinedIcon fontSize="small" />
          </IconButton>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 50,
      renderCell: (params) => {
        return (
          <IconButton
            size="small"
            color="error"
            onClick={(e: any) => {
              e.stopPropagation();
              handleForceDeleteCourse(params.row?._id || 0);
            }}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        );
      },
    },
  ];

  // ============= handle create modal ================

  return (
    <Box sx={{ background: theme.palette.common.white }} p={2}>
      <Stack spacing={1}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <IconButton size="small" onClick={() => refetch()}>
              <RefreshOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Typography fontSize={"2.0rem"} textAlign={"center"}>
          Course Trash
        </Typography>

        {selectedIds?.length > 0 && (
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleRestoreAll()}
            >
              Restore All
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => handleForceDeleteAll()}
            >
              Permanent Delete All
            </Button>
          </Stack>
        )}

        <DataGrid
          rows={items || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(data) => data?._id}
          rowSelection
          disableVirtualization
          sx={{
            headerCell: {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
          }}
          disableColumnMenu
          onRowSelectionModelChange={handleSelectionModelChange}
          rowSelectionModel={selectedIds}
        />

        {/* Update Modal */}
        {showUpdate && (
          <UpdateModal
            open={showUpdate}
            onClose={() => setShowUpdate(false)}
            updateItem={updateItem}
            refetch={refetch}
          />
        )}
        {/* Create Modal */}
        {showAdd && (
          <AddModal
            refetch={refetch}
            open={showAdd}
            onClose={() => setShowAdd(false)}
          />
        )}
      </Stack>
    </Box>
  );
};

export default TrashPage;
