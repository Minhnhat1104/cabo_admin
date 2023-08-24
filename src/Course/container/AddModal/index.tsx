import MiModal from "../../../base/components/MiModal";
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
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useForm } from "react-hook-form";
import useCourseMutation from "../../hooks/useCourseMutation";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { SET_TIMEOUT } from "../../../base/config/constants";

interface AddModalProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const AddModal = (props: AddModalProps) => {
  const { open, onClose, refetch } = props;
  // ============ handle update modal ================
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      _id: 0,
      name: "",
      description: "",
      videoid: "",
      level: "",
    },
  });

  const { mAdd } = useCourseMutation();

  const onSubmit = (data: any) => {
    mAdd.mutate(data, {
      onSuccess: () => {
        setTimeout(() => {
          refetch && refetch();
        }, SET_TIMEOUT);
      },
    });

    onClose && onClose();
  };

  const mainFields = useMemo(() => {
    return (
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">Name</Typography>
          <TextField
            size="small"
            {...register("name")}
            variant="outlined"
            fullWidth
            multiline
            // rows={3}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2">Description</Typography>
          <TextField
            size="small"
            {...register("description")}
            variant="outlined"
            fullWidth
            multiline
            // rows={3}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2">Video ID</Typography>
          <TextField
            size="small"
            {...register("videoid")}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <Typography variant="subtitle2">Level</Typography>
          <TextField
            size="small"
            {...register("level")}
            variant="outlined"
            fullWidth
          />
        </Box>
      </Stack>
    );
  }, []);

  const updateFooter = useMemo(() => {
    return (
      <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
        <Stack direction={"row"} spacing={1} p={2}>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => onClose && onClose()}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            // onClick={() => handleSubmit(onSubmit)}
            onClick={() => handleSubmit((data: any) => onSubmit(data))()}
            // handleSubmit((data) => onSubmit(data), onError)();
          >
            Save
          </Button>
        </Stack>
      </Stack>
    );
  }, []);

  return (
    <MiModal
      title="Update Course"
      open={open}
      onClose={onClose}
      Footer={updateFooter}
    >
      {mainFields}
    </MiModal>
  );
};

export default AddModal;
