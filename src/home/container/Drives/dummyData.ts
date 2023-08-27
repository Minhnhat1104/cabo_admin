import { generateUUID } from "@base/utils";
import {
  TRIP_STATUS_SEARCHING,
  TRIP_STATUS_PICKING,
  TRIP_STATUS_INPROGRESS,
  TRIP_STATUS_DONE,
  TRIP_STATUS_NO_DRIVER,
  TRIP_STATUS_CUSTOMER_CANCEL,
} from "@home/config/constants";

export interface Drive {
  id: string;
  from: string;
  to: string;
  customer: string;
  driver: string;
  status: string;
}

export const dummyData: Drive[] = [
  {
    id: generateUUID(),
    from: "111B Tran Hung Dao street, district 1",
    to: "227 Nguyen Van Cu street, district 5",
    customer: "Nguyen Thien Phu",
    driver: "Le Minh Nhat",
    status: TRIP_STATUS_SEARCHING,
  },
  {
    id: generateUUID(),
    from: "222B Tran Hung Dao street, district 1",
    to: "227 Nguyen Van Cu street, district 5",
    customer: "Nguyen Thien Phu",
    driver: "Le Minh Nhat",
    status: TRIP_STATUS_PICKING,
  },
  {
    id: generateUUID(),
    from: "333B Tran Hung Dao street, district 1",
    to: "227 Nguyen Van Cu street, district 5",
    customer: "Nguyen Thien Phu",
    driver: "Le Minh Nhat",
    status: TRIP_STATUS_INPROGRESS,
  },
  {
    id: generateUUID(),
    from: "444B Tran Hung Dao street, district 1",
    to: "227 Nguyen Van Cu street, district 5",
    customer: "Nguyen Thien Phu",
    driver: "Le Minh Nhat",
    status: TRIP_STATUS_DONE,
  },
];
