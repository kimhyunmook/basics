import { useState, useLayoutEffect } from "react";
import { auth } from "../../actions/user_action";
import List from './list'
import LoginList from "./loginList";
import configJson from '../../json/site_config.json'
import { loginToken } from "../../actions/type";
import { menuConfig } from "../../json/config";


function Header(props) {
    const cookie = document.cookie;
    const loginCookieName = loginToken;
    const [userInfo, setUserInfo] = useState({
        id: ''
    });
    const [isAuth, setIsAuth] = useState(false)

    let x_token = '';
    if (cookie !== '') {
        x_token = cookie.split(`${loginCookieName}=`);
    }
    x_token = x_token[1];

    const menu = menuConfig(false)
    let menuList = [];

    menu.map((el, index) => {
        let info;
        if (!el.depth) {
            info = {
                key: index,
                text: el.fontAwesome,
                href: el.href,
                description: el.description,
                auth:el.auth
            }
            menuList.push(
                <List {...info} />
            )
        } else {
            info = {
                key: index,
                text: el.fontAwesome,
                href: el.href,
                class_name:el.menu_type,
                depth:true,
                depth_content:<BoardList/>,
                auth:el.auth
            }
            menuList.push(
                <List {...info} />
            )
        }
    });

    function BoardList() {
        let boardList = configJson.board.target;
        return (
            <ul>
                {
                    boardList.map((el, index) => {
                        let info= {
                            key: index,
                            text: el.name,
                            href: el.href,
                            auth: el.auth
                        }
                        return (
                            <List {...info} />
                        )
                    })
                }
            </ul>
        )
    }



    useLayoutEffect(() => {
        if (x_token !== undefined) {
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
        for (let i = 0; i < description.length; i++) {
            const target = description[i].parentNode;
            target.addEventListener('mouseover', () => {
                description[i].style = 'display:block';
            })
            target.addEventListener('mouseout', () => {
                description[i].style = 'display:none';
            })
        }
    }, []);
    if (isAuth) { }


    return (
        <header id="header" >
            <div className="logo">
                <a href="/">
                    ❓
                </a>
            </div>

            <nav className="menu-nav">
                <ul className="main-menu">
                    {
                        menuList.map((el) => {
                            return (el)
                        })
                    }
                </ul>
            </nav>
            <nav className="top-nav">
                <LoginList
                    loginCookieName={loginCookieName}
                    token={x_token}
                    userInfo={userInfo}
                />
            </nav>
            <nav className="right-nav">

            </nav>
        </header>
    )
}

export default Header