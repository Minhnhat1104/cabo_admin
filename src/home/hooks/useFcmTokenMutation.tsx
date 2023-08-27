import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useSnackBar } from "@base/hooks/useSnackBar";
import { axios8086 } from "@base/components/axios";

const useFcmTokenMutation = () => {
  const { enqueueSuccess, enqueueError } = useSnackBar();
  const mSubmit = useMutation({
    mutationFn: (params: any) => {
      return axios8086.get(
        `/api/v1/call-center/notification/subscribe/${params?.token}`
      );
    },
    onSuccess: () => {
      enqueueSuccess("Register notification successfully!");
    },
    onError: () => {
      enqueueError("There is an error during submit form!");
    },
  });
  return mSubmit;
};

export default useFcmTokenMutation;
