import clsx from "clsx";
import { InputEye } from "./components/inputEye";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  errors: any;
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
  return (
    <div>
      <label
        htmlFor={id}
        className="text-3xl text-default-black dark:text-default-white"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...other}
          {...register}
          className={clsx(
            "w-full h-12 p-3 rounded-lg shadow-default bg-card-light text-default-black",
            {
              "border-red-500": errors,
              "border-gray-300": !errors,
              "pr-12": other.type === "password"
            }
          )}
        />
        <InputEye passwordType={passwordType} />
      </div>
      {errors && (
        <p className="text-red-500 w-full mt-1 text-xs md:text-base">
          {errors.message}
        </p>
      )}
    </div>
  );
};
