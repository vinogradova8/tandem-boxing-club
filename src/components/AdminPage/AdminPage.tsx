/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import './AdminPage.scss';
import { useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../ItemsContext';
import axios from '../../api/axios';
import { LOCALS } from '../../i18n/constants';
import TextareaAutosize from 'react-textarea-autosize';
import i18next from 'i18next';
import { Question } from '../../types/Questions';
import { Loader } from '../Loader';
import { NotFoundPage } from '../NotFoundPage';
import cn from 'classnames';
import { Message } from '../../types/Message';
import { useTranslation } from 'react-i18next';

export const AdminPage: React.FC = ({}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    accessToken,
    setAccessToken,
    user,
    setUser,
    refreshErrorMessage,
    setRefreshErrorMessage,
  } = useContext(ItemsContext);

  const [logoutErrorMessage, setLogoutErrorMessage] = useState(false);

  const [questionsErrorMessage, setQuestionsErrorMessage] = useState(false);

  const [faqs, setFaqs] = useState<Question[]>([]);
  const [questionsFromUsers, setQuestionsFromUsers] = useState<Message[]>([]);
  const [errorQuestionsFromUsers, setErrorQuestionsFromUsers] = useState(false);

  const [loader, setLoader] = useState(false);

  const [hideQuestions, setHideQuestions] = useState(true);
  const [hideQuestionsFromUsers, setHideQuestionsFromUsers] = useState(true);

  const [questionToEditId, setQuestionToEditId] = useState<number | null>(null);

  const [questionToEdit, setQuestionToEdit] = useState('');
  const [shortAnswerToEdit, setShortAnswerToEdit] = useState('');
  const [fullAnswerToEdit, setFullAnswerToEdit] = useState('');

  const [newQuestion, setNewQuestion] = useState('');
  const [newShortAnswer, setNewShortAnswer] = useState('');
  const [newFullAnswer, setNewFullAnswer] = useState('');

  // const { firstName, lastName } = user;

  // const refreshToken = useCallback(async () => {
  //   try {
  //     const response = await axios.post(
  //       '/auth/refresh',
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Access-Control-Allow-Origin': 'http://localhost:3000',
  //         },
  //       },
  //     );

  //     setAccessToken(response.data.token);
  //   } catch {
  //     setRefreshErrorMessage(true);
  //   }
  // }, [accessToken, setAccessToken, setRefreshErrorMessage]);

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

  // useEffect(() => {
  //   const refreshTokenInterval = setInterval(() => {
  //     refreshToken();
  //   }, 180000);

  //   return () => {
  //     clearInterval(refreshTokenInterval);
  //   };
  // }, [refreshToken]);

  const handleCancelCreateQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setNewQuestion('');
    setNewShortAnswer('');
    setNewFullAnswer('');
  };

  const handleCancelEditQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setQuestionToEdit('');
    setShortAnswerToEdit('');
    setFullAnswerToEdit('');
    setQuestionToEditId(null);
  };

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
      setRefreshErrorMessage(false);
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
      setQuestionsErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  const getQuestionsDeu = async () => {
    try {
      const response = await axios.get('/questions/deu');

      setFaqs(response.data);
    } catch {
      setQuestionsErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  const getQuestionsUkr = async () => {
    try {
      const response = await axios.get('/questions/ukr');

      setFaqs(response.data);
    } catch {
      setQuestionsErrorMessage(true);
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
      getQuestionsFromUsers();
    } catch {
      setErrorQuestionsFromUsers(true);
    }
  };

  const deleteQuestion = async (id: number) => {
    try {
      await axios.delete(`/questions/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (i18next.language === LOCALS.ENG) {
        getQuestionsEng();
      }

      if (i18next.language === LOCALS.DEU) {
        getQuestionsDeu();
      }

      if (i18next.language === LOCALS.UKR) {
        getQuestionsUkr();
      }
    } catch {
      setErrorQuestionsFromUsers(true);
    }
  };

  const handleSaveEditQuestion = async (id: number) => {
    try {
      await axios.put(
        `/questions/${id}`,
        JSON.stringify({
          question: questionToEdit,
          shortAnswer: shortAnswerToEdit,
          fullAnswer: fullAnswerToEdit,
          language: i18next.language,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (i18next.language === LOCALS.ENG) {
        getQuestionsEng();
      }

      if (i18next.language === LOCALS.DEU) {
        getQuestionsDeu();
      }

      if (i18next.language === LOCALS.UKR) {
        getQuestionsUkr();
      }

      setQuestionToEditId(null);
      setQuestionToEdit('');
      setShortAnswerToEdit('');
      setFullAnswerToEdit('');
    } catch {}
  };

  const handleCreateQuestion = async () => {
    try {
      await axios.post(
        `/questions`,
        JSON.stringify({
          question: newQuestion,
          shortAnswer: newShortAnswer,
          fullAnswer: newFullAnswer,
          language: i18next.language,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (i18next.language === LOCALS.ENG) {
        getQuestionsEng();
      }

      if (i18next.language === LOCALS.DEU) {
        getQuestionsDeu();
      }

      if (i18next.language === LOCALS.UKR) {
        getQuestionsUkr();
      }

      setNewQuestion('');
      setNewShortAnswer('');
      setNewFullAnswer('');
    } catch {}
  };

  // const handleSaveEditQuestion = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   currentId: number,
  // ) => {
  //   saveUpdatedQuestion(e, currentId);

  //   // if (i18next.language === LOCALS.ENG) {
  //   //   getQuestionsEng();
  //   // }

  //   // if (i18next.language === LOCALS.DEU) {
  //   //   getQuestionsDeu();
  //   // }

  //   // if (i18next.language === LOCALS.UKR) {
  //   //   getQuestionsUkr();
  //   // }

  //   setQuestionToEdit('');
  //   setShortAnswerToEdit('');
  //   setFullAnswerToEdit('');
  // };

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
      {!questionsErrorMessage && loader && <Loader />}
      {refreshErrorMessage && (
        <NotFoundPage message="AccessToken is invalid!" />
      )}
      {questionsErrorMessage && <NotFoundPage message="Something went wrong" />}

      {!refreshErrorMessage && !questionsErrorMessage && (
        <main className="admin-page">
          <div className="admin-page__container">
            <h2 className="admin-page__title big-title">{t('Admin')}</h2>
            {/* <p className="admin-page-info__item">{accessToken}</p> */}
            <div className="admin-page__box">
              <div className="admin-page__info admin-page-info">
                <div className="admin-page-info__header">
                  <h3 className="admin-page-info__title small-title">
                    Personal info
                  </h3>

                  <button className="admin-page-info__edit"></button>
                </div>

                <div className="admin-page-info__body">
                  <p className="admin-page-info__item">{user?.firstName}</p>
                  <p className="admin-page-info__item">{user?.lastName}</p>
                </div>

                <div>
                  <button
                    onClick={handleLogOut}
                    className="admin-page-info__logout-btn
										 admin-button admin-button--logout"
                  >
                    {t('Log out')}
                  </button>

                  {logoutErrorMessage && <p>{t('Log out failed!')}</p>}
                </div>

                {/* {refreshErrorMessage && <p>AccessToken is invalid!</p>} */}

                {/* <button className="logout-button" onClick={handleLogOut}>
                Log out
              </button> */}
              </div>

              <div className="admin-page__content-management">
                <div className="admin-page__faqs admin-faqs">
                  <div className="admin-faqs__header">
                    <h3
                      className={cn('admin-faqs__title small-title', {
                        'admin-faqs__title--open': !hideQuestions,
                      })}
                    >
                      {t('Frequently asked questions')}
                    </h3>
                    <button
                      className={cn('admin-faqs__hide-button', {
                        'admin-faqs__hide-button--open': !hideQuestions,
                      })}
                      onClick={() => setHideQuestions(!hideQuestions)}
                    ></button>
                  </div>

                  {!hideQuestions && (
                    <ul className="admin-faqs__list">
                      {faqs.map(faq => (
                        <li
                          className={cn('admin-faqs__item faq-item', {
                            'faq-item--disabled':
                              questionToEditId && faq.id !== questionToEditId,
                          })}
                          key={faq.id}
                        >
                          <p className="faq-item__question">{faq.question}</p>

                          <div className="faq-item__answer">
                            <p className="faq-item__short-answer">
                              {faq.shortAnswer}
                            </p>
                            <p className="faq-item__full-answer">
                              {faq.fullAnswer}
                            </p>
                          </div>

                          <div className="faq-item__actions">
                            <button
                              className="faq-item__update admin-button"
                              onClick={() => {
                                if (questionToEditId === faq.id) {
                                  setQuestionToEditId(null);
                                  setQuestionToEdit('');
                                  setShortAnswerToEdit('');
                                  setFullAnswerToEdit('');
                                } else {
                                  setQuestionToEditId(faq.id);
                                  setQuestionToEdit(faq.question);
                                  setShortAnswerToEdit(faq.shortAnswer);
                                  setFullAnswerToEdit(faq.fullAnswer);
                                }
                              }}
                            >
                              {t('Update')}
                            </button>

                            <button
                              onClick={() => deleteQuestion(faq.id)}
                              className="faq-item__delete admin-button"
                            >
                              {t('Delete')}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {!hideQuestions && questionToEdit && (
                    <form className="admin-faqs__form admin-faqs-form">
                      <h3 className="admin-faqs-form__title">
                        Edit a question
                      </h3>

                      <div className="admin-faqs-form__body">
                        <div className="admin-faqs-form__main">
                          <div className="admin-faqs-form__box admin-faqs-form__box--question">
                            <label
                              className="admin-faqs-form__label"
                              htmlFor="edit-question"
                            >
                              Question
                            </label>
                            <TextareaAutosize
                              id="edit-question"
                              placeholder="..."
                              className="admin-faqs-form__item"
                              onChange={e => setQuestionToEdit(e.target.value)}
                              value={questionToEdit}
                            />
                          </div>

                          <div className="admin-faqs-form__box admin-faqs-form__box--short-answer">
                            <label
                              htmlFor="edit-short-answer"
                              className="admin-faqs-form__label"
                            >
                              Short answer
                            </label>
                            <textarea
                              id="edit-short-answer"
                              placeholder="..."
                              className="admin-faqs-form__item 
													    admin-faqs-form__item--short-answer"
                              rows={3}
                              onChange={e =>
                                setShortAnswerToEdit(e.target.value)
                              }
                              value={shortAnswerToEdit}
                            />
                          </div>

                          <div className="admin-faqs-form__box admin-faqs-form__box--full-answer">
                            <label
                              htmlFor="edit-full-answer"
                              className="admin-faqs-form__label"
                            >
                              Full answer
                            </label>
                            <textarea
                              id="edit-full-answer"
                              placeholder="..."
                              className="admin-faqs-form__item
															 admin-faqs-form__item--full-answer"
                              rows={7}
                              onChange={e =>
                                setFullAnswerToEdit(e.target.value)
                              }
                              value={fullAnswerToEdit}
                            />
                          </div>
                        </div>

                        <div className="admin-faqs-form__actions">
                          <button
                            type="button"
                            onClick={handleCancelEditQuestion}
                            className="admin-faqs-form__button admin-button"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              if (questionToEditId) {
                                handleSaveEditQuestion(questionToEditId);
                              }
                            }}
                            type="button"
                            className="admin-faqs-form__button admin-button"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {!questionToEdit && !hideQuestions && (
                    <form
                      action="#"
                      className="admin-faqs__form admin-faqs-form"
                    >
                      <h3 className="admin-faqs-form__title">
                        Create a new question
                      </h3>

                      <div className="admin-faqs-form__body">
                        <div className="admin-faqs-form__main">
                          <div className="admin-faqs-form__box admin-faqs-form__box--question">
                            <label
                              className="admin-faqs-form__label"
                              htmlFor="edit-question"
                            >
                              Question
                            </label>
                            <TextareaAutosize
                              id="edit-question"
                              placeholder="..."
                              className="admin-faqs-form__item"
                              onChange={e => setNewQuestion(e.target.value)}
                              value={newQuestion}
                            />
                          </div>

                          <div className="admin-faqs-form__box admin-faqs-form__box--short-answer">
                            <label
                              htmlFor="edit-short-answer"
                              className="admin-faqs-form__label"
                            >
                              Short answer
                            </label>
                            <textarea
                              id="edit-short-answer"
                              placeholder="..."
                              className="admin-faqs-form__item 
													    admin-faqs-form__item--short-answer"
                              rows={3}
                              onChange={e => setNewShortAnswer(e.target.value)}
                              value={newShortAnswer}
                            />
                          </div>

                          <div className="admin-faqs-form__box admin-faqs-form__box--full-answer">
                            <label
                              htmlFor="edit-full-answer"
                              className="admin-faqs-form__label"
                            >
                              Full answer
                            </label>
                            <textarea
                              id="edit-full-answer"
                              placeholder="..."
                              className="admin-faqs-form__item
															 admin-faqs-form__item--full-answer"
                              rows={7}
                              onChange={e => setNewFullAnswer(e.target.value)}
                              value={newFullAnswer}
                            />
                          </div>
                        </div>

                        <div className="admin-faqs-form__actions">
                          <button
                            type="button"
                            onClick={handleCancelCreateQuestion}
                            className="admin-faqs-form__button admin-button"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleCreateQuestion}
                            type="button"
                            className={cn(
                              'admin-faqs-form__button admin-button',
                              {
                                'admin-button--disabled':
                                  !newQuestion ||
                                  !newShortAnswer ||
                                  !newFullAnswer,
                              },
                            )}
                            disabled={
                              !newQuestion || !newShortAnswer || !newFullAnswer
                            }
                          >
                            Create
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
                    <h3
                      className={cn(
                        'contact-form-questions__title small-title',
                        {
                          'contact-form-questions__title--open':
                            !hideQuestionsFromUsers,
                        },
                      )}
                    >
                      {t('Customer questions')}
                    </h3>
                    <button
                      className={cn('admin-faqs__hide-button', {
                        'admin-faqs__hide-button--open':
                          !hideQuestionsFromUsers,
                      })}
                      onClick={() =>
                        setHideQuestionsFromUsers(!hideQuestionsFromUsers)
                      }
                    ></button>
                  </div>

                  {errorQuestionsFromUsers && (
                    <p>{t('Something went wrong')}</p>
                  )}
                  {!hideQuestionsFromUsers && (
                    <ul className="contact-form-questions__list">
                      {questionsFromUsers.map(questionItem => (
                        <li
                          className="contact-form-questions__item 
													contact-form-item"
                          key={questionItem.id}
                        >
                          <div className="contact-form-item__info">
                            <p className="contact-form-item__name">
                              {questionItem.name}
                            </p>
                            <p className="contact-form-item__email">
                              {questionItem.email}
                            </p>
                            <p className="contact-form-item__message">
                              {questionItem.message}
                            </p>
                          </div>

                          <button
                            className="contact-form-item__delete admin-button"
                            onClick={() =>
                              deleteQuestionFromUser(questionItem.id)
                            }
                          >
                            {t('Delete')}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
