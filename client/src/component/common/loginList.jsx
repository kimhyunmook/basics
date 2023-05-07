import List from './list'
import { faCircleXmark, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { _Logout } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

function LoginList(props) {
    const reducer = useSelector(state => state);
    const navigate = useNavigate();
    const userInfo = reducer.userInfo;
    const dispatch = useDispatch();
    const logoutHandle = async (event) => {
        event.preventDefault();
        let body = {
            id: userInfo.data.id,
            token: userInfo.data.token
        }
        dispatch(_Logout(body))
        await navigate('/')
    }

    useEffect(() => {
    }, [reducer])

    let loginStyle = {
        width: '200px'
    }

    if (userInfo.login) {
        return (
            <ul className={'login-box'} style={loginStyle}>
                <li className='id'>
                    😉
                    <b className='id-text'>
                        {userInfo.data.id}
                    </b>
                </li>
                <li className='icon-box'>
                    <ul className='id-myPage'>
                        <List text={<FontAwesomeIcon icon={faUser} />} href={'/myPage'} description="마이페이지" />
                        <li>
                            <a onClick={logoutHandle} className='logout'>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        )
    }

    else {
        loginStyle = {
            width: '110px'
        }
        return (
            <ul className={'login-box'} style={loginStyle}>
                <List text={<FontAwesomeIcon icon={faUserPlus} />} href={'/register'} description="회원가입" />
                <List text={`login`} href={`/login`} class_name={`login`} />
            </ul>
        )
    }
}

export default LoginList