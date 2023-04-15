export function OverlapLi(props) {
    if (props.type === 'input') return (
        <li className="">
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
        </li>
    )
    else return (
        <li className="adm-list">
            <a href="#" className="adm-list-name" ref={props.ref} onClick={props.onClick}>
                {props.title}
            </a>
            <div className="adm-list-content">
                <form action="" id={`add-${props.id}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <div className="btnArea">
                        <button className="button" type="submit">
                            {props.button_text}
                        </button>
                    </div>
                </form>
            </div>
        </li>
    )
}