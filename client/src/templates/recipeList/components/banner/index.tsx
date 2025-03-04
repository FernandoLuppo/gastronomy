import Image from "next/image";

export const Banner = ({
  type,
  children
}: {
  type: string;
  children: React.ReactNode;
}) => {
  const imageType =
    type === "findBy"
      ? "/images/recipeList/search-by-banner.png"
      : "/images/recipeList/cuisine-type-banner.png";

  return (
    <section className="relative overflow-hidden py-16 px-6 md:py-32 md:px-24 ">
      <Image
        alt="Recipe List Banner"
        src={imageType}
        placeholder="blur"
        blurDataURL="data: Recipe List Banner"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          filter: "brightness( 30% ) contrast( 115% ) blur(7px)"
        }}
        loading="eager"
        className="-z-10"
      />

      <div>{children}</div>
    </section>
  );
};
