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
  
  interface ArticlesState {
    items: Article[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;  
  }
  
  const initialState: ArticlesState = {
    items: [],
    status: "idle",
    error: null,
  }

  

  export const fetchArticles = createAsyncThunk(
    "articles/fetchArticles",
    async ({ year, month }: { year: number; month: number;}) => {

        const response = await fetch(`https://nyt-api-proxy.vercel.app/api/nytimes?year=${year}&month=${month}`);
        if (!response.ok) {
          throw new Error("Error");
        }
        const data = await response.json();
        console.log(data);
        return data as Article[];

    },
  )
  

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        clearArticles: (state) => {
          state.items = []
        },
        
      },
      extraReducers: (builder) => {
        builder
          .addCase(fetchArticles.pending, (state) => {
            state.status = "loading";
            state.error = null;
          })
          .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
            state.status = "succeeded";
            state.items = action.payload;
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
export const {clearArticles} = articlesSlice.actions;

export default articlesSlice.reducer

