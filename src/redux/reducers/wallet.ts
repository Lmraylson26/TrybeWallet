import { AnyAction } from 'redux';
import {
  WALLET_FAILED,
  WALLET_START,
  WALLET_SUCESS_ADD,
  WALLET_SUCESS_REMOVE,
} from '../actions';
import { ReduxState } from '../../types';

const INITIAL_STATE: ReduxState = {
  isFetching: false,
  currentId: 0,
  errorMessage: '',
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case WALLET_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };

    case WALLET_SUCESS_ADD:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          isFetching: false,
          errorMessage: '',
          currencies: action.payload,
        };
      }
      return {
        ...state,
        isFetching: false,
        currentId: state.currentId + 1,
        errorMessage: '',
        expenses: [...state.expenses,
          { id: state.currentId, ...action.payload }],
      };

    case WALLET_SUCESS_REMOVE:
      return {
        ...state,
        expenses: state.expenses
          .filter((expense) => expense.id !== action.payload.data),
      };

    case WALLET_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default: return state;
  }
};

export default wallet;
