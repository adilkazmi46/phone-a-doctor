export const socket = (
    state = {},
    action: {type: string; payload: any},
  ) => {
    switch (action.type) {
      case 'save_socket':
        return (state = action.payload);
      case 'remove_socket':
        return (state ={});
      default:
        return state;
    }
  };
  