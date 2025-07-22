export const PositionsCard = () => {
  const positions = [];
  return (
    <div>
      <p className="text-[#0A0A0A] text-[16px] font-['Geist'] font-semibold mb-3">
        Positions
      </p>

      {!positions.length && (
        <>
          <div className="h-[156px] rounded-lg bg-[#F5F5F5] mb-3" />
          <p className="text-[#737373] text-[16px] font-['Geist'] font-normal flex justify-center">
            Your predictions will be displayed here
          </p>
        </>
      )}
    </div>
  );
};
