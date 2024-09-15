import React, { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';
import cn from 'classnames';
import '../../i18n';
import './ModalWindow.scss';
import { ItemsContext } from '../../ItemsContext';
import { useTranslation } from 'react-i18next';
import axios from '../../api/axios';

const portal = document.getElementById('portal') as HTMLElement;

export const ModalWindow: React.FC = ({}) => {
  const { setIsModalWindowOpen, isModalWindowOpen } = useContext(ItemsContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [bodyErrorMessage, setBodyErrorMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const bodyTag = document.querySelector('body');

  useEffect(() => {
    if (isModalWindowOpen) {
      bodyTag?.classList.add('fixed');
    }

    if (!isModalWindowOpen) {
      bodyTag?.classList.remove('fixed');
    }
  }, [bodyTag?.classList, isModalWindowOpen]);

  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const NAME_REGEX = /^[a-zA-Zа-яА-Яії]{2,22}$/g;

  // const app = document.querySelector('.app');

  const { t } = useTranslation();

  const handleCloseModalWindow = () => {
    setIsModalWindowOpen(false);
    bodyTag?.classList.remove('fixed');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (!name) {
      setNameErrorMessage('Please enter your name');
    }

    if (
      name &&
      (name.length < 2 || !name.match(NAME_REGEX) || name.length > 22)
    ) {
      setNameErrorMessage(
        'Name should have from 2 to 22 chars and contain only letters',
      );
    }

    if (name.match(NAME_REGEX) && name.length >= 2 && name.length <= 22) {
      setNameErrorMessage('');
    }

    if (!email) {
      setEmailErrorMessage('Please enter your email');
    }

    if (email && !email.match(EMAIL_REGEX)) {
      setEmailErrorMessage('Invalid email address');
    }

    if (email.match(EMAIL_REGEX)) {
      setEmailErrorMessage('');
    }

    if (!body) {
      setBodyErrorMessage('Please enter your message');
    }

    if (body && body.length < 10) {
      setBodyErrorMessage('Message should have at least 10 chars');
    }

    if (body.length >= 10) {
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
      return false;
    }

    try {
      await axios.post(
        '/messages',
        JSON.stringify({
          name,
          email,
          message: body,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      setIsModalWindowOpen(false);
    } catch {
      setErrorMessage(true);
    }

    return true;
  };

  // const submitForm = async () => {
  //   // event.preventDefault();

  //   if (!name) {
  //     setNameErrorMessage('Please enter your name');
  //   }

  //   if (
  //     name &&
  //     (name.length < 2 || !name.match(NAME_REGEX) || name.length > 22)
  //   ) {
  //     setNameErrorMessage(
  //       'Name should have from 2 to 22 chars and contain only letters',
  //     );
  //   }

  //   if (name.match(NAME_REGEX) && name.length >= 2 && name.length <= 22) {
  //     setNameErrorMessage('');
  //   }

  //   if (!email) {
  //     setEmailErrorMessage('Please enter your email');
  //   }

  //   if (email && !email.match(EMAIL_REGEX)) {
  //     setEmailErrorMessage('Invalid email address');
  //   }

  //   if (email.match(EMAIL_REGEX)) {
  //     setEmailErrorMessage('');
  //   }

  //   if (!body) {
  //     setBodyErrorMessage('Please enter your message');
  //   }

  //   if (body && body.length < 10) {
  //     setBodyErrorMessage('Message should have at least 10 chars');
  //   }

  //   if (body.length >= 10) {
  //     setBodyErrorMessage('');
  //   }

  //   if (
  //     nameErrorMessage ||
  //     emailErrorMessage ||
  //     bodyErrorMessage ||
  //     !name ||
  //     !email ||
  //     !body
  //   ) {
  //     return false;
  //   }

  //   try {
  //     await axios.post(
  //       '/messages',
  //       JSON.stringify({
  //         name,
  //         email,
  //         message: body,
  //       }),
  //       {
  //         headers: { 'Content-Type': 'application/json' },
  //       },
  //     );

  //     setIsModalWindowOpen(false);
  //   } catch {
  //     setErrorMessage(true);
  //   }

  //   return true;
  // };

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
        {errorMessage && <p>Send message failed</p>}

        <form
          onSubmit={handleSubmit}
          // action="http://localhost:8088/messages"
          className="modal-window__form"
        >
          <p className="modal-window__title">{t('Contact us')}</p>

          <div>
            <input
              ref={inputRef}
              autoComplete="off"
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Your name"
              name="name"
              className={cn('modal-window__input', {
                danger: nameErrorMessage,
              })}
            />
            {nameErrorMessage && <p className="error">{nameErrorMessage}</p>}
          </div>

          <div>
            <input
              autoComplete="off"
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="Your email"
              name="email"
              className={cn('modal-window__input', {
                danger: emailErrorMessage,
              })}
            />
            {emailErrorMessage && <p className="error">{emailErrorMessage}</p>}
          </div>

          <div className="modal-window__textarea-box">
            <TextareaAutosize
              onChange={e => setBody(e.target.value)}
              value={body}
              placeholder="Message"
              name="message"
              className={cn('modal-window__textarea', {
                danger: bodyErrorMessage,
              })}
              maxRows={2}
            />
            {bodyErrorMessage && <p className="error">{bodyErrorMessage}</p>}
          </div>

          <button
            // onClick={submitForm}
            type="submit"
            className={cn('modal-window__button', {
              'modal-window__button--disabled': !name || !email || !body,
            })}
            // disabled={isSubmitButtonDisabled}
          >
            Send
          </button>
        </form>

        <div className="modal-window__footer">
          <p className="modal-window__text">or you can contact us via</p>

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
