import { useLayoutEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../actions/tool_action";
import { loginToken } from "../../actions/type";
import { auth,deleteUser } from "../../actions/user_action"
import Container from "../common/container";
import { DeleteUserIcon, FixIcon } from "../common/fontawsome";
import { Li } from "./ui/userUi";

function MyPage () {
    const [userInfo,setUserInfo] = useState('')
    const navigate = useNavigate();
    useLayoutEffect(()=>{
        auth().payload.then(res=>{
            setUserInfo(res);
        });
    },[]);

    const userEdit = (event) => {
        event.preventDefault();
        navigate('/myPage/edit')
    }
    
    const userDelete = (event) => {
        event.preventDefault();
        if(window.confirm('정말 삭제 하시겠습니까?')) {
            deleteUser({id:userInfo.id}).payload
            .then(() => {
                deleteCookie(loginToken)
                // navigate('/');
            })
        } else {
            return;
        }
    }

    return (
        <Container>
            <ul className="myPage">
                <Box class_name={ 'user_id' } tag_name={ 'ID' } value={userInfo.id} />
                <Box class_name={ 'user_class' } tag_name={ '이용자 등급' } value={userInfo.isAdmin === true ? '관리자':'일반'} />
                <Box class_name={ 'user_name' } tag_name={ '이름' } value={userInfo.name} />
                <Box class_name={ 'user_gender' } tag_name={ '성별' } value={userInfo.gender} />
                <Box class_name={ 'user_email' } tag_name={ '이메일' } value={userInfo.email} />
            </ul>
            <div className="btnArea">
                <button className={'edit_btn button'} onClick={ userEdit }>
                    <FixIcon />
                </button>
                <button className={'delete_btn button'} onClick={ userDelete }>
                    <DeleteUserIcon />
                </button>
            </div>
        </Container>
    );
}

function Box ({ class_name, tag_name, value }) {
    return (
        <li className={`${ class_name } list`}>
            <p className="tag_name">
                { tag_name }
            </p>
            <p className="value">
                { value }
            </p>
        </li>
    )
}

export default MyPage