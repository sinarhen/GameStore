import Banner from '../components/Banner';
import {motion} from 'framer-motion';
import Header from '../components/Header';
import Section from '../components/Section';
import AnimatedSeparator from '../components/AnimatedSeparator';
import Button from '../components/Button';
import {Link} from 'react-router-dom';
import {Store} from 'lucide-react';

const appearDuration = 0.7;


export default function Home() {


  return (
    <div className='w-full h-full'>

      <Section className='h-full'>
        <Banner
          imageUrl='https://4kwallpapers.com/images/wallpapers/mortal-kombat-2021-movies-sub-zero-scorpion-2560x1080-5265.jpg'/>

        <div
          className='flex flex-col w-full'
        >
          <Header appearDuration={appearDuration} animateableText='MKm-Shop.' baseText='Ласкаво просимо до '/>
        </div>

        <motion.p
          initial={{opacity: 0, x: -1000}}
          animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
          transition={{delay: appearDuration + 1, duration: appearDuration}}

          className='text-gray-400 mt-4 text-md'>
          Опис до магазину
          <div className='text-gray-600 mt-2'>
            <p>Телеграм для зв'язку: <a href="https://t.me/temslivv" target="_blank" rel="noopener noreferrer" className="cursor-pointer underlineg">@temslivv</a></p>
            <p></p>
            <p></p>
          </div>
        </motion.p>
        <AnimatedSeparator delay={appearDuration + 1.5}/>
        <motion.div
          initial={{opacity: 0, x: -1000}}
          animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
          transition={{delay: appearDuration + 2, duration: appearDuration}}

          className='w-full pt-12 flex justify-center'
        >
          <Link to="/products">
            <Button className='flex hover:animate-pulse gap-x-2 items-center rounded-3xl px-20 bg-white text-black'>
              Shop now
              <Store/>
            </Button>
          </Link>
        </motion.div>
      </Section>
    </div>
  )
}
