function Container (props) {
    const height = window.innerHeight;

    const contaionerStyle = {
    }
    return(
        <div className="container" style={ contaionerStyle }>
            { props.children }
        </div>
    )
}

export default Container;