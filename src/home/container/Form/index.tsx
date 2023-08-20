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
import LocationAutocomplete from "@home/components/LocationAutocomplete";
import useFormSubmit from "@home/hooks/useFormSubmit";
import { useSnackBar } from "@base/hooks/useSnackBar";

interface FormProps {
  refetch?: () => void;
}

const Form = (props: FormProps) => {
  //   const { open, onClose, refetch } = props;
  const theme = useTheme();
  const { enqueueSuccess } = useSnackBar();
  const [searchLocations, setSearchLocations] = useState<string[]>(
    dummyDataRecentLocation
  );
  // ============ handle update modal ================
  const mSubmit = useFormSubmit();

  const defaultValues = {
    //   _id: 0,
    customerOrderLocation: null,
    destination: null,
    customerPhoneNumber: "",
    carType: "",
  };

  const [formValue, setFormValue] = useState<any>(defaultValues);

  const handleReset = () => {
    setFormValue(defaultValues);
  };

  const register = (
    name:
      | "customerOrderLocation"
      | "destination"
      | "customerPhoneNumber"
      | "carType"
  ) => {
    return {
      value: formValue?.[name],
      onChange: (nVal: any) => setFormValue({ ...formValue, [name]: nVal }),
    };
  };

  const handleSubmit = () => {
    console.log("Form value: ", formValue);
    const { customerOrderLocation, destination, customerPhoneNumber, carType } =
      formValue;
    const params = {
      customerOrderLocation: {
        latitude: customerOrderLocation?.location?.latitude,
        longitude: customerOrderLocation?.location?.longitude,
      },
      toLocation: {
        latitude: destination?.location?.latitude,
        longitude: destination?.location?.longitude,
      },
      customerPhoneNumber: customerPhoneNumber,
      distance: 10,
      cost: 20000,
      carType: carType,
      paymentType: 1,
    };
    mSubmit.mutate(params, {
      onSuccess(data, variables, context) {
        handleReset();
      },
    });
  };

  const mainFields = () => {
    return (
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">Customer order location</Typography>
          <LocationAutocomplete {...register("customerOrderLocation")} />
        </Box>
        <Box>
          <Typography variant="subtitle2">Destination</Typography>
          <LocationAutocomplete {...register("destination")} />
        </Box>
        <Box>
          <Typography variant="subtitle2">Customer phone number</Typography>
          <TextField
            size="small"
            {...{
              ...register("customerPhoneNumber"),
              onChange: (e: any) =>
                setFormValue({
                  ...formValue,
                  customerPhoneNumber: e.target.value,
                }),
            }}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <Typography variant="subtitle2">Car type</Typography>
          <SelectBox {...register("carType")} options={VEHICLE_TYPE_OPTIONS} />
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
            onClick={() => handleSubmit()}
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
        <Grid item xs={12} lg={3}></Grid>
        <Grid item xs={12} lg={6}>
          {mainFields()}
          {updateFooter()}
        </Grid>
        {/* <Grid item xs={6} p={2}>
          <Box border={border} p={2} borderRadius={2}>
            {searchLocations.map((_location: string) => (
              <Typography key={_location}>{_location}</Typography>
            ))}
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Form;
