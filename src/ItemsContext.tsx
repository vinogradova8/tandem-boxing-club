import React, { useMemo } from 'react';

import { useLocalStorage } from './hooks/useLocalStorage';
// import { Auth } from './types/Auth';
import { RoleName } from './types/RoleName';
import { User } from './types/User';

type ItemsContextType = {
  isModalWindowOpen: boolean;
  setIsModalWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;

  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const ItemsContext = React.createContext<ItemsContextType>({
  isModalWindowOpen: false,
  setIsModalWindowOpen: () => {},

  user: {
    id: 0,
    firstName: '',
    lastName: '',
    role: RoleName.CUSTOMER,
    login: '',
    password: '',
  },
  setUser: () => {},
  accessToken: '',
  setAccessToken: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ItemsProvider: React.FC<Props> = ({ children }) => {
  const [isModalWindowOpen, setIsModalWindowOpen] = useLocalStorage(
    'isModalWindowOpen',
    false,
  );

  // const [user, setUser] = useLocalStorage('user', {
  //   id: undefined,
  //   firstName: '',
  //   lastName: '',
  //   role: RoleName.CUSTOMER,
  //   login: '',
  //   password: '',
  // });

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  // const [isAuth, setIsAuth] = useLocalStorage('isAuth', false);
  const [user, setUser] = useLocalStorage('user', {
    id: 0,
    firstName: '',
    lastName: '',
    role: RoleName.CUSTOMER,
    login: '',
    password: '',
  });

  const value = useMemo(
    () => ({
      isModalWindowOpen,
      setIsModalWindowOpen,
      user,
      setUser,
      accessToken,
      setAccessToken,
    }),
    [
      isModalWindowOpen,
      setIsModalWindowOpen,
      user,
      setUser,
      accessToken,
      setAccessToken,
      // auth,
      // setAuth,
    ],
  );

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
