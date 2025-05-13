"use client";

import { motion } from "framer-motion";

interface MouseIndicatorProps {
  mousePos: { x: number; y: number };
  isHovering: boolean;
  size?: number;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const MouseIndicator = ({
  mousePos,
  isHovering,
  size = 75,
  text = "Drag",
  backgroundColor = "black",
  textColor = "white",
}: MouseIndicatorProps) => {
  if (!isHovering) return null;

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        left: mousePos.x - size / 2,
        top: mousePos.y - size / 2,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <span
        className="text-base font-fontWorkSans"
        style={{ color: textColor }}
      >
        {text}
      </span>
    </motion.div>
  );
};
