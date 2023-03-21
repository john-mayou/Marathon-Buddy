import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchUserData() {
	try {
		const response = yield axios.get("/api/user-data");
		yield put({ type: "SET_USER_DATA", payload: response.data });
	} catch (error) {
		console.log("Error fetching user data", error);
	}
}

function* userDataSaga() {
	yield takeEvery("FETCH_USER_DATA", fetchUserData);
}

export default userDataSaga;
