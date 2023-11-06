export const USER = 'USER';

const userDefault = {
  email: '',
};

export const actionUser = (data = userDefault) => ({
  type: USER,
  payload: data,
});
