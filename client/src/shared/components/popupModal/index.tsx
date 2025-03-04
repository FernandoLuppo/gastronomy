export const PopupModal = ({
  children,
  positions
}: {
  children: React.ReactNode;
  positions: {
    top: number | string;
    right: number | string;
    left: number | string;
    bottom: number | string;
  };
}) => {
  return (
    <ul
      className="absolute flex flex-col gap-3 w-max p-4 rounded-lg shadow-default border-2 border-gray-300 bg-default-white text-default-black"
      style={{
        top: positions.top,
        right: positions.right,
        bottom: positions.bottom,
        left: positions.left
      }}
    >
      {children}
    </ul>
  );
};
