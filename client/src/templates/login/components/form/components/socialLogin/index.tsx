"use client";

import { Button } from "@/shared/components";
import { handleForm } from "../../../../functions";
import { BUTTONS_CONSTANTS } from "@/shared/constants";
import { handleSocialLogin } from "./functions";

export const SocialLogin = () => {
  const { isSubmitting } = handleForm();

  return (
    <div className="w-full flex-center flex-col gap-4">
      {BUTTONS_CONSTANTS.map(({ alt, socialMedia, src, text }) => {
        return (
          <Button
            alt={alt}
            socialMedia={socialMedia}
            src={src}
            text={text}
            disabled={isSubmitting}
            onClick={() => handleSocialLogin({ socialMedia })}
            key={socialMedia + " button"}
          />
        );
      })}
    </div>
  );
};
