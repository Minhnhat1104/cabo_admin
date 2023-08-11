import React from "react";
import axios from "../../base/components/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../config/queryKeys";

const useDeletedCourses = () => {
  const mPost = useQuery({
    queryKey: [queryKeys.deleted_courses],
    queryFn: () => axios.get("/me/trash/courses"),
  });
  return mPost;
};

export default useDeletedCourses;
