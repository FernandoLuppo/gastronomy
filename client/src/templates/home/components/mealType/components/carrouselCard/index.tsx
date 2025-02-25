import Image from "next/image";
import Link from "next/link";

export const CarrouselCard = ({
  item
}: {
  item: { name: string; urlImg: string; urlSeo: string };
}) => {
  return (
    <Link href={`/recipe-list/meal/${item.urlSeo}`} target="_blank">
      <div
        key={item.name}
        className="relative max-w-[280px] h-fit flex justify-center items-center border-[5px] border-white shadow-default rounded-full"
      >
        <Image
          alt={item.name}
          src={item.urlImg}
          width={260}
          height={260}
          className="w-[280px] h-[280px] rounded-full"
          style={{
            objectFit: "cover",
            filter: "brightness(55%) contrast(115%) blur(2px)",
            backgroundColor: "rgba(0, 0, 0, 0.8)"
          }}
        />
        <h3 className="text-4xl uppercase w-fit absolute bg-card-light dark:text-default-black p-4 rounded-lg shadow-default font-medium">
          {item.name}
        </h3>
      </div>
    </Link>
  );
};
