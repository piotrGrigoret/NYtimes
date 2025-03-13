import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


interface Article {
    _id: string
    headline: { main: string }
    abstract: string
    web_url: string
    pub_date: string
    // Добавьте другие поля по необходимости
  }
  
  interface ArticlesState {
    items: Article[]
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
  }
  
  const initialState: ArticlesState = {
    items: [],
    status: "idle",
    error: null,
  }

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        clearArticles: (state) => {
          state.items = []
        },
      },
});


export const selectArticle =  (state: RootState) => state.articles;
export const {clearArticles} = articlesSlice.actions;

export default articlesSlice.reducer

