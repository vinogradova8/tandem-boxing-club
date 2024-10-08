/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import './Registration.scss';
import axios from '../../api/axios';
// import axios from 'axios';
// import api from '../../api/axios';
import { ItemsContext } from '../../ItemsContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
// import { RoleName } from '../../types/RoleName';

export const Registration: React.FC = ({}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] =
    useState('');

  const [firstNameSuccessMessage, setFirstNameSuccessMessage] = useState('');
  const [lastNameSuccessMessage, setLastNameSuccessMessage] = useState('');
  const [emailSuccessMessage, setEmailSuccessMessage] = useState('');
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState('');
  const [repeatPasswordSuccessMessage, setRepeatPasswordSuccessMessage] =
    useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const { setUser, setAccessToken } = useContext(ItemsContext);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const NAME_REGEX = /^[a-zA-Zа-яА-Яії]{2,22}$/g;
  const PASSWORD_REGEX =
    /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/g;

  const submitButtonDisabled =
    !firstName || !lastName || !email || !repeatPassword || !password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!firstName) {
      setFirstNameErrorMessage('Please enter your first name');
    }

    if (
      firstName &&
      (firstName.trim().length < 2 ||
        !firstName.match(NAME_REGEX) ||
        firstName.trim().length > 22)
    ) {
      setFirstNameErrorMessage(
        'First name should have from 2 to 22 chars and contain only letters',
      );
      setFirstNameSuccessMessage('');
    }

    if (
      firstName.trim().match(NAME_REGEX) &&
      firstName.trim().length >= 2 &&
      firstName.trim().length <= 22
    ) {
      setFirstNameErrorMessage('');
      setFirstNameSuccessMessage('First name is valid');
    }

    if (!lastName) {
      setLastNameErrorMessage('Please enter your last name');
    }

    if (
      lastName &&
      (lastName.trim().length < 2 ||
        !lastName.match(NAME_REGEX) ||
        lastName.trim().length > 22)
    ) {
      setLastNameErrorMessage(
        'Last name should have from 2 to 22 chars and contain only letters',
      );
      setLastNameSuccessMessage('');
    }

    if (
      lastName.trim().match(NAME_REGEX) &&
      lastName.trim().length >= 2 &&
      lastName.trim().length <= 22
    ) {
      setLastNameErrorMessage('');
      setLastNameSuccessMessage('Last name is valid');
    }

    if (!email) {
      setEmailErrorMessage('Please enter your email');
      setEmailSuccessMessage('');
    }

    if (email && !email.trim().match(EMAIL_REGEX)) {
      setEmailErrorMessage('Invalid email address');
      setEmailSuccessMessage('');
    }

    if (email.trim().match(EMAIL_REGEX)) {
      setEmailErrorMessage('');
      setEmailSuccessMessage('Email is valid');
    }

    if (!password) {
      setPasswordErrorMessage('Please enter your password');
      setPasswordSuccessMessage('');
    }

    if (password && !password.match(PASSWORD_REGEX)) {
      setPasswordErrorMessage(
        'Password should have at least 8 chars, include at least 1 lowercase letter, 1 capital letter, 1 number, 1 special character',
      );
      setPasswordSuccessMessage('');
    }

    if (password.match(PASSWORD_REGEX)) {
      setPasswordErrorMessage('');
      setPasswordSuccessMessage('Password is valid');
    }

    if (!repeatPassword) {
      setRepeatPasswordErrorMessage('Please confirm your password');
      setRepeatPasswordSuccessMessage('');
    }

    if (
      repeatPassword &&
      !repeatPassword.match(PASSWORD_REGEX) &&
      repeatPassword !== password
    ) {
      setRepeatPasswordErrorMessage('Passwords don`t match');
      setRepeatPasswordSuccessMessage('');
    }

    if (repeatPassword.match(PASSWORD_REGEX) && repeatPassword === password) {
      setRepeatPasswordErrorMessage('');
      setRepeatPasswordSuccessMessage('Password confirmed');
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !repeatPassword ||
      firstName.trim().length > 22 ||
      lastName.trim().length > 22 ||
      firstName.trim().length < 2 ||
      lastName.trim().length < 2 ||
      !firstName.trim().match(NAME_REGEX) ||
      !lastName.trim().match(NAME_REGEX) ||
      !email.trim().match(EMAIL_REGEX) ||
      !password.match(PASSWORD_REGEX) ||
      !repeatPassword.match(PASSWORD_REGEX)
    ) {
      return false;
    }

    try {
      await axios.post(
        '/auth/registration',
        JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          repeatPassword,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

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
      const currentFirstName = response.data.userDto.firstName;
      const currenLastName = response.data.userDto.lastName;

      setUser({
        id,
        email,
        firstName: currentFirstName,
        lastName: currenLastName,
        role,
        password,
      });

      setAccessToken(response.data.token);
      navigate('/profile');
    } catch {
      setErrorMessage(t('Registration failed!'));
    }
  };

  const togglePassword = document.querySelector('.password-show-btn');
  const passwordInput = document.querySelector(
    '.registration__input--password',
  );

  const toggleRepeatPassword = document.querySelector(
    '.password-show-btn--repeat',
  );
  const repeatPasswordInput = document.querySelector(
    '.registration__input--password-repeat',
  );

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

  const handleToggleRepeatPassword = () => {
    if (repeatPassword) {
      const type =
        repeatPasswordInput?.getAttribute('type') === 'password'
          ? 'text'
          : 'password';

      repeatPasswordInput?.setAttribute('type', type);
      toggleRepeatPassword?.classList.toggle('password-show-btn--eye-off');
    }
  };

  return (
    <>
      <main className="registration">
        <h2 className="registration__title big-title">
          {t('Create an account')}
        </h2>

        <div className="registration__container">
          <div className="registration__header">
            <NavLink
              to={'../login'}
              className="registration__link-back"
            ></NavLink>

            <p className="registration__small-title small-title">
              {t('Log in or create')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="registration__form">
            <div className="registration__info">
              <div>
                <input
                  className="registration__input"
                  placeholder="First name"
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />

                {firstNameErrorMessage && (
                  <p className="error">{firstNameErrorMessage}</p>
                )}
                {firstNameSuccessMessage && (
                  <p className="success">{firstNameSuccessMessage}</p>
                )}
              </div>

              <div>
                <input
                  className="registration__input"
                  placeholder="Last name"
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />

                {lastNameErrorMessage && (
                  <p className="error">{lastNameErrorMessage}</p>
                )}
                {lastNameSuccessMessage && (
                  <p className="success">{lastNameSuccessMessage}</p>
                )}
              </div>

              <div>
                <input
                  className="registration__input"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />

                {emailErrorMessage && (
                  <p className="error">{emailErrorMessage}</p>
                )}
                {emailSuccessMessage && (
                  <p className="success">{emailSuccessMessage}</p>
                )}
              </div>

              <div className="registration__label-container">
                <label className="registration__label">
                  <input
                    className="registration__input registration__input--password"
                    placeholder="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className={cn(
                      'login__password-show-btn password-show-btn',
                      {
                        'password-show-btn--disabled': !password,
                        'password-show-btn--enabled': password,
                      },
                    )}
                    disabled={!password}
                  ></button>
                </label>

                {passwordErrorMessage && (
                  <p className="error">{passwordErrorMessage}</p>
                )}
                {passwordSuccessMessage && (
                  <p className="success">{passwordSuccessMessage}</p>
                )}
              </div>

              <div className="registration__label-container">
                <label className="registration__label">
                  <input
                    className="registration__input registration__input--password-repeat"
                    placeholder="Confirm password"
                    type="password"
                    onChange={e => setRepeatPassword(e.target.value)}
                    value={repeatPassword}
                  />
                  <button
                    type="button"
                    onClick={handleToggleRepeatPassword}
                    className={cn(
                      'registration__password-show-btn password-show-btn password-show-btn--repeat',
                      {
                        'password-show-btn--disabled': !repeatPassword,
                        'password-show-btn--enabled': repeatPassword,
                      },
                    )}
                    disabled={!repeatPassword}
                  ></button>
                </label>

                {repeatPasswordErrorMessage && (
                  <p className="error">{repeatPasswordErrorMessage}</p>
                )}
                {repeatPasswordSuccessMessage && (
                  <p className="success">{repeatPasswordSuccessMessage}</p>
                )}
              </div>
            </div>

            <div className="registration__button-container">
              <button
                type="submit"
                className={cn('registration__contact-button contact-button', {
                  'contact-button--disabled': submitButtonDisabled,
                })}
                disabled={submitButtonDisabled}
              >
                {t('Continue')}
              </button>

              {errorMessage && (
                <p className="login__error error">{errorMessage}</p>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* <main className="registration">
        <div className="registration__container">
          <h2>REGISTRATION</h2>
          <form onSubmit={handleSubmit} action="#">
            {errorMessage && <p>Registration failed</p>}
            <div>
              <label htmlFor="first-name">Ім`я</label>
              <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                type="text"
                id="first-name"
              />
            </div>

            <div>
              <label htmlFor="last-name">Прізвище</label>
              <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                type="text"
                id="last-name"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
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

            <div>
              <label htmlFor="password-control">Підтвердження паролю</label>
              <input
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
                type="password"
                id="password-control"
              />
            </div>

            <button className="contact-button">Зареєструватися</button>
          </form>
        </div>
      </main> */}
    </>
  );
};
