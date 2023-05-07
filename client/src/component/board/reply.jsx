import { FontAwsome } from "../common/fontawsome"

function Reply ({id, text, textEvent, click}) {
    return(
        <div className="reply-insert">
            <p className="userId">
                { id }
            </p>
            <textarea name="content" value={text} cols="50" rows="5" onChange={textEvent}></textarea>
            <button className='reply-button' onClick={ click }>
                <FontAwsome data={"fa-pen-nib"} />
            </button>
        </div>
    )
}

export default Reply