"use client";
import { PopupModal } from "@/shared/components/popupModal";
import * as motion from "framer-motion/client";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const userMenu = document.getElementById("userMenu");
      if (userMenu && !userMenu.contains(event.target as Node))
        setShowMenu(false);
    };

    if (showMenu) document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const positions = {
    top: 10,
    bottom: "auto",
    left: "auto",
    right: 0
  };

  return (
    <motion.li>
      <div className="relative w-fit">
        <FaUserCircle
          size={30}
          color="#F2F2F2"
          id="userMenu"
          onClick={e => {
            if (e.currentTarget.id === "userMenu") {
              setShowMenu(prev => !prev);
            }
          }}
          className="cursor-pointer"
        />

        {showMenu && (
          <PopupModal positions={positions}>
            <ul>
              <li>Profile</li>
              <li>Log Out</li>
            </ul>
          </PopupModal>
        )}
      </div>
    </motion.li>
  );
};
