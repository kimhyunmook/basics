import Container from "../common/container"
import { useState } from "react";
import { useLayoutEffect } from "react";

export default function ADM () {

    const listOpen = (event) => {
        const content = event.target.nextSibling;
        if(content.classList[1] === undefined) {
            content.classList.add('on');
        
        } else {
            content.classList.remove('on');
        }

    }
    useLayoutEffect(()=>{
        
    },[])
    return(
        <Container>
            <ul className="adm">
                <li className="adm-list">
                    <div className="adm-list-name" onClick={listOpen}>
                        <p>
                            게시판 설정
                        </p>
                    </div>
                    <div className="adm-list-content">
                        <form id="add-board">
                            <ul>
                                <li>
                                    <label htmlFor="board-name">게시판 이름</label>
                                    <input type="text" id="board-name" placeholder="게시판 이름(영문으로 작성)"/>
                                </li>
                                <li>
                                    <label htmlFor="board-type">게시판 유형</label>
                                    <select name="board-type" id="board-type">
                                        <option value="normal">일반</option>
                                        <option value="gallery">갤러리</option>
                                    </select>
                                </li>
                            </ul>
                        </form>
                    </div>
                </li>
            </ul>
        </Container>
    )
}