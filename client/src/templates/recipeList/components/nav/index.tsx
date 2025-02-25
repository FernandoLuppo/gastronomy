import { IoHomeSharp, IoArrowForwardSharp } from "react-icons/io5";
import Link from "next/link";
import { Dropdown } from "./components";

export const Nav = ({
  upperCasePath,
  dishTypePath,
  options
}: {
  upperCasePath: string;
  dishTypePath: string;
  options: { label: string; urlSeo: string }[];
}) => {
  return (
    <section className="mt-26 px-6 pb-3 mt-12 md:px-12 w-full flex flex-col sm:flex-row justify-between items-baseline sm:items-center gap-5 sm:gap-0">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-start gap-1">
          <IoHomeSharp size={20} />
          <p>HOME</p>
        </Link>
        <IoArrowForwardSharp />
        <p>{upperCasePath}</p>
      </div>

      <Dropdown options={options} dishTypePath={dishTypePath} />
    </section>
  );
};
