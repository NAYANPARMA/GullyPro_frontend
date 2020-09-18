import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { authenticate } from './otp.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { upcoming} from './matches.reducer';
import { contests } from './contest.reducer';
import {myteams} from './myteams.reducer'
import {teampreview} from './teampreveiw.reducer'

import { createteam } from './createteam.reducer'
const rootReducer = combineReducers({
  createteam,
  upcoming,
  teampreview,
   myteams,
  authentication,
  authenticate,
  registration,
  users,
  alert,
  contests
});

export default rootReducer;