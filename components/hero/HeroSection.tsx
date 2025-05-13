"use client";

import { slidesContent } from "@/content/heroData";
import { useState, useEffect, useRef } from "react";
import { HeroSlide } from "./HeroSlide";
import { HeroContent } from "./HeroContent";
import { HeroNavigation } from "./HeroNavigation";
import { HeroCounter } from "./HeroCounter";
import { SLIDE_DURATION } from "@/lib/enums";

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<
    (typeof slidesContent)[0] | undefined
  >(undefined);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    let animationFrame: number;

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTimeRef.current;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setPreviousSlide(slidesContent[currentSlide]);
        setCurrentSlide((prev) => (prev + 1) % slidesContent.length);
        setProgress(0);
        startTimeRef.current = Date.now();
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [currentSlide]);

  const handleNext = () => {
    setPreviousSlide(slidesContent[currentSlide]);
    setCurrentSlide((prev) => (prev + 1) % slidesContent.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <HeroSlide
        slide={slidesContent[currentSlide]}
        index={currentSlide}
        previousSlide={previousSlide}
      />

      <div className="absolute inset-0">
        <div className="max-w-[1440px] mx-auto h-full relative">
          <div className="absolute h-full flex items-center md:pl-[135px]">
            <HeroContent
              slide={slidesContent[currentSlide]}
              index={currentSlide}
            />
          </div>

          <HeroNavigation
            currentSlide={slidesContent[currentSlide]}
            progress={progress}
            isHovered={isHovered}
            onNext={handleNext}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            nextSlide={slidesContent[(currentSlide + 1) % slidesContent.length]}
          />

          <HeroCounter
            currentSlide={currentSlide}
            totalSlides={slidesContent.length}
          />
        </div>
      </div>
    </div>
  );
}
