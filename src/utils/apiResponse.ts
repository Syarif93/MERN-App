export const apiResponse = ({
  message = "Internal server error!",
  data = null,
}: {
  message?: string;
  data?: any;
}) => {
  return {
    message,
    data,
  };
};
