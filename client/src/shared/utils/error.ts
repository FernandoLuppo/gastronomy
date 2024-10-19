export const handleError = (error: unknown) => {
  console.log(error);
  alert(`An error occurred, ${error}. Please try again later.`);
};
