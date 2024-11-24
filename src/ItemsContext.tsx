import React, { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LOCALS } from './i18n/constants';

type ItemsContextType = {
  isCertificateWindowOpen: boolean;
  setIsCertificateWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBurgerWindowOpen: boolean;
  setIsBurgerWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export const ItemsContext = React.createContext<ItemsContextType>({
  isCertificateWindowOpen: false,
  setIsCertificateWindowOpen: () => {},
  isBurgerWindowOpen: false,
  setIsBurgerWindowOpen: () => {},
  language: LOCALS.ENG,
  setLanguage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ItemsProvider: React.FC<Props> = ({ children }) => {
  const [isCertificateWindowOpen, setIsCertificateWindowOpen] = useLocalStorage(
    'isCertificateWindowOpen',
    false,
  );

  const [isBurgerWindowOpen, setIsBurgerWindowOpen] = useLocalStorage(
    'isCertificateWindowOpen',
    false,
  );

  const [language, setLanguage] = useLocalStorage('language', LOCALS.ENG);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      isCertificateWindowOpen,
      setIsCertificateWindowOpen,
      isBurgerWindowOpen,
      setIsBurgerWindowOpen,
    }),
    [
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
