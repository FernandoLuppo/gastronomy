import { IRecommendedRecipes } from "@/shared/types";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";

export const CarrouselCard = (item: IRecommendedRecipes) => {
  return (
    <div
      key={item?._id}
      className="bg-card-light dark:bg-card-black shadow-default max-w-[250px] md:max-w-[280px] max-h-80 rounded-lg flex flex-col"
    >
      <Image
        alt={item?.label}
        src={item?.image}
        width={280}
        height={171}
        style={{
          height: 171,
          objectFit: "contain",
          borderRadius: "8px 8px 0 0"
        }}
        className="bg-[#b1b1b1] dark:bg-card-black"
      />
      <div className="flex flex-col">
        <div className="p-5 flex flex-col	gap-2 justify-between">
          <div className="flex-center-between">
            <p className="font-bold truncate">{item?.label}</p>
          </div>
          <div className="flex-center-between">
            <p>{item?.cuisineType[0]}</p>
            {item?.mealType.map(meal => (
              <span className="px-2 py-1 text-card-light bg-primary-light rounded-xl">
                {meal}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-center-between bg-primary text-default-white w-full px-5 py-2 rounded-b-lg">
          <p>Read Full Recipe</p>
          <IoIosArrowRoundForward size={32} />
        </div>
      </div>
    </div>
  );
};
