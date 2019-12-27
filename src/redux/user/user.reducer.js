import { USER_ACTION_TYPES } from "./user.types";

const INIT_STATE = {
	currentUser: null
};

const userReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload
			};
		default:
			return state;
	}
};

export default userReducer;