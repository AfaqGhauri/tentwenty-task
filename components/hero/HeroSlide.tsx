import { motion } from "framer-motion";
import Image from "next/image";
import { ISlides } from "@/types";
import { ANIMATION_DURATION } from "@/lib/enums";

interface SlideProps {
  slide: ISlides;
  index: number;
  previousSlide?: ISlides;
}

export const HeroSlide = ({ slide, index, previousSlide }: SlideProps) => (
  <div className="absolute inset-0">
    {/* Previous slide as static background */}
    {previousSlide && (
      <div className="absolute inset-0">
        <Image
          src={previousSlide.image}
          alt={previousSlide.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/30-" />
      </div>
    )}

    {/* Current slide with original animation */}
    <motion.div
      key={index}
      initial={{ height: "100px", opacity: 0.5 }}
      animate={{ height: "100%", opacity: 1 }}
      transition={{ duration: ANIMATION_DURATION, ease: "easeInOut" }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-black/30" />
    </motion.div>
  </div>
);
