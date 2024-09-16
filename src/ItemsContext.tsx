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
  isBurgerWindowOpen: boolean;
  setIsBurgerWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  refreshErrorMessage: boolean;
  setRefreshErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export const ItemsContext = React.createContext<ItemsContextType>({
  isModalWindowOpen: false,
  setIsModalWindowOpen: () => {},
  isCertificateWindowOpen: false,
  setIsCertificateWindowOpen: () => {},
  isBurgerWindowOpen: false,
  setIsBurgerWindowOpen: () => {},
  // user: {
  //   id: 0,
  //   email: '',
  //   firstName: '',
  //   lastName: '',
  //   role: '',
  //   password: '',
  // },
  user: null,
  setUser: () => {},
  accessToken: '',
  setAccessToken: () => {},
  refreshErrorMessage: false,
  setRefreshErrorMessage: () => {},
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

  const [isBurgerWindowOpen, setIsBurgerWindowOpen] = useLocalStorage(
    'isCertificateWindowOpen',
    false,
  );

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const [refreshErrorMessage, setRefreshErrorMessage] = useLocalStorage(
    'refreshErrorMessage',
    false,
  );

  const [language, setLanguage] = useLocalStorage('language', LOCALS.ENG);

  // const [user, setUser] = useLocalStorage('user', {
  //   id: 0,
  //   email: '',
  //   firstName: '',
  //   lastName: '',
  //   role: '',
  //   password: '',
  // });

  const [user, setUser] = useLocalStorage<User | null>('user', null);

  const value = useMemo(
    () => ({
      isModalWindowOpen,
      setIsModalWindowOpen,
      user,
      setUser,
      accessToken,
      setAccessToken,
      refreshErrorMessage,
      setRefreshErrorMessage,
      language,
      setLanguage,
      isCertificateWindowOpen,
      setIsCertificateWindowOpen,
      isBurgerWindowOpen,
      setIsBurgerWindowOpen,
    }),
    [
      isModalWindowOpen,
      setIsModalWindowOpen,
      user,
      setUser,
      accessToken,
      setAccessToken,
      refreshErrorMessage,
      setRefreshErrorMessage,
      language,
      setLanguage,
      isCertificateWindowOpen,
      setIsCertificateWindowOpen,
      isBurgerWindowOpen,
      setIsBurgerWindowOpen,
    ],
  );

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
