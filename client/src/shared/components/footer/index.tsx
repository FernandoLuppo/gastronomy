import { FOOTER_LINKS } from "@/shared/constants";
import Image from "next/image";
import Link from "next/link";
import { Column } from "./components";
import * as motion from "framer-motion/client";
import { fadeIn, linkHoverTap } from "@/shared/css";

export const Footer = () => {
  return (
    <footer className="bg-primary text-default-white p-16">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="w-full flex-center flex-col"
      >
        <div className="w-full flex justify-between">
          <Column>
            <div className="flex items-center text-3xl font-la-belle-aurore mb-5 gap-2">
              <img src="/icons/logo.svg" alt="Logo Icon" />
              <p>LuppoTW</p>
            </div>
            <p className="w-80 text leading-6">
              Welcome to our recipe search site! This project is a study
              endeavor, designed to help you explore and discover delicious
              recipes from around the world. Happy cooking!
            </p>
          </Column>

          <Column>
            <h3 className="text-xl font-bold mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-6">
              {FOOTER_LINKS.quickLinks.map(item => (
                <motion.li {...linkHoverTap} className="w-fit">
                  <Link href={item.link}>{item.title}</Link>
                </motion.li>
              ))}
            </ul>
          </Column>

          <Column>
            <h3 className="text-xl font-bold mb-5">Social Media</h3>
            <ul className="flex flex-col gap-6">
              {FOOTER_LINKS.socialMedia.map(item => (
                <motion.li key={item.title} {...linkHoverTap} className="w-fit">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.link}
                    className="flex items-center gap-2"
                  >
                    <Image
                      alt={item.alt}
                      src={item.hrc}
                      width={30}
                      height={30}
                    />
                    <span>{item.title}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </Column>
        </div>

        <p className="mt-20">© 2024 LuppoTW. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};
