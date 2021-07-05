import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './slices/taskSlice';
import usersSlice from './slices/usersSlice';
import baseSlice from './slices/baseSlice'
export const store = configureStore({
	reducer: {
		users: usersSlice,
		tasks: taskSlice,
		base: baseSlice
	},
})

