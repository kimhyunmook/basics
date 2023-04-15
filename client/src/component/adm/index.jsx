import Container from "../common/container"
import { useState, useRef, useEffect } from "react";
import { adminAction } from "../../actions/adm_action";
import ADM_Board from './board';

export default function ADM() {
    const listOpen = (event) => {
        const content = event.target.nextSibling;
        if (content.classList[1] === undefined) content.classList.add('on');
        else content.classList.remove('on');
    }
    return (
        <Container>
            <ADM_Board onClick={listOpen}/>
        </Container>
    )
}

