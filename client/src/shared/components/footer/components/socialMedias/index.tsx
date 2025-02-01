import { FOOTER_LINKS } from "@/shared/constants";
import { Column } from "..";
import Image from "next/image";
import { linkHoverTap } from "@/shared/css";
import * as motion from "framer-motion/client";

export const SocialMedia = () => {
  return (
    <Column>
      <h3 className="text-xl font-bold mb-5">Social Media</h3>
      <ul className="flex flex-col gap-3 md:gap-6">
        {FOOTER_LINKS.socialMedia.map(item => (
          <motion.li key={item.title} {...linkHoverTap} className="w-fit">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
              className="flex items-center gap-2"
            >
              <Image alt={item.alt} src={item.hrc} width={30} height={30} />
              <span>{item.title}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </Column>
  );
};
