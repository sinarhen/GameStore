import {motion} from "framer-motion";
import {HTMLAttributes} from "react";
import TextAnim from "./TextAnim";
import {twMerge} from "tailwind-merge";

interface HeaderProps extends HTMLAttributes<HTMLHeadingElement> {
  appearDuration?: number;
  animateableText?: string;
  baseText?: string;
}

const Header: React.FC<HeaderProps> = ({appearDuration = 0.7, animateableText, baseText, ...props}) => {

  const delay = (appearDuration ? appearDuration : 0.3);

  return (
    <div className={twMerge("text-gray-300 text-7xl", props.className)}>
      <motion.h1
        initial={{opacity: 0, x: -1000}}
        animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
        transition={{duration: appearDuration}}
        className=''>
        {baseText}
      </motion.h1>
      {animateableText && <TextAnim
          className="text-white rounded-lg"
          duration={appearDuration}
          delay={delay} baseText={animateableText}/>

      }
    </div>
  )
}

export default Header;