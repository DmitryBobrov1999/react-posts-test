import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const editPostData = createAsyncThunk(
	'data/editData',
	async ({ editedPost }) => {

		try {
			const response = await axios.patch(
				`https://jsonplaceholder.typicode.com/posts/${editedPost.id}`,
				editedPost,
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}
			);
		
			return response.data;
		} catch (error) {
			throw new Error('Failed to fetch editPostData');
		}
	}
);
