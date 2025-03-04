import { Column } from "..";

export const Summary = () => {
  return (
    <Column>
      <div>
        <div className="flex items-center text-3xl font-la-belle-aurore mb-5 gap-2">
          <img src="/icons/logo.svg" alt="Logo Icon" />
          <p>LuppoTW</p>
        </div>
        <p className="w-80 text leading-6">
          Welcome to our recipe search site! This project is a study endeavor,
          designed to help you explore and discover delicious recipes from
          around the world. Happy cooking!
        </p>
      </div>
    </Column>
  );
};
