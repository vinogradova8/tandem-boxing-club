import React, { useContext, useState } from 'react';
import './Login.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';
import { useTranslation } from 'react-i18next';

export const Login: React.FC = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  // const [refreshErrorMessage, setRefreshErrorMessage] = useState(false);

  const { setUser, setAccessToken } = useContext(ItemsContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/auth/login',
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const role = response.data.userDto.role;
      const id = response.data.userDto.id;
      const firstName = response.data.userDto.firstName;
      const lastName = response.data.userDto.lastName;

      setUser({ id, email, firstName, lastName, role, password });

      setAccessToken(response.data.token);
      // refreshToken();

      if (role === 'CUSTOMER') {
        navigate('/profile');
      }

      if (role === 'ADMIN') {
        navigate('/admin');
      }
    } catch {
      setErrorMessage(true);
    }
  };

  return (
    <>
      <main className="login">
        <h2 className="login__title big-title">{t('Your area')}</h2>

        <div className="login__container">
          <p className="login__header small-title">
            Log in or create an account via
          </p>
          {errorMessage && <p>Log in failed!</p>}

          <form onSubmit={handleSubmit} className="login__form" action="#">
            <div className="login__socials socials">
              <button className="socials__item">
                <span className="socials__name">Continue with</span>
                <span className="socials__icon socials__icon--facebook"></span>
              </button>

              <button className="socials__item">
                <span className="socials__name">Continue with</span>
                <span className="socials__icon socials__icon--google"></span>
              </button>

              <button className="socials__item">
                <span className="socials__name">Continue with</span>
                <span className="socials__icon socials__icon--apple"></span>
              </button>
            </div>

            <p className="login__text small-title">or</p>

            <div className="login__email">
              <input
                className="login__input"
                placeholder="Continue with email"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <input
                className="login__input"
                placeholder="Password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
              <p>Ви ще не зареєстровані?</p>
              <NavLink to="/registration">Зареєструватися</NavLink>
            </div>

            <button className="login__contact-button contact-button">
              Continue
            </button>
          </form>

          {/* <p>LOGIN</p>
          <form onSubmit={handleSubmit} className="form" action="#">
            {errorMessage && <p>Log in failed!</p>}

            <div>
              <label htmlFor="email">Логін (пошта)</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                id="email"
              />
            </div>

            <div>
              <label htmlFor="password">Пароль</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                id="password"
              />
            </div>

            <button className="contact-button">Вхiд</button>
          </form>

          <p>Ви ще не зареєстровані?</p>
          <NavLink to="/registration">Зареєструватися</NavLink> */}
        </div>
      </main>
    </>
  );
};
