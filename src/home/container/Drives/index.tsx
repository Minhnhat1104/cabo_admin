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
import useDrives from "@home/hooks/useDrives";
import {
  convertDataToItems,
  convertItem,
  sortDataListByUpdatedAtDesc,
} from "./Helper";
import { MessagePayload, onMessage } from "firebase/messaging";
import { messaging } from "@base/components/firebase";
import { useSnackBar } from "@base/hooks/useSnackBar";

const StorePage = () => {
  const { enqueueSuccess, enqueueError } = useSnackBar();
  const [items, setItems] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [updateItem, setUpdateItem] = useState<any>(undefined);
  const theme = useTheme();

  useEffect(() => {
    onMessage(messaging, (payload: MessagePayload) => {
      console.log("Message received. ", payload);
      try {
        const category = payload?.data?.category;

        if (category === "UPDATE_DRIVE_STATE") {
          const tripId = payload?.data?.tripId;
          const tripInfo = JSON.parse(payload?.data?.tripInfo || "");

          const idx = items?.findIndex((_item: any) => _item?.id === tripId);

          const newItems = [...items].filter(
            (data: any, i: number) => i !== idx
          );
          newItems.unshift(convertItem(tripInfo));

          setItems(sortDataListByUpdatedAtDesc(newItems));
        }
      } catch (err) {
        console.log("Err:", err);
        enqueueError("Invalid message data");
      }
    });
  });

  const { data, refetch } = useDrives();

  useEffect(() => {
    if (data) {
      const newItems = convertDataToItems(data);
      if (!_.isEqual(newItems, items)) {
        setItems(sortDataListByUpdatedAtDesc(newItems));
      }
    } else {
      setItems([]);
    }
  }, [data]);

  // ========== handle Table ==========

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 0.02,
      sortable: false,
      valueGetter: (params) => {
        return params.row.index;
      },
    },
    {
      field: "from",
      headerName: "From",
      flex: 0.3,
      sortable: false,

      renderCell(params) {
        return (
          <Typography sx={{ whiteSpace: "normal", fontSize: 14, py: 1 }}>
            {params.row.from}
          </Typography>
        );
      },
    },
    {
      field: "to",
      headerName: "To",
      flex: 0.3,
      sortable: false,
      renderCell(params) {
        return (
          <Typography sx={{ whiteSpace: "normal", fontSize: 14, py: 1 }}>
            {params.row.to}
          </Typography>
        );
      },
    },
    { field: "customer", headerName: "Customer", flex: 0.1, sortable: false },
    {
      field: "phoneNumber",
      headerName: "Customer phone",
      flex: 0.1,
      sortable: false,
    },
    {
      field: "driver",
      headerName: "Driver",
      flex: 0.1,
      sortable: false,

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
      flex: 0.1,
      sortable: false,
      renderCell(params) {
        const status = DRIVER_STATUS_OPTIONS.find(
          (_option: LabelValue) => _option.value === params.row.status
        );
        return (
          <Chip
            label={status?.label}
            color={status?.extra}
            size="small"
            sx={{ fontSize: "12px" }}
          />
        );
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
          getRowHeight={() => "auto"}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
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
          sortModel={[
            {
              field: "updatedAt",
              sort: "desc",
            },
          ]}
        />
      </Stack>
    </Box>
  );
};

export default StorePage;
