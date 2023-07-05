export const signin = (payload: boolean) => {
  return {
    type: 'signin',
    payload: payload,
  };
};

export const save_user = (payload: any) => {
  return {
    type: 'save_user',
    payload: payload,
  };
};

export const remove_user = () => {
  return {
    type: 'remove_user',
  };
};

export const signout = (payload: boolean) => {
  return {
    type: 'signout',
    payload: payload,
  };
};
