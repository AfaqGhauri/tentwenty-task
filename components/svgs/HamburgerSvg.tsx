import { IconSvgProps } from "@/types";

export const HamburgerSvg: React.FC<IconSvgProps> = (props) => {
  return (
    <svg
      width={22}
      height={15}
      viewBox="0 0 22 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
      {...props}
    >
      <path stroke="#221F20" d="M0 0.5L22 0.5" />
      <path stroke="#221F20" d="M2 7.5L20 7.5" />
      <path stroke="#221F20" d="M0 14.5L22 14.5" />
    </svg>
  );
};
