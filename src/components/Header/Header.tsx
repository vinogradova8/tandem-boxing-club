import React, { useContext, useEffect, useState } from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import '../../i18n';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import i18next from 'i18next';
import { LOCALS } from '../../i18n/constants';
import { ItemsContext } from '../../ItemsContext';
import { RoleName } from '../../types/RoleName';
// import { ItemsContext } from '../../ItemsContext';

export const Header: React.FC = ({}) => {
  const { t } = useTranslation();

  const { setLanguage } = useContext(ItemsContext);

  const links = [
    [t('Home'), 'home'],
    [t('Team'), 'team'],
    [t('FAQ'), 'faq'],
    [t('Gallery'), 'gallery'],
    [t('Support'), 'support-us'],
    [t('Contacts'), 'сontacts'],
  ];

  const [isLanguageDropDownVisible, setIsLanguageDropDownVisible] =
    useState(false);

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const languages = [LOCALS.ENG, LOCALS.UKR, LOCALS.DEU];
  const { user, accessToken } = useContext(ItemsContext);

  const app = document.querySelector('.app');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsBurgerMenuOpen(false);
        app?.classList.remove('fixed');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [app?.classList, isBurgerMenuOpen]);

  return (
    <header className="header">
      <div className="header__container">
        <nav className="header__navigation">
          <ul className="header__navigation-list">
            {links.map(link => (
              <li key={link[0]}>
                <NavLink
                  to={link[1] === 'home' ? `/` : `/${link[1]}`}
                  // className="menu-link"
                  className={({ isActive }) =>
                    cn('menu-link', {
                      'menu-link--active': isActive,
                    })
                  }
                >
                  <div className="menu-link__slider">
                    <p className="menu-link__passive">{link[0]}</p>
                    <p className="menu-link__active">{link[0]}</p>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <div className="header__language-and-profile">
            <div className="header__language-drop-down  language-drop-down">
              <div className="language-drop-down__control-box">
                <div className="language-drop-down__language">
                  {i18next.language.toUpperCase()}
                </div>
                <button
                  type="button"
                  className={cn('language-drop-down__trigger', {
                    'language-drop-down__trigger--rotate-arrow':
                      isLanguageDropDownVisible,
                  })}
                  onClick={() =>
                    setIsLanguageDropDownVisible(!isLanguageDropDownVisible)
                  }
                ></button>
              </div>

              <div
                className={cn('language-drop-down__content', {
                  'language-drop-down__content--visible':
                    isLanguageDropDownVisible,
                })}
              >
                <ul className="language-drop-down__list">
                  {languages.map(language => (
                    <li
                      key={language}
                      className={cn('language-drop-down__item', {
                        'language-drop-down__item--disabled':
                          i18next.language === language,
                      })}
                      onClick={() => {
                        i18next.changeLanguage(language);
                        setIsLanguageDropDownVisible(
                          !isLanguageDropDownVisible,
                        );
                        setLanguage(language);
                      }}
                    >
                      {language.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {accessToken && user.role === RoleName.ADMIN && (
              <NavLink to="/admin" className="header__profile"></NavLink>
            )}

            {accessToken && user.role === RoleName.CUSTOMER && (
              <NavLink to="/profile" className="header__profile"></NavLink>
            )}

            {!accessToken && (
              <NavLink to="/login" className="header__profile"></NavLink>
            )}
          </div>

          <button
            type="button"
            className={cn('header__menu', {
              'header__menu--is-active': isBurgerMenuOpen,
            })}
            onClick={() => {
              setIsBurgerMenuOpen(!isBurgerMenuOpen);

              if (!isBurgerMenuOpen) {
                app?.classList.add('fixed');
              } else {
                app?.classList.remove('fixed');
              }
            }}
          ></button>
        </div>

        <div
          className={cn('header__burger', {
            'header__burger--visible': isBurgerMenuOpen,
          })}
        >
          <nav className="header__navigation header__navigation--burger">
            <ul
              className="header__navigation-list 
						header__navigation-list--burger"
            >
              {links.map(link => (
                <li key={link[0]}>
                  <NavLink
                    to={link[1] === 'home' ? `/` : `/${link[1]}`}
                    className={({ isActive }) =>
                      cn('menu-link menu-link--burger', {
                        'menu-link--active': isActive,
                      })
                    }
                    onClick={() => {
                      setIsBurgerMenuOpen(false);
                      app?.classList.remove('fixed');
                    }}
                  >
                    <div className="menu-link__slider">
                      <p className="menu-link__passive">{link[0]}</p>
                      <p className="menu-link__active">{link[0]}</p>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
