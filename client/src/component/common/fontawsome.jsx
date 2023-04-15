import React from "react";
import { faAngleLeft, faAngleRight, faBars, faChalkboard, faHouse, faList, faPen, faPenNib, faPerson, faPersonDress, faTrash, faUnlockKeyhole, faUser, faUserLock, faUserXmark, faWrench, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function FontAwsome(props) {
    let data = props.data
    switch (data) {
        case data = 'fa-user':
            data = faUser;
            break;
        case data = 'fa-house':
            data = faHouse;
            break;
        case data = 'fa-chalkboard':
            data = faChalkboard;
            break;
        case data = 'fa-unlock-keyhole':
            data = faUnlockKeyhole;
    }
    return (
        <FontAwesomeIcon icon={data} />
    )
}

export function BoardIcon() {
    return (
        <FontAwesomeIcon icon={faChalkboard} />
    )
}

export function WriteIcon() {
    return (
        <FontAwesomeIcon icon={faPen} />
    )
}

export function Xmark() {
    return (
        <FontAwesomeIcon icon={faXmark} />
    )
}

export function ListIcon() {
    return (
        <FontAwesomeIcon icon={faList} />
    )
}

export function LeftIcon() {
    return (
        <FontAwesomeIcon icon={faAngleLeft} />
    )
}

export function RightIcon() {
    return (
        <FontAwesomeIcon icon={faAngleRight} />
    )
}

export function FixIcon() {
    return (
        <FontAwesomeIcon icon={faWrench} />
    )
}

export function DeleteIcon() {
    return (
        <FontAwesomeIcon icon={faTrash} />
    )
}

export function DeleteUserIcon() {
    return (
        <FontAwesomeIcon icon={faUserXmark} />
    )
}

export function PenIcon() {
    return (
        <FontAwesomeIcon icon={faPenNib} />
    )
}

export function MenuIcon() {
    return (
        <FontAwesomeIcon icon={faBars} />
    )
}

export function Man() {
    return (
        <FontAwesomeIcon icon={faPerson} />
    )
}

export function Girl() {
    return (
        <FontAwesomeIcon icon={faPersonDress} />
    )
}

export function User() {
    return (
        <FontAwesomeIcon icon={faUser} />
    )
}

export function AdminIcon() {
    return (
        <FontAwesomeIcon icon={faUserLock} />
    )
}

export function Unlock() {
    return (
        <FontAwesomeIcon icon={faUnlockKeyhole} />
    )
}
