interface CounterProps {
  currentSlide: number;
  totalSlides: number;
}

export const HeroCounter = ({ currentSlide, totalSlides }: CounterProps) => {
  const currentNumber = String(currentSlide + 1).padStart(2, "0");
  const totalNumber = String(totalSlides).padStart(2, "0");

  return (
    <div className="absolute left-[162px] md:left-[306px] bottom-[18%] flex items-center gap-4 text-alabasterColor">
      <span className="text-sm md:text-base ">{currentNumber}</span>
      <div className="w-[103px] h-[1px] bg-alabasterColor"></div>
      <span className="text-sm md:text-base ">{totalNumber}</span>
    </div>
  );
};
