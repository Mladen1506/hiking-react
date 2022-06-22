
import { dummyReviews } from "../utils/dummy-reviews";
import { dummyTours } from "../utils/dummy-tours";

const initialState = {
  route: 'HOME',
  routeParams: {},
  isLoggedIn: false,
  myUserName: '',
  myUserId: '',
  // tours: dummyTours,
  tours: [],
  reviews: dummyReviews,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ROUTE_SET':
      return {
        ...state,
        route: action.payload,
        routeParams: {}
      };

    case 'ROUTE_WITH_PARAMS_SET':
      return {
        ...state,
        route: action.payload.route,
        routeParams: action.payload.params
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        myUserName: action.payload.username,
        myUserId: action.payload._id,
        route: 'HOME',
        routeParams: {}
      };

    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        myUserName: '',
        myUserId: '',
        route: 'HOME',
        routeParams: {}
      };

    case 'TOURS_FETCHED':
      return {
        ...state,
        tours: action.payload
      };

    default:
      return state;
  }
};

export default rootReducer;