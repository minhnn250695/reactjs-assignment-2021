import ActionTypes from '../action/actionTypes';

const loadingReducer = (state = { isLoading: false, isExpired: false }, action) => {
    switch (action.type) {

        case ActionTypes.START_LOADING:
            console.log('START_LOADING');
            return { ...state, isLoading: true };

        case ActionTypes.END_LOADING:
            console.log('END_LOADING');

            return { ...state, isLoading: false };

        case ActionTypes.EXPIRED_TOKEN:
            console.log('EXPIRED_TOKEN');

            return {
                ...state, isLoading: false, isExpired: true
            };

        default:
            return state;
    }
}

export default loadingReducer;