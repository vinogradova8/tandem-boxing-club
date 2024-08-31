import React, { useContext, useEffect, useState } from 'react';
import './Profile.scss';
import { ItemsContext } from '../../ItemsContext';
import { User } from '../../types/User';
import { getUser } from '../../api/fetchClient';

export const Profile: React.FC = ({}) => {
  const { auth } = useContext(ItemsContext);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(`/${auth.login}`, auth.accessToken).then(() => setUser);
  }, [auth.accessToken, auth.login]);

  return (
    <>
      <main className="profile">
        <div className="profile__container">
          <p>YOUR PROFILE</p>
          <p>{user?.firstName}</p>
          <p>{user?.lastName}</p>
        </div>
      </main>
    </>
  );
};
