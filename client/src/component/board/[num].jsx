import { useLayoutEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../actions/user_action'
import { lookContent, deleteContent, replyAction, replyList } from '../../actions/board_action'
import Container from '../common/container';
import { DeleteIcon, FixIcon, ListIcon, PenIcon, Xmark } from '../common/fontawsome';
import { getDate } from '../../actions/tool_action';
import Reply from './reply';


function ContentBoard () {
    const [userInfo,setUserInfo] = useState('');
    const [boardInfo,setBoardInfo] = useState('');
    const [w_comment, setW_comment] = useState('');
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
            }).payload.then(res=>{
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
            content:replyText,
            user_id:userInfo.id,
            board_type:boardInfo.board_type
        }

        replyAction(body,{
            name:path[2],
            w_num:path[4]
        }).payload
        .then(res=>{ 
            if(res.reply === 'success'){
                window.location.reload();
            } else alert("댓글 작성 실패");
        })
    }

    useLayoutEffect(()=>{
        auth({}).payload
        .then(res=>{
            setUserInfo(res)
        })

        dispatch(lookContent({},{
            name:path[2],
            w_num:path[4]
        }))
        .then(res=>{
            setBoardInfo(res.payload);
            setW_comment(res.payload.w_comment);
        });

        replyList({},{
            name:path[2],
            w_num:path[4]
        }).payload
        .then(res=>{
            setReplyView(res.array);
        })

    },[])


    return(
        <Container>
            <div className="board">
                <div className="board-content">
                   
                    <div className="flex-box subjectLine">
                        <div className="board-content-sbj">
                            { boardInfo.subject }
                        </div>
                        <div className="board-content-right">
                            <p className='user'>
                                { boardInfo.user_id }
                            </p>
                            <p className='time'>
                                { boardInfo.w_time }
                            </p>
                            <div className="btnArea">
                                <button className='button' onClick={ moveList }>
                                    <ListIcon />
                                </button>
                                {
                                    userInfo.id === boardInfo.user_id 
                                    ? <button className='button' onClick={ moveModify }>
                                        <FixIcon />
                                    </button>
                                    : null
                                }
                                {
                                    userInfo.id === boardInfo.user_id 
                                    ? <button className='button' onClick={ deleteList }>
                                        <DeleteIcon />
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
                            <Xmark />
                        </button>
                    }
                </div>
                <div className="reply">
                    {
                        replyState === true ? 
                        <Reply text={ replyText } textEvent={ onReplyHandler } click={ reply } /> : null
                    }
                    <ul className="reply-list">
                        {
                            replyView.map((el, index)=>{
                                return(
                                    <li key={ index } className="reply-info">
                                        <p className="reply-userId">
                                            { el.user_id }
                                        </p>
                                        <p className="reply-content">
                                            { el.content }
                                        </p>
                                        <p className="reply-time">
                                            { el.w_time }
                                        </p>
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