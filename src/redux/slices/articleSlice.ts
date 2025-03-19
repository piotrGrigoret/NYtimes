import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export interface Article {
  _id: string
  headline: { main: string }
  abstract: string
  web_url: string
  pub_date: string
  multimedia: { url: string } | null
  section_name?: string
}

interface PaginationState {
  currentPage: number
  pageSize: number
  totalPages: number
  totalResults: number
  hasNextPage: boolean
  hasPrevPage: boolean
}
interface ApiResponse {
  items: Article[]
  pagination: PaginationState
  source: string
  error?: string
  message?: string
  retryAfter?: number
}

interface ArticlesState {
  items: Article[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  pagination: PaginationState
  rateLimited: boolean
  retryAfter: number | null
  section: string
  titleState: string
}

// Функция для сортировки статей по дате (от новых к старым)
const sortArticlesByDate = (articles: Article[]): Article[] => {
  return [...articles].sort((a, b) => {
    const dateA = new Date(a.pub_date).getTime()
    const dateB = new Date(b.pub_date).getTime()
    return dateB - dateA
  })
}

const initialState: ArticlesState = {
  items: [],
  status: "idle",
  error: null,
  pagination: {
    currentPage: 1,
    pageSize: 15,
    totalPages: 0,
    totalResults: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  section: "GENERAL",
  rateLimited: false,
  retryAfter: null,
  titleState: ""
}

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (
    {
      year,
      month,
      page = 1,
      pageSize = 10,
      section = "GENERAL",
    }: { year: number; month: number; page?: number; pageSize?: number; section?: string },
    { rejectWithValue },
  ) => {
    try {
      const baseUrl =
           "https://nyt-api-proxy.vercel.app/api/nytimes"
          //  "http://localhost:3000/api/nytimes"

      const response = await fetch(
        `${baseUrl}?year=${year}&month=${month}&page=${page}&pageSize=${pageSize}&section=${section}`,
      )

      if (!response.ok) {
        const errorData = await response.json()

        if (response.status === 429) {
          return rejectWithValue({
            error: errorData.error || "Rate limit exceeded",
            message: errorData.message || "Too many requests",
            retryAfter: errorData.retryAfter || 60,
            status: 429,
          })
        }

        return rejectWithValue({
          error: errorData.error || "Failed to fetch articles",
          message: errorData.message || "An error occurred",
          status: response.status,
        })
      }
      const data = await response.json()

      return data
    } catch (error) {
      return rejectWithValue({
        error: "Network error",
        message: (error as Error).message || "Failed to connect to the server",
        status: 0,
      })
    }
  },
)

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.items = []
      state.pagination.currentPage = 1
      state.rateLimited = false
      state.retryAfter = null
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload
      state.pagination.currentPage = 1
    },
    resetRateLimit: (state) => {
      state.rateLimited = false
      state.retryAfter = null
    },
    setSection: (state, action: PayloadAction<string>) => {
      state.section = action.payload 
      state.items = [] 
      state.status = "idle"
      state.pagination = {
        currentPage: 1,
        pageSize: 15,
        totalPages: 0,
        totalResults: 0,
        hasNextPage: false,
        hasPrevPage: false,
      }
    },
    setTitleState: (state, action: PayloadAction<string>) => {
      state.titleState = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading"
        if (state.items.length === 0) {
          state.error = null
        }
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.status = "succeeded"
        state.rateLimited = false
        state.retryAfter = null

        if (action.payload.pagination.currentPage === 1) {
          state.items = sortArticlesByDate(action.payload.items)
        } else {
          const newItems = action.payload.items.filter(
            (newItem) => !state.items.some((item) => item._id === newItem._id),
          )
          state.items = sortArticlesByDate([...state.items, ...newItems])
        }
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed"

        if (action.payload && typeof action.payload === "object") {
          const payload = action.payload as { status?: number; retryAfter?: number; message?: string }

          if (payload.status === 429) {
            state.rateLimited = true
            state.retryAfter = payload.retryAfter || 60
            state.error = "Rate limit exceeded. Please wait before making more requests."
          } else {
            state.error = payload.message || action.error.message || "Failed to fetch articles"
          }
        } else {
          state.error = action.error.message || "Failed to fetch articles"
        }
      })
  },
})

export const selectArticle = (state: RootState) => state.articles
export const selectRateLimitStatus = (state: RootState) => ({
  rateLimited: state.articles.rateLimited,
  retryAfter: state.articles.retryAfter,
})

export const { clearArticles, setPage, setPageSize, resetRateLimit, setSection, setTitleState } = articlesSlice.actions

export default articlesSlice.reducer

