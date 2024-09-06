import React, { useContext, useState } from 'react';
import './Login.scss';
import { NavLink } from 'react-router-dom';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';
import { RoleName } from '../../types/RoleName';

export const Login: React.FC = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { user, setUser, setAccessToken } = useContext(ItemsContext);

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

      const role = response.data.role;
      const id = response.data.id;
      const firstName = response.data.firstName;
      const lastName = response.data.lastName;

      // console.log(response.data);

      setUser({ id, firstName, lastName, role, email, password });

      setAccessToken(response.data.accessToken);
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
              {user.role === RoleName.ADMIN ? (
                <NavLink to="/admin">Admin page</NavLink>
              ) : (
                <NavLink to="/profile">profile</NavLink>
              )}
            </>
          ) : (
            <>
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
              <NavLink to="/registration">Зареєструватися</NavLink>
            </>
          )}
        </div>
      </main>
    </>
  );
};
