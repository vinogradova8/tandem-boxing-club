import React, { useContext, useState } from 'react';
import './Login.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';
// import { RoleName } from '../../types/RoleName';

export const Login: React.FC = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  // const [refreshErrorMessage, setRefreshErrorMessage] = useState(false);

  const { setUser, setAccessToken } = useContext(ItemsContext);
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
      <main className="profile">
        <div className="profile__container">
          <p>LOGIN</p>
          <form onSubmit={handleSubmit} className="form" action="#">
            {errorMessage && <p>Log in failed!</p>}
            {/* {refreshErrorMessage && <p>Something went wrong!</p>} */}
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
        </div>
      </main>
    </>
  );
};
