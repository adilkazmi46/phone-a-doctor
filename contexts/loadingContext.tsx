import React, {useState, createContext} from 'react';

export const LoadingContext = createContext({});

const LoadingContextProvider = (props: any) => {
  const [showLoader, setShowLoader] = useState(false);

  const handleToggleLoader = async (showLoader: boolean) => {
    setShowLoader(showLoader);
  };

  return (
    <LoadingContext.Provider value={{handleToggleLoader, showLoader}}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
