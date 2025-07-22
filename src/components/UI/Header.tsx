interface Props {
  children: React.ReactNode;
}

export const Header: React.FC<Props> = ({ children }) => {
  return (
    <h2 className="text-black text-2xl font-semibold font-['Geist'] leading-loose mb-[12px]">
      {children}
    </h2>
  );
};
