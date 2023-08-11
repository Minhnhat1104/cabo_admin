import React from "react";
import axios from "../../base/components/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../config/queryKeys";

const useCourses = () => {
  const mPost = useQuery({
    queryKey: [queryKeys.courses],
    queryFn: () => axios.get("/"),
  });
  return mPost;
};

export default useCourses;
