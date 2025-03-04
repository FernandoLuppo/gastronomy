"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export const Error = ({ error }: { error: string }) => {
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return <div></div>;
};
