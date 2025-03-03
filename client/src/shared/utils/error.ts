interface IError {
  message: string;
  status: string;
}

export const handleError = (error: IError) => {
  console.log(error);
  return {
    error: error.message,
    status: error.status,
    success: false,
    data: null
  };
};
