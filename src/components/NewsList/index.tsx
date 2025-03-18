import  { useCallback, useEffect, useRef, useState } from 'react';

import { Card } from '../Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, selectArticle, setPage } from '../../redux/slices/articleSlice';
import type { AppDispatch } from '../../redux/store';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const NewsList = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const dispatch = useDispatch<AppDispatch>();
  const {items, status, error, pagination} = useSelector(selectArticle);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const prevStatusRef = useRef(status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles({year, month}));
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (prevStatusRef.current === "loading" && status !== "loading") {
      setIsLoadingMore(false)
    }
    prevStatusRef.current = status
  }, [status])
  
  const loadNextPage = useCallback(() => {
    if (pagination?.hasNextPage && status !== "loading" && !isLoadingMore) {
      setIsLoadingMore(true);
      const nextPage = pagination.currentPage + 1;
      dispatch(setPage(nextPage));
      dispatch(fetchArticles({
        year, 
        month, 
        page: nextPage,  // Используем новое значение страницы
        pageSize: pagination.pageSize
      }));
    }
  }, [dispatch, pagination, status, isLoadingMore, year, month]);
  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    const clientHeight = document.documentElement.clientHeight || window.innerHeight

    if (scrollTop + clientHeight >= scrollHeight * 0.85) {
      loadNextPage()
    }
  }, [loadNextPage])

  const throttledHandleScroll = useCallback(() => {
    let lastCall = 0
    return () => {
      const now = Date.now()
      if (now - lastCall >= 200) {
        lastCall = now
        handleScroll()
      }
    }
  }, [handleScroll])()

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll)
    return () => window.removeEventListener("scroll", throttledHandleScroll)
  }, [throttledHandleScroll])


  if(status === "idle" || (status === "loading" && items.length === 0)){
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <DotLottieReact
          className=""
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
    <div className='space-y-6'>
      <div className='grid grid-cols-1  gap-4  md:grid-cols-2 2xl:grid-cols-3'>
            {items.map((item) =>(
              <Card key={item._id} item={item}/>
            ))
            }
      </div>
       
      {isLoadingMore && (
        <div className="flex justify-center items-center py-6">
          <DotLottieReact className="animation w-[100px] h-[100px]" src="assets/lottie/load.lottie" loop autoplay />
        </div>
      )}

      {pagination && !pagination.hasNextPage && items.length > 0 && !isLoadingMore && (
        <div className="text-center py-6 text-gray-500 italic">
          <p>You have reached the end of the list.</p>
        </div>
      )}     
    </div>

  )
  
}
