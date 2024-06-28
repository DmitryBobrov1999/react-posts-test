import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deletePostData = createAsyncThunk(
	'data/deletePostData',
	async ({ postId }) => {
		try {
			const response = await axios.delete(
				`https://jsonplaceholder.typicode.com/posts/${postId}`
			);
			
			return response.data;
		} catch (error) {
			throw new Error('Failed to fetch deletePostData');
		}
	}
);
