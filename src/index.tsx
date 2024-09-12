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

// createRoot(document.getElementById('root') as HTMLDivElement).render(<App />);

createRoot(document.getElementById('root') as HTMLElement).render(
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
          // element={
          //   <h3 style={{ padding: 30 }} className="title">
          //     Page not found
          //   </h3>
          // }
        ></Route>
        {/* <Route path="phones">
          <Route index element={<PhonesPage />}></Route>
          <Route
            path=":itemId"
            element={<ProductDetailsPage productPage="Phones" />}
          ></Route>
        </Route>
        <Route path="tablets">
          <Route index element={<TabletsPage />}></Route>
          <Route
            path=":itemId"
            element={<ProductDetailsPage productPage="Tablets" />}
          ></Route>
        </Route>
        <Route path="accessories">
          <Route index element={<AccessoriesPage />}></Route>
          <Route
            path=":itemId"
            element={<ProductDetailsPage productPage="Accessories" />}
          ></Route>
        </Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="favorites" element={<Favorites />}></Route> */}
      </Route>

      {/* <Route
        path="*"
        element={<NotFoundPage />}
        // element={
        //   <h3 style={{ padding: 30 }} className="title">
        //     Page not found
        //   </h3>
        // }
      ></Route> */}
    </Routes>
  </HashRouter>,
);
