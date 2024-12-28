export const Column = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex items-center flex-col">
      <div>{children}</div>
    </div>
  );
};
