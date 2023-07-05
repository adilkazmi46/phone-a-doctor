export const save_socket = (payload: any) => {
    return {
      type: 'save_socket',
      payload: payload,
    };
  };
  
 
  export const remove_socket = () => {
    return {
      type: 'remove_socket',
    };
  };
  