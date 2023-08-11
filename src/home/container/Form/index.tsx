import MiModal from "../../../base/components/MiModal";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
import { useForm } from "react-hook-form";
// import useCourseMutation from "../../hooks/useCourseMutation";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { SET_TIMEOUT } from "../../../base/constants";
import { dummyDataRecentLocation } from "./dummyData";
import { VEHICLE_TYPE_OPTIONS } from "@home/config/constants";
import SelectBox from "@home/components/SelectBox";

interface FormProps {
  refetch?: () => void;
}

const Form = (props: FormProps) => {
  //   const { open, onClose, refetch } = props;
  const theme = useTheme();
  const [searchLocations, setSearchLocations] = useState<string[]>(
    dummyDataRecentLocation
  );
  // ============ handle update modal ================
  const defaultValues = {
    //   _id: 0,
    customerOrderLocation: "",
    destination: "",
    customerPhoneNumber: "",
    carType: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues,
  });

  //   const { mAdd } = useCourseMutation();
  const mAdd = () => {};

  const onSubmit = (data: any) => {
    console.log("🚀 Submit data:", data);
    // mAdd.mutate(data, {
    //   onSuccess: () => {
    //     setTimeout(() => {
    //       //   refetch && refetch();
    //     }, SET_TIMEOUT);
    //   },
    // });

    // onClose && onClose();
  };

  const handleReset = () => {
    reset();
  };

  const mainFields = () => {
    return (
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">Customer order location</Typography>
          <TextField
            size="small"
            {...register("customerOrderLocation", { required: true })}
            variant="outlined"
            fullWidth
            multiline
            // rows={3}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2">Destination</Typography>
          <TextField
            size="small"
            {...register("destination", { required: true })}
            variant="outlined"
            fullWidth
            multiline
            // rows={3}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2">Customer phone number</Typography>
          <TextField
            size="small"
            {...register("customerPhoneNumber", { required: true })}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <Typography variant="subtitle2">Car type</Typography>
          <SelectBox
            {...register("carType", { required: true })}
            options={VEHICLE_TYPE_OPTIONS}
          />
        </Box>
      </Stack>
    );
  };

  const updateFooter = () => {
    return (
      <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
        <Stack direction={"row"} spacing={1} py={2}>
          <Button
            variant="outlined"
            // color="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            // onClick={() => handleSubmit(onSubmit)}
            onClick={() => handleSubmit((data: any) => onSubmit(data))()}
            // handleSubmit((data) => onSubmit(data), onError)();
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    );
  };

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {mainFields()}
          {updateFooter()}
        </Grid>
        <Grid item xs={6} p={2}>
          <Box border={border} p={2} borderRadius={2}>
            {searchLocations.map((_location: string) => (
              <Typography key={_location}>{_location}</Typography>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
