import React from 'react';
// import cn from 'classnames';
import './App.scss';
import './i18n';

import { Header } from './components/Header';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
// import { useTranslation } from 'react-i18next';
// import { Footer } from './components/Footer';
// import { BurgerMenu } from './components/BurgerMenu';
// import { ItemsProvider } from './ItemsContext';
// import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  // const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  // const [darkTheme, setDarkTheme] = useLocalStorage('darkTheme', false);

  const { currentId } = useParams();
  // const { t } = useTranslation();

  if (currentId === 'home') {
    return <Navigate to=".." />;
  }

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
