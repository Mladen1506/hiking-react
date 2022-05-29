import React from 'react';
import { useDispatch } from 'react-redux';
import PageRouter from './PageRouter';

const App = () => {

  const dispatch = useDispatch();

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

  const handleClickLogout = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'LOGOUT'
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hiking Trails
        </p>
        <nav>
          <div onClick={handleClickHome}>Home</div>
          <div onClick={handleClickRegister}>Register</div>
          <div onClick={handleClickLogin}>Login</div>
          <div onClick={handleClickAddTour}>Add Tour</div>
          <div onClick={handleClickAddReview}>Add Review</div>
          <div onClick={handleClickMyTours}>My Tours</div>
          <div onClick={handleClickLogout}>Logout</div>
        </nav>
      </header>
      <div className='page-body'>
        <PageRouter />
      </div>
    </div>
  );
}

export default App;
