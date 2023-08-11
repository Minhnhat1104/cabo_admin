import { useMutation } from "@tanstack/react-query";
import React from "react";
import axios from "../../base/components/axios";
import { User } from "../../base/types";

const useUserMutation = () => {
  const mAdd = useMutation({
    mutationFn: (data: any) => {
      const param = {
        email: data?.email,
        username: data?.username,
        password: data?.password,
        phoneNumber: data?.phoneNumber,
        isAdmin: data?.isAdmin || false,
      };

      return axios.post(`/auth/store`, param);
    },
    onSuccess: () => {
      alert("Register successfully!");
    },
  });

  const mUpdate = useMutation({
    mutationFn: (data: any) => {
      const params: any = {};
      if (data?.email) {
        params.email = data?.email;
      }
      if (data?.phoneNumber) {
        params.phoneNumber = data?.phoneNumber;
      }

      return axios.patch(`/auth/${data?.id}`, params);
    },
    onSuccess: () => {
      alert("Update information successfully!");
    },
  });

  const mDelete = useMutation({
    mutationFn: (ids: any) => {
      const params: any = {
        ids: ids,
      };
      return axios.delete(`/auth/destroy`, { data: params });
    },
    onSuccess: () => {
      alert("Delete user successfully!");
    },
  });

  return { mAdd, mUpdate, mDelete };
};

export default useUserMutation;
