"use client";

import { Button } from "@/shared/components";
import { handleForm } from "../../../../functions";
import { buttonsConstants } from "@/shared/constants";

export const SocialLogin = () => {
  const { isSubmitting } = handleForm();

  const handleSocialLogin = ({ socialMedia }: { socialMedia: string }) => {
    try {
      window.open(
        `${process.env.NEXT_PUBLIC_API_URL}/social-login/auth/${socialMedia}`,
        "_self"
      );
    } catch (error) {
      console.log(error);
      alert("Error during social login");
    }
  };

  return (
    <div className="w-full flex-center flex-col gap-4">
      {buttonsConstants.map(({ alt, socialMedia, src, text }) => {
        return (
          <Button
            alt={alt}
            socialMedia={socialMedia}
            src={src}
            text={text}
            disabled={isSubmitting}
            onClick={() => handleSocialLogin({ socialMedia })}
          />
        );
      })}
    </div>
  );
};
