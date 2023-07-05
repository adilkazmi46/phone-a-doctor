import {combineReducers} from 'redux';
import {isAuthenticated, user} from './auth';
import {socket} from './socket';

const root_reducers = combineReducers({
  isAuthenticated: isAuthenticated,
  user: user,
  socket: socket,
});

export default root_reducers;
