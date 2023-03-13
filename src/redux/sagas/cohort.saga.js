import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchCohorts() {
	try {
		const response = yield axios.get("/api/admin");
		console.log(response);
		yield put({ type: "SET_COHORTS", payload: response.data });
	} catch (error) {
		console.log("Error fetching cohorts", error);
	}
}

function* cohortSaga() {
	yield takeEvery("FETCH_COHORTS", fetchCohorts);
}

export default cohortSaga;
