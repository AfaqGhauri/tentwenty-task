import { ISlides } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface ContentProps {
  slide: ISlides;
  index: number;
}

export const HeroContent = ({ slide }: ContentProps) => (
  <div className="text-white mx-auto max-w-[550px] flex flex-col justify-center items-start h-full gap-6 p-[25px] md:p-0">
    <AnimatePresence mode="wait">
      <motion.div
        key="description"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-sm sm:text-base font-normal font-fontWorkSans capitalize">
          {slide.description}
        </p>
      </motion.div>
    </AnimatePresence>
    <AnimatePresence mode="wait">
      <motion.div
        key="title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-[46px] md:text-[64px] font-fontWorkSans leading-[1.2] text-powderBlueColor capitalize">
          {slide.title}
        </h1>
      </motion.div>
    </AnimatePresence>
  </div>
);
