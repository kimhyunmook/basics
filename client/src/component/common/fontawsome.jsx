import React from "react";
import { faAngleLeft, faAngleRight, faBars, faHamburger, faHouse, faList, faPen, faPenNib, faPerson, faPersonDress, faTrash, faUnlockKeyhole, faUser, faUserXmark, faWrench, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function HouseIcon () {
    return(
        <FontAwesomeIcon icon={faHouse} />
    )
}

export function WriteIcon () {
    return(
        <FontAwesomeIcon icon={faPen} />
    )
} 

export function Xmark () {
    return(
        <FontAwesomeIcon icon={faXmark} />
    )
}

export function ListIcon () {
    return (
        <FontAwesomeIcon icon={faList} />
    )
}

export function LeftIcon () {
    return (
        <FontAwesomeIcon icon={faAngleLeft} />
    )
}

export function RightIcon () {
    return (
        <FontAwesomeIcon icon={faAngleRight} />
    )
}

export function FixIcon () {
    return (
        <FontAwesomeIcon icon={faWrench} />
    )
}

export function DeleteIcon () {
    return (
        <FontAwesomeIcon icon={faTrash} />
    )
}

export function DeleteUserIcon () {
    return (
        <FontAwesomeIcon icon={faUserXmark} />
    )
}

export function PenIcon () {
    return(
        <FontAwesomeIcon icon={faPenNib} />
    )
}

export function MenuIcon () {
    return(
        <FontAwesomeIcon icon={faBars} />
    )
}

export function Man () {
    return(
        <FontAwesomeIcon icon={faPerson} />
    )
}

export function Girl () {
    return(
        <FontAwesomeIcon icon={faPersonDress} />
    )
}

export function User () {
    return(
        <FontAwesomeIcon icon={faUser} />
    )
}

export function Unlock () {
    return(
        <FontAwesomeIcon icon={faUnlockKeyhole} />
    )
}