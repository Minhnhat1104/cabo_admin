import React, { useEffect, useMemo, useState } from "react";
// import useCourses from "../../hooks/useCourses";
import _ from "lodash";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
// import useCourseMutation from "../../hooks/useCourseMutation";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
// import UpdateModal from "../../container/UpdateModal";
// import AddModal from "../../container/AddModal";
import { SET_TIMEOUT } from "../../../base/config/constants";
import { dummyData } from "./dummyData";
import Filter from "./Filter";
import { DRIVER_STATUS_OPTIONS } from "@home/config/constants";
import { LabelValue } from "@base/types";

const StorePage = () => {
  const [items, setItems] = useState<any>(dummyData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [updateItem, setUpdateItem] = useState<any>(undefined);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);
  const theme = useTheme();

  //   const { data, refetch } = useCourses();
  const refetch = () => {};

  // ========== init data==============
  //   useEffect(() => {
  //     if (data?.data?.data) {
  //       const newItems = data?.data?.data;
  //       if (!_.isEqual(newItems, items)) {
  //         setItems(newItems);
  //       }
  //     } else {
  //       setItems([]);
  //     }
  //   }, [data]);

  // ========== handle Table ==========

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 0.1,
      sortable: false,
      valueGetter: (params) => {
        return params.row.index;
      },
    },
    { field: "from", headerName: "From", flex: 0.8, sortable: true },
    { field: "to", headerName: "To", flex: 0.8, sortable: true },
    { field: "customer", headerName: "Customer", flex: 0.8, sortable: true },
    {
      field: "driver",
      headerName: "Driver",
      flex: 0.8,
      sortable: true,

      //   valueGetter: (params) => {
      //     const value =
      //       new Date(params.row.createdAt).toLocaleDateString("en-GB", {
      //         day: "2-digit",
      //         month: "2-digit",
      //         year: "numeric",
      //       }) +
      //       " " +
      //       new Date(params.row.createdAt).toLocaleTimeString("en-GB", {
      //         hour: "2-digit",
      //         minute: "2-digit",
      //         hour12: false,
      //       });
      //     return value;
      //   },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      sortable: true,
      renderCell(params) {
        const status = DRIVER_STATUS_OPTIONS.find(
          (_option: LabelValue) => _option.value === params.row.status
        );
        return <Chip label={status?.label} color={status?.extra} />;
      },
    },
  ];

  // ============= handle create modal ================

  return (
    <Box sx={{ background: theme.palette.common.white }} p={2} width="100%">
      <Stack spacing={1}>
        <Filter />

        <Typography fontSize={"2.0rem"} textAlign={"center"}>
          Drives
        </Typography>

        <DataGrid
          rows={
            items?.map((_item: any, i: number) => ({
              ..._item,
              index: i + 1,
            })) || []
          }
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          getRowId={(data) => data?.id}
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
          rowSelectionModel={selectedIds}
        />
      </Stack>
    </Box>
  );
};

export default StorePage;
