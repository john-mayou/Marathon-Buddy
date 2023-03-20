import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// USER REQUESTS BELOW THIS LINE
function* fetchCohorts() {
	try {
		const response = yield axios.get("/api/cohort");
		yield put({ type: "SET_COHORTS", payload: response.data });
	} catch (error) {
		console.log("Error fetching cohorts", error);
	}
}

function* fetchCurrentCohort() {
	try {
		const response = yield axios.get("/api/cohort/current");
		yield put({ type: "SET_CURRENT_COHORT", payload: response.data });
	} catch (error) {
		console.log("Error fetching current cohort", error);
	}
}

function* fetchUserCohort() {
	try {
		const response = yield axios.get("api/cohort/user-cohort");
		yield put({ type: "SET_USER_COHORT", payload: response.data });
	} catch (error) {
		console.log("Error fetching user cohort", error);
	}
}

// ADMIN REQUESTS BELOW THIS LINE
function* fetchAdminCohorts() {
	try {
		const response = yield axios.get("/api/cohort/admin");
		yield put({ type: "SET_COHORTS", payload: response.data });
	} catch (error) {
		console.log("Error fetching admin cohorts", error);
	}
}

function* addCohort(action) {
	try {
		yield axios.post("/api/cohort/admin", action.payload); // new cohort
		yield put({ type: "FETCH_ADMIN_COHORTS" });
	} catch (error) {
		console.log("Error adding cohort", error);
	}
}

function* setCurrentCohort(action) {
	try {
		yield axios.put(`/api/cohort/admin/${action.payload}`); // id
		yield put({ type: "FETCH_ADMIN_COHORTS" });
	} catch (error) {
		console.log("Error setting new current cohort", error);
	}
}

function* deleteCohort(action) {
	try {
		yield axios.delete(`/api/cohort/admin/${action.payload}`); // id
		yield put({ type: "FETCH_ADMIN_COHORTS" });
	} catch (error) {
		console.log("Error deleting cohort", error);
	}
}

function* cohortSaga() {
	// user
	yield takeEvery("FETCH_COHORTS", fetchCohorts); // GET
	yield takeEvery("FETCH_CURRENT_COHORT", fetchCurrentCohort); // GET
	yield takeEvery("FETCH_USER_COHORT", fetchUserCohort); // GET

	// admin
	yield takeEvery("FETCH_ADMIN_COHORTS", fetchAdminCohorts); // GET
	yield takeEvery("ADD_COHORT", addCohort); // POST
	yield takeEvery("UPDATE_CURRENT_COHORT", setCurrentCohort); // PUT
	yield takeEvery("DELETE_COHORT", deleteCohort); // DELETE
}

export default cohortSaga;
