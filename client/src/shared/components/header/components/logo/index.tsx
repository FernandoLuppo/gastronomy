import * as motion from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 }
      }}
      initial="hidden"
      animate="show"
    >
      <Link href="/" className="flex gap-2 items-end">
        <Image alt="" src="/icons/logo.svg" width={50} height={50} />
        <h1 className="text-default-white font-la-belle-aurore text-4xl">
          LuppoTW
        </h1>
      </Link>
    </motion.div>
  );
};
