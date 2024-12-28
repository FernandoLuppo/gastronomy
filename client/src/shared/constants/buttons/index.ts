interface IButtonsConstants {
  text: string;
  src: string;
  alt: string;
  socialMedia: "google" | "github";
}

const buttonsConstants: IButtonsConstants[] = [
  {
    text: "Sign in with GitHub",
    src: "/icons/socialMedias/github.svg",
    alt: "Github Login Button",
    socialMedia: "github"
  },
  {
    text: "Sign in with Google",
    src: "/icons/socialMedias/google.svg",
    alt: "Google Login Button",
    socialMedia: "google"
  }
];

export { buttonsConstants };
