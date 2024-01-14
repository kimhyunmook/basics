import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { getSetting } from "../../store/settingSlice";

const headerH = 90;
const footerH = 125;

/**
 * Name, onClick, ternaryOperator 설정 가능
 * @recent_update 삼항연산 조건 추가 (ternaryOperator)
 * @param {*} info Object ex >> { Name:string, Click:function, ternaryOperator:{ Object } } 
 * @param {info}ternaryOperator ex >> { condition: a===b, reversResult: null }
 * @returns button
 */
export function BtnArea({ info, className }) {
    const isarr = Array.isArray(info);
    var classN = `button`;

    if (className !== undefined)
        classN = `button ${className}`;

    return (
        <div className="btnArea">
            {
                isarr ?
                    info.map((el, index) => {
                        function Btn(i) {
                            return (
                                <button
                                    // key={'btn_' + i}
                                    className={classN}
                                    onClick={
                                        el.Click === undefined ?
                                            null : el.Click
                                    }>{el.Name}</button>
                            )
                        }
                        return (
                            <>
                                {
                                    el.ternaryOperator !== undefined ?
                                        el.ternaryOperator.condition ?
                                            <Btn key={'btn__' + index} /> : el.ternaryOperator.reverseResult
                                        : <Btn key={'btn__' + index} />
                                }
                            </>
                        )
                    }) :
                    <button
                        className={classN}
                        onClick={info.Click}
                    >{info.Name}</button>
            }
        </div>
    )
}

/**
 * Container 
 * @recent_update  skeleton update loading_time = 1500
 * @param {*} info  Object { className:<String>undefined, onePage:<Boolean>false, style:<Object>{} }
 * @param {info} children Document childrenNode
 * @param {info} onePage boolean false
 * @param {*} loading_time default 1500
 * @returns Container
 */

export function Container2({ info = { style: {}, onePage: false }, children, loading_time=500 }) {
    let clan = 'container2';
    const reducer = useSelector(state => state);
    const dispatch = useDispatch();
    const [w, setW] = useState(window?.offsetWidth);
    const [h, setH] = useState(window?.innerHeight);
    const [f_h, setF_h] = useState('');
    const [loading, setLoading] = useState(null);

    //reset
    useEffect(() => {
        const footer = document.querySelector('footer');
        setH(window.outerHeight)
        setF_h(footer?.offsetHeight);

        window.addEventListener('resize', () => {
            setH(window?.innerHeight - f_h)
            setW(window?.offsetWidth)
        })
    }, [h, w, f_h])

    useEffect(()=>{
        // let body = {
        //     headerHeight: h,
        // }
        // dispatch(getSetting(body))
        setTimeout(()=>{
            setLoading(children)
        },loading_time)
    },[])

    if (info.className !== undefined)
        clan = `container2 ${info.className}`;


    if (info.onePage) {
        info.style = {}
        info.style.width = w;
        info.style.height = h - f_h + 'px';
    }

    return (
        <div className={clan} style={info.style}>
            {/* {loading || <LoadingPage />} */}
            {/* {loading || <Skeleton />} */}
            {children}
        </div>
    )
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export function LoadingPage ({style, children}) {
    style = {
        paddingTop: headerH,
        height:window.innerHeight-footerH,

    }
    return (
        <div style={style}>
            <Skeleton/>
            {children}
        </div>
    )
}

/**
 * Modal 
 * @param {*} type 
 * @param title subject
 * @param display boolean type modal is display
 * @param {Object} button  Object ex>> { Display:true, Name: String, Click: function }
 * @param className classname "on" <- display:block; Default display:none;
 * @returns Modal
 */
export function Modal({ display = false, title, className, children, button = { Display: true, Name: '닫기' } }) {
    let clan = "modal";
    const bg = useRef(null);
    let info = { Name: button.Name, Click: button.Click !== undefined ? button.Click : close }
    if (className !== undefined) clan = `modal ${className}`;
    if (button.Display === undefined) button.Display = true;
    if (Array.isArray(button)) {
        info = button
    }


    useEffect(() => {
        if (display) bg.current.classList.add('on');
        else bg.current.classList.remove('on');
    }, [display])
    function close() {
        bg.current.classList.remove('on');
    }
    return (
        <div ref={bg} className="modal-background">
            <div className={clan}>
                <h2>{title}</h2>
                {children}
                {
                    button.Display ?
                        <BtnArea info={info} /> :
                        null
                }
            </div>
        </div>
    )
}