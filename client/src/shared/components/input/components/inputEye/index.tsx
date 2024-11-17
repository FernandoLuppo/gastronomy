import { togglePasswordVisibility } from "@/shared/lib/features/showPassword-slice";
import { RootState } from "@/shared/lib/store";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

interface IInputEye {
  passwordType?: "password" | "conformPassword";
}

export const InputEye = ({ passwordType }: IInputEye) => {
  const dispatch = useDispatch();
  const { show } = useSelector((state: RootState) => state.passwordReducer);

  return (
    <>
      {passwordType && (
        <>
          {passwordType === "password" && (
            <>
              {show.password ? (
                <FaEye
                  color="#252525"
                  size={23}
                  onClick={() => dispatch(togglePasswordVisibility("password"))}
                  className="absolute right-3 top-3 cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  color="#252525"
                  size={23}
                  onClick={() => dispatch(togglePasswordVisibility("password"))}
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
    </>
  );
};
