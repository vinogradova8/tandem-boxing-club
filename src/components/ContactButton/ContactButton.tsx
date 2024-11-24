import React from 'react';
import './ContactButton.scss';
import { useTranslation } from 'react-i18next';

export const ContactButton: React.FC = ({}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="contact-us-bottom">
        <div className="contact-us-bottom__container"></div>

        <button className="contact-us-bottom__contact-button contact-button">
          <a target="_blanc" href="https://wa.me/380509987274">
            {t('Contact us')}
          </a>
        </button>
      </div>
    </>
  );
};
