import React, { useEffect, useState } from 'react';
import './FAQ.scss';
// import MarqueeText from 'react-marquee-text';
import Marquee from 'react-fast-marquee';
import { getFAQ } from '../../api/fetchClient';
// import Marquee from 'react-double-marquee';
import i18next from '../../i18n';
// import faq from '../../api/faq.json';
import { LOCALS } from '../../i18n/constants';
import { useTranslation } from 'react-i18next';
import { Questions } from '../../types/Questions';

export const FAQ: React.FC = ({}) => {
  const { t } = useTranslation();
  const [faqs, setFaqs] = useState<Questions[] | null>(null);

  useEffect(() => {
    if (i18next.language === LOCALS.ENG) {
      getFAQ('/faq-eng').then(() => setFaqs);
    }

    if (i18next.language === LOCALS.DEU) {
      getFAQ('/faq-deu').then(() => setFaqs);
    }

    if (i18next.language === LOCALS.UKR) {
      getFAQ('/faq-ukr').then(() => setFaqs);
    }
  }, [setFaqs]);

  // const text =
  //   'IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER PLAYED SPORT?';

  return (
    <>
      <main className="faq">
        <h2>{t('Questions')}</h2>
        {faqs?.map(faq => (
          <div key={faq.id} className="block">
            <div className="block__container">
              <div className="question">
                <div className="running-question">
                  <Marquee>{`${faq.question} ${faq.question} ${faq.question} ${faq.question}`}</Marquee>
                </div>
              </div>

              <div className="answer">{faq.fullAnswer}</div>
            </div>
          </div>
        ))}
      </main>
      <p>FAQ</p>

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
