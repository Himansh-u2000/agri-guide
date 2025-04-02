import toast from "./toast";

export const asyncHandler = (apiFunction) => {
  return async (...args) => {
    try {
      return await apiFunction(...args);
    } catch (error) {
      console.error("API Error: ", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
      return null; // Return null to prevent breaking the calling function
    }
  };
};
