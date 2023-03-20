import { combineReducers } from "redux";

const cohortsReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_COHORTS":
			return action.payload;
		case "UNSET_COHORTS":
			return [];
		default:
			return state;
	}
};

const currentCohortReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_CURRENT_COHORT":
			return action.payload;
		case "UNSET_COHORTS":
			return [];
		default:
			return state;
	}
};

const userCohortReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_USER_COHORT":
			return action.payload;
		case "UNSET_COHORTS":
			return {};
		default:
			return state;
	}
};

export default combineReducers({
	cohortsReducer,
	currentCohortReducer,
	userCohortReducer,
});
