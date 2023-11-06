import { Dispatch } from '../../types';

export const USER = 'USER';
export const WALLET_START = 'WALLET_START';
export const WALLET_SUCESS_ADD = 'WALLET_SUCESS_ADD';
export const WALLET_FAILED = 'WALLET_FAILED';
export const WALLET_SUCESS_REMOVE = 'WALLET_SUCESS_REMOVE';

const userDefault = {
  email: '',
};

export const actionUser = (data = userDefault) => ({
  type: USER,
  payload: data,
});

export const actionWalletStart = () => ({
  type: WALLET_START,
});

export const actionWalletSucessAdd = (data: string[] | object) => ({
  type: WALLET_SUCESS_ADD,
  payload: data,
});

export const actionWalletSucessRemove = (data: { data: number }) => ({
  type: WALLET_SUCESS_REMOVE,
  payload: data,
});

export const actionWalletFailed = (data: any) => ({
  type: WALLET_FAILED,
  payload: data,
});

export const fetchWallet = (type?: string, form?: object) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actionWalletStart());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      if (type === 'array') dispatch(actionWalletSucessAdd(Object.keys(data)));
      else dispatch(actionWalletSucessAdd({ ...form, exchangeRates: data }));
    } catch (error: any) {
      dispatch(actionWalletFailed(error.message));
    }
  };
};
