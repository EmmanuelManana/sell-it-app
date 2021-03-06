import { takeEvery, put } from 'redux-saga/effects';
import { signIn, signUp, updateUser, getUserInfo } from '../api_client/user';
import jwt from 'jsonwebtoken';

function* watchUserLogin() {
    yield takeEvery("USER_LOGIN_REQUEST", userLogin);
}

function* userLogin(action) {
    try {
        const result = yield signIn(action.payload);
        localStorage.setItem('jwtToken', result.data.token);
        let user = jwt.decode(result.data.token);
        yield put({type: "USER_LOGIN_SUCCESS", payload: user});
        yield put({ type: "USER_INFO_REQUEST" });
    } catch(error) {
        yield put ({ type: "USER_LOGIN_ERROR", payload: error.response.data });
    }
}

function* watchUserSignUp() {
    yield takeEvery("USER_SIGN_UP_REQUEST", userSignUp);
}

function* userSignUp(action) {
    try {
        const result = yield signUp(action.payload);
        console.log('result: ', result);
        yield put({ type: "USER_SIGN_UP_SUCCESS" });
    } catch(error) {
        yield put ({ type: "USER_SIGN_UP_ERROR", payload: error.response.data });
    }
}

function* watchUserInfo() {
    yield takeEvery("USER_INFO_REQUEST", userInfo);
}

function* userInfo() {
    try {
        const token = yield localStorage.getItem('jwtToken');
        const headers = { Authorization: `JWT ${token}`};
        const result = yield getUserInfo(headers);
        yield put({ type: "USER_INFO_SUCCESS", payload: result.data });
    } catch(error) {
        yield put ({ type: "USER_INFO_ERROR", payload: error.response.data });
    }
}


function* watchUserUpdate() {
    yield takeEvery("USER_UPDATE_REQUEST", userUpdateWorker);
}

function* userUpdateWorker(action) {
    try {
        const token = yield localStorage.getItem('jwtToken');
        const headers = { Authorization: `JWT ${token}`};
        const result = yield updateUser(action.payload, headers);
        yield put({ type: "USER_UPDATE_SUCCESS", payload: result.data });
    } catch(error) {
        yield put ({ type: "USER_UPDATE_ERROR", payload: error.response.data });
    }
}

export const userSagas = [ watchUserLogin(), watchUserSignUp(), watchUserUpdate(), watchUserInfo() ];