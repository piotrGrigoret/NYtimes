import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Article {
    _id: string
    headline: { main: string }
    abstract: string
    web_url: string
    pub_date: string
    multimedia: { url: string};
  }
  interface PaginationState {
    currentPage: number
    pageSize: number
    totalPages: number
    totalResults: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  
  interface ArticlesState {
    items: Article[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;  
    pagination: PaginationState
  }
  
  
  const initialState: ArticlesState = {
    items: [],
    status: "idle",
    error: null,
    pagination: {
      currentPage:1,
      pageSize: 15,
      totalPages: 0,
      totalResults: 0,
      hasNextPage: false, 
      hasPrevPage: false
    }
  }

  

  export const fetchArticles = createAsyncThunk(
    "articles/fetchArticles",
    async ({ year, month, page=1, pageSize=10 }: 
      { year: number; 
        month: number; 
        page?: number;
        pageSize?: number;
      }) => {
        // const response = await fetch(`https://nyt-api-proxy.vercel.app/api/nytimes?year=${year}&month=${month}`);
        const response = await fetch(`http://localhost:3000/api/nytimes?year=${year}&month=${month}&page=${page}&pageSize=${pageSize}`);

        

        if (!response.ok) {
          throw new Error("Error");
        }
        const data = await response.json();
        console.log(data);

        return data;

    },
  )
  

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        clearArticles: (state) => {
          state.items = []
        },
        setPage: (state, action: PayloadAction<number>) => {
          state.pagination.currentPage = action.payload
        },
        setPageSize: (state, action: PayloadAction<number>) => {
          state.pagination.pageSize = action.payload
          state.pagination.currentPage = 1
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(fetchArticles.pending, (state) => {
            state.status = "loading";
            state.error = null;
          })
          .addCase(fetchArticles.fulfilled, (state, action:PayloadAction<ArticlesState>) => {
            state.status = "succeeded";
            if(action.payload.pagination.currentPage === 1){
              state.items = action.payload.items;
            }else{
              state.items = [...state.items, ...action.payload.items];
            }
            if (action.payload.pagination) {
              state.pagination = action.payload.pagination;
            }
            console.log(state.items);
          })
          .addCase(fetchArticles.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Not Founded"; 
            console.log(state.error);
          })
      },
});


export const selectArticle =  (state: RootState) => state.articles;

export const {clearArticles, setPage, setPageSize} = articlesSlice.actions;

export default articlesSlice.reducer

