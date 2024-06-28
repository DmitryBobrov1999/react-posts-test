import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../slices/commentsSlice';
import postsReducer from '../slices/postsSlice';
import usersReducer from '../slices/usersSlice';

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		users: usersReducer,
		comments: commentsReducer,
	},
});
