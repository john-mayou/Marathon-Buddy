import { combineReducers } from "redux";

const userDataReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_USER_DATA":
			return action.payload;
		case "UNSET_USER_DATA":
			return [];
		default:
			return state;
	}
};

export default combineReducers({
	userDataReducer,
});
