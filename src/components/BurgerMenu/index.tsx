import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ThemeToogle";
import { Newspaper } from 'lucide-react';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = ''; 
    }

    
    return () => {
      document.body.style.overflow = ''; 
    };
  }, [isOpen]);

  return (
    <>
        <div className="flex items-center justify-between gap-6 absolute left-0 lg:static ">

            <nav className="hidden lg:flex space-x-6">
                <a href="#" className="font-bold font-latoBold text-sm relative group">
                    GENERAL
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </a>
                <a href="#" className="font-bold font-latoBold text-sm relative group">
                    ENTERTAINMENT
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </a>
                <a href="#" className="font-bold font-latoBold text-sm relative group">
                    TECHNOLOGY
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </a>
                <a href="#" className="font-bold font-latoBold text-sm relative group">
                    BUSINESS
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </a>
                <a href="#" className="font-bold font-latoBold text-sm relative group">
                    HEALTH
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </a>
                <a href="#" className="font-bold font-latoBold text-sm relative group">
                    SPORTS
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </a>
            </nav>

            <div className="hidden lg:block"><ThemeToggle/></div>
            <button
            className="lg:hidden text-text"
            onClick={() => setIsOpen(!isOpen)}
            >
            {isOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
        </div>

        <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
        onClick={() => setIsOpen(false)} 
        >
            <aside
            className="bg-bg w-full h-full shadow-lg p-6 flex flex-col gap-20"
            onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between ">
                    <ThemeToggle/>
                        <button
                        className="self-start text-text"
                        onClick={() => setIsOpen(false)}
                        >
                        <X size={25} />
                        </button>                        
                </div>
                
                <div className="flex flex-col gap-4 ">
                    <a href="#" className="font-bold font-latoBold text-xl">SCIENCE</a>
                    <a href="#" className="font-bold font-latoBold text-xl">GENERAL</a>
                    <a href="#" className="font-bold font-latoBold text-xl">ENTERTAINMENT</a>
                    <a href="#" className="font-bold font-latoBold text-xl">TECHNOLOGY</a>
                    <a href="#" className="font-bold font-latoBold text-xl">BUSINESS</a>
                    <a href="#" className="font-bold font-latoBold text-xl">HEALTH</a>
                    <a href="#" className="font-bold font-latoBold text-xl">SPORTS</a>
                </div>
                <p className='flex items-center justify-end gap-1 '>
                    <Newspaper/> 
                    GENERAL
                </p>         
            </aside>
        </div>
    </>
  );
};

export default BurgerMenu;
