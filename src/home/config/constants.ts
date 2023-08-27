import { LabelValue } from "@base/types";

export const VEHICLE_TYPE_CAR_4 = "VEHICLE_TYPE_CAR_4";
export const VEHICLE_TYPE_CAR_7 = "VEHICLE_TYPE_CAR_7";
export const VEHICLE_TYPE_MOTORBIKE = "VEHICLE_TYPE_MOTORBIKE";

export const VEHICLE_TYPE_OPTIONS: LabelValue[] = [
  {
    label: "Car with 4 slots",
    value: VEHICLE_TYPE_CAR_4,
  },
  {
    label: "Car with 7 slots",
    value: VEHICLE_TYPE_CAR_7,
  },
  // {
  //   label: "Motorbike",
  //   value: VEHICLE_TYPE_MOTORBIKE,
  // },
];

export const TRIP_STATUS_SEARCHING = "TRIP_STATUS_SEARCHING";
export const TRIP_STATUS_PICKING = "TRIP_STATUS_PICKING";
export const TRIP_STATUS_INPROGRESS = "TRIP_STATUS_INPROGRESS";
export const TRIP_STATUS_DONE = "TRIP_STATUS_DONE";
export const TRIP_STATUS_NO_DRIVER = "TRIP_STATUS_NO_DRIVER";
export const TRIP_STATUS_CUSTOMER_CANCEL = "TRIP_STATUS_CUSTOMER_CANCEL";

export const DRIVER_STATUS_OPTIONS: LabelValue[] = [
  {
    label: "Searching",
    value: TRIP_STATUS_SEARCHING,
    extra: "error",
  },
  {
    label: "Picking",
    value: TRIP_STATUS_PICKING,
    extra: "info",
  },
  {
    label: "In-progress",
    value: TRIP_STATUS_INPROGRESS,
    extra: "primary",
  },
  {
    label: "Done",
    value: TRIP_STATUS_DONE,
    extra: "success",
  },
  {
    label: "No driver",
    value: TRIP_STATUS_NO_DRIVER,
    extra: "warning",
  },
  {
    label: "Cancel",
    value: TRIP_STATUS_CUSTOMER_CANCEL,
    extra: "secondary",
  },
];

export const KEY_SEARCH_IN_FROM_LOCATION = "IN_FROM_LOCATION";
export const KEY_SEARCH_IN_TO_LOCATION = "IN_TO_LOCATION";
export const KEY_SEARCH_IN_CUSTOMER_NAME = "IN_CUSTOMER_NAME";
export const KEY_SEARCH_IN_DRIVER_NAME = "IN_DRIVER_NAME";

export const KEY_SEARCH_OPTIONS: LabelValue[] = [
  {
    label: "In from Location",
    value: KEY_SEARCH_IN_FROM_LOCATION,
  },
  {
    label: "In to Location",
    value: KEY_SEARCH_IN_TO_LOCATION,
  },
  {
    label: "In customer name",
    value: KEY_SEARCH_IN_CUSTOMER_NAME,
  },
  {
    label: "In Driver name",
    value: KEY_SEARCH_IN_DRIVER_NAME,
  },
];
