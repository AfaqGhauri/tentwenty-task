import { HeroSection } from "@/components/hero";
import { ProductSlider } from "@/components/products";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <HeroSection />
      <ProductSlider />
    </Fragment>
  );
}
