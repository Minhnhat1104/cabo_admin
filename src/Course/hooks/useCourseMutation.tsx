import { useMutation } from "@tanstack/react-query";
import React from "react";
import axios from "../../base/components/axios";

const useCourseMutation = () => {
  const mUpdate = useMutation({
    mutationFn: (course: any) => {
      const param = {
        name: course?.name,
        description: course?.description,
        videoid: course?.videoid,
        level: course?.level,
      };

      return axios.put(`/courses/${course?._id}`, param);
    },
    onSuccess: () => {
      alert("Update course successfully");
    },
  });

  const mAdd = useMutation({
    mutationFn: (course: any) => {
      const param = {
        name: course?.name,
        description: course?.description,
        videoid: course?.videoid,
        level: course?.level,
      };

      return axios.post(`/courses/store`, param);
    },
    onSuccess: () => {
      alert("Create new course successfully!");
    },
  });

  const mDelete = useMutation({
    mutationFn: (params: any) => {
      return axios.delete(`/courses/destroy`, { data: params || {} });
    },
    onSuccess: () => {
      alert("Delete course successfully!");
    },
  });

  const mRestore = useMutation({
    mutationFn: (params: any) => {
      return axios.patch(`/courses/restore`, { data: params || {} });
    },
    onSuccess: () => {
      alert("Restore course successfully!");
    },
  });

  const mForeceDelete = useMutation({
    mutationFn: (params: any) => {
      return axios.delete(`/courses/destroy/force`, { data: params || {} });
    },
    onSuccess: () => {
      alert("Permanent delete course successfully!");
    },
  });

  return { mUpdate, mAdd, mDelete, mRestore, mForeceDelete };
};

export default useCourseMutation;
