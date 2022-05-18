const initialState = {
  nesto: 'bla bla'
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NESTO_KAO':
      return state;
  
    default:
      return state;
  }
};

export default rootReducer;