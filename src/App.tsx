import React from 'react';
import './App.scss';
import './i18n';
import { Header } from './components/Header';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const { currentId } = useParams();

  if (currentId === 'home') {
    return <Navigate to=".." />;
  }

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
