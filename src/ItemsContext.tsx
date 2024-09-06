import React, { useMemo } from 'react';

import { useLocalStorage } from './hooks/useLocalStorage';
// import { Auth } from './types/Auth';
// import { RoleName } from './types/RoleName';
import { User } from './types/User';
import { LOCALS } from './i18n/constants';

type ItemsContextType = {
  isModalWindowOpen: boolean;
  setIsModalWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export const ItemsContext = React.createContext<ItemsContextType>({
  isModalWindowOpen: false,
  setIsModalWindowOpen: () => {},
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
  },
  setUser: () => {},
  accessToken: '',
  setAccessToken: () => {},
  language: LOCALS.ENG,
  setLanguage: () => {},
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

  const [language, setLanguage] = useLocalStorage('language', LOCALS.ENG);

  // const [isAuth, setIsAuth] = useLocalStorage('isAuth', false);
  const [user, setUser] = useLocalStorage('user', {
    id: 0,
    firstName: '',
    lastName: '',
    role: '',
    email: '',
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
      language,
      setLanguage,
    }),
    [
      isModalWindowOpen,
      setIsModalWindowOpen,
      user,
      setUser,
      accessToken,
      setAccessToken,
      language,
      setLanguage,
      // auth,
      // setAuth,
    ],
  );

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
