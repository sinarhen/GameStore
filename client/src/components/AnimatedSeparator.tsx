import {motion} from "framer-motion";

export default function AnimatedSeparator({appearDuration = 0.7, delay = 1}: {
  appearDuration?: number,
  delay?: number
}) {
  return (
    <motion.hr
      initial={{opacity: 0, width: 0}}
      animate={{opacity: 1, width: "100%", animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
      transition={{delay: delay, duration: appearDuration}}
      className='mt-4 border-gray-400 border-1'/>

  )
}