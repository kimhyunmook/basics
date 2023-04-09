import axios from 'axios'
import List from './list'
import { deleteCookie } from '../../actions/tool_action';
import { faCircleXmark, faFaceSmileWink, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginList({ loginCookieName, token, userInfo }) {
    const logoutHandle = (event) => {
        event.preventDefault();
        axios.post('/api/users/logout')
            .then(() => {
                deleteCookie(loginCookieName);
            })
    }

    let loginStyle = {
        width: '200px'
    }

    if (token !== undefined) {
        return (
            <ul className={'login-box'} style={loginStyle}>
                <li className='id'>
                    😉
                    {/* <FontAwesomeIcon icon={faFaceSmileWink} /> */}
                    <b className='id-text'>
                        {userInfo.id}
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