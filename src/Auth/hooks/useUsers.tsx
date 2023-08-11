import React from "react";
import axios from "../../base/components/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../config/queryKeys";

const useUsers = () => {
  const mPost = useQuery({
    queryKey: [queryKeys.users],
    queryFn: () => axios.get("/auth/users"),
  });
  return mPost;
};

export default useUsers;
