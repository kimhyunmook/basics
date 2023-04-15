import React,{ useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom"
import Container from "../common/container";
import { useDispatch } from "react-redux";
import { menuConfig, menuHandler } from '../../json/config';

function Main () {
    const Menu = (props) => {
        return (
            <ul className="menu">
                {
                    menuConfig().map((el,index)=>{
                        return (
                            <li className={`main-menuList`} key={ el.name+index }>
                                <Link to={ el.href }>
                                    { el.fontAwesome }
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    useLayoutEffect(()=>{
        menuHandler(false);
    },[])

    let ContainerStyle = {
        width:'100%',
        marginLeft:0
    }
    
    return (
        <Container style={ContainerStyle}>
            <Menu></Menu>
            <div className="myName">
               {/* <AnimationText text={text} animation={"myName-right"} /> */}
            </div>
        </Container>
    )
}


export default Main;