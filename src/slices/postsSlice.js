import { createSlice } from '@reduxjs/toolkit';
import { createPostData } from '../api/createPostApi';
import { deletePostData } from '../api/deletePostApi';
import { editPostData } from '../api/editPostApi';
import { postsData } from '../api/postsApi';

const getPostsPerPage = localStorage.getItem('postsPerPage');
const getPage = localStorage.getItem('page');

const initialState = {
	posts: [],
	isLoading: false,
	error: null,
	postsPerPage: getPostsPerPage ? getPostsPerPage : 10,
	page: getPage ? getPage : 1,
	isFavorite: false,
};

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setPostsPerPage: (state, action) => {
			state.postsPerPage = action.payload;
			localStorage.setItem('postsPerPage', action.payload);
		},
		setPage: (state, action) => {
			state.page = action.payload;
			localStorage.setItem('page', action.payload);
		},
		deleteAll: state => {
			state.posts = [];
		},
	},
	extraReducers: builder => {
		builder
			.addCase(postsData.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(postsData.fulfilled, (state, action) => {
				state.posts = action.payload;
				state.isLoading = false;
			})
			.addCase(postsData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(editPostData.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(editPostData.fulfilled, (state, action) => {
				const editedPosts = state.posts.map(post => {
					if (post.id === action.payload.id) {
						return action.payload;
					}
					return post;
				});
				state.posts = editedPosts;
				state.isLoading = false;
			})
			.addCase(editPostData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(deletePostData.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deletePostData.fulfilled, (state, action) => {
				const deletedPosts = state.posts.filter(
					post => post.id !== action.meta.arg.postId
				);
				state.posts = deletedPosts;
				state.isLoading = false;
			})
			.addCase(deletePostData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})

			.addCase(createPostData.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createPostData.fulfilled, (state, action) => {
				state.posts = [...state.posts, action.payload];
				state.isLoading = false;
			})
			.addCase(createPostData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const { setPostsPerPage, setPage, deleteAll } = postsSlice.actions;
export default postsSlice.reducer;
