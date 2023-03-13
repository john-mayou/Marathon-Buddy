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

// user will be on the redux state at:
// state.user
export default cohortsReducer;
