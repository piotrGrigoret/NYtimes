import  { useEffect, useState } from 'react';

import { Card } from '../Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, selectArticle } from '../../redux/slices/articleSlice';
import type { AppDispatch } from '../../redux/store';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const NewsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {items, status, error} = useSelector(selectArticle);

  const [year, setYear] = useState<number>(2025);
  const [month, setMonth] = useState<number>(3);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles({ year, month }));
    }
  }, [status, dispatch, year, month]);

  if(status === "idle" || status === "loading"  ){
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <DotLottieReact
          className="animation max-w-[550px]"
          src="assets/lottie/load.lottie"
          loop
          autoplay
        />
      </div>
    )
  }

  if (error) {
    return (
        <div className="text-center py-8">
            <div className="text-red-500  p-4 rounded-lg">
                <img className='mx-auto mb-2 max-w-[150px]' src="/assets/svg/404Sign.svg" alt="" />
                {error ? error : 'Not Founded'}
            </div>
        </div>
    );
  }
  return(
    <div className='grid grid-cols-1  md:grid-cols-2 gap-4'>

          {items.map((item) =>(
            <Card key={item._id} item={item}/>
          ))
          }
          
    </div>

  )
  
}
