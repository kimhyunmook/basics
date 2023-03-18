import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../actions/user_action";
import Container from "../common/container";

function Login () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login_Id,setLoginId] = useState("");
    const [login_Password,setLoginPassword] = useState("");
    
    const onIdChangeHandler = (event)=> {
        let value = event.currentTarget.value

        setLoginId(value)
    }
    const onPasswordChangeHandler = (event)=> {
        let value = event.currentTarget.value
        setLoginPassword(value)
    }

    const loginHandler = (event) =>{
        event.preventDefault();
        let body = {
            id:login_Id,
            password:login_Password
        }
        dispatch(loginUser(body))
        .then(res=>{
            let loginSuccess = res.payload._login;

            if(loginSuccess) {
                window.location.href = '/'
            } else {
                alert('ID or Pasword 가 틀렸습니다.')
            }
        })
    }

    return (
        <Container>
            <form onSubmit={loginHandler} className="loginForm">
                <ul>
                    <Cover name="id">
                        <input type="text" value={login_Id} name="id" placeholder="id" onChange={ onIdChangeHandler } />
                    </Cover>
                    <Cover name="password">
                        <input type="password" value={login_Password} name="password" placeholder="password" onChange={ onPasswordChangeHandler } />
                    </Cover>
                </ul>
                <div className="btnArea">
                    <input className="button" type="submit" value="로그인" />
                </div>
            </form>
        </Container>
    )
}

const Cover = (props) => {
    return(
        <li className={ props.name }>
            <label htmlFor={ props.name }>{ props.name }</label>
            { props.children }
        </li>
    )
}

export default Login