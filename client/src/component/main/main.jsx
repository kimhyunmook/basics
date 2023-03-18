import React,{useState,useLayoutEffect} from "react";
import { auth, loginUser } from "../../actions/user_action";
import Container from "../common/container";
import { useDispatch } from "react-redux";

function Main () {
    let text = window.location.href.split('?text=');
    if(text[1] !== undefined)
    text = decodeURI(text[1]);
    else
    text = ''; 

    const dispatch = useDispatch();

    useLayoutEffect(()=>{
       
    },[])
    
    return (
        <Container>
            <div className="myName">
               <AnimationText text={text} animation={"myName-right"} />
            </div>
        </Container>
    )
}

function AnimationText (props) {
    const text = props.text.split('');
  
    return (
        <>
            {
                text.map((el,index)=>{
                    let duration = (index+1.5) * .5;
                    const animationStyle = {
                        animation:`${props.animation} ${ duration }s ease`
                    }

                    return(
                        <div key={ el+index } className={ `${ el }` } style={ animationStyle } onMouseOver={(event)=>{event.preventDefault()}}>
                            { el }
                        </div>
                    )
                })
            }
        </>
    )
}

export default Main;