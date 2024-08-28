import React from 'react';
import './Profile.scss';

export const Profile: React.FC = ({}) => {
  return (
    <>
      <main className="profile">
        <div className="profile__container">
          <p>Profile</p>
          <form className="form" action="#">
            <input type="email" />
            <input type="password" />
          </form>
        </div>
      </main>
    </>
  );
};
