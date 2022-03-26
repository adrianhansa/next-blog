import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer, profileReducer } from './reducers/userReducers';

const middleware = composeWithDevTools(applyMiddleware(thunk));
const rootReducer = combineReducers({
  auth: authReducer,
  profileDetails: profileReducer,
});

let userFromLocalStorage = {};
if (typeof window !== 'undefined') {
  // Perform localStorage action
  userFromLocalStorage = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : null;
}

const initialState = { auth: userFromLocalStorage };
const store = createStore(rootReducer, initialState, middleware);

export default store;
