import { Navigate, SocialMedia, Summary } from "./components";
import * as motion from "framer-motion/client";
import { fadeInUp } from "@/shared/css";

export const Footer = () => {
  return (
    <footer className="bg-primary text-default-white p-8 md:p-16">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full flex-center flex-col"
      >
        <div className="w-full flex flex-col gap-10 md:flex-row justify-between">
          <Summary />
          <Navigate />
          <SocialMedia />
        </div>
        <p className="mt-10 md:mt-20">© 2025 LuppoTW. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};
