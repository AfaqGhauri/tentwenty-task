"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { productData } from "@/content";
import { useViewport, useMouseTracker } from "@/hooks";
import { MouseIndicator } from "./MouseIndicator";

// Helper to wrap index
function wrapIndex(idx: number, length: number) {
  return ((idx % length) + length) % length;
}

// Responsive dimensions
const MD_CARD_WIDTH = 434.9;
const MD_CARD_HEIGHT = 619.21;

const getResponsiveDimensions = (viewportWidth: number) => {
  if (viewportWidth < 768) {
    return {
      cardWidth: 280,
      containerWidth: viewportWidth,
      cardHeight: 400,
      containerHeight: 400,
    };
  }
  return {
    cardWidth: MD_CARD_WIDTH,
    containerWidth: viewportWidth,
    cardHeight: MD_CARD_HEIGHT,
    containerHeight: MD_CARD_HEIGHT + 100, // extra space for text
  };
};

const COVERFLOW_PERSPECTIVE = 1200;
const COVERFLOW_ROTATE = 12;
const COVERFLOW_SCALE = 0.8;

function getPositions(cardWidth: number, containerWidth: number) {
  // Hide 70% of the side images on small screens, 25% on larger screens
  const isSmallScreen = containerWidth < 768;
  const hiddenPart = isSmallScreen ? cardWidth * 0.7 : cardWidth * 0.25; // 70% hidden on small screens

  return [
    {
      left: -hiddenPart,
      rotate: -COVERFLOW_ROTATE,
      scale: COVERFLOW_SCALE,
      opacity: 0.8,
      zIndex: 2,
      rotateY: 0,
      transformOrigin: "50% 50% -300px",
    }, // left (mostly visible)
    {
      left: (containerWidth - cardWidth) / 2,
      rotate: 0,
      scale: COVERFLOW_SCALE,
      opacity: 1,
      zIndex: 3,
      rotateY: 0,
      transformOrigin: "50% 50% -300px",
    }, // center
    {
      left: containerWidth - cardWidth + hiddenPart,
      rotate: COVERFLOW_ROTATE,
      scale: COVERFLOW_SCALE,
      opacity: 0.8,
      zIndex: 2,
      rotateY: 0,
      transformOrigin: "50% 50% -300px",
    }, // right ( mostly visible)
  ];
}

export const ProductSlider = () => {
  const { width: viewportWidth } = useViewport();
  const [page, setPage] = useState(0);
  const [dimensions, setDimensions] = useState(
    getResponsiveDimensions(viewportWidth)
  );
  const [isDragging, setIsDragging] = useState(false);
  // Mouse tracker
  const {
    mousePos,
    isHovering,
    containerRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useMouseTracker();

  // Auto scroll
  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      setPage((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [isDragging]);

  // Responsive dimensions
  useEffect(() => {
    setDimensions(getResponsiveDimensions(viewportWidth));
  }, [viewportWidth]);

  const activeIndex = wrapIndex(page, productData.length);
  const leftIndex = wrapIndex(activeIndex - 1, productData.length);
  const centerIndex = activeIndex;
  const rightIndex = wrapIndex(activeIndex + 1, productData.length);
  const visibleSlides = [
    productData[leftIndex], // left
    productData[centerIndex], // center
    productData[rightIndex], // right
  ];
  const positions = getPositions(
    dimensions.cardWidth,
    dimensions.containerWidth
  );

  // Drag handler for center card
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    setIsDragging(false);
    const threshold = 50;
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        setPage((prev) => prev - 1);
      } else {
        setPage((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-8 md:py-12 bg-seashellColor">
      <h2 className="text-[30px] md:text-[56px] font-normal text-black font-fontWorkSans">
        Quality Products
      </h2>
      <p className="max-w-80 md:max-w-3xl text-center text-base md:text-2xl text-mutedGrayishTone font-fontWorkSans mb-6 md:mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div
        ref={containerRef}
        className="relative mx-auto overflow-hidden w-full"
        style={{
          width: "100%",
          height: `${dimensions.containerHeight}px`,
          perspective: `${COVERFLOW_PERSPECTIVE}px`,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute inset-0"
          style={{ width: "100%", height: `${dimensions.containerHeight}px` }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
            style={{ cursor: "none" }}
          >
            <AnimatePresence mode="popLayout">
              {visibleSlides.map((slide, idx) => {
                const pos = positions[idx];
                return (
                  <motion.div
                    key={slide.id + "-" + page}
                    initial={{
                      left: pos.left,
                      top: "50%",
                      x: 0,
                      y: "-50%",
                      rotate: pos.rotate,
                      scale: pos.scale,
                      zIndex: pos.zIndex,
                      opacity: pos.opacity,
                      rotateY: pos.rotateY,
                      transformOrigin: pos.transformOrigin,
                    }}
                    animate={{
                      left: pos.left,
                      top: "50%",
                      x: 0,
                      y: "-50%",
                      rotate: pos.rotate,
                      scale: pos.scale,
                      zIndex: pos.zIndex,
                      opacity: pos.opacity,
                      rotateY: pos.rotateY,
                      transformOrigin: pos.transformOrigin,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.3 },
                    }}
                    className="absolute"
                    style={{
                      width: `${dimensions.cardWidth}px`,
                      height: `${dimensions.cardHeight}px`,
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        priority={idx === 1}
                        unoptimized
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          <MouseIndicator mousePos={mousePos} isHovering={isHovering} />
        </div>
      </div>
      <div
        className="flex justify-center items-center flex-col gap-1 md:gap-2 mt-4- md:mt-6 w-full"
        style={{ width: "100%" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center w-full"
          >
            <motion.h4
              className="text-2xl md:text-4xl font-normal text-black font-fontWorkSans"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
            >
              {productData[activeIndex].client}
            </motion.h4>
            <motion.p
              className="text-base md:text-2xl text-mutedGrayishTone font-fontWorkSans font-normal"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              {productData[activeIndex].location}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
