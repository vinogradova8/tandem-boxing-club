import React, { useContext, useEffect } from 'react';
import './BurgerWindow.scss';
import { createPortal } from 'react-dom';
import { ItemsContext } from '../../ItemsContext';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

const portal = document.getElementById('portal') as HTMLElement;

export const BurgerWindow: React.FC = ({}) => {
  const { setIsBurgerWindowOpen, isBurgerWindowOpen } =
    useContext(ItemsContext);

  const bodyTag = document.querySelector('body');

  const { t } = useTranslation();

  const links = [
    [t('Home'), 'home'],
    [t('Team'), 'team'],
    [t('FAQ'), 'faq'],
    [t('Gallery'), 'gallery'],
    [t('Support'), 'support-us'],
    [t('Contacts'), 'сontacts'],
  ];

  useEffect(() => {
    if (isBurgerWindowOpen) {
      bodyTag?.classList.add('fixed');
    }

    if (!isBurgerWindowOpen) {
      bodyTag?.classList.remove('fixed');
    }
  }, [bodyTag?.classList, isBurgerWindowOpen]);

  const handleCloseBurgerWindow = () => {
    setIsBurgerWindowOpen(false);
    bodyTag?.classList.remove('fixed');
  };

  return createPortal(
    <div className="burger">
      <div className="burger__container">
        <button
          onClick={handleCloseBurgerWindow}
          className="burger__close"
          type="button"
        ></button>

        <nav className="burger__navigation">
          <ul className="burger__navigation-list">
            {links.map(link => (
              <li className="burger__navigation-item" key={link[0]}>
                <NavLink
                  to={link[1] === 'home' ? `/` : `/${link[1]}`}
                  className={({ isActive }) =>
                    cn('burger__menu-link', {
                      'burger__menu-link--active': isActive,
                    })
                  }
                  onClick={() => {
                    setIsBurgerWindowOpen(false);
                    bodyTag?.classList.remove('fixed');
                  }}
                >
                  {link[0]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>,
    portal,
  );
};
