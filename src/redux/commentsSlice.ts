import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./store";

const COMMENTS_API_URL = "http://localhost:5001/comments";

interface Comment {
  id: number;
  productId: number;
  description: string;
  date: string;
}

export interface NewComment {
  productId: number;
  description: string;
  date: string;
}

interface CommentsState {
  comments: Comment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  status: "idle",
  error: null,
};

export const fetchCommentsByProductId = createAsyncThunk(
  "comments/fetchByProductId",
  async (productId: number) => {
    const response = await fetch(`${COMMENTS_API_URL}?productId=${productId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return (await response.json()) as Comment[];
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (newComment: NewComment) => {
    const response = await fetch(COMMENTS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });
    if (!response.ok) {
      throw new Error("Failed to add comment");
    }
    return (await response.json()) as Comment;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByProductId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCommentsByProductId.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.status = "succeeded";
          state.comments = action.payload;
        }
      )
      .addCase(fetchCommentsByProductId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        }
      );
  },
});

export const selectCommentsByProductId = (
  state: RootState,
  productId: number
) =>
  state.comments.comments.filter((comment) => comment.productId === productId);

export default commentsSlice.reducer;
