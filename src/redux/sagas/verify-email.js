import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* sendVerificationEmail(action) {
	try {
		yield axios.post(`/api/verify-email/${action.payload}`);
	} catch (error) {
		console.log("Error sending verification email", error);
	}
}

function* verifyEmailSaga() {
	yield takeEvery("SEND_VERIFICATION_EMAIL", sendVerificationEmail);
}

export default verifyEmailSaga;
