import Banner from '../components/Banner';
import { motion } from 'framer-motion';
import TextAnim from '../components/TextAnim';

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
                    
                        delay={appearDuration + 0.5} baseText='Game store.'/> 

            </div>
        </>
        )
}