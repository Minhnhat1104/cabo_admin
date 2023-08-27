import React from "react";
import { axios8083 } from "../../base/components/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../config/querykeys";

const useDrives = (params?: any, options?: any) => {
  const mPost = useQuery<any[]>({
    queryKey: [queryKeys.list_drives],
    queryFn: async () => {
      const res: any = await axios8083.get(`/api/v1/trip`);
      return res?.data;
    },

    ...options,
  });
  return mPost;
};

export default useDrives;
