import Link from "next/link";
import * as motion from "framer-motion/client";
import { fadeIn } from "@/shared/css";

interface INavLinkButton {
  text: string;
  href: string;
}

export const NavLinkButton = ({ text, href }: INavLinkButton) => {
  return (
    <motion.div
      className="bg-none border border-primary px-5 py-4"
      variants={fadeIn}
      initial="hidden"
      animate="show"
    >
      <Link href={href} className="font-semibold text-primary">
        {text}
      </Link>
    </motion.div>
  );
};
