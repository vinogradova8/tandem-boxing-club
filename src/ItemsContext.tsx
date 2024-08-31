import React, { useMemo } from 'react';

import { useLocalStorage } from './hooks/useLocalStorage';
import { Auth } from './types/Auth';
import { RoleName } from './types/RoleName';

type ItemsContextType = {
  isModalWindowOpen: boolean;
  setIsModalWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  // accessToken: string;
  // setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  // isAuth: boolean;
  // setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ItemsContext = React.createContext<ItemsContextType>({
  isModalWindowOpen: false,
  setIsModalWindowOpen: () => {},
  auth: {
    login: '',
    password: '',
    role: RoleName.CUSTOMER,
    accessToken: '',
  },
  setAuth: () => {},
  // accessToken: '',
  // setAccessToken: () => {},
  // isAuth: false,
  // setIsAuth: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ItemsProvider: React.FC<Props> = ({ children }) => {
  const [isModalWindowOpen, setIsModalWindowOpen] = useLocalStorage(
    'isModalWindowOpen',
    false,
  );

  // const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  // const [isAuth, setIsAuth] = useLocalStorage('isAuth', false);
  const [auth, setAuth] = useLocalStorage('auth', {
    login: '',
    password: '',
    role: RoleName.CUSTOMER,
    accessToken: '',
  });

  const value = useMemo(
    () => ({
      isModalWindowOpen,
      setIsModalWindowOpen,
      auth,
      setAuth,
      // accessToken,
      // setAccessToken,
      // isAuth,
      // setIsAuth,
    }),
    [
      isModalWindowOpen,
      setIsModalWindowOpen,
      auth,
      setAuth,
      // accessToken,
      // setAccessToken,
      // isAuth,
      // setIsAuth,
    ],
  );

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
