import ActionTypes from '../action/actionTypes';

const taskReducer = (state = [], action) => {
    switch (action.type) {

        case ActionTypes.FETCH_TASKS_SUCCESS:
            return action.payload;

        case ActionTypes.ADD_TASK_SUCCESS:
            return [...state, action.payload];

        case ActionTypes.UPDATE_TASK_SUCCESS:
            return state.map(task => task.id === action.payload.id ? action.payload : task);

        case ActionTypes.DELETE_TASK_SUCCESS:
            return state.filter(task => task.id !== action.payload);

        default:
            return state
    }
}

export default taskReducer;