import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import Main from './component/main'
import Header from './component/common/header'
import Register from './component/user/register';
import Login from './component/user/login';
import MyPage from './component/user/myPage';
import UserEdit from './component/user/modify';
import Board from './component/board/board';
import Write from './component/board/write';
import ContentBoard from './component/board/[num]';
import ModifyBoard from './component/board/modify';
import ADM from './component/adm';
import WriteGallery from './component/board/write-gallery';
import NeedDownLoad from './component/download';
import '../src/css/main.css'

function App() {
  let [headerCofirm, setHeaderCofirm] = useState(true);
  useEffect(()=>{
    let path = window.location.pathname.split('/');
    if(path[1] === 'download') {
      setHeaderCofirm(false);
    } 
  },[])
  return (
      <Router>
        {
          headerCofirm === true ?
          <Header /> : null
        }
        <Routes>
          <Route path="/" element={ <Main />} />
          <Route path="/adm" element={  <ADM /> } />
          <Route path="/download" element={  <NeedDownLoad /> } />

          {/* user */}
          <Route path="/register" element={ <Register />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/myPage" element={ <MyPage />} />
          <Route path="/myPage/edit" element={ <UserEdit />} />

          {/* board */}
          <Route path="/board/:name/:page" element={ <Board/> } />
          <Route path="/board/:name/write" element={ <Write /> } />
          <Route path={`/board/:name/contents/:num`} element={ <ContentBoard />} />
          <Route path={`/board/:name/modify/:num`} element={ <ModifyBoard /> } />
          <Route path={`/board/gallery/:name/write`} element={<WriteGallery />} />
        </Routes>
      </Router>
  );
}

export default App;
