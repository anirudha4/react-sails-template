import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction } from "@reduxjs/toolkit"
import { authorizeSelf, generateAccessToken, register } from '../../api/user';
import { loginSuccess, registerSuccess } from '../../shared/slices/auth';
import { clearAccessTokenToLocalStore, generateAuthenticationHeaders, setAccessTokenToLocalStore } from '../../utils/authentication';

export const requestRegister = createAction('auth/register');

export const requestLogin = createAction('auth/login', function prepare(payload) {
  return {
    payload: {
      emailOrUsername: payload.email,
      password: payload.password
    }
  }
});

export const requestLogout = createAction('/auth/logout');

/**
 * 
 * @param {object} data
 * @param {object} data.payload
 * @param {string} data.payload.email
 * @param {string} data.payload.name
 * @param {string} data.payload.password
 */

export function* registerWorker({ payload }) {
  try {
    yield call(register, payload);
    yield put(registerSuccess(payload));
    history.pushState(null, '/auth');
  } catch (err) {
    console.error(err.message);
  }
}
/**
 * 
 * @param {object} data
 * @param {object} data.payload
 * @param {string} data.payload.email
 * @param {string} data.payload.password
 */

export function* loginWorker({ payload }) {
  const { item: accessToken } = yield call(generateAccessToken, payload);
  yield call(authorize, accessToken);
  yield call(setAccessTokenToLocalStore, accessToken);
}
export function* logoutWorker() {
  yield call(clearAccessTokenToLocalStore);
  window.location.href = '/auth';
}

export function* authWatcher() {
  yield takeEvery(requestRegister.type, registerWorker);
  yield takeEvery(requestLogin.type, loginWorker);
  yield takeEvery(requestLogout.type, logoutWorker);
}

export function* authorize(accessToken) {
  const { item: user } = yield call(authorizeSelf, generateAuthenticationHeaders(accessToken));
  yield put(loginSuccess(user));
  return user;
}