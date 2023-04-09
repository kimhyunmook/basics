import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../actions/user_action';
import Container from '../common/container';
import { RegisterUi, Li, Gender } from './ui/userUi';
import { Man, Girl } from '../common/fontawsome';

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
    const form = document.forms[0];
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

    const onGenderChangehandler = (event) => {
        let value= event.currentTarget.value;
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
            gender:form.gender.value,
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
                form.id.focus();
            }            
        })
    }

    return(
        <Container>
            <RegisterUi name="회원가입" submit={onSubmitHandler} submitBtn="회원가입">
                <Li name="id">
                    <input required type="text" value={_Id} name="id" placeholder="ID" onChange={onIdChangeHandler}/>
                </Li>
                <Li name="password">
                    <input required type="password" value={_Password} name="password" placeholder='Password' onChange={onPasswordChangeHandler} />
                </Li>
                <Li name="password2">
                    <input required type="password" value={_Password2} name="password2" placeholder='Password 확인' onChange={onPasswordChangeHandler2} />
                </Li>
                <Li name="phone">
                    <input required type="phone" value={Phone} name="phone" placeholder='Phone' onChange={onPhoneChangeHandler} />
                </Li>
                <Li name="name">
                    <input required type="text" value={Name} name="name" placeholder='Name' onChange={onNameChangeHandler} />
                </Li>
                <Li name="gender">
                    <Gender checked value="남자" gender="man" change={onGenderChangehandler}>
                        <Man />
                    </Gender>
                    <Gender value="여자" gender="girl" change={onGenderChangehandler}>
                        <Girl />
                    </Gender>
                </Li>
                <Li name="E-mail">
                    <input required type="email" value={Email} name="email" placeholder='E-mail' onChange={onEmailChangeHandler} />
                </Li>
            </RegisterUi>
        </Container>
    )
}

const Cover = (props) => {
    return (
        <li className={ props.name }>
            <label>
                <span>
                    { props.name } 
                </span> 
            </label>
            <div className='insert-box'>
                { props.children }
            </div>
        </li>
    )
}

export default Register