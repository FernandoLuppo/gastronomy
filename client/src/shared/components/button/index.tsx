import Image from "next/image";
import { fadeIn, fadeInUp, linkHoverTap } from "../../css";
import clsx from "clsx";
import * as motion from "framer-motion/client";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  src?: string;
  alt?: string;
  socialMedia?: "google" | "github";
  onClick?: () => void;
}

export const Button = ({ text, src, alt, socialMedia, onClick }: IButton) => {
  return (
    <motion.button
      className={clsx(
        "h-12 w-full shadow-default flex-center gap-2 rounded-lg font-semibold",
        {
          "bg-[#252525] text-default-white": socialMedia === "github",
          "bg-[#FFFFFF] text-default-black px-5 py-4 border-[#DFDFDF] border-[1px]":
            socialMedia === "google",
          "bg-primary text-default-white border-none": !socialMedia
        }
      )}
      onClick={onClick}
      {...linkHoverTap}
    >
      {src && alt && (
        <Image
          src={src}
          alt={alt}
          width={20}
          height={20}
          objectFit="contain"
          loading="lazy"
        />
      )}
      {text}
    </motion.button>
  );
};
