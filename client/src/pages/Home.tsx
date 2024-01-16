import Banner from '../components/Banner';
import { motion } from 'framer-motion';
import { HTMLAttributes, useRef, useState } from 'react';
import Header from '../components/Header';
const appearDuration = 0.7;



const Section: React.FC<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <section 
            {...props}
            className="h-full w-full snap-normal snap-center snap-proximity">
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
        <div className='w-full h-full s'>
            
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
            
            <Section>
                <Header appearDuration={appearDuration} animateableText='Categories' />

                <motion.hr 
                initial={{opacity: 0, width: 0}}
                animate={{opacity: 1, width: "100%", animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                transition={{delay: appearDuration + 1.5, duration: appearDuration}}
                className='mt-4 border-gray-400 border-1'/>
            </Section>
            
        </div>
        )
}
