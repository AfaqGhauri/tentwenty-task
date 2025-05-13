import { IconSvgProps } from "@/types";

export const ForwardArrowSvg: React.FC<IconSvgProps> = (props) => {
  return (
    <svg
      width={22}
      height={16}
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.744 8H.872m19.872 0l-7.452 7m7.452-7l-7.452-7"
        stroke="#221F20"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
