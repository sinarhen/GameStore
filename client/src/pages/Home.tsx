import Banner from '../components/Banner';
import { motion } from 'framer-motion';
import TextAnim from '../components/TextAnim';
import { FaAnglesDown } from "react-icons/fa6";
const appearDuration = 0.7;

export default function Home() {

    return (
        <>
            <Banner imageUrl='https://c4.wallpaperflare.com/wallpaper/335/955/620/apple-inc-black-minimalism-logo-wallpaper-preview.jpg'/>
            
            <div
                className='flex flex-col w-full text-gray-300 mt-5 text-7xl'
            >
                <motion.h1
                    initial={{opacity: 0, x: -1000}}
                    animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                    transition={{duration: appearDuration}}
                    className=''>
                    Welcome to  
                </motion.h1>
                        <TextAnim
                        className="text-white rounded-lg" 
                        duration={appearDuration}
                        delay={appearDuration + 0.5} baseText='Game store.'/> 
            </div>

            <motion.p
            initial={{opacity: 0, x: -1000}}
            animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
            transition={{delay: appearDuration + 1, duration: appearDuration}}
            
            className='text-gray-400 mt-4 text-md'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eos sapiente minus rerum nulla officia deserunt at, distinctio a id qui, est ratione esse. Et reprehenderit accusamus illum odio molestiae.

                <hr>
                
                </hr>
            </motion.p>


            <div className='flex w-full justify-center mt-6 '>
                <motion.div
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                    transition={{delay: appearDuration + 1.5, duration: appearDuration}}
                    
                    className='w-10 h-10 rounded-full flex items-center justify-center bg-black p-2.5 cursor-pointer'>
                    <FaAnglesDown className='w-full mt-1.5 h-full text-gray-600 animate-bounce'/>
                </motion.div>
            </div>

            <div id='categories' className='w-full h-[1000px]'>

            </div>
        </>
        )
}