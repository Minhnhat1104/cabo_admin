import React from "react";
import axios from "../../base/components/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../config/querykeys";

const useListPlace = (params: { searchLocation: string }, options?: any) => {
  const mPost = useQuery<any[]>({
    queryKey: [queryKeys.list_listPlace, params?.searchLocation],
    queryFn: async () => {
      const res: any = await axios.get(
        `/api/v1/bing-map/get-list-places?searchLocation=${params?.searchLocation}`
      );
      return res?.data;
    },

    ...options,
  });
  return mPost;
};

export default useListPlace;
