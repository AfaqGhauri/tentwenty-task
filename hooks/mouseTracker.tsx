"use client";

import { useState, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface UseMouseTrackerReturn {
  mousePos: MousePosition;
  isHovering: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const useMouseTracker = (): UseMouseTrackerReturn => {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return {
    mousePos,
    isHovering,
    containerRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
};
