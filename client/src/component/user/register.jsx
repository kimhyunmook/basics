import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Container from '../common/container';
import { RegisterUi, Li, Gender } from './ui/userUi';
import { FontAwsome } from '../common/fontawsome';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();

    // state
    const [_Id, setId] = useState("");
    const [_Password, setPassword] = useState("");
    const [_Password2, setPassword2] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const form = document.forms[0];
    // change handler
    const onIdChangeHandler = (event) => {
        let value = event.currentTarget.value
        setId(value)
    }
    const onPasswordChangeHandler = (event) => {
        let value = event.currentTarget.value
        setPassword(value)
    }
    const onPasswordChangeHandler2 = (event) => {
        let value = event.currentTarget.value
        setPassword2(value)
    }
    const onNameChangeHandler = (event) => {
        let value = event.currentTarget.value
        setName(value)
    }
    const onEmailChangeHandler = (event) => {
        let value = event.currentTarget.value
        setEmail(value)
    }
    const onPhoneChangeHandler = (event) => {
        let value = event.currentTarget.value
        setPhone(value)
    }

    const onGenderChangehandler = (event) => {
        let value = event.currentTarget.value;
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (_Password !== _Password2) {
            alert('비밀번호가 다릅니다.')
            return
        }

        // 순성 중요
        let body = {
            id: _Id,
            password: _Password,
            name: Name,
            email: Email,
            phone: Phone,
            gender: form.gender.value,
        }

        axios.post('/api/users/signup', body)
            .then(res => {
                if (res.data.signUp) navigate('/')
            })
    }

    return (
        <Container>
            <RegisterUi name="회원가입" submit={onSubmitHandler} submitBtn="회원가입">
                <Li name="id">
                    <input required type="text" value={_Id} name="id" placeholder="ID" onChange={onIdChangeHandler} />
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
                        <FontAwsome data={"fa-person"} />
                    </Gender>
                    <Gender value="여자" gender="girl" change={onGenderChangehandler}>
                        <FontAwsome data={"fa-person-dress"} />
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
        <li className={props.name}>
            <label>
                <span>
                    {props.name}
                </span>
            </label>
            <div className='insert-box'>
                {props.children}
            </div>
        </li>
    )
}

export default Register