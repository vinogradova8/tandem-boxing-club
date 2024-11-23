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
  const [googleLoginErrorMessage, setGoogleLoginErrorMessage] = useState(false);
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

  let token: string | null;

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

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(
        `https://d1g3i7mr74vp7j.cloudfront.net/token/validate?tempToken=${token}`,
      );

      const role = response.data.userDto.role;
      const id = response.data.userDto.id;
      const firstName = response.data.userDto.firstName;
      const lastName = response.data.userDto.lastName;
      const email = response.data.userDto.email;

      setUser({ id, email, firstName, lastName, role, password: 'password' });

      setAccessToken(response.data.token);
      setRefreshErrorMessage(false);
      setGoogleLoginErrorMessage(false);
    } catch {
      setGoogleLoginErrorMessage(true);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      const params = new URLSearchParams(searchParams);

      token = params.get('token');

      handleGoogleLogin();
    }
  }, []);

  return (
    <>
      {user?.role !== 'CUSTOMER' && navigate('/login')}
      {(refreshErrorMessage || googleLoginErrorMessage) && (
        <NotFoundPage message={t('Something went wrong!')} />
      )}
      {!refreshErrorMessage && !googleLoginErrorMessage && (
        <main className="profile">
          <h2 className="profile__title">{t('Hey, champ!')}</h2>

          <div className="profile__container">
            <p className="profile__text">
              {`${user?.firstName} ${user?.lastName},`} {t('Welcome')}
            </p>

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
