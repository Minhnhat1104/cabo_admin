import MiModal from "../../../base/components/MiModal";
import React, { useMemo } from "react";
import _ from "lodash";
import {
  Box,
  Button,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useUserMutation from "../../hooks/useUserMutation";
import { SET_TIMEOUT } from "../../../base/constants";

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
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
      isAdmin: false,
    },
  });

  const { mAdd } = useUserMutation();

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
          <Typography variant="subtitle2">Email</Typography>
          <TextField
            size="small"
            {...register("email")}
            variant="outlined"
            fullWidth
            multiline
            // rows={3}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2">Username</Typography>
          <TextField
            size="small"
            {...register("username")}
            variant="outlined"
            fullWidth
            multiline
            // rows={3}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2">Password</Typography>
          <TextField
            size="small"
            {...register("password")}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <Typography variant="subtitle2">Phone number</Typography>
          <TextField
            size="small"
            {...register("phoneNumber")}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2">Is admin</Typography>
          <Switch
            inputProps={{ "aria-label": "controlled" }}
            {...register("isAdmin")}
          />
        </Stack>
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
      title="Create new user"
      open={open}
      onClose={onClose}
      Footer={updateFooter}
    >
      {mainFields}
    </MiModal>
  );
};

export default AddModal;
