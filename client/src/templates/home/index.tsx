"use client";

import { Footer, HeaderLoggedIn } from "@/shared/components";
import { fadeInUp } from "@/shared/css";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowRoundForward } from "react-icons/io";

const Home = () => {
  return (
    <>
      <HeaderLoggedIn />
      <main>
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
            <h1 className="max-w-5xl text-7xl font-black">
              Descubra as Melhores Receitas do Mundo
            </h1>
            <p className="text-xl max-w-xl mt-5">
              Receitas Incríveis ao Seu Alcance - Surpreenda-se com Pratos para
              Todas as Ocasiões e Gostos
            </p>

            <Link href="#" aria-label="">
              <IoIosArrowDown
                size={34}
                className="mt-16 mb-20 animate-bounce hidden md:block"
              />
            </Link>
          </motion.div>
        </section>

        <section className="p-12">
          <div className="flex gap-2 items-center">
            <h2 className="font-libre-baskerville text-4xl uppercase">
              Recommended
            </h2>
            <Image
              alt="Recommended Icon"
              src={"./icons/home/medal.svg"}
              width={40}
              height={40}
            />
          </div>
          <div className="bg-card-light shadow-default max-w-72 rounded-lg">
            <Image alt="" src={"/test.png"} width={288} height={171} />
            <div>
              <div className="p-5 flex flex-col	gap-2">
                <div className="flex-center-between">
                  <p className="font-bold">Hamburger</p>
                  <span className="px-2 py-1 text-default-white bg-primary-light rounded-xl">
                    Launch
                  </span>
                </div>
                <div className="flex-center-between">
                  <p>Cuisine American</p>
                  <span className="px-2 py-1 text-default-white bg-primary-light rounded-xl">
                    Dinner
                  </span>
                </div>
              </div>

              <div className="flex-center-between bg-primary text-default-white w-full px-5 py-2 rounded-b-lg">
                <p>Read Full Recipe</p>
                <IoIosArrowRoundForward size={32} />
              </div>
            </div>
          </div>
        </section>

        <section className="p-12 bg-primary">
          <div className="flex gap-2 items-center">
            <h2 className="font-libre-baskerville text-4xl uppercase text-default-white">
              Meal Type
            </h2>
            <Image
              alt="Meal Type Icon"
              src={"./icons/home/food-tray.svg"}
              width={40}
              height={40}
            />
          </div>
          <div className="relative w-fit h-fit flex justify-center items-center border-[5px] border-white shadow-default rounded-full">
            <Image
              alt=""
              src={"/test.png"}
              width={260}
              height={260}
              className="w-[280px] h-[280px]  rounded-full "
              style={{
                objectFit: "cover",
                filter: "brightness( 55% ) contrast( 115% ) blur(2px)",
                backgroundColor: "rgba(0, 0, 0, 0.8)"
              }}
            />
            <h3 className="text-4xl uppercase w-fit absolute bg-card-light p-4 rounded-lg shadow-default font-medium">
              Dinner
            </h3>
          </div>
        </section>

        <section className="p-12">
          <div className="flex gap-2 items-center">
            <h2 className="font-libre-baskerville text-4xl uppercase">
              Cuisine Type
            </h2>
            <Image
              alt="Cuisine Type Icon"
              src={"./icons/home/earth.svg"}
              width={40}
              height={40}
            />
          </div>
          <div className="w-fit relative border-4 border-primary flex justify-center items-center flex-col">
            <Image
              alt=""
              src={"/test.png"}
              width={280}
              height={323}
              style={{
                objectFit: "fill",
                filter: "brightness( 45% ) contrast( 115% ) blur(4px)",
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                minHeight: 323
              }}
            />
            <div className="absolute">
              <h3 className="text-default-white text-3xl font-semibold">
                France
              </h3>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
