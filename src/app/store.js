import {configureStore} from '@reduxjs/toolkit';
import {CommentReducer} from "../features/comments/commentsSlice";
import {logger} from "redux-logger/src";

export const store = configureStore({
    reducer: {
        comments: CommentReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
