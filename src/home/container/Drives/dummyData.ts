import { generateUUID } from "@base/utils";
import {
  DRIVER_STATUS_DONE,
  DRIVER_STATUS_IN_PROGRESS,
  DRIVER_STATUS_PICKING,
  DRIVER_STATUS_SEARCHING,
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
    status: DRIVER_STATUS_SEARCHING,
  },
  {
    id: generateUUID(),
    from: "222B Tran Hung Dao street, district 1",
    to: "227 Nguyen Van Cu street, district 5",
    customer: "Nguyen Thien Phu",
    driver: "Le Minh Nhat",
    status: DRIVER_STATUS_PICKING,
  },
  {
    id: generateUUID(),
    from: "333B Tran Hung Dao street, district 1",
    to: "227 Nguyen Van Cu street, district 5",
    customer: "Nguyen Thien Phu",
    driver: "Le Minh Nhat",
    status: DRIVER_STATUS_IN_PROGRESS,
  },
  {
    id: generateUUID(),
    from: "444B Tran Hung Dao street, district 1",
    to: "227 Nguyen Van Cu street, district 5",
    customer: "Nguyen Thien Phu",
    driver: "Le Minh Nhat",
    status: DRIVER_STATUS_DONE,
  },
];
