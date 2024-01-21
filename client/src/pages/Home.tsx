import Banner from '../components/Banner';
import { motion, useScroll } from 'framer-motion';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Section from '../components/Section';
import AnimatedSeparator from '../components/AnimatedSeparator';
const appearDuration = 0.7;



export default function Home() {

    // const [currentSection, setCurrentSection] = useState<'categories' | 'products' | "welcome">('categories'); // ['categories', 'products', 'orders', 'favorites', 'myaccount', 'login', 'register'
    // const categoriesSectionRef = useRef<HTMLDivElement>(null);

    // function scrollToCategories() {
    //     categoriesSectionRef.current?.scrollIntoView({behavior: 'smooth'});
    // }


    return (
        <div className='w-full h-full'>
            
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
                <AnimatedSeparator  />
            </Section>
            
            <Section>
                <Header appearDuration={appearDuration} animateableText='Categories' />

                <AnimatedSeparator  />

            </Section>
            
        </div>
        )
}
