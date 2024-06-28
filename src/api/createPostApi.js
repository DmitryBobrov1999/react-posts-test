import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPostData = createAsyncThunk(
	'data/createPostData',
	async createPostInfo => {
		try {
			const response = await axios.post(
				`https://jsonplaceholder.typicode.com/posts`,
				createPostInfo,
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}
			);

			return response.data;
		} catch (error) {
			throw new Error('Failed to fetch createPostData');
		}
	}
);
