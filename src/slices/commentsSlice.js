import { createSlice } from '@reduxjs/toolkit';
import { commentsData } from '../api/commentsApi';

const initialState = {
	comments: {},
	isCommentsLoading: false,
	commentsError: null,
};

export const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(commentsData.pending, state => {
				state.isCommentsLoading = true;
				state.commentsError = null;
			})
			.addCase(commentsData.fulfilled, (state, action) => {
				const postId = action.meta.arg;
				state.comments[postId] = action.payload;
				state.isCommentsLoading = false;
			})
			.addCase(commentsData.rejected, (state, action) => {
				state.isCommentsLoading = false;
				state.commentsError = action.error.message;
			});
	},
});

export default commentsSlice.reducer;
