interface IError {
  cause: {
    message: string;
    status: string;
  };
}

export const handleError = (error: IError) => {
  console.log(error);
  alert(
    `An error occurred, error: ${error.cause.message} / status: ${error.cause.status}. Please try again later.`
  );
};
