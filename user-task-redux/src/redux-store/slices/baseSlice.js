import { createSelector, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { addTaskAsync, deleteTaskAsync, fetchTasksAsync, updateTaskAsync } from './taskSlice';
import { addUserAsync, deleteUserAsync, fetchUsersAsync, updateUserAsync } from './usersSlice';
const initialState = {
	loading: false,
	error: ''
};

const baseSlice = createSlice({
	name: 'base',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				isPending(
					fetchUsersAsync,
					deleteUserAsync,
					addUserAsync,
					updateUserAsync,
					fetchTasksAsync,
					addTaskAsync,
					updateTaskAsync,
					deleteTaskAsync),
				(state) => {
					state.loading = true;
					state.error = '';
				}
			)

			.addMatcher(
				isFulfilled(
					fetchUsersAsync,
					deleteUserAsync,
					addUserAsync,
					updateUserAsync,
					fetchTasksAsync,
					addTaskAsync,
					updateTaskAsync,
					deleteTaskAsync),
				(state) => {
					state.loading = false;
					state.error = '';
				}
			)

			.addMatcher(
				isRejected(
					fetchUsersAsync,
					deleteUserAsync,
					addUserAsync,
					updateUserAsync,
					fetchTasksAsync,
					addTaskAsync,
					updateTaskAsync,
					deleteTaskAsync
				),
				(state, action) => {
					state.loading = false;
					state.error = '' + action.payload;
				}
			)
	}
});

const loadingSelector = (state) => state.loading;
export const uniqueLoadingSelector = () => createSelector(loadingSelector, (loading) => loading);

export default baseSlice.reducer;
