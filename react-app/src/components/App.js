
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionAuthAutoLogin, actionAuthLogout, actionReviewsNeeded, actionRouteSet, actionToursNeeded, } from '../redux/actions';
import PageRouter from './PageRouter';

const App = () => {

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const myUserName = useSelector(state => state.myUserName);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionAuthAutoLogin());
  }, []);

  useEffect(() => {
    dispatch(actionToursNeeded());
    dispatch(actionReviewsNeeded());

  }, []);

  const handleClickHome = (e) => {
    dispatch(actionRouteSet('HOME'));
  };

  const handleClickRegister = (e) => {
    dispatch(actionRouteSet('REGISTER'));
  };

  const handleClickLogin = (e) => {
    dispatch(actionRouteSet('LOGIN'));
  };

  const handleClickLogout = (e) => {
    dispatch(actionAuthLogout());
  };

  const handleClickMyTours = (e) => {
    dispatch(actionRouteSet('MY_TOURS'));
  };

  const handleClickAddTour = (e) => {
    dispatch(actionRouteSet('ADD_TOUR'));
  };

  const handleClickAddReview = (e) => {
    dispatch(actionRouteSet('ADD_REVIEW'));
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
        <div onClick={handleClickAddReview}>Add Review</div>

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
