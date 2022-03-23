import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from '../constants/userConstants';

export const authReducer = (state = { auth: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true };
    case REGISTER_USER_SUCCESS:
      return { loading: false, auth: action.payload };
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload };
    case LOGIN_USER_REQUEST:
      return { loading: true };
    case LOGIN_USER_SUCCESS:
      return { loading: false, auth: action.payload };
    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return { auth: null };
    default:
      return state;
  }
};
