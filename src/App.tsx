import React, { useCallback, useContext, useEffect } from 'react';
// import cn from 'classnames';
import './App.scss';
import './i18n';

import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { ItemsContext } from './ItemsContext';
import axios from './api/axios';

export const App: React.FC = () => {
  // const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  // const [darkTheme, setDarkTheme] = useLocalStorage('darkTheme', false);

  // const { currentId } = useParams();

  const { accessToken, setAccessToken, setRefreshErrorMessage } =
    useContext(ItemsContext);

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post(
        '/auth/refresh',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setAccessToken(response.data.token);
    } catch {
      setRefreshErrorMessage(true);
    }
  }, [accessToken, setAccessToken, setRefreshErrorMessage]);

  useEffect(() => {
    let refreshTokenInterval: NodeJS.Timer;

    if (accessToken) {
      refreshTokenInterval = setInterval(() => {
        refreshToken();
      }, 180000);
    }

    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, [accessToken, refreshToken]);

  // if (currentId === 'home') {
  //   return <Navigate to=".." />;
  // }

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
