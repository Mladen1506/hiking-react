import { responsiveProperty } from '@mui/material/styles/cssUtils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ajax } from '../utils/ajax-adapter';
import PageRouter from './PageRouter';

const App = () => {

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const myUserName = useSelector(state => state.myUserName);

  const dispatch = useDispatch();

  useEffect(() => {

    console.log('test1')
    //autologin procedura
    ajax.myUserData()
      .then((response) => {
        console.log('test 2')
        console.log('.then() response za myuserdata primljen', response)
        if (response && response.data && response.data.data && response.data.data.myUserData._id) {
          console.log(response.data.data.myUserData)
          const myUserData = response.data.data.myUserData && response.data.data.myUserData;
          dispatch({
            // type: 'MY_USER_DATA_FETCHED',
            type: 'LOGIN_SUCCESS',
            payload: myUserData
          });
        }
      })

    console.log('test 3')
  }, []);

  useEffect(() => {
    ajax.tourGetAll()
      .then((response) => {
        console.log('response za tourGetAll');
        console.log(response);

        if (response && response.data && response.data.data && Array.isArray(response.data.data.tourGetAll)) {
          dispatch({
            type: 'TOURS_FETCHED',
            payload: response.data.data.tourGetAll
          });
        }
      })
  }, []);

  const handleClickHome = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'HOME'
    })
  };

  const handleClickRegister = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'REGISTER'
    })
  };

  const handleClickLogin = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'LOGIN'
    })
  };

  const handleClickLogout = (e) => {

    ajax.authLogout()
      .then(() => {
        ajax.deleteStoredToken();
        ajax.configureHeaders(null);
        dispatch({
          type: 'LOGOUT'
        });
      })
  };


  const handleClickAddTour = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'ADD_TOUR'
    })
  };

  const handleClickAddReview = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'ADD_REVIEW'
    })
  };

  const handleClickMyTours = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'MY_TOURS'
    })
  };



  let jsxLoggedInMessage = null;
  let jsxMenu = null;
  if (isLoggedIn) {
    jsxLoggedInMessage = (
      <>
        You are logged in <b>{myUserName}</b>
      </>
    );
    jsxMenu = (
      <>
        <div onClick={handleClickHome}>Home</div>
        <div onClick={handleClickMyTours}>My Tours</div>
        <div onClick={handleClickAddTour}>Add Tour</div>
        <div onClick={handleClickAddReview}>Add Review</div>
        <div onClick={handleClickLogout}>Logout</div>
      </>
    );
  } else {
    // kada smo izlogovani
    jsxMenu = (
      <>
        <div onClick={handleClickHome}>Home</div>
        <div onClick={handleClickRegister}>Register</div>
        <div onClick={handleClickLogin}>Login</div>

      </>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hiking Trails
        </p>
        <nav>
          {/* <div onClick={handleClickHome}>Home</div>
          <div onClick={handleClickRegister}>Register</div>
          <div onClick={handleClickLogin}>Login</div>
          <div onClick={handleClickMyTours}>My Tours</div>
          <div onClick={handleClickAddTour}>Add Tour</div>
          <div onClick={handleClickAddReview}>Add Review</div>
          <div onClick={handleClickLogout}>Logout</div> */}
          {jsxMenu}
        </nav>
      </header>
      <div className='page-body'>
        <p>{jsxLoggedInMessage}</p>
        <PageRouter />
      </div>
    </div>
  );
}

export default App;
