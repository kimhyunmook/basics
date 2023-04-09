import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom"
import Container from "../common/container";
import { useDispatch } from "react-redux";
import { menuConfig, menuHandler } from '../../json/config';
import axios from "axios";
import { needDownLoad } from "../../actions/adm_action";

function Main() {
    const menu = menuConfig(true)
    const Menu = (props) => {
        return (
            <ul className="menu">
                {
                    menu.map((el, index) => {
                        return (
                            <li className={`main-menuList`} key={el.name + index}>
                                <Link to={el.href}>
                                    <span>
                                        {el.fontAwesome}
                                        <p>
                                            {el.name}
                                        </p>
                                    </span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    useLayoutEffect(() => {
        menuHandler(false);
        let body = {}
        needDownLoad(body).payload
            .then(res => {
                if (!res.Download) {
                    window.location.href = '/download?task=0';
                }
            })
    }, [])

    let ContainerStyle = {
        width: '100%',
        marginLeft: 0
    }

    return (
        <Container style={ContainerStyle}>
            <Menu></Menu>

        </Container>
    )
}


export default Main;