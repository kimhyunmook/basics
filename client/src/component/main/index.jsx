import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom"
import Container from "../common/container";
import { admDelete, basicSetting, needDownLoad } from "../../actions/adm_action";
import { menuSetting } from "../../actions/tool_action";
import { ListIcon, BoardIcon, AdminIcon } from "../common/fontawsome";

function Main() {
    const [menu, setMenu] = useState([]);

    useLayoutEffect(() => {
        let body = {}
        needDownLoad(body).payload
            .then(res => {
                if (!res.Download) window.location.href = '/download?task=0';
                else  {
                    setTimeout(()=>{
                        menuSetting().then(res => {
                            setMenu(res)
                        })
                    },100);
                }
            });
    }, [])

    const Menu = (props) => {
        return (
            <ul className="menu">
                {
                    menu.map((el, index) => {
                        let content;
                        let child = props.children;
                        if (child === undefined || !Array.isArray(child)) content = el.name
                        else if (Array.isArray(child)) content = child[index]
                        else content = el.name
                        return (
                            <li className="main-menuList" key={index}>
                                <Link to={el.href}>
                                    <span key={index}>
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
            if(res.delete === 'success') window.location.href = '/download?task=0'
        })
    }

    return (
        <Container style={ContainerStyle}>
            <Menu>
                {
                    Array(<BoardIcon key={"icon"} />, <AdminIcon key={"icon"} />, 3, 4)
                }
            </Menu>

            <div className="btnArea">
                <button className="button" onClick={resetHomaPage}>초기화</button>
            </div>

        </Container>
    )
}


export default Main;