/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import './Login.scss';
import cn from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';
import { useTranslation } from 'react-i18next';

export const Login: React.FC = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  // const [refreshErrorMessage, setRefreshErrorMessage] = useState(false);

  const { setUser, setAccessToken, setRefreshErrorMessage } =
    useContext(ItemsContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      setRefreshErrorMessage(false);

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

  const togglePassword = document.querySelector('.password-show-btn');
  const passwordInput = document.querySelector('.login__input--password');

  const handleTogglePassword = () => {
    if (password) {
      const type =
        passwordInput?.getAttribute('type') === 'password'
          ? 'text'
          : 'password';

      passwordInput?.setAttribute('type', type);
      togglePassword?.classList.toggle('password-show-btn--eye-off');
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

          <form onSubmit={handleSubmit} className="login__form">
            <div className="login__socials socials">
              <button type="button" className="socials__item">
                <span className="socials__name">Continue with</span>
                <span className="socials__icon socials__icon--facebook"></span>
              </button>

              <button type="button" className="socials__item">
                <span className="socials__name">Continue with</span>
                <span className="socials__icon socials__icon--google"></span>
              </button>

              <button type="button" className="socials__item">
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

              <label className="login__label">
                <input
                  className="login__input login__input--password"
                  placeholder="Password"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className={cn('login__password-show-btn password-show-btn', {
                    'password-show-btn--disabled': !password,
                    'password-show-btn--enabled': password,
                  })}
                  disabled={!password}
                ></button>
              </label>

              <div className="login__registration">
                <p>Ви ще не зареєстровані?</p>
                <NavLink
                  to="/registration"
                  className="login__registration-link"
                >
                  Зареєструватися
                </NavLink>
              </div>
            </div>

            <div className="login__button-container">
              <button
                type="submit"
                className={cn('login__contact-button contact-button', {
                  'contact-button--disabled': !password || !email,
                })}
                disabled={!password || !email}
              >
                Continue
              </button>

              {errorMessage && (
                <p className="login__error error">Log in failed!</p>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
