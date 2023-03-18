import { useState, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { listBoard } from '../../actions/board_action';
import { auth } from '../../actions/user_action';
import { board_target } from '../../json/config';
import configJson from '../../json/site_config.json'
import Container from '../common/container';
import { LeftIcon, RightIcon, WriteIcon } from '../common/fontawsome';

function Board ({className}) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [userInfo,setUserInfo] = useState('');
    const [list,setList] = useState([]);
    const [pageNum,setPageNum] = useState([]);
    const [nextPage,setNextPage] = useState('');
    const [previousPage,setPreviousPage] = useState('');
    const path = window.location.pathname.split('/');

    const moveWrite = (event) => {
        event.preventDefault();
        let url;
        switch (board_target()) {
            case "gallery" : url = `/board/gallery/${ path[2] }/write`;
            break;
            default : url =`/board/${ path[2] }/write`;
            break;
        }
        navigate(url)
    }

    useLayoutEffect(()=>{
        let type = listBoard({},{
            type:board_target(),
            name:path[2],
            page:path[3]
        });
        dispatch(type)
        .then(res=>{
            setList(res.payload.array);
            setPageNum(res.payload.page);
            if(path[3] == res.payload.page.length) 
            setNextPage(`/board/${ path[2] }/${ Number(path[3]) }`);
            else
            setNextPage(`/board/${ path[2] }/${ Number(path[3])+1 }`);
        });
        if(path[3] == 1) 
        setPreviousPage(`/board/${ path[2] }/${ Number(path[3]) }`);
        else 
        setPreviousPage(`/board/${ path[2] }/${ Number(path[3])-1 }`);

        auth({}).payload.then(res=>{
            if(res.isAuth !== false) {
                setUserInfo(res);
            }
        });
    },[path[2], path[3]]);


    const Normal = () => {
        return(
            <>
                {
                    list.map(el=>{
                        return(
                            <Board_Normal 
                                key={ el.w_id } 
                                num={ el.w_num } 
                                subject={ el.subject } 
                                user={ el.user_id } 
                                time={ el.w_time }  
                            />
                        )
                    })
                }
            </>
        )
    }

    const Gallery = () => {
        return(
            <>
                {
                    list.map(el=>{
                        return(
                            <Board_Gallery 
                                key={ el.w_id } 
                                num={ el.w_num } 
                                subject={ el.subject } 
                                user={ el.user_id } 
                                time={ el.w_time } 
                                img={`http://localhost:3005/uploads/${el.img}`} 
                            />
                        )
                    })
                }
            </>
        )
    }

    let boardClass = `board-type-${board_target()}`

    return(
        <Container>
            <div className={`board ${boardClass}`}>
                <table className={ className }>
                    <tbody>
                        <tr className="tag_name">
                            {
                                configJson.board.tag.map((el)=>{
                                    return(
                                        <th key={ el.class } className={ el.class }> 
                                            { el.name }
                                        </th>
                                    )
                                })
                            }
                        </tr>
                        {   
                            configJson.board.target.map(el=>{
                                if(path[2] === el.name) {
                                    if(el.type.division_type === 'gallery') {
                                        return(
                                            <Gallery key={el} />
                                        )
                                    } else {
                                        return(
                                            <Normal key={el} />
                                        )
                                    }
                                }
                            })
                        }
                        
                        
                    </tbody>
                </table>
                <div className="board-nav">
                    {
                        path[path.length-1] !== "1" ? 
                        <Link className="left" to={ previousPage }>
                            <LeftIcon />
                        </Link> : null
                    }
                    
                    <div className="numbers">
                        {
                            pageNum.map((el,index)=>{
                                let style
                                if(path[3] == index + 1) {
                                    style= {
                                        color:'orange',
                                        fontWeight:700
                                    }
                                } 
                                return (
                                    <Link key={ `page-nation-${ el }` } to={ `/board/${ path[2] }/${ el }` } style={ style }> { el } </Link>
                                )
                            })
                        }
                    </div>
                    {
                        path[path.length-1] !== String(pageNum.length) ?
                        <Link className="right" to={ nextPage }>
                            <RightIcon />
                        </Link>
                        : null
                    }
                </div>
                <div className='btnArea'>
                    {
                        userInfo.isAuth === true 
                        ? <button className='button' onClick={ moveWrite }>
                            <WriteIcon />
                        </button>
                        : null
                    }
                </div>
            </div>
        </Container>
    )
}

function Board_Normal({ className,num,subject,user,time }) {
    const path = window.location.pathname.split('/');

    return(
        <tr className={ className }>
            <td className='num'>
                <Link to={`/board/${ path[2] }/contents/${ num }`}>{ num }</Link>
            </td>
            <td className='subject'>
                <Link to={`/board/${ path[2] }/contents/${ num }`}>{ subject }</Link>
            </td>
            <td className='user'>{ user }</td>
            <td className='time'>{ time }</td>
        </tr>
    )
}

function Board_Gallery (props) {
    const path = window.location.pathname.split('/');

    return (
        <tr className={ props.className }>
            <td className='num'>
                <Link to={`/board/${ path[2] }/contents/${ props.num }`}>{ props.num }</Link>
            </td>
            <td className="img">
                <img src={`${props.img}`} alt="img" />
            </td>
            <td className='subject'>
                <Link to={`/board/${ path[2] }/contents/${ props.num }`}>{ props.subject }</Link>
            </td>
            <td className='user'>{ props.user }</td>
            <td className='time'>{ props.time }</td>
        </tr>
    )
}
export default Board