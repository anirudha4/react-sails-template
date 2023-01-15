import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction } from "@reduxjs/toolkit"
import { authorizeSelf, generateAccessToken, register } from '../../api/user';
import { locationChange } from '../../shared/slices/router';
import { loginSuccess, registerSuccess } from '../../shared/slices/auth';
import { generateAuthenticationHeaders, setAccessTokenToLocalStore } from '../../utils/authentication';
import { coreInitialized } from '../../shared/slices/core';

export const requestRegister = createAction('auth/register');

export const requestLogin = createAction('auth/login', function prepare(payload) {
  return {
    payload: {
      emailOrUsername: payload.email,
      password: payload.password
    }
  }
});

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
    yield put(locationChange('/auth'));
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

export function* authWatcher() {
  yield takeEvery(requestRegister.type, registerWorker);
  yield takeEvery(requestLogin.type, loginWorker);
}

export function* authorize(accessToken) {
  const { item: user } = yield call(authorizeSelf, generateAuthenticationHeaders(accessToken));
  yield put(loginSuccess(user));
  yield put(coreInitialized());
  return user;
}