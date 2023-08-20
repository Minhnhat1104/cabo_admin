import { useMutation } from "@tanstack/react-query";
import React from "react";
import axios from "../../base/components/axios";
import { User } from "../../base/types";

const useFormSubmit = () => {
  const mSubmit = useMutation({
    mutationFn: (params: any) => {
      return axios.post(`/api/v1/call-center/drive-booking/confirm`, params);
    },
    onSuccess: () => {
      alert("Register successfully!");
    },
  });
  return mSubmit;
};

export default useFormSubmit;
