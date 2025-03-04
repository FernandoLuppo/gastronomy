import { fadeInUp } from "@/shared/css";
import Image from "next/image";
import * as motion from "framer-motion/client";
import clsx from "clsx";

interface ICuisineType {
  children: React.ReactNode;
  bgColor?: boolean;
  title: string;
  iconSrc: string;
  iconAlt: string;
}

export const RecipeContainer = ({
  children,
  bgColor,
  title,
  iconSrc,
  iconAlt
}: ICuisineType) => {
  return (
    <section className={clsx("p-6 md:p-12", { "bg-primary": bgColor })}>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="flex gap-2 items-center justify-center md:justify-start">
          <h2 className="font-libre-baskerville text-2xl md:text-4xl uppercase">
            {title}
          </h2>
          <Image alt={iconAlt} src={iconSrc} width={40} height={40} />
        </div>
        <div className="flex justify-between items-center h-[500px] md:h-[450px]">
          {children}
        </div>
      </motion.div>
    </section>
  );
};
