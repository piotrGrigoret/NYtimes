import React from 'react'

export const Footer = () => {
  const CurrentYear = new Date().getFullYear();

  return (
    <footer className='container'>
      <div className='flex  flex-col  gap-6 pt-10 pb-5 text-sm font-normal'>
        <div className='flex flex-col gap-6 lg:flex-row lg:justify-between'>
          <nav className="flex space-x-5 mx-auto lg:mx-0">
            <a href="https://cv-card.onrender.com/" target="_blank" className="hover:lg:text-primary">About Me</a>
            <a href="https://github.com/piotrGrigoret/NYtimes" target="_blank" className="hover:lg:text-primary">Github</a>
            <a href="https://www.nytimes.com/" target="_blank" className="hover:lg:text-primary">Publishers</a>
            <a href="https://developer.nytimes.com/" target="_blank" className="hover:lg:text-primary">Api</a>
          </nav>
          <div className='gap-2 items-center mx-auto flex-row lg:flex   lg:mx-0 '>
            <h3 className='text-center mb-2 lg:mb-0'>Powered by</h3>
              <div className='flex bg-primary text-[#ffff] p-1.5 rounded-md justify-center items-center gap-2 font-latoBold'>
                <img className='max-w-5' src="/assets/png/times.png" alt="" />
                NY Times
              </div>
          </div>
        </div>
        <div className='mx-auto lg:mx-0 '>
          <h3 className='text-center'>© {CurrentYear} Outsider. Inspired by Insider</h3>
        </div>
      </div>
    </footer> 
  )
}
