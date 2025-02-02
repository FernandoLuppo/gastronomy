import { fadeInUp } from "@/shared/css";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import * as motion from "framer-motion/client";

export const Banner = () => {
  return (
    <section className="relative overflow-hidden py-5 px-6 md:py-10 md:px-24 pt-36 md:pt-72">
      <Image
        alt="Home Banner"
        src="/images/home/banner.png"
        placeholder="blur"
        blurDataURL="data: Prédios"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          filter: "brightness( 55% ) contrast( 115% ) blur(3px)",
          backgroundColor: "rgba(123, 29, 32, 0.8)"
        }}
        loading="eager"
      />

      <motion.div
        className="relative flex flex-col justify-end items-center text-center text-default-white"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
      >
        <h1 className="max-w-5xl  text-3xl md:text-7xl font-black">
          Discover the World's Best Recipes
        </h1>
        <p className="text-base md:text-xl max-w-xl mt-5 mb-5 md:mb-0">
          Incredible Dishes at Your Fingertips - Delight in Meals for Every
          Occasion and Taste
        </p>

        <Link href="#" className="hidden md:block">
          <IoIosArrowDown
            size={34}
            className="mt-16 mb-20 animate-bounce hidden md:block"
          />
        </Link>
      </motion.div>
    </section>
  );
};
