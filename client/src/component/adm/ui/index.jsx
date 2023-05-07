import { useState } from "react"

/**
 * style : li -> style
 * @param type input, select, normal
 * @returns input {className, label_id, label_text, input_type, value, placeholder, onChange}
 * @returns select {className, style, label_id, label_text, select_name, value, onChange, children}
 */
export function Overlap(props) {
    if (props.type === 'input') return (
        <li className={props.className} style={props.style}>
            <label htmlFor={props.label_id}>
                {props.label_text}
            </label>
            <input type={props.input_type} value={props.value} id={props.label_id} placeholder={props.placeholder} onChange={props.onChange} />
        </li>
    )
    else if (props.type === 'select') return (
        <li className={props.className} style={props.style}>
            <label htmlFor={props.label_id}>
                {props.label_text}
            </label>
            <select name={props.select_name} id={props.label_id} value={props.value} onChange={props.onChange}>
                {props.children}
            </select>
            <p style={{ marginLeft: '2%' }}>
                {props.icon}
            </p>
        </li>
    )
    else if (props.type === 'input2') return (
        <li className={props.className} style={props.style}>
            <label htmlFor={props.label_id}>
                <input type="text" defaultValue={props.label_text} onChange={props.onChange1} />
            </label>
            <input type={props.input_type} defaultValue={props.value} id={props.label_id} onChange={props.onChange2} />
        </li>
    )
    else return (
        <li className="adm-list" style={props.style}>
            <a href="#" className="adm-list-name" ref={props.ref} onClick={props.onClick}>
                {props.title}
            </a>
            <div className="adm-list-content">
                <form action="" id={`add-${props.id}`} onSubmit={props.onSubmit}>
                    <ul className="">
                        {props.children}
                    </ul>
                    <div className="btnArea">
                        <button className="button" type="submit">
                            {props.button_text === undefined ? '생성' : props.button_text}
                        </button>
                    </div>
                </form>
            </div>
        </li>
    )
}

export function  Overlap_Board (body) {
    
    // return()
} 