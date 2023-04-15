import { useState, useLayoutEffect } from "react";
import { auth } from "../../actions/user_action";
import List from './list'
import LoginList from "./loginList";
import { loginToken } from "../../actions/type";
import { menuSetting } from "../../actions/tool_action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwsome } from "./fontawsome";


function Header(props) {
    const cookie = document.cookie;
    const loginCookieName = loginToken;
    const [userInfo, setUserInfo] = useState({
        id: ''
    });
    const [isAuth, setIsAuth] = useState(false);
    const path = window.location.pathname.split('/');

    let x_token = '';
    if (cookie !== '') x_token = cookie.split(`${loginCookieName}=`);
    x_token = x_token[1];

    const [menu, setMenu] = useState([]);
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

        if(path[1].split('?')[0] !== 'download')
        setTimeout(() => {
            menuSetting().then((res) => {
                setMenu(res);
            })
        }, 100)

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
                        menu.map((el, index) => {
                            let info = {
                                key: index,
                                href: el.href,
                                text: el.name,
                            }
                            if (el.description !== "") info.description = el.description;
                            if (el.custom === "fontawsome") info.text = <FontAwsome data={el.custom_comment} />;
                            return (
                                <List {...info} />
                            )
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
        </header>
    )
}

export default Header