"use client";

import { togglePasswordVisibility } from "@/shared/lib/features/showPassword-slice";
import { RootState } from "@/shared/lib/store";
import clsx from "clsx";
import { useState } from "react";
import { FieldError } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  errors?: FieldError;
  register: any;
  passwordType?: "password" | "conformPassword";
}

export const Input = ({
  label,
  id,
  errors,
  register,
  passwordType,
  ...other
}: IInput) => {
  const dispatch = useDispatch();
  const { show } = useSelector((state: RootState) => state.passwordReducer);

  return (
    <div>
      <label htmlFor={id} className="text-3xl">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...other}
          {...register}
          className={clsx(`w-full h-12 p-3 rounded-lg shadow-default`, {
            "border-red-500": errors,
            "border-gray-300": !errors,
            "pr-12": other.type === "password"
          })}
        />
        {passwordType && (
          <>
            {passwordType === "password" && (
              <>
                {show.password ? (
                  <FaEye
                    color="#252525"
                    size={23}
                    onClick={() =>
                      dispatch(togglePasswordVisibility("password"))
                    }
                    className="absolute right-3 top-3 cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    color="#252525"
                    size={23}
                    onClick={() =>
                      dispatch(togglePasswordVisibility("password"))
                    }
                    className="absolute right-3 top-3 cursor-pointer"
                  />
                )}
              </>
            )}

            {passwordType === "conformPassword" && (
              <>
                {show.confirmPassword ? (
                  <FaEye
                    color="#252525"
                    size={23}
                    onClick={() =>
                      dispatch(togglePasswordVisibility("confirmPassword"))
                    }
                    className="absolute right-3 top-3 cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    color="#252525"
                    size={23}
                    onClick={() =>
                      dispatch(togglePasswordVisibility("confirmPassword"))
                    }
                    className="absolute right-3 top-3 cursor-pointer"
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      {errors && (
        <p className="text-red-500 w-full mt-1 text-xs md:text-base">
          {errors.message}
        </p>
      )}
    </div>
  );
};
