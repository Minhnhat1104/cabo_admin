import React, { useEffect, useMemo, useState } from "react";
import useCourses from "../../hooks/useCourses";
import _ from "lodash";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
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
import { SET_TIMEOUT } from "../../../base/config/constants";

const StorePage = () => {
  const [items, setItems] = useState<any>([]);
  const [selectedIds, setSelectedIds] = useState([]);
  console.log("🚀 ~ file: index.tsx:27 ~ selectedIds:", selectedIds);
  const [updateItem, setUpdateItem] = useState<any>(undefined);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);
  const theme = useTheme();

  const { data, refetch } = useCourses();
  const { mDelete } = useCourseMutation();

  // ========== init data==============
  useEffect(() => {
    if (data?.data?.data) {
      const newItems = data?.data?.data;
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

  const handleClickUpdate = (item: any) => {
    setShowUpdate(true);
    setUpdateItem(item);
  };

  const handleDeleteCourse = (_id: number) => {
    if (_id) {
      const params = {
        ids: [_id],
      };
      mDelete.mutate(params, {
        onSuccess: () => {
          setTimeout(() => {
            refetch && refetch();
          }, SET_TIMEOUT);
        },
      });
    }
  };

  const handleDeleteAll = () => {
    const params = {
      ids: selectedIds,
    };
    mDelete.mutate(params);

    refetch && refetch();
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "name", width: 400, flex: 1 },
    { field: "description", headerName: "description", width: 300 },
    { field: "level", headerName: "level", width: 100 },
    { field: "videoid", headerName: "videoid", width: 120 },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 140,
      valueGetter: (params) => {
        const value =
          new Date(params.row.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }) +
          " " +
          new Date(params.row.createdAt).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        return value;
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
              handleClickUpdate(params.row);
            }}
          >
            <EditOutlinedIcon fontSize="small" />
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
              handleDeleteCourse(params.row?._id || "");
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
            <Button
              size="small"
              startIcon={<AddOutlinedIcon />}
              variant="contained"
              onClick={() => setShowAdd(true)}
            >
              Add
            </Button>
            <IconButton size="small" onClick={() => refetch()}>
              <RefreshOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Typography fontSize={"2.0rem"} textAlign={"center"}>
          Course Studio
        </Typography>

        {selectedIds?.length > 0 && (
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => handleDeleteAll()}
            >
              Delete All
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

export default StorePage;
