import { createSlice } from '@reduxjs/toolkit';
import { usersData } from '../api/usersApi';

const initialState = {
	users: [],
	isUsersLoading: false,
	usersError: null,
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(usersData.pending, state => {
				state.isUsersLoading = true;
				state.usersError = null;
			})
			.addCase(usersData.fulfilled, (state, action) => {
				state.users = action.payload;
				state.isUsersLoading = false;
			})
			.addCase(usersData.rejected, (state, action) => {
				state.isUsersLoading = false;
				state.usersError = action.error.message;
			});
	},
});

export default usersSlice.reducer;
