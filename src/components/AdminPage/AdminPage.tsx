/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './AdminPage.scss';
import { useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';
import { LOCALS } from '../../i18n/constants';
import i18next from 'i18next';
import { Question } from '../../types/Questions';
import { Loader } from '../Loader';
import { NotFoundPage } from '../NotFoundPage';
import cn from 'classnames';
import { Message } from '../../types/Message';

export const AdminPage: React.FC = ({}) => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken, user, setUser } =
    useContext(ItemsContext);

  const [logoutErrorMessage, setLogoutErrorMessage] = useState(false);
  const [refreshErrorMessage, setRefreshErrorMessage] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);

  const [faqs, setFaqs] = useState<Question[]>([]);
  const [questionsFromUsers, setQuestionsFromUsers] = useState<Message[]>([]);
  const [errorQuestionsFromUsers, setErrorQuestionsFromUsers] = useState(false);

  const [loader, setLoader] = useState(false);

  const [hideQuestions, setHideQuestions] = useState(true);
  const [hideQuestionsFromUsers, setHideQuestionsFromUsers] = useState(true);

  const [questionToEditId, setquestionToEditId] = useState<number | null>(null);

  const [questionToEdit, setquestionToEdit] = useState('');
  const [shortAnswerToEdit, setShortAnswerToEdit] = useState('');
  const [fullAnswerToEdit, setFullAnswerToEdit] = useState('');

  // const { firstName, lastName } = user;

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post(
        '/auth/refresh',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },
        },
      );

      setAccessToken(response.data.token);
    } catch {
      setRefreshErrorMessage(true);
    }
  }, [accessToken, setAccessToken, setRefreshErrorMessage]);

  // useEffect(() => {
  //   let refreshTokenInterval;

  //   if (accessToken) {
  //     refreshToken();

  //     refreshTokenInterval = setInterval(() => {
  //       refreshToken();
  //     }, 180000);
  //   }

  //   return () => {
  //     clearInterval(refreshTokenInterval);
  //   };
  // }, [refreshToken]);

  useEffect(() => {
    const refreshTokenInterval = setInterval(() => {
      refreshToken();
    }, 180000);

    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, [refreshToken]);

  const handleLogOut = async () => {
    try {
      await axios.post(
        '/auth/logout',
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      setAccessToken('');
      setUser(null);
      navigate('/login');
    } catch {
      setLogoutErrorMessage(true);
    }
  };

  const getQuestionsEng = async () => {
    try {
      const response = await axios.get('/questions/eng');

      setFaqs(response.data);
    } catch {
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  const getQuestionsDeu = async () => {
    try {
      const response = await axios.get('/questions/deu');

      setFaqs(response.data);
    } catch {
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  const getQuestionsUkr = async () => {
    try {
      const response = await axios.get('/questions/ukr');

      setFaqs(response.data);
    } catch {
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  const getQuestionsFromUsers = async () => {
    try {
      const response = await axios.get('/messages', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setQuestionsFromUsers(response.data);
    } catch {
      setErrorQuestionsFromUsers(true);
    } finally {
      setLoader(false);
    }
  };

  const deleteQuestionFromUser = async (id: number) => {
    try {
      await axios.delete(`/messages/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch {
      setErrorQuestionsFromUsers(true);
    }
  };

  useEffect(() => {
    setLoader(true);

    if (i18next.language === LOCALS.ENG) {
      getQuestionsEng();
    }

    if (i18next.language === LOCALS.DEU) {
      getQuestionsDeu();
    }

    if (i18next.language === LOCALS.UKR) {
      getQuestionsUkr();
    }
  }, [i18next.language]);

  useEffect(() => {
    getQuestionsFromUsers();
  }, []);

  return (
    <>
      {!errorMessage && loader && <Loader />}
      {errorMessage ? (
        <NotFoundPage message="Something went wrong" />
      ) : (
        <main className="admin-page">
          <div className="admin-page__container">
            <h2 className="big-title">Admin Page</h2>
            <div className="admin-page__info">
              <p>{accessToken}</p>
              <h3>Personal info</h3>
              <p>{user?.email}</p>
              <p>{user?.firstName}</p>
              <p>{user?.lastName}</p>
              {refreshErrorMessage && <p>Something went wrong!</p>}
              {logoutErrorMessage && <p>Log out failed!</p>}
              <button className="logout-button" onClick={handleLogOut}>
                Log out
              </button>
            </div>

            <div className="admin-page__faqs admin-faqs">
              <div className="admin-faqs__header">
                <h3>Frequently asked questions</h3>
                {hideQuestions ? (
                  <button
                    className="admin-faqs__hide-button"
                    onClick={() => setHideQuestions(!hideQuestions)}
                  >
                    See questions
                  </button>
                ) : (
                  <button
                    className="admin-faqs__hide-button"
                    onClick={() => setHideQuestions(!hideQuestions)}
                  >
                    Hide questions
                  </button>
                )}
              </div>

              {!hideQuestions && (
                <ul className="admin-faqs__list">
                  {faqs.map(faq => (
                    <li
                      className={cn('admin-faqs__item faq-item', {
                        edit: faq.id === questionToEditId,
                      })}
                      key={faq.id}
                    >
                      <p className="faq-item__question">{faq.question}</p>
                      <p className="faq-item__short-answer">
                        {faq.shortAnswer}
                      </p>
                      <p className="faq-item__full-answer">{faq.fullAnswer}</p>

                      <div className="faq-item__actions">
                        <button className="faq-item__delete">delete</button>
                        <button
                          className="faq-item__update"
                          onClick={() => {
                            if (questionToEditId === faq.id) {
                              setquestionToEditId(null);
                              setquestionToEdit('');
                              setShortAnswerToEdit('');
                              setFullAnswerToEdit('');
                            } else {
                              setquestionToEditId(faq.id);
                              setquestionToEdit(faq.question);
                              setShortAnswerToEdit(faq.shortAnswer);
                              setFullAnswerToEdit(faq.fullAnswer);
                            }
                          }}
                        >
                          update
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {!hideQuestions && questionToEdit && (
                <form action="#" className="admin-faqs__form edit-form">
                  <h3>Edit a question</h3>

                  <div>
                    <div>
                      <label
                        className="edit-form__label"
                        htmlFor="edit-question"
                      >
                        Question
                      </label>
                      <input
                        id="edit-question"
                        className="edit-form__question"
                        type="text"
                        value={questionToEdit}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-short-answer"
                        className="edit-form__label"
                      >
                        Short answer
                      </label>
                      <input
                        id="edit-short-answer"
                        className="edit-form__short-answer"
                        type="text"
                        value={shortAnswerToEdit}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-full-answer"
                        className="edit-form__label"
                      >
                        Full answer
                      </label>
                      <textarea
                        id="edit-full-answer"
                        className="edit-form__full-answer"
                        rows={10}
                        value={fullAnswerToEdit}
                      />
                    </div>

                    <div className="edit-form__actions">
                      <button className="edit-form__save-button">Save</button>
                      <button className="edit-form__cancel-button">
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {!questionToEdit && !hideQuestions && (
                <form action="#" className="admin-faqs__form create-form">
                  <h3>Create a question</h3>

                  <div>
                    <div>
                      <label
                        className="edit-form__label"
                        htmlFor="edit-question"
                      >
                        Question
                      </label>
                      <input
                        id="edit-question"
                        className="edit-form__question"
                        type="text"
                        value={questionToEdit}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-short-answer"
                        className="edit-form__label"
                      >
                        Short answer
                      </label>
                      <input
                        id="edit-short-answer"
                        className="edit-form__short-answer"
                        type="text"
                        value={shortAnswerToEdit}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-full-answer"
                        className="edit-form__label"
                      >
                        Full answer
                      </label>
                      <textarea
                        id="edit-full-answer"
                        className="edit-form__full-answer"
                        rows={10}
                        value={fullAnswerToEdit}
                      />
                    </div>

                    <div className="edit-form__actions">
                      <button className="edit-form__save-button">Create</button>
                      <button className="edit-form__cancel-button">
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            <div
              className="admin-page__contact-form-questions
					 contact-form-questions"
            >
              <div className="contact-form-questions__header">
                <h3>Questions from users</h3>
                {hideQuestionsFromUsers ? (
                  <button
                    className="admin-faqs__hide-button"
                    onClick={() =>
                      setHideQuestionsFromUsers(!hideQuestionsFromUsers)
                    }
                  >
                    See questions
                  </button>
                ) : (
                  <button
                    className="admin-faqs__hide-button"
                    onClick={() =>
                      setHideQuestionsFromUsers(!hideQuestionsFromUsers)
                    }
                  >
                    Hide questions
                  </button>
                )}
              </div>

              {errorQuestionsFromUsers && <p>Something went wrong</p>}
              {!hideQuestionsFromUsers && (
                <ul className="contact-form-questions__list">
                  {questionsFromUsers.map(questionItem => (
                    <li
                      className="contact-form-questions__item contact-form-item"
                      key={questionItem.id}
                    >
                      <p className="contact-form-item__name">
                        {questionItem.name}
                      </p>
                      <p className="contact-form-item__email">
                        {questionItem.email}
                      </p>
                      <p className="contact-form-item__message">
                        {questionItem.message}
                      </p>
                      <button
                        className="contact-form-item__delete"
                        onClick={() => deleteQuestionFromUser(questionItem.id)}
                      >
                        delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* {!hideQuestionsFromUsers && (
                <ul className="contact-form-questions__list">
                  <li
                    className="contact-form-questions__item 
									contact-form-item"
                  >
                    <div className="contact-form-item__data">
                      <p className="contact-form-item__name">ім&aposя</p>
                      <p className="contact-form-item__email">email-1</p>
                      <p className="contact-form-item__message">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Recusandae vel numquam officia debitis illo dolorem
                        assumenda id minus iusto illum.
                      </p>
                    </div>

                    <button className="contact-form-item__delete">
                      delete
                    </button>
                  </li>

                  <li
                    className="contact-form-questions__item 
									contact-form-item"
                  >
                    <div className="contact-form-item__data">
                      <p className="contact-form-item__name">ім&aposя</p>
                      <p className="contact-form-item__email">email-2</p>
                      <p className="contact-form-item__message">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Possimus temporibus harum accusamus inventore,
                        reiciendis rem ullam placeat repellendus id delectus!
                      </p>
                    </div>

                    <button className="contact-form-item__delete">
                      delete
                    </button>
                  </li>

                  <li
                    className="contact-form-questions__item 
									contact-form-item"
                  >
                    <div className="contact-form-item__data">
                      <p className="contact-form-item__name">ім&aposя</p>
                      <p className="contact-form-item__email">email-3</p>
                      <p className="contact-form-item__message">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Saepe magni fugiat quasi qui quae ex maxime
                        praesentium nam. Optio, neque?
                      </p>
                    </div>

                    <button className="contact-form-item__delete">
                      delete
                    </button>
                  </li>
                </ul>
              )} */}
            </div>
          </div>
        </main>
      )}
    </>
  );
};
