import { takeLatest } from "redux-saga/effects";
import { handleEditUser, handleLogOutUser, handleLoginUser, handleDeleteUser } from "../sagas/userSaga";
import { _Login, _Edit, _Logout, _Delete } from "../userSlice";
import { getMenu } from "../menuSlice";
import { handleMenu } from "./menuSaga";

export default function* rootSaga() {
  yield [
    // user
    yield takeLatest(_Login.type, handleLoginUser),
    yield takeLatest(_Logout.type, handleLogOutUser),
    yield takeLatest(_Edit.type, handleEditUser),
    yield takeLatest(_Delete.type, handleDeleteUser),

    //menu
    yield takeLatest(getMenu.type, handleMenu),
  ]
}