import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* disconnectStrava() {
	try {
		yield axios.delete("/api/strava-auth");
		yield put({ type: "FETCH_USER" });
	} catch (error) {
		console.log("Error disconnecting from strava", error);
	}
}

function* stravaSaga() {
	yield takeLatest("DISCONNECT_STRAVA", disconnectStrava);
}

export default stravaSaga;
