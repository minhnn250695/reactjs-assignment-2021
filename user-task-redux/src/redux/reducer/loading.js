import ActionTypes from '../../redux/action/actionTypes';

export default function loadingReducer(state = { isLoading: false, isExpired: false }, action) {
	switch (action.type) {

		case ActionTypes.START_LOADING:
			return { ...state, isLoading: true };

		case ActionTypes.END_LOADING:
			return { ...state, isLoading: false };

		case ActionTypes.EXPIRED_TOKEN:
			return {
				...state, isLoading: false, isExpired: true
			};

		default:
			return state;
	}
}