import { ISlides } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface NavigationProps {
  currentSlide: ISlides;
  nextSlide: ISlides;
  progress: number;
  isHovered: boolean;
  onNext: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const HeroNavigation = ({
  progress,
  isHovered,
  onNext,
  onMouseEnter,
  onMouseLeave,
  nextSlide,
}: NavigationProps) => (
  <div className="absolute left-6 md:left-[135px] bottom-[5%] -translate-y-1/2 flex flex-col gap-4 z-1">
    <div className="relative">
      <div className="p-4 h-[115px] w-[115px] md:h-[138px] md:w-[138px] relative flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(
              from -43deg,
              white ${progress * 3.6}deg,
              rgba(255, 255, 255, 0.5) ${progress * 3.6}deg
            )`,
            mask: "linear-gradient(#eee 0 0) content-box, linear-gradient(#eee 0 0)",
            maskComposite: "exclude",
            padding: "4px",
          }}
        />
        <button
          onClick={onNext}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="w-[77px] h-[77px] md:w-[93px] md:h-[93px] overflow-hidden group relative"
        >
          <Image
            src={nextSlide.image}
            alt={nextSlide.title}
            width={100}
            height={100}
            className="object-cover w-full h-full"
            unoptimized
            priority
          />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 cursor-pointer bg-black/50 flex items-center justify-center"
              >
                <span className="text-powderBlueColor font-fontWorkSans font-normal text-base">
                  Next
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  </div>
);
