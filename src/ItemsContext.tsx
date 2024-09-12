import React, { useMemo } from 'react';

import { useLocalStorage } from './hooks/useLocalStorage';
// import { Auth } from './types/Auth';
// import { RoleName } from './types/RoleName';
import { User } from './types/User';
import { LOCALS } from './i18n/constants';

type ItemsContextType = {
  isModalWindowOpen: boolean;
  setIsModalWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCertificateWindowOpen: boolean;
  setIsCertificateWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  isCertificateWindowOpen: false,
  setIsCertificateWindowOpen: () => {},
  user: {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    role: '',
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

  const [isCertificateWindowOpen, setIsCertificateWindowOpen] = useLocalStorage(
    'isCertificateWindowOpen',
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
    email: '',
    firstName: '',
    lastName: '',
    role: '',
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
      isCertificateWindowOpen,
      setIsCertificateWindowOpen,
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
      isCertificateWindowOpen,
      setIsCertificateWindowOpen,
    ],
  );

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
