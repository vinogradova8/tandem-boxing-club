import React, { useContext, useState } from 'react';
import './Profile.scss';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { User } from '../../types/User';
// import { getUser } from '../../api/fetchClient';

export const Profile: React.FC = ({}) => {
  const [logoutErrorMessage, setLogoutErrorMessage] = useState(false);

  const {
    user,
    setUser,
    accessToken,
    setAccessToken,
    refreshErrorMessage,
    setRefreshErrorMessage,
  } = useContext(ItemsContext);
  const { t } = useTranslation();

  // const { firstName, lastName } = user;

  const navigate = useNavigate();

  // const refreshToken = useCallback(async () => {
  //   try {
  //     const response = await axios.post(
  //       '/auth/refresh',
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Access-Control-Allow-Origin': 'http://localhost:3000',
  //         },
  //       },
  //     );

  //     setAccessToken(response.data.token);
  //   } catch {
  //     setRefreshErrorMessage(true);
  //   }
  // }, [accessToken, setAccessToken, setRefreshErrorMessage]);

  // useEffect(() => {
  //   const refreshTokenInterval = setInterval(() => {
  //     refreshToken();
  //   }, 180000);

  //   return () => {
  //     clearInterval(refreshTokenInterval);
  //   };
  // }, [refreshToken]);

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
      setUser(null);
      setRefreshErrorMessage(false);
      navigate('/login');
    } catch {
      setLogoutErrorMessage(true);
    }
  };

  return (
    <>
      <main className="profile">
        <h2 className="profile__title big-title">{t('Our Training')}</h2>

        <div className="profile__container">
          {refreshErrorMessage && <p>Something went wrong!</p>}
          {logoutErrorMessage && <p>Log out failed!</p>}

          <>
            <p>YOUR PROFILE</p>
            <p>{accessToken}</p>
            <p>{user?.email}</p>
            <p>{user?.firstName}</p>
            <p>{user?.lastName}</p>
            <button className="logout-button" onClick={handleLogOut}>
              Log out
            </button>
          </>
        </div>
      </main>
    </>
  );
};
