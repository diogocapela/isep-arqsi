import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(reduxThunk)));
}

export default configureStore;
