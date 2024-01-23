import Banner from '../components/Banner';
import { motion, useScroll } from 'framer-motion';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Section from '../components/Section';
import AnimatedSeparator from '../components/AnimatedSeparator';


const appearDuration = 0.7;



export default function Home() {


    return (
        <div className='w-full h-full'>
            
            <Section className='h-full pt-24'>
                <Banner imageUrl='https://4kwallpapers.com/images/wallpapers/mortal-kombat-2021-movies-sub-zero-scorpion-2560x1080-5265.jpg'/>
                
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
                <AnimatedSeparator  delay={appearDuration + 1}/>
            </Section>
            
            <Section className='h-[100vh] pt-32'>
                <Header appearDuration={appearDuration} animateableText='Categories' />

                <AnimatedSeparator  />

            </Section>
            
        </div>
        )
}
