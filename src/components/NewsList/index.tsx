"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Card } from "../Card"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchArticles,
  selectArticle,
  setPage,
  selectRateLimitStatus,
  resetRateLimit,
} from "../../redux/slices/articleSlice"
import type { AppDispatch } from "../../redux/store"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export const NewsList = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const dispatch = useDispatch<AppDispatch>()
  const { items, status, error, pagination, section } = useSelector(selectArticle)
  const { rateLimited, retryAfter } = useSelector(selectRateLimitStatus)

  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null)
  const prevStatusRef = useRef(status)
  const [seeMore, setSeeMore] = useState<boolean>(false)
  const prevSectionRef = useRef(section)

  // Загрузка начальных данных
  useEffect(() => {
    if (status === "idle" || prevSectionRef.current !== section) {
      dispatch(fetchArticles({ year, month, section }))
      prevSectionRef.current = section
    }
  }, [status, dispatch, year, month, section])

  // Обработка состояния загрузки
  useEffect(() => {
    if (prevStatusRef.current === "loading" && status !== "loading") {
      setIsLoadingMore(false)
    }
    prevStatusRef.current = status
  }, [status])

  // Обработка ограничения запросов
  useEffect(() => {
    if (rateLimited && retryAfter) {
      setRetryCountdown(retryAfter)

      const intervalId = setInterval(() => {
        setRetryCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(intervalId)
            dispatch(resetRateLimit())
            return null
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [rateLimited, retryAfter, dispatch])

  // Функция загрузки следующей страницы
  const loadNextPage = useCallback(() => {
    // Не загружаем, если достигнут лимит запросов
    if (rateLimited) return

    if (pagination?.hasNextPage && status !== "loading" && !isLoadingMore) {
      setIsLoadingMore(true)
      const nextPage = pagination.currentPage + 1

      // Проверяем, не превышает ли страница максимальное значение
      if (nextPage <= pagination.totalPages) {
        dispatch(setPage(nextPage))
        dispatch(
          fetchArticles({
            year,
            month,
            page: nextPage,
            pageSize: pagination.pageSize,
            section,
          }),
        )
      } else {
        setIsLoadingMore(false)
      }
    }
  }, [dispatch, pagination, status, isLoadingMore, year, month, rateLimited, section])

  // Обработчик прокрутки
  const handleScroll = useCallback(() => {
    // Не обрабатываем прокрутку, если достигнут лимит запросов
    if (rateLimited) return

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    const clientHeight = document.documentElement.clientHeight || window.innerHeight

    if (scrollTop + clientHeight >= scrollHeight * 0.85) {
      loadNextPage()
    }
  }, [loadNextPage, rateLimited])

  // Троттлинг для обработчика прокрутки
  const throttledHandleScroll = useCallback(() => {
    let lastCall = 0
    return () => {
      const now = Date.now()
      if (now - lastCall >= 400) {
        lastCall = now
        handleScroll()
      }
    }
  }, [handleScroll])()

  // Обработчик кнопки "More Articles"
  const handleChangeSeeMore = () => {
    setSeeMore(true)
  }

  // Установка слушателя события прокрутки
  useEffect(() => {
    if (seeMore && !rateLimited) {
      window.addEventListener("scroll", throttledHandleScroll)
      return () => window.removeEventListener("scroll", throttledHandleScroll)
    }
  }, [throttledHandleScroll, seeMore, rateLimited])

  // Отображение состояния загрузки
  if (status === "idle" || (status === "loading" && items.length === 0)) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <DotLottieReact className="" src="assets/lottie/load.lottie" loop autoplay />
      </div>
    )
  }

  // Отображение ошибки
  if (error && items.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 p-4 rounded-lg">
          <img className="mx-auto mb-2 max-w-[150px]" src="/assets/svg/404Sign.svg" alt="" />
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {items.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>

      {/* Кнопка "More Articles" */}
      {!seeMore && (
        <div className="pt-8 flex justify-center">
          <button
            className="bg-primary text-center text-wrap text-[#ffff] p-1.5 rounded-md font-latoBold cursor-pointer"
            onClick={handleChangeSeeMore}
          >
            More Articles
          </button>
        </div>
      )}

      {/* Сообщение о превышении лимита запросов */}
      {rateLimited && retryCountdown !== null && (
        <div className="text-center py-6 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700">
            Rate limit exceeded. Please wait {retryCountdown} seconds before making more requests.
          </p>
        </div>
      )}

      {/* Индикатор загрузки при прокрутке */}
      {isLoadingMore && !rateLimited && (
        <div className="flex justify-center items-center py-6">
          <DotLottieReact className="animation w-[100px] h-[100px]" src="assets/lottie/load.lottie" loop autoplay />
        </div>
      )}

      {/* Сообщ  src="assets/lottie/load.lottie" loop autoplay />
        </div>
      )}

      {/* Сообщение о конце списка */}
      {pagination && !pagination.hasNextPage && items.length > 0 && !isLoadingMore && (
        <div className="text-center py-6 text-gray-500 italic">
          <p>You have reached the end of the list.</p>
        </div>
      )}

      {/* Сообщение об ошибке при прокрутке */}
      {error && items.length > 0 && !rateLimited && (
        <div className="text-center py-6 text-red-500">
          <p>{error}</p>
          <button
            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
            onClick={() => loadNextPage()}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}

