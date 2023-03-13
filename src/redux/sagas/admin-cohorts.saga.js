import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchCohorts() {
	try {
		const response = yield axios.get("/api/admin");
		yield put({ type: "SET_COHORTS", payload: response.data });
	} catch (error) {
		console.log("Error fetching cohorts", error);
	}
}

function* addCohort(action) {
	try {
		yield axios.post("/api/admin", action.payload); // new cohort
		yield put({ type: "FETCH_COHORTS" });
	} catch (error) {
		console.log("Error adding cohort", error);
	}
}

function* setCurrentCohort(action) {
	try {
		yield axios.put(`/api/admin/${action.payload}`); // id
		yield put({ type: "FETCH_COHORTS" });
	} catch (error) {
		console.log("Error setting new current cohort", error);
	}
}

function* deleteCohort(action) {
	try {
		yield axios.delete(`/api/admin/${action.payload}`); // id
		yield put({ type: "FETCH_COHORTS" });
	} catch (error) {
		console.log("Error deleting cohort", error);
	}
}

function* cohortSaga() {
	yield takeEvery("FETCH_COHORTS", fetchCohorts); // GET
	yield takeEvery("ADD_COHORT", addCohort); // POST
	yield takeEvery("SET_CURRENT_COHORT", setCurrentCohort); // PUT
	yield takeEvery("DELETE_COHORT", deleteCohort); // DELETE
}

export default cohortSaga;
