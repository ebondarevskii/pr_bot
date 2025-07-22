interface Props {
  color?: string;
}

export const TrendingArrow: React.FC<Props> = ({ color = "#22C55E" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M14.6667 4.66669L9.00004 10.3334L5.66671 7.00002L1.33337 11.3334M14.6667 4.66669H10.6667M14.6667 4.66669V8.66669"
        stroke={color}
        stroke-width="1.33"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
