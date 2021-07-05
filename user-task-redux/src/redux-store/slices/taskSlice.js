import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const localApi = {

	getAllTask: "/tasks",
	getTaskById: "/tasks/{id}",
	addTask: "/tasks",
	updateTask: "/tasks/{id}",
	deleteTask: "/tasks/{id}",
  };
  
  

export const fetchTasksAsync = createAsyncThunk(
	'tasks/fetchTasks',
	async (_, thunkApi) => {
		try {
			const response = await axios.get(localApi.getAllTask);
			return response.data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			return thunkApi.rejectWithValue(error.response.data)
		}
	}
);

export const deleteTaskAsync = createAsyncThunk(
	'tasks/deleteTask',
	async (id, thunkApi) => {
		try {
			await axios.delete(localApi.deleteTask.replace('{id}', id));
			return id;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			return thunkApi.rejectWithValue(error.response.data)
		}
	}
);

export const addTaskAsync = createAsyncThunk(
	'tasks/addTask',
	async (model, thunkApi) => {
		try {
			const response = await axios.post(localApi.addTask, model);
			return response.data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			return thunkApi.rejectWithValue(error.response.data)
		}
	}
);

export const updateTaskAsync = createAsyncThunk(
	'tasks/updateTask',
	async (model, thunkApi) => {
		try {
			const response = await axios.put(localApi.updateTask.replace('{id}', model.id), model);
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
	tasks: [],
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasksAsync.fulfilled, (state, action) => {
				state.tasks = action.payload || [];
			})
			.addCase(fetchTasksAsync.rejected, (state) => {
				state.tasks = [];
			})
			.addCase(deleteTaskAsync.fulfilled, (state, action) => {
				state.tasks = state.tasks.filter(x => x.id !== action.payload);
			})
			.addCase(addTaskAsync.fulfilled, (state, action) => {
				state.tasks = [...state.tasks, action.payload];
			})
			.addCase(updateTaskAsync.fulfilled, (state, action) => {
				const index = state.tasks.findIndex(x => x.id === action.payload.id);
				state.tasks[index] = { ...state.tasks[index], ...action.payload.model }
			})
	}
});

export default tasksSlice.reducer;
