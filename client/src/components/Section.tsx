import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { motion, useTransform, useViewportScroll } from 'framer-motion';

const Section: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const { scrollY } = useViewportScroll();
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);

  useEffect(() => {
    const onResize = () => {
      if (ref.current) setElementTop(ref.current.offsetTop);
    };

    const onScroll = () => {
      onResize(); // Update elementTop on scroll
    };

    onResize(); // Initial setup

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [ref]);

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity: y }}
      className="h-[100vh] pt-20 w-full snap-start"
    >
      {children}
    </motion.section>
  );
};

export default Section;
