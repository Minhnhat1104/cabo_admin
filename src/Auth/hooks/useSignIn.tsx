import React from "react";
import axios from "../../base/components/axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../base/types";
// import { queryKeys } from "../config/queryKeys";

const useSignIn = (params: any, enabled: any) => {
  console.log("🚀 ~ file: useSignIn.tsx:8 ~ params:", params);
  const mPost = useQuery({
    queryKey: ["sign-in", params?.username],
    queryFn: () =>
      axios.get(
        `/auth/sign-in/?username=${params?.username}&password=${params?.password}`
      ),
    enabled,
  });
  return mPost;
};

export default useSignIn;
