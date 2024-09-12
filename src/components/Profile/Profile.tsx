import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Profile.scss';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';
import { NavLink, useNavigate } from 'react-router-dom';
// import { User } from '../../types/User';
// import { getUser } from '../../api/fetchClient';

export const Profile: React.FC = ({}) => {
  const [successLogOut, setSuccessLogOut] = useState(false);
  const [logoutErrorMessage, setLogoutErrorMessage] = useState(false);
  const [refreshErrorMessage, setRefreshErrorMessage] = useState(false);

  const { user, accessToken, setAccessToken } = useContext(ItemsContext);

  const { firstName, lastName } = user;

  const navigate = useNavigate();

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
      setSuccessLogOut(true);
      navigate('/login');
    } catch {
      setLogoutErrorMessage(true);
    }
  };

  return (
    <>
      <main className="profile">
        <div className="profile__container">
          {refreshErrorMessage && <p>Something went wrong!</p>}
          {logoutErrorMessage && <p>Log out failed!</p>}
          {successLogOut ? (
            <>
              <p>You are logged out!</p>
              <p>Go to</p>
              <NavLink to="/login">log in page</NavLink>
            </>
          ) : (
            <>
              <p>YOUR PROFILE</p>
              <p>{accessToken}</p>
              <p>{user.email}</p>
              <p>{firstName}</p>
              <p>{lastName}</p>
              <button className="logout-button" onClick={handleLogOut}>
                Log out
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
};
