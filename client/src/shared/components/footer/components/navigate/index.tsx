import { FOOTER_LINKS } from "@/shared/constants";
import { Column } from "..";
import { linkHoverTap } from "@/shared/css";
import Link from "next/link";
import * as motion from "framer-motion/client";

export const Navigate = () => {
  return (
    <Column>
      <h3 className="text-xl font-bold mb-5">Quick Links</h3>
      <ul className="flex flex-col gap-3 md:gap-6">
        {FOOTER_LINKS.quickLinks.map(item => (
          <motion.li {...linkHoverTap} className="w-fit">
            <Link href={item.link}>{item.title}</Link>
          </motion.li>
        ))}
      </ul>
    </Column>
  );
};
