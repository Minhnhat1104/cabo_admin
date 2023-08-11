import React from "react";
import axios from "../../base/components/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../config/queryKeys";

const useCourse = (sourceId: string) => {
  const mPost = useQuery({
    queryKey: [queryKeys.course, sourceId],
    queryFn: () => axios.get(`/courses/${sourceId}`),
    enabled: sourceId !== "",
  });
  return mPost;
};

export default useCourse;
