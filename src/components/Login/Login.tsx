import React, { useContext, useState } from 'react';
import './Login.scss';
import { NavLink } from 'react-router-dom';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';
import { RoleName } from '../../types/RoleName';

export const Login: React.FC = ({}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { auth, setAuth } = useContext(ItemsContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/login',
        JSON.stringify({
          login,
          password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const accessToken = response.data.accessToken;
      const role = response.data.role;

      setAuth({ login, password, role, accessToken });

      // console.log(JSON.stringify(response.data));
      // setAccessToken(response.data.accessToken);
      setSuccess(true);
    } catch {
      setErrorMessage(true);
    }
  };

  return (
    <>
      <main className="profile">
        <div className="profile__container">
          <p>LOGIN</p>
          {success ? (
            <>
              <p>You are logged in!</p>
              <p>Go to your profile</p>
              {auth.role === RoleName.ADMIN ? (
                <NavLink to="/admin" className="header__profile">
                  Admin page
                </NavLink>
              ) : (
                <NavLink to="/profile" className="header__profile">
                  profile
                </NavLink>
              )}
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="form" action="#">
                {errorMessage && <p>Log in failed!</p>}
                <div>
                  <label htmlFor="email">Логін (пошта)</label>
                  <input
                    value={login}
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

                <button className="contact-button">Вхiд</button>
              </form>

              <p>Ви ще не зареєстровані?</p>
              <NavLink to="/registration">Зареєструватися</NavLink>
            </>
          )}
        </div>
      </main>
    </>
  );
};
