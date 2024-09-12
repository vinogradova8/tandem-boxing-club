import React, { useCallback, useContext, useEffect, useState } from 'react';
import './AdminPage.scss';
import { useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';

export const AdminPage: React.FC = ({}) => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken, user } = useContext(ItemsContext);

  const [logoutErrorMessage, setLogoutErrorMessage] = useState(false);
  const [refreshErrorMessage, setRefreshErrorMessage] = useState(false);

  const { firstName, lastName } = user;

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post(
        '/auth/refresh',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },
        },
      );

      setAccessToken(response.data.token);
    } catch {
      setRefreshErrorMessage(true);
    }
  }, [accessToken, setAccessToken, setRefreshErrorMessage]);

  // useEffect(() => {
  //   let refreshTokenInterval;

  //   if (accessToken) {
  //     refreshToken();

  //     refreshTokenInterval = setInterval(() => {
  //       refreshToken();
  //     }, 180000);
  //   }

  //   return () => {
  //     clearInterval(refreshTokenInterval);
  //   };
  // }, [refreshToken]);

  useEffect(() => {
    const refreshTokenInterval = setInterval(() => {
      refreshToken();
    }, 180000);

    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, [refreshToken]);

  const handleLogOut = async () => {
    try {
      await axios.post(
        '/auth/logout',
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      setAccessToken('');
      navigate('/login');
    } catch {
      setLogoutErrorMessage(true);
    }
  };

  return (
    <div>
      <p>AdminPage</p>
      <p>{accessToken}</p>
      <p>{user.email}</p>
      <p>{firstName}</p>
      <p>{lastName}</p>
      {refreshErrorMessage && <p>Something went wrong!</p>}
      {logoutErrorMessage && <p>Log out failed!</p>}
      <button className="logout-button" onClick={handleLogOut}>
        Log out
      </button>
    </div>
  );
};
