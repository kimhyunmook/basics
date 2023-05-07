import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom"
import Container from "../common/container";
import { admDelete, needDownLoad } from "../../actions/adm_action";
import { menuSetting } from "../../actions/tool_action";
import { FontAwsome } from "../common/fontawsome";
import { useSelector } from "react-redux";

function Main() {
    const [menu, setMenu] = useState([]);
    const reducer = useSelector(state => state);
    console.log(reducer);

    useLayoutEffect(() => {
        let body = {}

        needDownLoad(body).payload
            .then(res => {
                if (!res.Download) window.location.href = '/download?task=0';
                else {
                    setTimeout(() => {
                        menuSetting().then(res => {
                            setMenu(res)
                        })
                    }, 100);
                }
            });
    }, [])

    const Menu = (props) => {
        return (
            <ul className="menu">
                {
                    menu.map((el, index) => {
                        let content;
                        if (el.custom === "fontawsome")
                            content = <FontAwsome data={el.custom_comment} />
                        else
                            content = el.name

                        return (
                            <li className="main-menuList" key={index}>
                                <Link to={el.href}>
                                    <span>
                                        {content}
                                    </span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }


    let ContainerStyle = {
        width: '100%',
        marginLeft: 0
    }

    function resetHomaPage() {
        let body = { url: 'delete', target: 'reset' }
        admDelete(body).payload.then(res => {
            if (res.delete === 'success') window.location.href = '/download?task=0'
        })
    }

    return (
        <Container style={ContainerStyle}>
            <Menu></Menu>

            <div className="btnArea">
                <button className="button" onClick={resetHomaPage}>초기화</button>
            </div>

        </Container>
    )
}


export default Main;