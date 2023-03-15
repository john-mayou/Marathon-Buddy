import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* addUserToCohort(action) {
	try {
		yield axios.post("/api/join", action.payload);
	} catch (error) {
		console.log("Error with adding user to cohort", error);
	}
}

function* joinSaga() {
	yield takeEvery("ADD_USER_TO_COHORT", addUserToCohort);
}

export default joinSaga;
