import { useState, useLayoutEffect, useEffect } from "react";
import List from './list'
import LoginList from "./loginList";
import { loginToken } from "../../actions/type";
import { menuSetting } from "../../actions/tool_action";
import { FontAwsome } from "./fontawsome";
import { useDispatch, useSelector } from "react-redux";
// import { info, getUser } from "../../store/userSlice";


function Header(props) {
    const cookie = document.cookie;
    const loginCookieName = loginToken;
    const [userInfo, setUserInfo] = useState({});
    const path = window.location.pathname.split('/');
    const dispatch = useDispatch();
    const reducer = useSelector((state) => state);

    // console.log(reducer)


    useEffect(() => {
        setUserInfo(reducer.userInfo.user);
    }, [reducer])

    let x_token = '';
    if (cookie !== '') x_token = cookie.split(`${loginCookieName}=`);
    x_token = x_token[1];

    const [menu, setMenu] = useState([]);

    useLayoutEffect(() => {
        if (x_token !== undefined) {
            let body = {
                id: x_token,
                login_token: cookie
            }
            // dispatch(getUser(body))
        }

        if (path[1].split('?')[0] !== 'download')
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

                            if (el.menu_type === 'board') info.href = el.href + '/1'
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