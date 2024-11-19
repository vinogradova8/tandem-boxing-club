/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import './Profile.scss';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NotFoundPage } from '../NotFoundPage';

export const Profile: React.FC = ({}) => {
  const [logoutErrorMessage, setLogoutErrorMessage] = useState(false);
  const [searchParams] = useSearchParams();

  const {
    user,
    setUser,
    accessToken,
    setAccessToken,
    refreshErrorMessage,
    setRefreshErrorMessage,
  } = useContext(ItemsContext);

  const { t } = useTranslation();

  const navigate = useNavigate();

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

  // const getUser = async (acc: string) => {
  //   try {
  //     const response = await axios.get('/users/me', {
  //       headers: { Authorization: `Bearer ${acc}` },
  //     });

  //     const role = response.data.role;
  //     const id = response.data.id;
  //     const firstName = response.data.firstName;
  //     const lastName = response.data.lastName;
  //     const email = response.data.email;
  //     const password = response.data.password;

  //     setUser({ id, email, firstName, lastName, role, password });
  //   } catch {
  //     console.log('error');
  //   }
  // };

  // function getCookie(name: string) {
  //   const matches = document.cookie.match(
  //     new RegExp(
  //       '(?:^|; )' + name.replace(/([$?*|{}\[\]\\/+^])/g, '\\$&') + '=([^;]*)',
  //     ),
  //   );

  //   return matches ? decodeURIComponent(matches[1]) : undefined;
  // }

  // function getCookie(name: string): string | null {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);

  //   if (parts.length === 2) {
  //     return parts.pop()?.split(';').shift() || null;
  //   }

  //   return null;
  // }

  // useEffect(() => {
  //   const access: string | null = getCookie('accessToken');

  //   if (access && !accessToken) {
  //     getUser(access);
  //     if (user) {
  //       setAccessToken(access);
  //     }
  //   }

  //   console.log('cookie:', document.cookie);

  //   console.log('Access Token:', access);
  // }, []);

  useEffect(() => {
    if (!accessToken) {
      const token = searchParams;

      console.log(token);
    }
  }, []);

  return (
    <>
      {user?.role !== 'CUSTOMER' && navigate('/login')}
      {refreshErrorMessage && (
        <NotFoundPage message={t('Something went wrong!')} />
      )}
      {!refreshErrorMessage && (
        <main className="profile">
          <h2 className="profile__title">{t('Hey, champ!')}</h2>

          <div className="profile__container">
            {accessToken ? (
              <p className="profile__text">
                {`${user?.firstName} ${user?.lastName},`} {t('Welcome')}
              </p>
            ) : (
              <p className="profile__text">{t('Welcome')}</p>
            )}

            <button
              className="logout-button admin-button"
              onClick={handleLogOut}
            >
              {t('Log out')}
            </button>
            {logoutErrorMessage && (
              <p className="error">{t('Log out failed!')}</p>
            )}
          </div>
        </main>
      )}
    </>
  );
};
