import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './slices/taskSlice';
import usersSlice from './slices/usersSlice';
import counterSlice from '../features/counter/counterSlice';
import baseSlice from './slices/baseSlice'
export const store = configureStore({
	reducer: {
		counter: counterSlice,
		users: usersSlice,
		tasks: taskSlice,
		base: baseSlice
	},
})

