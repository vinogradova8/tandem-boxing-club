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
import { NotFoundPage } from './components/NotFoundPage';
import { ItemsProvider } from './ItemsContext';

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
          <Route
            path="*"
            element={<NotFoundPage message="Page not found!" />}
          ></Route>
        </Route>
      </Routes>
    </HashRouter>
  </ItemsProvider>,
);
