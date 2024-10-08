import React, { useCallback, useContext, useEffect } from 'react';
// import cn from 'classnames';
import './App.scss';
import './i18n';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { ItemsContext } from './ItemsContext';
import axios from './api/axios';
// import { GoogleOAuthProvider } from '@react-oauth/google';

export const App: React.FC = () => {
  // const { currentId } = useParams();

  // const timerRefresh = useRef();

  const { accessToken, setAccessToken, setRefreshErrorMessage, setUser } =
    useContext(ItemsContext);
  //   try {
  //     await axios.post(
  //       '/auth/logout',
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       },
  //     );

  //     setAccessToken('');
  //     setUser(null);
  //     setRefreshErrorMessage(false);
  //     navigate('/login');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [accessToken, navigate, setAccessToken, setRefreshErrorMessage, setUser]);

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

      // const role = response.data.userDto.role;
      // const id = response.data.userDto.id;
      // const firstName = response.data.userDto.firstName;
      // const lastName = response.data.userDto.lastName;

      // setUser({ id, email: '', firstName, lastName, role, password: '' });
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
  }, [
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshErrorMessage,
    setUser,
  ]);

  // if (currentId === 'home') {
  //   return <Navigate to=".." />;
  // }

  return (
    // eslint-disable-next-line max-len
    // <GoogleOAuthProvider clientId="588544771236-bt2l09g8m0pj16k8kf2sf59rtbrid3e4.apps.googleusercontent.com">
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
    // </GoogleOAuthProvider>
  );
};
