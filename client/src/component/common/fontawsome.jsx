import React from "react";
import { faAngleLeft, faAngleRight, faHouse, faList, faPen, faPenNib, faTrash, faUserXmark, faWrench, faXmark } from "@fortawesome/free-solid-svg-icons";
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