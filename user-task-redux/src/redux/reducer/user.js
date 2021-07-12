import  ActionTypes  from '../action/actionTypes';

export default function userReducer(state = [], action) {
    switch (action.type) {

        case ActionTypes.FETCH_USERS_SUCCESS:
            return action.payload;
        
        case ActionTypes.ADD_USER_SUCCESS:
            return [...state, action.payload];

        case ActionTypes.UPDATE_USER_SUCCESS:
            return state.map(user => user.id === action.payload.id ? action.payload : user);

        case ActionTypes.DELETE_USER_SUCCESS:
            return state.filter(user => user.id !== action.payload);
        default:
            return state
    }
}
