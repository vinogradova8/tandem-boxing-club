/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './FAQ.scss';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import { Question } from '../../types/Questions';
import { useSearchParams } from 'react-router-dom';
import { gallery } from '../../api/axios';
import i18next from 'i18next';
// import { LOCALS } from '../../i18n/constants';
import { NotFoundPage } from '../NotFoundPage';
import { Loader } from '../Loader';
import { Accordion } from '../Accordion';
import { ContactButton } from '../ContactButton';

export const FAQ: React.FC = ({}) => {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);
  const [faqs, setFaqs] = useState<Question[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedQuery, setAppliedQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const query = searchParams.get('query') || '';

  const inputRef = useRef<HTMLInputElement>(null);

  const applyQuery = useMemo(() => debounce(setAppliedQuery, 1000), []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  window.addEventListener('load', () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');

    setSearchParams(params);
  });

  const handleSetQuerySearchParameter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      params.set('query', `${event.target.value}`);

      applyQuery(event.target.value);

      if (event.target.value === '') {
        params.delete('query');
      }

      setSearchParams(params);
    },
    [applyQuery, searchParams, setSearchParams],
  );

  const getTeam = async () => {
    try {
      const response = await gallery.get('/questions.json');

      setFaqs(response.data);
    } catch {
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  // const getQuestionsEng = async () => {
  //   try {
  //     const response = await axios.get('/questions/eng');

  //     setFaqs(response.data);
  //   } catch {
  //     setErrorMessage(true);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  // const getQuestionsDeu = async () => {
  //   try {
  //     const response = await axios.get('/questions/deu');

  //     setFaqs(response.data);
  //   } catch {
  //     setErrorMessage(true);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  // const getQuestionsUkr = async () => {
  //   try {
  //     const response = await axios.get('/questions/ukr');

  //     setFaqs(response.data);
  //   } catch {
  //     setErrorMessage(true);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  useEffect(() => {
    setLoader(true);
    getTeam();

    // if (i18next.language === LOCALS.ENG) {
    //   getQuestionsEng();
    // }

    // if (i18next.language === LOCALS.DEU) {
    //   getQuestionsDeu();
    // }

    // if (i18next.language === LOCALS.UKR) {
    //   getQuestionsUkr();
    // }
  }, []);

  const questionsFromServer = useMemo(() => {
    return faqs.filter(trainer => trainer.language === i18next.language);
  }, [faqs, i18next.language]);

  const visibleFaqs = useMemo(() => {
    return questionsFromServer.filter(faq =>
      faq.question.toLowerCase().includes(appliedQuery.toLowerCase()),
    );
  }, [appliedQuery, faqs]);

  return (
    <>
      {!errorMessage && loader && <Loader />}
      {errorMessage ? (
        <NotFoundPage message={t('Something went wrong!')} />
      ) : (
        <main className="faq">
          <div className="faq__main">
            <div className="faq__main-container">
              <h2 className="faq__title big-title">{t('Questions')}</h2>

              <div className="faq__input-container">
                <label className="faq__label">
                  <input
                    ref={inputRef}
                    className="faq__input"
                    type="text"
                    value={query}
                    onChange={handleSetQuerySearchParameter}
                    placeholder={t('Start writing your question')}
                  />
                </label>

                {appliedQuery && visibleFaqs && visibleFaqs.length === 0 && (
                  <p className="faq__erroe-message">{t('Oops, sorry')}</p>
                )}
              </div>
            </div>
          </div>

          <div className="faq__questions">
            {errorMessage && <p>{t('Something went wrong!')}</p>}

            <Accordion faqs={visibleFaqs} />
          </div>

          <ContactButton />
        </main>
      )}
    </>
  );
};
