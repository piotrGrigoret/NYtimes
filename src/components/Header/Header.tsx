import { useState, useEffect } from 'react';
import BurgerMenu from '../BurgerMenu';
export const Header = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);

  return (
    <header className='h-16 border-b border-b-gray-200'>
    <div
      className={`container mx-auto transition-[background-color,box-shadow] duration-300 ease-in-out 
        ${isFixed ? 'fixed top-0 w-full z-50 bg-bg shadow-md px-4 left-1/2 -translate-x-1/2' : ''} 
        `}
    >
        <div className=' relative h-16 flex justify-center items-center lg:justify-between'>
          <h2 className='font-bold font-latoBold text-2xl'>BESIDER</h2>
          <BurgerMenu/>
        </div>
      </div>
    </header>
  )
}
