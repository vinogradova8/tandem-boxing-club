import React, { useContext, useState } from 'react';
import './Profile.scss';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';
import { NavLink } from 'react-router-dom';
// import { User } from '../../types/User';
// import { getUser } from '../../api/fetchClient';

export const Profile: React.FC = ({}) => {
  const [successLogOut, setSuccessLogOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { user, accessToken, setAccessToken } = useContext(ItemsContext);

  const { login, password, firstName, lastName } = user;

  const refreshToken = () => {
    setInterval(async () => {
      const response = await axios.post(
        '/refresh',
        JSON.stringify({
          login,
          password,
        }),
        {
          headers: { Authorization: accessToken },
        },
      );

      setAccessToken(response.data.accessToken);
    }, 10800000);
  };

  refreshToken();

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        '/logout',
        JSON.stringify({
          login,
          password,
        }),
        {
          headers: { Authorization: accessToken },
        },
      );

      setAccessToken(response.data.accessToken);
      setSuccessLogOut(true);
    } catch {
      setErrorMessage(true);
    }
  };

  return (
    <>
      <main className="profile">
        <div className="profile__container">
          {errorMessage && <p>Log out failed!</p>}
          {successLogOut ? (
            <>
              <p>You are logged out!</p>
              <p>Go to</p>
              <NavLink to="/login" className="header__profile">
                log in page
              </NavLink>
            </>
          ) : (
            <>
              <p>YOUR PROFILE</p>
              <p>{firstName}</p>
              <p>{lastName}</p>
              <button onClick={handleLogOut}>Log out</button>
            </>
          )}
        </div>
      </main>
    </>
  );
};
