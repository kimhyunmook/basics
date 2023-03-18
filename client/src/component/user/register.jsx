import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../actions/user_action';
import Container from '../common/container';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // state
    const [_Id,setId] = useState("");
    const [_Password,setPassword] = useState("");
    const [_Password2,setPassword2] = useState("");
    const [Name,setName] = useState("");
    const [Email,setEmail] = useState("");
    const [Phone,setPhone] = useState("");

    // function
    const onIdChangeHandler = (event)=> {
        let value = event.currentTarget.value
        setId(value)
    }
    const onPasswordChangeHandler = (event)=> {
        let value = event.currentTarget.value
        setPassword(value)
    }
    const onPasswordChangeHandler2 = (event)=> {
        let value = event.currentTarget.value
        setPassword2(value)
    }
    const onNameChangeHandler = (event)=> {
        let value = event.currentTarget.value
        setName(value)
    }
    const onEmailChangeHandler = (event)=> {
        let value = event.currentTarget.value
        setEmail(value)
    }
    const onPhoneChangeHandler = (event)=> {
        let value = event.currentTarget.value
        setPhone(value)
    }
    
    const onSubmitHandler = (event)=> {
        event.preventDefault();
        
        if (_Password !== _Password2) {
            alert ('비밀번호가 다릅니다.')
            return
        } 
        
        let body = {
            id:_Id,
            password:_Password,
            name:Name,
            email:Email,
            phone:Phone
        }

        dispatch(registerUser(body))
        .then(response=>{
            const payload = response.payload;
            if (payload.signUp) {
                alert('회원가입을 축하드립니다.')
                navigate('/')
            } else {
                alert('아이디 중복')
            }            
        })
    }

    return(
        <Container>
            <form method='POST' onSubmit={onSubmitHandler}>
                <ul>
                    <Cover name="id">
                        <input required type="text" value={_Id} name="id" placeholder="ID" onChange={onIdChangeHandler}/>
                    </Cover>
                    <Cover name="password">
                        <input required type="password" value={_Password} name="password" placeholder='Password' onChange={onPasswordChangeHandler} />
                    </Cover>
                    <Cover name="password2">
                        <input required type="password" value={_Password2} name="password2" placeholder='Password 확인' onChange={onPasswordChangeHandler2} />
                    </Cover>
                    <Cover name="phone">
                        <input required type="phone" value={Phone} name="phone" placeholder='Phone' onChange={onPhoneChangeHandler} />
                    </Cover>
                    <Cover name="name">
                        <input required type="text" value={Name} name="name" placeholder='Name' onChange={onNameChangeHandler} />
                    </Cover>
                    <Cover name="E-mail">
                        <input required type="email" value={Email} name="email" placeholder='E-mail' onChange={onEmailChangeHandler} />
                    </Cover>
                </ul>
                <p>
                    <input type="submit" value="회원가입"/>
                    <input type="reset" value="취소" />
                </p>
            </form>
        </Container>
    )
}

const Cover = (props) => {
    return (
        <li className={ props.name }>
            <label> { props.name } </label>
            { props.children }
        </li>
    )
}

export default Register