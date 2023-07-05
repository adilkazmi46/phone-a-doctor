export const isAuthenticated = (
  state = false,
  action: {type: string; payload: boolean},
) => {
  switch (action.type) {
    case 'signin':
      return (state = action.payload);
    case 'signout':
      return (state = action.payload);
    default:
      return state;
  }
};

export const user = (state = {}, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'save_user':
      return (state = action.payload);
    case 'remove_user':
      return (state = {});
    default:
      return state;
  }
};
