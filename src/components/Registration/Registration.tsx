import React, { useContext, useState } from 'react';
import './Registration.scss';
import axios from '../../api/axios';
import { ItemsContext } from '../../ItemsContext';

export const Registration: React.FC = ({}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { setAuth } = useContext(ItemsContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/register',
        JSON.stringify({
          firstName,
          lastName,
          age,
          login,
          password,
          controlPassword,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );

      const id = response.data.id;
      const accessToken = response.data.accessToken;

      setAuth({ login, password, id, accessToken });
      setSuccess(true);
    } catch {
      setErrorMessage(true);
    }
  };

  return (
    <main className="registration">
      <div className="registration__container">
        <h2>REGISTRATION</h2>
        {success ? (
          <p>Success!</p>
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

            {/* <div>
            <label htmlFor="sex">Стать</label>
            <input type="text" id="sex" />
          </div> */}

            <div>
              <label htmlFor="age">Вік</label>
              <input
                value={age}
                onChange={e => setAge(e.target.value)}
                type="text"
                id="sex"
              />
            </div>

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

            <div>
              <label htmlFor="password-control">Перевірка паролю</label>
              <input
                value={controlPassword}
                onChange={e => setControlPassword(e.target.value)}
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
