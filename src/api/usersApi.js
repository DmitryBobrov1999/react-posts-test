import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const usersData = createAsyncThunk('data/usersData', async () => {
	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/users`
		);
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch usersData');
	}
});
