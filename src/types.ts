import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type UserType = {
  email: string;
};

export type WalletType = {
  currencies: [] | string[];
  expenses: [] | FormWithExchangeRates[];
};

export type Form = {
  value: string;
  currency: string;
  method: string;
  tag: string;
  description: string;
};

export type FormWithId = Form & {
  id: number;
};

export type FormWithExchangeRates = FormWithId & {
  exchangeRates: ExchangeRates
};

export type ReducerType = {
  user: UserType,
  wallet: WalletType,
};

export type ReduxState = {
  isFetching: boolean;
  currentId: number;
  errorMessage: string;
  currencies: [] | string[];
  expenses: [] | FormWithExchangeRates[];
};

export type CurrencyData = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

export type ExchangeRates = {
  [key: string]: CurrencyData;
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
