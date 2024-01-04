import React, {useState} from 'react';

interface AppContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const AppProvider = ({children}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppProvider = () => {
  return React.useContext(AppContext);
};

export default AppProvider;
