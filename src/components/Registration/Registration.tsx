import React, { useContext, useState } from 'react';
import './Registration.scss';
import axios from '../../api/axios';
import { ItemsContext } from '../../ItemsContext';
import { NavLink } from 'react-router-dom';
import { RoleName } from '../../types/RoleName';

export const Registration: React.FC = ({}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { user, setUser, setAccessToken } = useContext(ItemsContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        '/auth/registration',
        JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          repeatPassword,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      setSuccess(true);

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

      const role = response.data.role;
      const id = response.data.id;
      const currentFirstName = response.data.firstName;
      const currenLastName = response.data.lastName;

      setUser({
        id,
        firstName: currentFirstName,
        lastName: currenLastName,
        role,
        email,
        password,
      });

      // setUser({
      //   id,
      //   firstName: currentFirstName,
      //   lastName: currenLastName,
      //   email,
      //   password,
      // });

      setAccessToken(response.data.accessToken);
    } catch {
      setErrorMessage(true);
    }
  };

  return (
    <main className="registration">
      <div className="registration__container">
        <h2>REGISTRATION</h2>
        {success ? (
          <>
            <p>Success!</p>
            <p>Go to your profile</p>
            {user.role === RoleName.ADMIN ? (
              <NavLink to="/admin">Admin page</NavLink>
            ) : (
              <NavLink to="/login">profile</NavLink>
            )}

            {/* <NavLink to="/login">
              profile
            </NavLink> */}
          </>
        ) : (
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
              <label htmlFor="email">Логін (пошта)</label>
              <input
                value={email}
                onChange={e => setLogin(e.target.value)}
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
              <label htmlFor="password-control">Перевірка паролю</label>
              <input
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
                type="password"
                id="password-control"
              />
            </div>

            <button className="contact-button">Зареєструватися</button>
          </form>
        )}
      </div>
    </main>
  );
};
