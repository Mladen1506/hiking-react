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

  const handleClickLogout = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'LOGOUT'
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={handleClickHome}>Home</div>
        <div onClick={handleClickRegister}>Register</div>
        <div onClick={handleClickLogin}>Login</div>
        <div onClick={handleClickLogout}>Logout</div>
      </header>
      <PageRouter />
    </div>
  );
}

export default App;
