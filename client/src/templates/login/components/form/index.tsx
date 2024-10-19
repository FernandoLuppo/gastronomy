import { fadeInUp } from "@/shared/css";
import { HorizontalDivider, SocialLogin, UserInfos } from "./components";
import * as motion from "framer-motion/client";

export const Form = () => {
  return (
    <div className="lg:w-1/2 flex-col flex-center w-full">
      <motion.div
        className="w-full md:w-[330px] max-w-none md:max-w-[330px]"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
      >
        <h1 className="text-6xl text-center mb-16">Sign in</h1>

        <UserInfos />
        <HorizontalDivider />
        <SocialLogin />
      </motion.div>
    </div>
  );
};
