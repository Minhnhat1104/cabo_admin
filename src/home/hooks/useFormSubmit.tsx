import { useMutation } from "@tanstack/react-query";
import React from "react";
import { axios8086 } from "../../base/components/axios";
import { useSnackBar } from "@base/hooks/useSnackBar";

const useFormSubmit = () => {
  const { enqueueSuccess, enqueueError } = useSnackBar();
  const mSubmit = useMutation({
    mutationFn: (params: any) => {
      return axios8086.post(
        `/api/v1/call-center/drive-booking/confirm`,
        params
      );
    },
    onSuccess: () => {
      console.log("Success!!");

      enqueueSuccess("Submit successfully!");
    },
    onError: () => {
      enqueueError("There is an error during submit form!");
    },
  });
  return mSubmit;
};

export default useFormSubmit;
