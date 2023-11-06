import { AnyAction } from 'redux';
import { USER } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case USER:
      return { ...state, ...action.payload };
    default: return state;
  }
};

export default user;
