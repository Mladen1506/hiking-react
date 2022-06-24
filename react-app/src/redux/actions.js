

// ACTION TYPES KONSTANTE

import { ajax } from "../utils/ajax-adapter";

export const ROUTE_SET = 'ROUTE_SET';
export const ROUTE_WITH_PARAMS_SET = 'ROUTE_WITH_PARAMS_SET';
export const REFRESH = 'REFRESH';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const TOURS_FETCHING = 'TOURS_FETCHING';
export const TOURS_FETCHED = 'TOURS_FETCHED';
export const TOURS_FAIL = 'TOURS_FAIL';
export const REVIEWS_FETCHING = 'REVIEWS_FETCHING';
export const REVIEWS_FETCHED = 'REVIEWS_FETCHED';
export const REVIEWS_FAIL = 'REVIEWS_FAIL';


// ACTION CREATORS AND THUNKS

export const actionRouteSet = (route) => {
  return {
    type: ROUTE_SET,
    payload: route
  };
};

export const actionRouteWithParamsSet = (route, params) => {
  return {
    type: 'ROUTE_WITH_PARAMS_SET',
    payload: {
      route: route,
      params: params
    }
  };
};

export const actionLoginSuccess = (myUserData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: myUserData
  };
};

export const actionAuthAutoLogin = () => {
  // THUNK
  return (dispatch) => {
    //autologin procedura
    ajax.myUserData()
      .then((response) => {
        // console.log('test 2')
        console.log('.then() response za myuserdata primljen', response)
        if (response && response.data && response.data.data && response.data.data.myUserData._id) {
          console.log(response.data.data.myUserData)
          const myUserData = response.data.data.myUserData && response.data.data.myUserData;

          dispatch(actionLoginSuccess(myUserData));
        }
      })
  };
};

export const actionAuthFormLogin = (formState) => {
  // THUNK
  return (dispatch) => {
    ajax.authLogin(formState)
      .then((response) => {
        console.log(response);
        if (response && response.data && response.data.data && response.data.data.authLogin) {
          const token = response.data.data.authLogin;
          ajax.storeToken(token);
          ajax.configureHeaders(token);
          // form login procedura zavrsena
          // auto login procedura 
          dispatch(actionAuthAutoLogin());
        }
      })
  };
};

export const actionAuthRegister = (formState) => {
  // THUNK
  return (dispatch) => {
    ajax.authRegister(formState)
      .then(() => {
        dispatch({
          type: ROUTE_SET,
          payload: 'LOGIN'      
        })
      })
  };
};


export const actionAuthLogout = () => {
  return (dispatch) => {
    ajax.authLogout()
      .then(() => {
        ajax.deleteStoredToken();
        ajax.configureHeaders(null);
        dispatch({
          type: LOGOUT
        });
      })
  }
};

export const actionToursNeeded = () => {
  // THUNK
  return (dispatch) => {
    dispatch({
      type: TOURS_FETCHING
    });
    setTimeout(() => {
      ajax.tourGetAll()
        .then((response) => {
          console.log('response za tourGetAll');
          console.log(response);

          if (response && response.data && response.data.data && Array.isArray(response.data.data.tourGetAll)) {
            // korak kada se fetchovanje zavrsi
            dispatch({
              type: TOURS_FETCHED,
              payload: response.data.data.tourGetAll
            });
          }
        })
    }, 500)
  };
};

export const actionReviewsNeeded = () => {
  // THUNK
  return (dispatch) => {
    dispatch({
      type: REVIEWS_FETCHING
    });

    ajax.reviewGetAll()
      .then((response) => {
        console.log('response za reviewGetAll');
        console.log(response);

        if (response && response.data && response.data.data && Array.isArray(response.data.data.reviewGetAll)) {
          // korak kada se fetchovanje zavrsi
          dispatch({
            type: REVIEWS_FETCHED,
            payload: response.data.data.reviewGetAll
          });
        }
      })
  };
};

export const actionReviewCreate = (formState) => {
  // THUNK
  return (dispatch) => {
    ajax.reviewCreate(formState)
      .then((response) => {
        console.log('response za create review stigao', response);
        dispatch({
          type: REFRESH
        });
      })
  };
};


export const actionTourCreate = (formState) => {
  // THUNK
  return (dispatch) => {
    ajax.tourCreate(formState)
      .then((response) => {
        console.log(response);
        // nakon kreiranja ili apdejta ture redirektujemo na MY TOURS stranicu
        dispatch(actionRouteSet('MY_TOURS'));
      })
    };
  };
  
  export const actionTourUpdate = (formState) => {
    // THUNK
    return (dispatch) => {
      ajax.tourUpdate(formState)
      .then((response) => {
        console.log(response);
        // nakon kreiranja ili apdejta ture redirektujemo na MY TOURS stranicu
        dispatch(actionRouteSet('MY_TOURS'));
      })
  };
};

export const actionTourDelete = (formState) => {
  // THUNK
  return (dispatch) => {
    ajax.tourDelete(formState)
      .then((response) => {
        console.log(response);
        // nakon brisanja ili ture redirektujemo na MY TOURS stranicu
        dispatch(actionRouteSet('MY_TOURS'));
      })
  };
};