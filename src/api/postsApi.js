import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postsData = createAsyncThunk(
	'data/postsData',
	async () => {
		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/posts`
			);
			return response.data;
		} catch (error) {
			throw new Error('Failed to fetch postsData');
		}
	}
);
