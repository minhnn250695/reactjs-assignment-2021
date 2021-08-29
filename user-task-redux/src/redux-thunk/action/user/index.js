

import { fetchUsersAPI } from '../../../services/user';
import { isExpiredToken } from '../../../auth/authentication';
import ActionTypes from '../../action/actionTypes';
import { createUserAPI, deleteUserAPI, updateUserAPI } from '../../../services/user';

export const getUsers = () => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const response = await fetchUsersAPI();
        dispatch({
            type: ActionTypes.FETCH_USERS_SUCCESS,
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

export const addUser = (data) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await createUserAPI(data);
        dispatch({ type: ActionTypes.ADD_USER_SUCCESS, payload: res.data });

        const isExpired = await isExpiredToken();
        if (isExpired) {
            dispatch({ type: ActionTypes.EXPIRED_TOKEN })
        } else {
            dispatch({ type: ActionTypes.END_LOADING });
        }
    } catch (error) {
    }
}

export const updateUser = (data) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await updateUserAPI(data);
        dispatch({ type: ActionTypes.UPDATE_USER_SUCCESS, payload: res.data });

        const isExpired = await isExpiredToken();
        if (isExpired) {
            dispatch({ type: ActionTypes.EXPIRED_TOKEN })
        } else {
            dispatch({ type: ActionTypes.END_LOADING });
        }
    } catch (error) {
    }
}

export const deleteUser = (id) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await deleteUserAPI(id);
        dispatch({ type: ActionTypes.DELETE_USER_SUCCESS, payload: id });

        const isExpired = await isExpiredToken();
        if (isExpired) {
            dispatch({ type: ActionTypes.EXPIRED_TOKEN })
        } else {
            dispatch({ type: ActionTypes.END_LOADING });
        }
    } catch (error) {
    }
}