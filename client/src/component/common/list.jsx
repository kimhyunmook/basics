import { Link } from "react-router-dom"
import { useState } from "react";
import configJson from '../../json/site_config.json'
import Description from "./description";
import { MemberConfirm } from "../../actions/tool_action";
// import { polish } from '../../actions/effect';

function List({ text, href, class_name, depth, depth_content, description, auth }) {
    let targetHref;

    if (href === undefined) targetHref = '#';
    else targetHref = href;

    const [dis, setDis] = useState('disNo');
    const disYes = (event) => {
        event.preventDefault();
        setDis('disYes');
    }
    const disNo = (event) => {
        event.preventDefault();
        setDis('disNo');
    }
    const depthClick = (event) => {
        event.preventDefault();
        let checkClass = event.target.nextSibling.classList[1];
        if (checkClass === "disYes") {
            setDis('disNo')
        }
        else if (checkClass === "disNo") {
            setDis('disYes')
        }
    }

    function Depth() {
        return (
            <div className={`depth1 ${dis}`}>
                { depth_content }
            </div>
        )
    }

    return (
        <li
            className={class_name}
            onMouseEnter={disYes}
            onMouseLeave={disNo}
        >
            <Link
                to={targetHref}
                onClick={depth === true ? depthClick : null}
            >{text}</Link>
            {depth === true ? <Depth /> : null}
            {description !== undefined ?
                description !== "" ? <Description description={description} /> : null
                : null}
        </li>
    )
}

export default List
