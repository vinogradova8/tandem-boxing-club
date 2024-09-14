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
// import { getFAQ } from '../../api/fetchClient';

// import i18next from '../../i18n';

// import { LOCALS } from '../../i18n/constants';
import { useTranslation } from 'react-i18next';
import { Question } from '../../types/Questions';
import { useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import i18next from 'i18next';
import { LOCALS } from '../../i18n/constants';
import { NotFoundPage } from '../NotFoundPage';
import { Loader } from '../Loader';
import { Accordion } from '../Accordion';

export const FAQ: React.FC = ({}) => {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);
  const [faqs, setFaqs] = useState<Question[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedQuery, setAppliedQuery] = useState('');
  // const [whichAnswerIsOpen, setWhichAnswerIsOpen] = useState<number | null>(
  //   null,
  // );
  const [errorMessage, setErrorMessage] = useState(false);

  const query = searchParams.get('query') || '';

  const inputRef = useRef<HTMLInputElement>(null);

  const applyQuery = useMemo(() => debounce(setAppliedQuery, 1000), []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // const faqs = [
  //   {
  //     id: 1,
  //     question:
  //       'IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER PLAYED SPORT?',
  //     shortAnswer: 'Absolutely',
  //     fullAnswer:
  //       'Typically: For beginners: Training 2-3 times a week is often enough to see initial improvements in fitness, technique and overall condition. For intermediate boxers: To develop skills and endurance, it is usually recommended to train 3-5 times a week. This allows you to focus more on technique, sparring and conditioning. For advanced or competitive boxers: Training 5-6 times a week, or even daily, is a common practice. This includes a combination of boxing practice, strength training, conditioning and sparring. Consistency is key in boxing. Along with regular training, proper rest, nutrition and recovery are crucial for optimal progress and injury prevention.',
  //   },

  //   {
  //     id: 2,
  //     question: 'WHAT LEVEL OF FITNESS IS REQUIRED TO START TRAINING?',
  //     shortAnswer: 'Your wish is needed.',
  //     fullAnswer:
  //       'You don`t need to have a high level of fitness to start boxing training. Beginners are often welcome and the workouts can be adapted to suit different fitness levels. It`s helpful to have a basic level of cardiovascular fitness and general physical health, but boxing training alone will help improve your fitness over time. We`ll help you start at a pace that`s comfortable for you and gradually build your endurance and strength as you progress.',
  //   },

  //   {
  //     id: 3,
  //     question: 'WHAT LEVEL OF FITNESS IS REQUIRED TO START TRAINING?',
  //     shortAnswer: 'Your wish is needed.',
  //     fullAnswer:
  //       'You don`t need to have a high level of fitness to start boxing training. Beginners are often welcome and the workouts can be adapted to suit different fitness levels. It`s helpful to have a basic level of cardiovascular fitness and general physical health, but boxing training alone will help improve your fitness over time. We`ll help you start at a pace that`s comfortable for you and gradually build your endurance and strength as you progress.',
  //   },
  // ];

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

  const visibleFaqs = useMemo(() => {
    return faqs.filter(faq =>
      faq.question.toLowerCase().includes(appliedQuery.toLowerCase()),
    );
  }, [appliedQuery, faqs]);

  return (
    <>
      {!errorMessage && loader && <Loader />}
      {errorMessage ? (
        <NotFoundPage message="Something went wrong" />
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
                    placeholder="Start writing your question"
                  />
                </label>

                {appliedQuery && visibleFaqs && visibleFaqs.length === 0 && (
                  <p className="faq__erroe-message">
                    Oops, sorry, we didn`t find your question. Please contact us
                    to get an answer.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="faq__questions">
            {errorMessage && <p>Smth went wrong</p>}
            {/* {visibleFaqs.map(faq => (
              <QuestionBlock
                key={faq.id}
                id={faq.id}
                question={faq.question}
                shortAnswer={faq.shortAnswer}
                fullAnswer={faq.fullAnswer}
                whichAnswerIsOpen={whichAnswerIsOpen}
                setWhichAnswerIsOpen={setWhichAnswerIsOpen}
              />
            ))} */}

            <Accordion faqs={visibleFaqs} />
          </div>

          <div className="faq__contact-us-bottom contact-us-bottom">
            <button
              className="faq__contact-button 
					contact-button"
            >
              {t('Contact us')}
            </button>
          </div>
        </main>
      )}
    </>
  );
};

// useEffect(() => {
//   getFAQ('/questions').then(() => setFaqs);
//   // if (i18next.language === LOCALS.ENG) {
//   //   getFAQ('/questions/eng').then(() => setFaqs);
//   // }

//   // if (i18next.language === LOCALS.DEU) {
//   //   getFAQ('/questions/deu').then(() => setFaqs);
//   // }

//   // if (i18next.language === LOCALS.UKR) {
//   //   getFAQ('/questions/ukr').then(() => setFaqs);
//   // }
// }, [setFaqs]);
