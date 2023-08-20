import toast from "react-hot-toast";

export const useSnackBar = () => {
  const enqueueSuccess = (message: string) =>
    toast.success(message, {
      position: "bottom-right",
    });

  const enqueueError = (message: string) =>
    toast.error(message, {
      position: "bottom-right",
    });

  return { enqueueSuccess, enqueueError };
};
