import React, { useMemo } from 'react';

import { useLocalStorage } from './hooks/useLocalStorage';

type ItemsContextType = {
  isModalWindowOpen: boolean;
  setIsModalWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ItemsContext = React.createContext<ItemsContextType>({
  isModalWindowOpen: false,
  setIsModalWindowOpen: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ItemsProvider: React.FC<Props> = ({ children }) => {
  const [isModalWindowOpen, setIsModalWindowOpen] = useLocalStorage(
    'isModalWindowOpen',
    false,
  );

  const value = useMemo(
    () => ({
      isModalWindowOpen,
      setIsModalWindowOpen,
    }),
    [isModalWindowOpen, setIsModalWindowOpen],
  );

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
