import { useState, useLayoutEffect } from "react";
import { auth } from "../../actions/user_action";
import List from './list'
import LoginList from "./loginList";
import configJson from '../../json/site_config.json'
import { loginToken } from "../../actions/type";
import { faFileExcel, faHouse, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Header() {
    let i;
    const cookie = document.cookie;
    const loginCookieName = loginToken;
    const [userInfo,setUserInfo] = useState({
        id:''
    });
    const [isAuth, setIsAuth] = useState(false)

    let x_token = '';
    if(cookie !== '') {
        x_token = cookie.split(`${loginCookieName}=`);
    }
    x_token = x_token[1];

    const menu = configJson.header;
    let menuList = [];
    /** FontawesomeIcon 사용시 여기 추가 */
    let iconList = [
        faHouse,
        faKeyboard,
        faFileExcel
    ]
    menu.map((el,index) => {
        let resultText;
        if(el.icon === "" || el.icon === undefined || el.icon === false) {
            resultText = el.name;
        } else {
            resultText = <FontAwesomeIcon icon={iconList[el.icon]} />;
        }

        if(!el.depth) {
            menuList.push(
                <List 
                    key={index} 
                    text={ resultText } 
                    href={ el.href } 
                    description={ el.description } 
                    auth = { el.auth }
                />
            )
        } else {
            menuList.push(
                <List 
                    key={ index } 
                    text={ resultText } 
                    herf={ el.href }
                    description={ el.description }
                    class_name={ el.menu_tpye } 
                    depth={ true } 
                    depth_content={ <BoardList/> }
                    auth={ el.auth }
                />
            )
        }
    });

    function BoardList() {
        let boardList = configJson.board.target;
        return(
            <ul>
                {
                    boardList.map((el, index)=>{
                        return(
                            <List 
                                key={ index } 
                                text={ el.name } 
                                href={ el.href } 
                                auth={ el.auth }
                            />
                        )
                    })
                }
            </ul>
        )
    }

    useLayoutEffect(()=>{
        if(x_token !== undefined) {
            auth({
                id: x_token,
                login_token: cookie
            }).payload
            .then(user => {
                setUserInfo(user)
                setIsAuth(user.isAuth)
            })
        }


        const description = document.querySelectorAll('.description');
        for(let i=0; i<description.length;i++) {
            const target = description[i].parentNode;
            target.addEventListener('mouseover',()=>{
                description[i].style='display:block';
            })
            target.addEventListener('mouseout',()=>{
                description[i].style='display:none';
            })
        }
    },[]);
    if(isAuth) {}
    console.log('isAuth',isAuth);

    return (
        <header>
            <nav className="top-nav">
                <LoginList loginCookieName={ loginCookieName } token={ x_token } userInfo={ userInfo } />
            </nav>

            <nav className="left-nav">
                <div className="menu">
                    <div className="menu-icon"></div>
                    <ul className="menu-depth1">
                        <li>
                        </li>
                    </ul>
                </div>
                <ul className="main-menu">
                    {
                        menuList.map((el) => {
                            return(el)
                        })
                    }
                </ul>
            </nav>
            
            <nav className="right-nav">

            </nav>
        </header>
    )
}

export default Header