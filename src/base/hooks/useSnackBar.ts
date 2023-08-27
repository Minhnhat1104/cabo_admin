import toast from "react-hot-toast";

export const useSnackBar = () => {
  const enqueueSuccess = (message: string) =>
    toast.success(message, {
      position: "top-right",
    });

  const enqueueError = (message: string) =>
    toast.error(message, {
      position: "top-right",
    });

  return { enqueueSuccess, enqueueError };
};
