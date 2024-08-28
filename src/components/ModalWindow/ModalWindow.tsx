import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';
import cn from 'classnames';
import '../../i18n';
import './ModalWindow.scss';
import { ItemsContext } from '../../ItemsContext';
import { useTranslation } from 'react-i18next';

const portal = document.getElementById('portal') as HTMLElement;

export const ModalWindow: React.FC = ({}) => {
  const { setIsModalWindowOpen } = useContext(ItemsContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [bodyErrorMessage, setBodyErrorMessage] = useState('');

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const app = document.querySelector('.app');

  const { t } = useTranslation();

  const handleCloseModalWindow = () => {
    setIsModalWindowOpen(false);
    app?.classList.remove('fixed');
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    if (!name) {
      setNameErrorMessage('Please enter your name');
    } else {
      setNameErrorMessage('');
    }

    if (!email) {
      setEmailErrorMessage('Please enter your email');
    }

    if (email && !email.match(regex)) {
      setEmailErrorMessage('Invalid email address');
    }

    if (email && email.match(regex)) {
      setEmailErrorMessage('');
    }

    if (!body) {
      setBodyErrorMessage('Please enter your message');
    }

    if (body && body.length < 10) {
      setBodyErrorMessage('Message should have at least 10 chars');
    }

    if (body && body.length >= 10) {
      setBodyErrorMessage('');
    }

    if (
      nameErrorMessage ||
      emailErrorMessage ||
      bodyErrorMessage ||
      !name ||
      !email ||
      !body
    ) {
      event.preventDefault();
    } else {
      return true;
    }

    return false;
  };

  return createPortal(
    <div className="modal-window">
      <div className="modal-window__container">
        <button
          onClick={handleCloseModalWindow}
          className="modal-window__close"
          type="button"
        >
          Close
        </button>

        <form onSubmit={handleSubmit} action="#" className="modal-window__form">
          <p>{t('Contact us')}</p>

          <div>
            <input
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Your name"
              name="name"
              className={cn('input', {
                danger: nameErrorMessage,
              })}
            />
            {nameErrorMessage && <p className="error">{nameErrorMessage}</p>}
          </div>

          <div>
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="Your email"
              name="email"
              className={cn('input', {
                danger: emailErrorMessage,
              })}
            />
            {emailErrorMessage && <p className="error">{emailErrorMessage}</p>}
          </div>

          <div>
            <TextareaAutosize
              onChange={e => setBody(e.target.value)}
              value={body}
              placeholder="Message"
              name="message"
              className={cn('textarea', {
                danger: bodyErrorMessage,
              })}
              maxRows={6}
            />
            {bodyErrorMessage && <p className="error">{bodyErrorMessage}</p>}
          </div>

          <button
            type="submit"
            className={cn('modal-window__contact-button contact-button', {
              // 'contact-button--disabled': isSubmitButtonDisabled,
            })}
            // disabled={isSubmitButtonDisabled}
          >
            Send
          </button>
        </form>

        <div className="modal-window__footer">
          <p>or you can contact us via</p>

          <div>
            <ul className="modal-window__list">
              <li>
                <a className="modal-window__link" href="#">
                  Instagram
                </a>
              </li>
              <li>
                <a className="modal-window__link" href="#">
                  Email
                </a>
              </li>
              <li>
                <a className="modal-window__link" href="#">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>,
    portal,
  );
};
