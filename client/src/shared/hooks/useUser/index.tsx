"use client";

import { setUser } from "@/shared/lib/features/user-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useLoadUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromLocalStorage = localStorage.getItem("LuppoTw-User");
      if (userFromLocalStorage) {
        dispatch(setUser(JSON.parse(userFromLocalStorage)));
      }
    }
  }, [dispatch]);

  return <></>;
};

export default useLoadUser;
