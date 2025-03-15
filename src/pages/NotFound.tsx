import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const NotFound = () => {
  return (
    <div className='container min-h-[70vh] flex justify-center items-center'>
      <div className="text-center py-8">
            <div className="text-red-500  p-4 rounded-lg">
                <img className='mx-auto mb-2 max-w-[150px]' src="/assets/svg/404Sign.svg" alt="" />
                 Page not Founded
            </div>
        </div>
    </div>
  )
}
