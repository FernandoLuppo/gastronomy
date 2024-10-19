"use client";

import { Button } from "@/shared/components";
import { handleForm } from "../../../../functions";

export const SocialLogin = () => {
  const { isSubmitting } = handleForm();

  return (
    <div className="w-full flex-center flex-col gap-4">
      <Button
        text="Sign in with GitHub"
        src="/icons/github.svg"
        alt="Github Login Button"
        socialMedia="github"
        disabled={isSubmitting}
      />
      <Button
        text="Sign in with Google"
        src="/icons/google.svg"
        alt="Google Login Button"
        socialMedia="google"
        disabled={isSubmitting}
      />
      <Button
        text="Sign in with Facebook"
        src="/icons/facebook.svg"
        alt="Facebook Login Button"
        socialMedia="facebook"
        disabled={isSubmitting}
      />
    </div>
  );
};
