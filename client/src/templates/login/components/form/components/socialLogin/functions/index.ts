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

export { handleSocialLogin };
