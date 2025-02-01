export const Column = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex items-start md:items-center flex-col">
      {children}
    </div>
  );
};
