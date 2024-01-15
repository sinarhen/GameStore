import Banner from '../components/Banner';
import { motion } from 'framer-motion';
import TextAnim from '../components/TextAnim';
import { FaAnglesDown } from "react-icons/fa6";
import { HTMLAttributes, useRef, useState } from 'react';
import Header from '../components/Header';
const appearDuration = 0.7;



const Section: React.FC<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <section 
            {...props}
            className='snap-center h-full w-full'>
            {children}
        </section>
    )
}

export default function Home() {

    // const [currentSection, setCurrentSection] = useState<'categories' | 'products' | "welcome">('categories'); // ['categories', 'products', 'orders', 'favorites', 'myaccount', 'login', 'register'
    // const categoriesSectionRef = useRef<HTMLDivElement>(null);

    // function scrollToCategories() {
    //     categoriesSectionRef.current?.scrollIntoView({behavior: 'smooth'});
    // }
    const scrollUp = () => {
        window.scrollBy(0, -100);
    }
    
    const scrollDown = () => {
        console.log("scrollingdown")
        window.scrollBy(0, 100);
    }

    return (
        <>
            <Section>
                <Banner imageUrl='https://c4.wallpaperflare.com/wallpaper/335/955/620/apple-inc-black-minimalism-logo-wallpaper-preview.jpg'/>
                
                <div
                    className='flex flex-col w-full'
                >
                    <Header appearDuration={appearDuration} animateableText='Gamestore.' baseText='Welcome to '/>
                </div>

                <motion.p
                initial={{opacity: 0, x: -1000}}
                animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                transition={{delay: appearDuration + 1, duration: appearDuration}}
                
                className='text-gray-400 mt-4 text-md'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eos sapiente minus rerum nulla officia deserunt at, distinctio a id qui, est ratione esse. Et reprehenderit accusamus illum odio molestiae.

                </motion.p>
                <motion.hr 
                initial={{opacity: 0, width: 0}}
                animate={{opacity: 1, width: "100%", animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                transition={{delay: appearDuration + 1.5, duration: appearDuration}}
                className='mt-4 border-gray-400 border-1'/>
            </Section>
            


            <Section id='categories' className='w-full h-[1000px]'>
                <div className='flex flex-col items-center justify-center w-full h-full'>
                    <motion.h1
                        initial={{opacity: 0, x: -1000}}
                        animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                        transition={{duration: appearDuration}}
                        className='text-7xl'>
                        Categories
                    </motion.h1>
                    <motion.p
                        initial={{opacity: 0, x: -1000}}
                        animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                        transition={{delay: appearDuration + 0.5, duration: appearDuration}}
                        className='text-gray-400 mt-4 text-md'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eos sapiente minus rerum nulla officia deserunt at, distinctio a id qui, est ratione esse. Et reprehenderit accusamus illum odio molestiae.

                    </motion.p>
                    <motion.button
                        initial={{opacity: 0, x: -1000}}
                        animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                        transition={{delay: appearDuration + 1, duration: appearDuration}}
                        className='mt-4 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg'>
                        Button
                    </motion.button>
                </div>
            </Section>
            
        </>
        )
}
