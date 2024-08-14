import React from 'react';
import './Footer.scss';
import { scrollToTop } from '../../api/fetchClient';

export const Footer: React.FC = ({}) => {
  return (
    <div className="footer">
      <div className="footer__container">
        <ul className="footer__list">
          <li>
            <a className="footer__link" href="#">
              Instagram
            </a>
          </li>
          <li>
            <a className="footer__link" href="#">
              Email
            </a>
          </li>
          <li>
            <a className="footer__link" href="#">
              Telegram
            </a>
          </li>
        </ul>

        <button className="button-top" onClick={scrollToTop}></button>
      </div>
    </div>
  );
};
