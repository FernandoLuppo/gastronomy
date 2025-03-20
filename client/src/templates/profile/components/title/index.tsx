import Image from "next/image";

export const Title = () => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl text-center mb-8 font-semibold">User Profile</h1>

      <Image
        src="/images/profile/userProfile.png"
        alt="Profile Image"
        width={130}
        height={130}
        className="shadow-default rounded-full bg-primary-dark p-2 border-card-black dark:border-card-light border-4 m-auto"
      />
    </div>
  );
};
