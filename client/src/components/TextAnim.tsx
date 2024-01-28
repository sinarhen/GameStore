import {animate, motion, useMotionValue, useTransform} from "framer-motion";
import {useEffect, useState} from "react";
import CursorBlinker from "./CursorBlinker";

export default function TextAnim({duration, baseText, className, delay}: {
  baseText: string;
  delay?: number;
  className?: string;
  duration?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  const [showBlinker, setShowBlinker] = useState(false);

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      duration: duration || 1,
      delay: delay || 0,
      ease: "easeInOut",
      onComplete: () => {
        setTimeout(() => {
            setShowBlinker(false);
          }
          , 500);
      }
    });
    return controls.stop;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBlinker(true);
    }, (delay ? delay - 0.7 : 0) * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={className}>
      {" "}
      <motion.span className="w-fit mt-2 ">{displayText}</motion.span>
      {showBlinker && <CursorBlinker/>}
    </span>
  );
}