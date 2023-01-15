import { all, apply, call } from "redux-saga/effects";
import socket from "../../api/socket";
import { authorize, authWatcher } from "../../pages/Auth/saga";
import { getAccessTokenFromLocalStore } from "../../utils/authentication";
import socketWatchers from "./socket-event-channel";

export default function* rootSaga() {
    try {
        yield apply(socket, socket.connect);

        // check if access token is present
        const accessToken = yield call(getAccessTokenFromLocalStore);
        if (accessToken) {
            yield call(authorize, accessToken);
        }
        yield all([
            authWatcher(),
            socketWatchers()
        ])
    } catch (err) {
        console.log(err.message);
    }
}