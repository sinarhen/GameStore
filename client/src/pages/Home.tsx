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

      <Section className='pt-16'>
        <Banner
          imageUrl='https://4kwallpapers.com/images/wallpapers/mortal-kombat-2021-movies-sub-zero-scorpion-2560x1080-5265.jpg'/>

        <div
          className='flex w-full'
        >
          <Header appearDuration={appearDuration} animateableText='MKm-Shop.' baseText='Ласкаво просимо до '/>
        </div>
        <AnimatedSeparator delay={appearDuration + 1.5}/>

      </Section>
      <Section className=' '>
        <motion.p
          initial={{opacity: 0, x: -1000}}
          animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
          transition={{delay: appearDuration + 1, duration: appearDuration}}

          className='text-gray-400 mt-4 text-md'>
          <span className='font-bold text-white'>MKm-Shop</span> – ваш найкращий вибір для придбання валюти в MORTAL KOMBAT Mobile! Наш магазин пропонує широкий асортимент ігрової валюти, незалежно від того, чи ви новачок чи вже досвідчений гравець.
          <br />
          <br />

          <span className="font-bold text-white">Чому обирають нас: </span>
          <br />
          <br />

          <span className='text-white font-bold'>Надійність і безпека:</span> MKm-Shop гарантує вам безпечні та надійні транзакції. Ми використовуємо передові технології для захисту ваших особистих даних та гарантуємо конфіденційність вашого облікового запису.
          <br />
          <br />

          <span className="font-bold text-white">Найкращі ціни: </span>Наші конкурентоспроможні ціни роблять MKm-Shop вигідним вибором для кожного гравця. Ми пропонуємо адекватні та чесні ціни без прихованих комісій чи додаткових витрат.
          <br />
          <br />

          <span className="font-bold text-white">Швидка доставка: </span>Вибравши MKm-Shop, ви отримуєте вигоди швидкої доставки. Наша команда працює 24/7, щоб забезпечити вам найшвидшу передачу ігрової валюти в найкоротший термін.
          <br />
          <br />

          <span className="text-white font-bold">Професійна підтримка: </span>Наша дружня та досвідчена служба підтримки завжди готова допомогти вам з будь-якими питаннями чи проблемами. Звертайтеся до нас у будь-який час – ми завжди тут для вас!
          <br />
          <br />

          <span className='text-white font-bold'>Обирайте MKm-Shop </span>– ваш надійний партнер для зручного та безпечного придбання валюти. Будьте в середині екшену, маючи нашу підтримку у всіх аспектах геймінгу!
          <br />
          <br />

        </motion.p>
        
      </Section>
      <Section className='pb-16 flex flex-col justify-evenly'>
          <div className=''>
            <div className='text-gray-600 mt-2'>
              <p>Телеграм для зв'язку: <a href="https://t.me/temslivv" target="_blank" rel="noopener noreferrer" className="cursor-pointer underlineg">@temslivv</a></p>
              <p></p>
              <p></p>
            </div>
            <AnimatedSeparator delay={appearDuration + 1.5}/>
        
            <motion.div
              animate={{opacity: 1, x: 0, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
              initial={{opacity: 0, x: -1000}}
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
        
          </div>
          <div>

          </div>
      </Section>


    </div>
  )
}
