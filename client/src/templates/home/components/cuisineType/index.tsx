import { Carrousel } from "@/shared/components";
import { RECIPES_HOME } from "@/shared/constants";
import { fadeInUp } from "@/shared/css";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { CarrouselCard } from "./components";

export const CuisineType = () => {
  return (
    <section className="p-6 md:p-12">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="flex gap-2 items-center justify-center md:justify-start">
          <h2 className="font-libre-baskerville text-2xl md:text-4xl uppercase">
            Cuisine Type
          </h2>
          <Image
            alt="Cuisine Type Icon"
            src={"./icons/home/earth.svg"}
            width={40}
            height={40}
          />
        </div>
        <div className="flex justify-between items-center h-[500px] md:h-[450px]">
          <Carrousel>
            {RECIPES_HOME.cosineType.map(item => {
              return <CarrouselCard item={item} />;
            })}
          </Carrousel>
        </div>
      </motion.div>
    </section>
  );
};
