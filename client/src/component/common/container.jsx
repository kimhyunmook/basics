import { useLayoutEffect, useState } from "react";
import { menuHandler } from "../../json/config";
import { basicSetting } from "../../actions/adm_action";

function Container(props) {
    const [h1, setH1] = useState("")
    const path = window.location.pathname.split('/');
    path.shift();
    let compare = path[path.length - 1];


    useLayoutEffect(() => {
        menuHandler();
        if (compare !== 'download' && compare !== '') {
            // console.log('compare :',compare)
            basicSetting({
                url: 'menu'
            }).payload.then(res => {
                setH1("")
                res.menu.map((el) => {
                    // console.log(el.href.split('/'));
                })
            });
        }
    }, [path[0]])

    return (
        <div className={`container ${props.className}`} style={props.style}>
            {props.h1 === "none" ? null : <h1>{props.h1}</h1>}
            {props.children}
        </div>
    )
}

export default Container;