import { LabelValue } from "@base/types";

export const VEHICLE_TYPE_CAR_4_SLOT = "VEHICLE_TYPE_CAR_4_SLOT";
export const VEHICLE_TYPE_CAR_7_SLOT = "VEHICLE_TYPE_CAR_7_SLOT";
export const VEHICLE_TYPE_MOTORBIKE = "VEHICLE_TYPE_MOTORBIKE";

export const VEHICLE_TYPE_OPTIONS: LabelValue[] = [
  {
    label: "Car with 4 slots",
    value: VEHICLE_TYPE_CAR_4_SLOT,
  },
  {
    label: "Car with 7 slots",
    value: VEHICLE_TYPE_CAR_7_SLOT,
  },
  {
    label: "Motorbike",
    value: VEHICLE_TYPE_MOTORBIKE,
  },
];

export const DRIVER_STATUS_SEARCHING = "DRIVER_STATUS_SEARCHING";
export const DRIVER_STATUS_PICKING = "DRIVER_STATUS_PICKING";
export const DRIVER_STATUS_IN_PROGRESS = "DRIVER_STATUS_IN_PROGRESS";
export const DRIVER_STATUS_DONE = "DRIVER_STATUS_DONE";

export const DRIVER_STATUS_OPTIONS: LabelValue[] = [
  {
    label: "Searching",
    value: DRIVER_STATUS_SEARCHING,
    extra: "error",
  },
  {
    label: "Picking",
    value: DRIVER_STATUS_PICKING,
    extra: "info",
  },
  {
    label: "In-progress",
    value: DRIVER_STATUS_IN_PROGRESS,
    extra: "warning",
  },
  {
    label: "Done",
    value: DRIVER_STATUS_DONE,
    extra: "success",
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
