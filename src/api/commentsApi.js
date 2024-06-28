import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const commentsData = createAsyncThunk(
	'data/commentsData',
	async postId => {
		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/comments?postId=${postId}`
			);
			return response.data;
		} catch (error) {
			throw new Error('Failed to fetch commentsData');
		}
	}
);
