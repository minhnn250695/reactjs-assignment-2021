import { fetchTasksAPI } from '../../../services/task';
import { isExpiredToken } from '../../../auth/authentication';
import ActionTypes from '../../action/actionTypes';
import { createTaskAPI, deleteTaskAPI, updateTaskAPI } from '../../../services/task';

export const getTasks = () => async dispatch => {
    try {
        dispatch({ type: ActionTypes.START_LOADING });

        const response = await fetchTasksAPI();
        dispatch({
            type: ActionTypes.FETCH_TASKS_SUCCESS,
            payload: response
        });

        const isExpired = await isExpiredToken();
        if (isExpired) {
            dispatch({ type: ActionTypes.EXPIRED_TOKEN })
        } else {
            dispatch({ type: ActionTypes.END_LOADING });
        }
    } catch (error) {
        console.error(error);
    }
}


export const addTask = (data) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await createTaskAPI(data);
        dispatch({ type: ActionTypes.ADD_TASK_SUCCESS, payload: res.data });

        const isExpired = await isExpiredToken();
        if (isExpired) {
            dispatch({ type: ActionTypes.EXPIRED_TOKEN })
        } else {
            dispatch({ type: ActionTypes.END_LOADING });
        }
    } catch (error) {
    }
}

export const updateTask = (data) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await updateTaskAPI(data);
        dispatch({ type: ActionTypes.UPDATE_TASK_SUCCESS, payload: res.data });

        const isExpired = await isExpiredToken();
        if (isExpired) {
            dispatch({ type: ActionTypes.EXPIRED_TOKEN })
        } else {
            dispatch({ type: ActionTypes.END_LOADING });
        }
    } catch (error) {
    }
}

export const deleteTask = (id) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        let res = await deleteTaskAPI(id);
        dispatch({ type: ActionTypes.DELETE_TASK_SUCCESS, payload: id });

        const isExpired = await isExpiredToken();
        if (isExpired) {
            dispatch({ type: ActionTypes.EXPIRED_TOKEN })
        } else {
            dispatch({ type: ActionTypes.END_LOADING });
        }
    } catch (error) {
    }
}