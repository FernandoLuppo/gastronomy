"use client";
import { PopupModal } from "@/shared/components/popupModal";
import { linkHoverTapLight } from "@/shared/css";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "./functions";
import { useRouter } from "next/navigation";

export const Menu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuContainer = document.getElementById("menuContainer");
      if (menuContainer && !menuContainer.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const positions = {
    top: 30,
    bottom: "auto",
    left: "auto",
    right: 0
  };

  return (
    <motion.li>
      <div className="relative w-fit" id="menuContainer">
        <motion.div {...linkHoverTapLight}>
          <FaUserCircle
            size={30}
            color="#F2F2F2"
            onClick={() => setShowMenu(prev => !prev)}
            className="cursor-pointer"
          />
        </motion.div>

        {showMenu && (
          <PopupModal positions={positions}>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/profile" onClick={() => setShowMenu(false)}>
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="text-primary"
                  onClick={async () => {
                    setShowMenu(false);
                    await logoutUser(dispatch, router);
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </PopupModal>
        )}
      </div>
    </motion.li>
  );
};
