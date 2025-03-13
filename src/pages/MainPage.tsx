import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { NewsList } from '../components/NewsList';
import { Newspaper } from 'lucide-react';

export const MainPage = () => {

  return (
    <div className='container'>
      {/* <DotLottieReact
        className='animation max-w-container-sm h-auto mx-auto'
        src='/assets/lottie/load.lottie'
        loop
        autoplay
      /> */}
      
      <p className='hidden items-center justify-end  mt-5 gap-1 mx-auto mb-10 lg:flex'>
        <Newspaper/> 
        GENERAL
      </p>
      <NewsList/>
    </div>
  )
}
