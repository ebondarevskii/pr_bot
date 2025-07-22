interface Props {
  color?: string;
}

export const Banknote: React.FC<Props> = ({ color = "#0A0A0A" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M3 6H3.005M9 6H9.005M2 3H10C10.5523 3 11 3.44772 11 4V8C11 8.55228 10.5523 9 10 9H2C1.44772 9 1 8.55228 1 8V4C1 3.44772 1.44772 3 2 3ZM7 6C7 6.55228 6.55228 7 6 7C5.44772 7 5 6.55228 5 6C5 5.44772 5.44772 5 6 5C6.55228 5 7 5.44772 7 6Z"
        stroke={color}
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
