import Image from "next/image";
import Link from "next/link";

export const CarrouselCard = ({
  item
}: {
  item: { name: string; urlImg: string; urlSeo: string };
}) => {
  return (
    <Link href={`/recipe-list/cuisine/${item.urlSeo}`} target="_blank">
      <div className="w-fit relative border-4 border-primary flex justify-center items-center flex-col">
        <Image
          alt=""
          src={item.urlImg}
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
            {item.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};
