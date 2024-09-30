/* eslint-disable max-len */
// import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.scss';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { Support } from './components/Support';
import { Team } from './components/Team';
import { Gallery } from './components/Gallery';
import { FAQ } from './components/FAQ';
import { Contacts } from './components/Contacts';
import { Profile } from './components/Profile';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { AdminPage } from './components/AdminPage';
import { NotFoundPage } from './components/NotFoundPage';
import { ItemsProvider } from './ItemsContext';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// createRoot(document.getElementById('root') as HTMLDivElement).render(<App />);

createRoot(document.getElementById('root') as HTMLElement).render(
  <ItemsProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="support-us" element={<Support />}></Route>
          <Route path="team" element={<Team />}></Route>
          <Route path="gallery" element={<Gallery />}></Route>
          <Route path="faq" element={<FAQ />}></Route>
          <Route path="сontacts" element={<Contacts />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="registration" element={<Registration />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="admin" element={<AdminPage />}></Route>

          <Route
            path="*"
            element={<NotFoundPage message="Page not found" />}
          ></Route>
        </Route>
      </Routes>
    </HashRouter>
  </ItemsProvider>,
);
