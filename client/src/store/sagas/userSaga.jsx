import { call, put } from "redux-saga/effects";
import { getUser, failedGetUser } from "../userSlice";
import { login, logout, userDelete, userEdit } from "../api/userAPi";

export function* handleLoginUser(body) {
    try {
        const res = yield call(login, body);
        yield put(getUser(res));
    } catch (error) {
        yield put(failedGetUser(error));
    }
}

export function* handleLogOutUser(body) {
    try {
        const res = yield call(logout, body);
        yield put(getUser(res));
    } catch (error) {
        yield put(failedGetUser(error));
    }
}

export function* handleEditUser(body) {
    try {
        const res = yield call(userEdit, body)
        yield put(getUser(res));
    } catch (error) {
        yield put(failedGetUser(error));
    }
}

export function* handleDeleteUser(body) {
    try {
        console.log('body',body);
        yield call(userDelete,body);
    }
    catch (error) {
        yield put(failedGetUser(error))
    }
}


