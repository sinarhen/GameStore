import Banner from '../components/Banner';
import { motion } from 'framer-motion';
import TextAnim from '../components/TextAnim';

export default function Home() {

    return (
        <>
            <Banner imageUrl='https://c4.wallpaperflare.com/wallpaper/335/955/620/apple-inc-black-minimalism-logo-wallpaper-preview.jpg'/>
            
            <motion.div
                initial={{opacity: 0, x: -1000}}
                animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                transition={{duration: 0.7}}
                className='flex flex-col w-full'
            >
                <h1 className='text-gray-300 mt-5 text-7xl'>
                    Welcome to  
                    <br/>
                    <TextAnim
                    className="text-white rounded-lg mt-4" 
                    
                    delay={0.7} baseText='Game store.'/> 
                </h1>

            </motion.div>
        </>
        )
}