import { useLayoutEffect } from "react";
import { menuHandler } from "../../json/config";

function Container (props) {
    const height = window.innerHeight;
    useLayoutEffect(()=>{
        menuHandler();
    },[])
    return(
        <div className={`container ${props.className}`} style={ props.style }>
            { props.children }
        </div>
    )
}

export default Container;