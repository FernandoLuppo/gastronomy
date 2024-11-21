import { fadeInUp } from "@/shared/css";
import * as motion from "framer-motion/client";
import Image from "next/image";

export const AuthCard = () => {
  return (
    <div className="w-1/2 min-h-screen lg:flex flex-col justify-center items-center bg-primary hidden">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="flex-center flex-col"
      >
        <Image alt="" src="/icons/lobster.svg" width={400} height={400} />
        <h2 className="text-default-white text-3xl font-semibold max-w-80 text-center">
          Learn to prepare incredible dishes
        </h2>
      </motion.div>
    </div>
  );
};
