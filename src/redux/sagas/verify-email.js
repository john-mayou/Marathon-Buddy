import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* sendVerificationEmail() {
	try {
		yield axios.post("/api/verify-email");
	} catch (error) {
		console.log("Error sending verification email", error);
	}
}

function* verifyEmailSaga() {
	yield takeEvery("SEND_VERIFICATION_EMAIL", sendVerificationEmail);
}

export default verifyEmailSaga;
