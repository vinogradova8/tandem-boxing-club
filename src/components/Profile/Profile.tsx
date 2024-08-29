import React, { useContext, useEffect, useState } from 'react';
import './Profile.scss';
import { ItemsContext } from '../../ItemsContext';
import { User } from '../../types/User';
import { getUser } from '../../api/fetchClient';

export const Profile: React.FC = ({}) => {
  const { auth } = useContext(ItemsContext);

  const [user, setUser] = useState<User | null>(null);

  const id = auth.id.toString();

  useEffect(() => {
    getUser(id).then(() => setUser);
  }, [id]);

  return (
    <>
      <main className="profile">
        <div className="profile__container">
          <p>YOUR PROFILE</p>
          <p>{user?.firstName}</p>
          <p>{user?.lastName}</p>
          <p>{user?.age}</p>
        </div>
      </main>
    </>
  );
};
