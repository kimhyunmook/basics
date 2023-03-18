function Container (props) {
    const height = window.innerHeight;

    const contaionerStyle = {
        height:`100vh`
    }
    return(
        <div className="container" style={ contaionerStyle }>
            { props.children }
        </div>
    )
}

export default Container;