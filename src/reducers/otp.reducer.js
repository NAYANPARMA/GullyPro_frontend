import { userConstants } from '../constants';
import { storageService } from '../services';

let user = JSON.parse(storageService.get('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authenticate(state = initialState, action) {
  switch (action.type) {
    case userConstants.OTP_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.OTP_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.OTP_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}