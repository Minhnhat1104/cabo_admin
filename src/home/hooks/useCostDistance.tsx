import React from "react";
import axios from "../../base/components/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../config/querykeys";

const useCostDistance = (params?: any, options?: any) => {
  const mPost = useQuery<any[]>({
    queryKey: [queryKeys.list_listPlace, params],
    queryFn: async () => {
      const res: any = await axios.post(
        `api/v1/bing-map/drive-booking/estimate-cost`,
        params
      );
      return res?.data;
    },

    ...options,
  });
  return mPost;
};

export default useCostDistance;
