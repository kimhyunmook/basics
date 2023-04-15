import { useState, useRef, useEffect } from "react";
import { adminAction } from "../../actions/adm_action";
import { OverlapLi } from "./ui";

export default function ADM_Board(props) {
    let body;

    const submit = (event) => {
        event.preventDefault();
        // `name`,`href`,`menu_type`,`description`,`depth`,`admin`,`parent`,`custom`,`custom_comment`
        body = {
            url: 'createboard',
            name: board_name,
            href: board_href,
            menu_type: 'board',
            board_type: board_type,
            description: board_description,
            custom: board_custom,
            custom_comment: board_customCommentValue,
            // depth:0,
            // admin:0,
        }
        if (board_description === "" || board_customComment === undefined) {
            body.description = board_name
        }
        if (board_description === "" || board_customComment === undefined) {
            body.custom_comment = "fa-chalkboard"
        }
        adminAction(body).payload.then(res => {
            console.log(res)
        })
    }

    useEffect(() => {
    }, []);

    const [board_name, setBoard_name] = useState("");
    function board_nameHandler(event) {
        event.preventDefault();
        event.target.value = event.target.value.replace(/[^A-Za-z]/ig, '')
        setBoard_name(event.target.value)
    }
    const [board_href, setBoard_href] = useState("");
    function board_hrefHandler(event) { 
        event.preventDefault(); 
        event.target.value = event.target.value.replace(/[^A-Za-z]/ig, '')
        setBoard_href(event.target.value) 
    }
    const [board_type, setBoard_type] = useState("");
    function board_typeHandler(event) { event.preventDefault(); setBoard_type(event.target.value) }
    const [board_description, setBoard_description] = useState("");
    const [board_customComment, setBoard_customComment] = useState({
        label_text: "fontawsome Code",
        placeholder: "fontawsome Code 입력"
    });
    const [board_customCommentValue, setBoard_customCommentValue] = useState("");
    function board_descriptionHandler(event) { event.preventDefault(); setBoard_description(event.target.value) }
    const [board_custom, setBoard_custom] = useState("fontawsome");
    function board_customHandler(event) {
        event.preventDefault();
        setBoard_custom(event.target.value)
        switch (event.target.value) {
            case "fontawsome":
                setBoard_customComment({
                    label_text: "fontawsome Code",
                    placeholder: "fontawsome Code 입력"
                });
                break;
            case "self":
                setBoard_customComment({
                    label_text: "직접 입력",
                    placeholder: "직접 입력"
                });
                break;
        }
    }
    function board_customCommentHandler(event) { 
        event.preventDefault(); 
        event.target.value = event.target.value.replace(/[^A-Za-z]/ig, '')
        setBoard_customCommentValue(event.target.value) 
    }
    return (
        <ul className="adm">
            <OverlapLi title="게시판 설정" id="board" onClick={props.onClick} button_text={"제작"} onSubmit={submit}>
                <ul>
                    <OverlapLi type="input" value={board_name} label_id="board-name" label_text="게시판 이름" onChange={board_nameHandler} placeholder="게시판 이름(영어로 작성)" />
                    <OverlapLi type="input" value={board_href} label_id="board-href" label_text="게시판 주소" onChange={board_hrefHandler} placeholder="board" />
                    <OverlapLi type="input" value={board_description} label_id="board-description" label_text="게시판 설명" onChange={board_descriptionHandler} placeholder="설명(미작성시 이름으로 표기)" />
                    <OverlapLi type="select" value={board_type} label_id="board-type" label_text="게시판 유형" onChange={board_typeHandler}>
                        <option value="board" > 일반 </option>
                        <option value="gallery"> 갤러리 </option>
                    </OverlapLi>
                    <OverlapLi type="select" value={board_custom} label_id="board-custom" label_text="커스텀 (아이콘)" onChange={board_customHandler}>
                        <option value="fontawsome" > fontawsome </option>
                        <option value="self"> 직접입력(미구현) </option>
                    </OverlapLi>
                    <OverlapLi type="input" value={board_customCommentValue} label_id="board-custom-comment" label_text={board_customComment.label_text} onChange={board_customCommentHandler} placeholder={board_customComment.placeholder} />

                </ul>
            </OverlapLi>
        </ul>
    )

}