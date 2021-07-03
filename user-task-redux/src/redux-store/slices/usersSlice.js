import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const localApi = {
	getAllUsers: "/db_users",
	getUserById: "/db_users/{id}",
	addUser: "/db_users",
	updateUser: "/db_users/{id}",
	deleteUser: "/db_users/{id}",
 
  };
  


export const fetchUsersAsync = createAsyncThunk(
	'users/fetchUsers',
	async (_, thunkApi) => {
		try {
			const response = await axios.get(localApi.getAllUsers);
			return response.data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			return thunkApi.rejectWithValue(error.response.data)
		}
	}
);

export const deleteUserAsync = createAsyncThunk(
	'users/deleteUser',
	async (id: string, thunkApi) => {
		try {
			await axios.delete(localApi.deleteUser.replace('{id}', id));
			return id;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			return thunkApi.rejectWithValue(error.response.data)
		}
	}
);

export const addUserAsync = createAsyncThunk(
	'users/addUser',
	async (model, thunkApi) => {
		try {
			const response = await axios.post(localApi.addUser, model);
			return response.data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			return thunkApi.rejectWithValue(error.response.data)
		}
	}
);

export const updateUserAsync = createAsyncThunk(
	'users/updateUser',
	async (model: any, thunkApi) => {
		try {
			const response = await axios.put(localApi.updateUser.replace('{id}', model.id), model);
			return { id: model.id, model: response.data };
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			return thunkApi.rejectWithValue(error.response.data)
		}
	}
);

const initialState = {
	users: [],
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsersAsync.fulfilled, (state, action) => {
				state.users = action.payload || [];
			})
			.addCase(fetchUsersAsync.rejected, (state) => {
				state.users = [];
			})
			.addCase(deleteUserAsync.fulfilled, (state, action) => {
				state.users = state.users.filter(x => x.id !== action.payload);
			})
			.addCase(addUserAsync.fulfilled, (state, action) => {
				state.users = [...state.users, action.payload];
			})
			.addCase(updateUserAsync.fulfilled, (state, action) => {
				const index = state.users.findIndex(x => x.id === action.payload.id);
				state.users[index] = { ...state.users[index], ...action.payload.model }
			})
	}
});

const usersSelector = (state) => state.users;
const userByIdSelector = (_, id) => id;

export const uniqueUsersSelector = () => createSelector(usersSelector,
	(users) => users
);

export const uniqueUserByIdSelector = () => createSelector(usersSelector, userByIdSelector,
	(users, id) => users.find(x => x.id === id)
);


export default usersSlice.reducer;
