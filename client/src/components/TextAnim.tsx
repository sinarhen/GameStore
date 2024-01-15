import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import CursorBlinker from "./CursorBlinker";


export default function TextAnim({baseText, className, delay}: {
    baseText: string;
    delay?: number;
    className?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      duration: 1,
      delay: delay || 0,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  return (
    <span className={className}>
      {" "}   
      <motion.span>{displayText }</motion.span>
      <CursorBlinker />
    </span>
  );
}
