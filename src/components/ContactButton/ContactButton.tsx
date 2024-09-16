import React, { useContext } from 'react';
import './ContactButton.scss';
import { useTranslation } from 'react-i18next';
import { ItemsContext } from '../../ItemsContext';
import { ModalWindow } from '../ModalWindow';

export const ContactButton: React.FC = ({}) => {
  const { t } = useTranslation();
  const { isModalWindowOpen, setIsModalWindowOpen } = useContext(ItemsContext);

  return (
    <>
      {isModalWindowOpen && <ModalWindow />}

      <div className="contact-us-bottom">
        <button
          onClick={() => {
            setIsModalWindowOpen(true);
          }}
          className="contact-us-bottom__contact-button contact-button"
        >
          {t('Contact us')}
        </button>
      </div>
    </>
  );
};
