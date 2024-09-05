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
// import MarqueeText from 'react-marquee-text';
// import { getFAQ } from '../../api/fetchClient';

// import i18next from '../../i18n';

// import { LOCALS } from '../../i18n/constants';
import { useTranslation } from 'react-i18next';
// import { Questions } from '../../types/Questions';
import { QuestionBlock } from '../QuestionBlock';
import { useSearchParams } from 'react-router-dom';

export const FAQ: React.FC = ({}) => {
  const { t } = useTranslation();
  // const [faqs, setFaqs] = useState<Questions[] | null>(null);
  // const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedQuery, setAppliedQuery] = useState('');

  const query = searchParams.get('query') || '';

  const inputRef = useRef<HTMLInputElement>(null);

  const applyQuery = useMemo(() => debounce(setAppliedQuery, 1000), []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const faqs = [
    {
      id: 1,
      question:
        'IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER PLAYED SPORT?',
      'answer-short': 'Absolutely',
      'answer-full':
        'Boxing is suitable for beginners, even if you`ve never played sports before. Boxing training is highly adaptable, meaning coaches can tailor workouts to match your current fitness level and gradually build your skills and endurance. Starting from the basics, you`ll learn proper techniques, improve your fitness, and build confidence at your own pace. Many people who are new to fitness find boxing to be a great way to get into shape, relieve stress, and develop a strong sense of discipline and focus. So, don`t worry about being a beginner—boxing can be a perfect fit for you!',
    },

    {
      id: 2,
      question: 'WHAT LEVEL OF FITNESS IS REQUIRED TO START TRAINING?',
      'answer-short': 'Your wish is needed.',
      'answer-full':
        'You don`t need to have a high level of fitness to start boxing trainingBeginners are often welcome and the workouts can be adapted to suit different fitness levels. It`s helpful to have a basic level of cardiovascular fitness and general physical health, but boxing training alone will help improve your fitness over time. We`ll help you start at a pace that`s comfortable for you and gradually build your endurance and strength as you progress.',
    },
  ];

  window.addEventListener('load', () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');

    setSearchParams(params);
  });

  const visibleFaqs = useMemo(() => {
    return faqs.filter(faq =>
      faq.question.toLowerCase().includes(appliedQuery.toLowerCase()),
    );
  }, [appliedQuery]);

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

  // useEffect(() => {
  //   if (i18next.language === LOCALS.ENG) {
  //     getFAQ('/questions/eng').then(() => setFaqs);
  //   }

  //   if (i18next.language === LOCALS.DEU) {
  //     getFAQ('/questions/deu').then(() => setFaqs);
  //   }

  //   if (i18next.language === LOCALS.UKR) {
  //     getFAQ('/questions/ukr').then(() => setFaqs);
  //   }
  // }, [setFaqs, i18next.language]);

  // const text =
  //   'IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER PLAYED SPORT?';

  return (
    <>
      <main className="faq">
        <div className="faq__main">
          <div className="faq__main-container">
            <h2 className="faq__title page-title">{t('Questions')}</h2>

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

              {query && visibleFaqs.length === 0 && (
                <p className="faq__erroe-message">
                  Oops, sorry, we didn`t find your question. Please contact us
                  to get an answer.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="faq__questions">
          {visibleFaqs.map(faq => (
            <QuestionBlock
              key={faq.id}
              question={faq.question}
              answerShort={faq['answer-short']}
              answerFull={faq['answer-full']}
            />
          ))}
        </div>

        {/* <div className="block"></div> */}

        {/* {faqs?.map(faq => (
          <div key={faq.id} className="block">
            <div className="block__container">
              <div className="question">
                <div className="running-question">
                  <Marquee>{`${faq.question} ${faq.question} ${faq.question} ${faq.question}`}</Marquee>
                </div>
              </div>

              <div className="answer">{faq['full-answer']}</div>
            </div>
          </div>
        ))} */}
      </main>

      {/* {t('Home')}
      <div>
        {i18next.language === LOCALS.UKR &&
          faq.map(item => (
            <Fragment key={item.ukr.question}>
              <p>{item.ukr.question}</p>
              <p>{item.ukr.answer}</p>
            </Fragment>
          ))}

        {i18next.language === LOCALS.ENG &&
          faq.map(item => (
            <Fragment key={item.ukr.question}>
              <p>{item.eng.question}</p>
              <p>{item.eng.answer}</p>
            </Fragment>
          ))}
      </div> */}
    </>
  );
};
