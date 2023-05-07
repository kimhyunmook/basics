import { useLayoutEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../actions/user_action'
import { lookContent, deleteContent, replyAction, replyList, varValue, replyDelete } from '../../actions/board_action'
import Container from '../common/container';
import { MenuIcon, PenIcon, FontAwsome } from '../common/fontawsome';
import { getDate } from '../../actions/tool_action';
import Reply from './reply';


function ContentBoard () {
    const [userInfo,setUserInfo] = useState('');
    const [boardInfo,setBoardInfo] = useState('');
    const [w_comment, setW_comment] = useState('');
    const [hit, setHit] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyView, setReplyView] = useState([]);
    const [replyState, setReplyState] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const path = window.location.pathname.split('/');

    const moveList = (event) => {
        event.preventDefault();
        navigate(`/board/${path[2]}/1`);
    }
    const moveModify = (event) => {
        event.preventDefault();
        navigate(`/board/${path[2]}/modify/${boardInfo.w_num}`)
    }

    const deleteList = (event) => {
        event.preventDefault();
       
        let body = {}
        if(window.confirm("삭제하시겠습니까?")) {
            deleteContent(body,{
                name:path[2],
                w_num:path[4]
            }).payload.then(()=>{
                alert('삭제되었습니다.')
                navigate(`/board/${path[2]}/1`)
            })
        } else return
    }

    const onReplyHandler = (event) => {
        setReplyText(event.currentTarget.value);
    }

    const replyButton = (event) => {
        event.preventDefault();

        if(!replyState) setReplyState(true);
        else setReplyState(false);
    }

    const reply = (event) => {
        event.preventDefault();

        let body ={
            w_comment:w_comment, 
            w_time:getDate(),
            d_time:getDate('display'),
            content:replyText,
            user_id:userInfo.id,
            board_type:boardInfo.board_type,
            name:path[2],
            w_num:path[4]
        }

        replyAction(body).payload
        .then(res=>{ 
            if(res.reply === 'success'){
                window.location.reload();
            } else alert("댓글 작성 실패");
        })
    }

    const replyVarValueEventHandler = (event) => {
        event.preventDefault();
        const depth = event.currentTarget.nextSibling;
        if (depth.classList[1] === undefined) {
            depth.classList.add('on')
        } else {
            depth.classList.remove('on');
        }
    }

    const replyDel= (event) => {
        event.preventDefault();
        let replyTraget = event.currentTarget.classList[1];
        console.log(replyTraget);
        replyDelete({
            name:path[2],
            w_id:replyTraget
        }).payload.then(()=>{
            window.location.reload();
        })
    }

    useLayoutEffect(()=>{
        auth({}).payload.then(res => { setUserInfo(res) })

        dispatch(lookContent({
            name:path[2],
            w_num:path[4]
        }))
        .then(res=>{
            varValue({
                name:path[2],
                w_num:path[4],
                hit:res.payload.hit+1
            }).payload.then((res2)=>{
                setHit(res2.hit);
            })
            setBoardInfo(res.payload);
            setW_comment(res.payload.w_comment);
        });

        replyList({
            name:path[2],
            w_num:path[4]
        }).payload
        .then(res=>{
            setReplyView(res.array);
        })
    },[])
    return(
        <Container>
            <div className="board board-Mini">
                <div className="board-content">
                   
                    <div className="flex-box subjectLine">
                        <div className="board-content-sbj">
                            { boardInfo.subject } 
                        </div>
                        <div className="board-content-right">
                            <p className="hit">
                                조회수: { hit }
                            </p>
                            <p className='user'>
                                작성자: { boardInfo.user_id }
                            </p>
                            <p className='time'>
                                { boardInfo.w_time }
                            </p>
                            <div className="btnArea">
                                <button className='button' onClick={ moveList }>
                                    <FontAwsome data={"fa-list"} />
                                </button>
                                {
                                    userInfo.id === boardInfo.user_id 
                                    ? <button className='button' onClick={ moveModify }>
                                        <FontAwsome data={"fa-wrench"} />
                                    </button>
                                    : null
                                }
                                {
                                    userInfo.id === boardInfo.user_id 
                                    ? <button className='button' onClick={ deleteList }>
                                        <FontAwsome data={"fa-trash"} />
                                    </button>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                 
                    <pre className="board-content-txt">
                        {boardInfo.content}
                    </pre>
                    
                </div>
                <div className="btnArea">
                    {
                        replyState !== true ?
                        <button className="reply-button button" onClick={replyButton}>
                            댓글 작성
                        </button> :
                        <button className="reply-button-x button" onClick={replyButton}>
                            <FontAwsome data={"fa-xmark"} />
                        </button>
                    }
                </div>
                <div className="reply">
                    {
                        replyState === true ? 
                        <Reply id={ userInfo.id } text={ replyText } textEvent={ onReplyHandler } click={ reply } /> : null
                    }
                    <ul className="reply-list">
                        {
                            replyView.map((el, index)=>{
                                return(
                                    <li className="reply-info" key={ index }>
                                        <p className="reply-userId">
                                            {userInfo.id === boardInfo.user_id ? <FontAwsome data={"fa-pen-nib"} /> : null}
                                            <span style={{marginLeft:'5px'}}>
                                                { el.user_id }
                                            </span>
                                        </p>
                                        <p className="reply-content">
                                            { el.content }
                                        </p>
                                        <p className="reply-time">
                                            { el.d_time }
                                        </p>
                                     
                                        <a href="#" className='reply-varValue' >
                                            <p onClick={ replyVarValueEventHandler }>
                                                <FontAwsome data={"fa-bars"} />
                                            </p>
                                            <ul className="reply-varValue-depth">
                                                <li className={`delete ${el.w_id}`} onClick={ replyDel }>
                                                    삭제
                                                </li>
                                                <li>
                                                    추천
                                                </li>
                                            </ul> 
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    
                </div>
            </div>
        </Container>
    )
} 
 
export default ContentBoard ; 