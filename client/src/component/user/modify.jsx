import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, edit } from '../../actions/user_action';
import Container from '../common/container';

function UserEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // state
    const [_Id,setId] = useState("");
    const [_Password,setPassword] = useState("");
    const [_Password2,setPassword2] = useState("");
    const [Name,setName] = useState("");
    const [Email,setEmail] = useState("");
    const [Phone,setPhone] = useState("");
    const [file,setFile] =useState("");
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
          console.log(file)
          setFile(file)
        })
    }, []);

    const {getRootProps,getInputProps}= useDropzone({onDrop});

    useEffect(()=>{
       
        auth().payload
        .then(res=>{
            setId(res.id)
            setName(res.name)
            setPhone(res.phone)
            setEmail(res.email)
        })
    },[])

    // function
    const onPasswordChangeHandler = (event)=> {
        let value = event.currentTarget.value
        setPassword(value)
    }
    const onPasswordChangeHandler2 = (event)=> {
        let value = event.currentTarget.value
        setPassword2(value)
    }
    const onEmailChangeHandler = (event)=> {
        let value = event.currentTarget.value
        setEmail(value)
    }
    const onPhoneChangeHandler = (event)=> {
        let value = event.currentTarget.value
        setPhone(value)
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (_Password === "") {
            alert('비밀번호를 입력해주세요');
            return
        }
        if (_Password2 === "") {
            alert('비밀번호를 확인 해주세요');
            return
        }
        if(_Password !== _Password2) {
            alert('비밀번호가 서로 다릅니다.')
            return;
        }
        let body = new FormData();
        body.append('id',_Id)
        body.append('password',_Password)
        body.append('name',Name)
        body.append('email',Email)
        body.append('phone',Phone)
        body.append('img',file) 
        // let body = { 
        //     id:_Id,
        //     password:_Password,
        //     name:Name,
        //     email:Email,
        //     phone:Phone
        // }
        dispatch(edit(body))
        .then(res => {
            let edit_res = res.payload
            if(edit_res.edit)
            alert('수정되었습니다.')
            navigate('/myPage')
        })
       
    }
   
    return(
        <Container>
            <form method='POST' onSubmit={ onSubmitHandler }>
                <ul>
                    <li {...getRootProps()}>
                        <input {...getInputProps()} />
                        <label htmlFor="">여기</label>
                    </li>
                    <Input type='text' value={_Id} name='id' placeholder='ID'  disabled={true}/>
                    <Input type='password' value={_Password} name='password' placeholder='Password' fnc={onPasswordChangeHandler} />
                    <Input type='password' value={_Password2} name='password_2' placeholder='Password' fnc={onPasswordChangeHandler2} />
                    <Input type='text' value={Name} name='name' placeholder='Name' disabled={true} />
                    <Input type='text' value={Phone} name='phone' placeholder='Phone' fnc={onPhoneChangeHandler} />
                    <Input type='text' value={Email} name='email' placeholder='E-mail' fnc={onEmailChangeHandler} />
                </ul>
                <div className="btnArea">
                    <input className='button'  type="submit" value="수정"/>
                    <input className='button' type="reset" value="취소" />
                </div>
            </form>
        </Container>
    )
}

function Input ({ type, value, name, placeholder, disabled, fnc }) {
    return(
        <li>
            <label htmlFor={name}>{name}</label>
            {
                disabled === true 
                ? <input type={type} defaultValue={value} name={name} placeholder={placeholder} disabled />
                : <input type={type} defaultValue={value} name={name} placeholder={placeholder} onChange={fnc} />
            }
        </li>
    )
}

export default UserEdit