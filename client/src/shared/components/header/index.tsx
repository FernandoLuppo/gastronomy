import Image from "next/image";
import * as motion from "framer-motion/client";
import { Nav } from "./components";
import { fadeIn } from "@/shared/css";

export const Header = () => {
  const user = false;

  return (
    <header className="flex justify-center lg:justify-between items-center p-12 bg-primary lg:bg-none lg:fixed lg:top-0 lg:z-10">
      <motion.div
        className="flex gap-2 items-end"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        <Image alt="" src="/icons/logo.svg" width={50} height={50} />
        <h1 className="text-default-white font-la-belle-aurore text-4xl">
          LuppoTW
        </h1>
      </motion.div>

      {user && <Nav />}
    </header>
  );
};
