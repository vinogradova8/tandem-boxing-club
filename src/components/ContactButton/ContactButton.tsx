import React from 'react';
import './ContactButton.scss';
import { useTranslation } from 'react-i18next';

export const ContactButton: React.FC = ({}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="contact-us-bottom">
        <a
          className="contact-us-bottom__contact-button contact-button"
          target="_blanc"
          href="https://wa.me/380509987274"
        >
          {t('Contact us')}
        </a>
      </div>
    </>
  );
};
