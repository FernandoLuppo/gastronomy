import toast from "react-hot-toast";

const handleSocialLogin = ({ socialMedia }: { socialMedia: string }) => {
  try {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/social-login/auth/${socialMedia}`,
      "_self"
    );
  } catch (error) {
    console.log(error);
    const message =
      error instanceof Error
        ? error.message
        : "An error occurred during social login. Please try again later.";
    return toast.error(message);
  }
};

export { handleSocialLogin };
