import Container from "../common/container";
import { useLayoutEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../actions/user_action";
import { lookContent, modify } from "../../actions/board_action";
import { FontAwsome } from "../common/fontawsome";
import { BoardWriteUi, Button, Li } from "./ui/boardUi";


function ModifyBoard () {
    const path = window.location.pathname.split('/');
    const [w_id,setW_id] = useState('');
    const [userInfo,setUserInfo] = useState('');
    const [subject,setSubject] = useState('');
    const [textArea,setTextArea] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useLayoutEffect(()=>{
        auth({}).payload
        .then(res=>{
            setUserInfo(res)
        })

        dispatch(lookContent({
            name:path[2],
            w_num:path[4]
        })) 
        .then(res=>{
            setW_id(res.payload.w_id);
            setSubject(res.payload.subject);
            setTextArea(res.payload.content);
        })
    },[]);

    const onSubjectHandler = (event) => {
        let value = event.currentTarget.value
        setSubject(value)
    }
    const onTextareaHandler = (event) => {
        let value = event.currentTarget.value
        setTextArea(value)
    }
    console.log(w_id);

    const onModify = (event) => {
        event.preventDefault();

        let body = {
            w_id:w_id,
            subject:subject,
            content:textArea
        }
        dispatch(modify(body,{
            name:path[2],
            w_num:path[4]
        }))
        .then(res=> {
            alert('수정되었습니다.');
            navigate(`/board/${path[2]}/contents/${path[4]}`);
        })
    }
    return(
        <Container>
            <BoardWriteUi submit={onModify} title="글쓰기">
                <Li name="subject" text="제목">
                    <input type="text" value={ subject } onChange={ onSubjectHandler }/>
                </Li>
                <Li name="id" text="작성자">
                    <p>
                        {userInfo.id}
                    </p>
                </Li>
                <Li name="content" text="내용">
                    <textarea name="content" cols="30" rows="10" value={ textArea } onChange={ onTextareaHandler }></textarea> 
                </Li>
                <Li>
                    <Button btn={[{text:<FontAwsome data={"fa-wrench"}/>}]}></Button>
                </Li>
            </BoardWriteUi>
        </Container>
    )
}

export default ModifyBoard;