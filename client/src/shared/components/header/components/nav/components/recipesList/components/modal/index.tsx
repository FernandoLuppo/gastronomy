import { linkHoverTap } from "@/shared/css";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { RECIPES_HEADER_NAV } from "@/shared/constants";
import { PopupModal } from "@/shared/components/popupModal";

export const RecipesModal = () => {
  const positions = {
    top: 23,
    bottom: "auto",
    left: "auto",
    right: 0
  };

  return (
    <PopupModal positions={positions}>
      {RECIPES_HEADER_NAV.map(item => {
        return (
          <motion.li {...linkHoverTap}>
            <Link href={item.url}>{item.label}</Link>
          </motion.li>
        );
      })}
    </PopupModal>
  );
};
