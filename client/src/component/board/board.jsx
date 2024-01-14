import { useState, useLayoutEffect, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import configJson from '../../json/site_config.json'
import { Container2 } from '../common/commonUi';
import { FontAwsome } from '../common/fontawsome';
import { _GetList } from '../../store/boardSlice';
import util from '../../util';
import { BtnArea } from '../common/commonUi';

function Board({ className }) {
    const reducer = useSelector(state => state);
    const boardInfo = reducer.boardInfo;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const [pageNum, setPageNum] = useState([]);
    const [nextPage, setNextPage] = useState('');
    const [nextTenPage, setNextTenPage] = useState('');
    const [previousPage, setPreviousPage] = useState('');
    const [previousTenPage, setPreviousTenPage] = useState('');
    const path = util.path();
    let body;
    const moveWrite = (event) => {
        event.preventDefault();
        let url;
        switch ('') {
            case "gallery": url = `/board/gallery/${path[2]}/write`;
                break;
            default: url = `/board/${path[2]}/write`;
                break;
        }
        navigate(url)
    }
    useEffect(() => {
        setList(boardInfo.data)
        setPageNum(boardInfo.pageNavi);
    }, [boardInfo.data, boardInfo.pageNavi, reducer])


    useLayoutEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        body = { url: `/${path[2]}/${path[3]}` }
        dispatch(_GetList(body));
        setList(boardInfo.data)
        setPageNum(boardInfo.pageNavi);

        if (path[3] === boardInfo.pageNavi)
            setNextPage(`/board/${path[2]}/${Number(path[3])}`);
        else
            setNextPage(`/board/${path[2]}/${Number(path[3]) + 1}`);
        if (path[3] === 1)
            setPreviousPage(`/board/${path[2]}/${Number(path[3])}`);
        else
            setPreviousPage(`/board/${path[2]}/${Number(path[3]) - 1}`);
    }, [path[2], path[3]]);

    const Normal = () => {
        if (list !== undefined)
            return (
                <>
                    {
                        list.map(el => {
                            return (
                                // eslint-disable-next-line react/jsx-pascal-case
                                <Board_Normal
                                    key={el.w_id}
                                    num={el.w_num}
                                    subject={el.subject}
                                    user={el.user_id}
                                    hit={el.hit}
                                    replyCount={el.reply_count}
                                    time={el.d_time}
                                />
                            )
                        })
                    }
                </>
            )
    }
    console.log(list)
    let boardClass = `board-type-${path[1]}`

    return (
        <Container2 info={{ className: "container-normal" }}>
            <h2>
                {
                    reducer.menuInfo.data.map(el => {
                        let href = el.href;
                        href = href.split('/')[2];
                        if (href === path[2]) {
                            return el.name
                        }
                    })
                }
            </h2>
            <div className={`board ${boardClass}`}>
                <ul className={className}>
                    <li className="tag_name">
                        <Link to="#">
                            😉 글을 작성해주세요
                        </Link>
                    </li>
                    {
                        list.length === 0 ?
                            // eslint-disable-next-line react/jsx-pascal-case
                            < Board_Normal
                                key={""}
                                num="0"
                                subject={"글을 작성해주세요~"}
                                user={"admin"}
                                hit={"0"}
                                replyCount={0}
                                time={"00.00 00:00"}
                            />
                            : <Normal />
                    }

                </ul>

                <div className="board-bottom">
                    <div className="board-nav">
                        {
                            path[path.length - 1] !== "1" ?
                                <Link className="left" to={previousPage}>
                                    <FontAwsome data={"fa-angle-left"} />
                                </Link> : null
                        }

                        <div className="numbers">
                            {
                                pageNum.map((el, index) => {
                                    let style;
                                    if (path[3] === String(index + 1)) {
                                        style = {
                                            color: 'orange',
                                            fontWeight: 700
                                        }
                                    }
                                    return (
                                        <Link key={`page-nation-${el}`} to={`/board/${path[2]}/${el}`} style={style}> {el} </Link>
                                    )
                                })
                            }
                        </div>
                        {
                            path[path.length - 1] !== String(pageNum.length) ?
                                <Link className="right" to={nextPage}>
                                    <FontAwsome data={"fa-angle-right"} />
                                </Link>
                                : null
                        }
                    </div>
                    {
                        reducer.userInfo.login === true
                            ? <BtnArea info={{ Name: <FontAwsome data={"fa-pen"} />, Click: moveWrite }} />
                            : null
                    }
                </div>
            </div>
        </Container2>
    )
}

function Board_Normal({ className, num, subject, user, hit, time, replyCount }) {
    const path = util.path();

    let link = `/board/${path[2]}/contents/${num}`;
    if (subject !== undefined)
        if (subject.length > 40)
            subject = subject.substr(0, 50) + '......';
    return (
        <li className={className}>
            <Link className='num' to={link}>
                <p>
                    {num}
                </p>
            </Link>
            <Link className='subject' to={link}>
                <p>
                    {subject}
                    <span className='reply_count'>
                        {`[${replyCount}]`}
                    </span>
                </p>
                <p className='time'>
                    {time}
                </p>
            </Link>
            <div className="hit">
                👁 {hit}
            </div>
            <Link to={''} className='user'>
                {user}
            </Link>
        </li>
    )
}

// function Board_Gallery(props) {
//     const path = window.location.pathname.split('/');

//     return (
//         <tr className={props.className}>
//             <td className='num'>
//                 <Link to={`/board/${path[2]}/contents/${props.num}`}>{props.num}</Link>
//             </td>
//             <td className="img">
//                 <img src={`${props.img}`} alt="img" />
//             </td>
//             <td className='subject'>
//                 <Link to={`/board/${path[2]}/contents/${props.num}`}>{props.subject}</Link>
//             </td>
//             <td className='user'>{props.user}</td>
//             <td className='time'>{props.time}</td>
//         </tr>
//     )
// }
export default Board