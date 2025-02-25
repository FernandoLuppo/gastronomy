"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";

export const Dropdown = ({
  dishTypePath,
  options
}: {
  dishTypePath: string;
  options: { label: string; urlSeo: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleDropdown = () => setIsOpen(prev => !prev);
  const handleOptionClick = async (meal: string) => {
    const currentPath = window.location.pathname.split("/");
    currentPath[currentPath.length - 1] = meal;

    const newPath = currentPath.join("/");
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative w-40">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between p-2 rounded-lg w-full bg-primary text-white"
      >
        <span>{dishTypePath}</span>
        {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
      </button>

      {isOpen && (
        <ul className="absolute top-full mt-1 w-full bg-primary border border-placeholder rounded-lg shadow-lg z-10">
          {options.map((item, index) => (
            <li>
              <button
                key={index}
                onClick={() => handleOptionClick(item.urlSeo)}
                className={`p-2 cursor-pointer hover:bg-primary-dark w-full text-left ${
                  index === 0 ? "rounded-t-lg" : ""
                } ${index === options.length - 1 ? "rounded-b-lg" : ""}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
