import { Card } from '../components/Card';
import { NewsList } from '../components/NewsList';
import { Newspaper } from 'lucide-react';

export const MainPage = () => {

  return (
    <div className='container'>
      
      <p className='hidden items-center justify-end  mt-5 gap-1 mx-auto mb-10 lg:flex'>
        <Newspaper/> 
        GENERAL
      </p>
      <div className='min-h-[70vh] '>
        <NewsList/>
      </div>
    </div>
  )
}
