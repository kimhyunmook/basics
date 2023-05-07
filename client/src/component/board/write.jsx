import { useState,useLayoutEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { writeBoard } from "../../actions/board_action";
import { auth } from "../../actions/user_action";
import Container from "../common/container";
import { getDate } from "../../actions/tool_action";
import { FontAwsome } from "../common/fontawsome";
import { BoardWriteUi, Button, Li } from "./ui/boardUi";


function WriteBoard() {
    const [subject,setSubject] = useState('');
    const [textArea,setTextArea] = useState('');
    const [userInfo,setUserInfo] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = window.location.pathname.split('/');

    useLayoutEffect(() => {
        dispatch(auth())
        .then(res=>{
            setUserInfo(res.payload)
        })
    },[]);
 
    const onSubjectHandler = (event) => {
        setSubject(event.currentTarget.value)
    }
    const onTextareaHandler = (event) => {
        setTextArea(event.currentTarget.value)
    }
    const moveList = (event) => {
        event.preventDefault();
        navigate(`/board/${ path[2] }/1`)
    }

    const onWrite = (event) => {
        event.preventDefault();
        const form = document.forms[0];
        if(subject === "" || subject ===" ") {
            alert('제목을 작성해주세요.');
            form.subject.focus();
            return;
        }
        if(textArea === "" || textArea ===" ") {
            alert('내용을 작성해주세요.');
            form.textArea.focus();
            return;
        }
        
        let type = writeBoard({
            subject:subject,
            content:textArea,
            w_time:getDate(),
            d_time:getDate('display'),
            user_id:userInfo.id,
            board_type:'normal'
        },{name:path[2]})

        dispatch(type)
        .then(() => {
            navigate(`/board/${ path[2] }/1`);
        })
    }
    let btn = [
        {
            text:<FontAwsome data={"fa-pen"} />
        },
        {
            text:<FontAwsome data={"fa-list"}/>,
            fnc: moveList
        }
        
    ]
    return(
        <Container>
            <BoardWriteUi submit={onWrite} title="글쓰기">
                <Li name="subject" text="제목">
                    <input type="text" name="subject" value={subject} onChange={ onSubjectHandler }/>
                </Li>
                <Li name="content" text="내용">
                    <textarea value={textArea} name="textArea" onChange={ onTextareaHandler }></textarea>
                </Li>
                <Li>
                    <Button btn={btn}></Button>
                </Li>
            </BoardWriteUi>
        </Container>
    )
}
 
export default WriteBoard