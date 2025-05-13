import { SVGProps } from "react";

export interface ISlides {
  image: string;
  title: string;
  description: string;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  width?: string;
  height?: string;
  fill?: string;
  onClick?: () => void;
};

export interface IProducts {
  id: number;
  src: string;
  alt: string;
  client: string;
  location: string;
}