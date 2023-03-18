import { PenIcon } from "../common/fontawsome"

function Reply ({text, textEvent, click}) {
    return(
        <div className="reply-insert">
            <textarea name="content" value={text} cols="50" rows="5" onChange={textEvent}></textarea>
            <button className='reply-button' onClick={ click }>
                <PenIcon />
            </button>
        </div>
    )
}

export default Reply