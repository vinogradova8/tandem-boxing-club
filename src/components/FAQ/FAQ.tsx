import React from 'react';
import './FAQ.scss';
// import MarqueeText from 'react-marquee-text';
import Marquee from 'react-fast-marquee';
// import Marquee from 'react-double-marquee';
// import i18next from '../../i18n';
// import faq from '../../api/faq.json';
// import { LOCALS } from '../../i18n/constants';
// import { useTranslation } from 'react-i18next';

export const FAQ: React.FC = ({}) => {
  // const { t } = useTranslation();

  const text =
    'IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER PLAYED SPORT?';

  return (
    <>
      <main className="faq">
        <div className="block">
          <div className="block__container">
            <div className="question">
              <div className="running-question">
                <Marquee>{`${text} ${text} ${text} ${text}`}</Marquee>
                {/* <MarqueeText direction={'left'}>{text}</MarqueeText>

                <h1>
                  <MarqueeText
                    direction="left"
                    duration={1}
                    pauseOnHover={true}
                  >
                    This text will be staggered by word
                  </MarqueeText> */}
                {/* </h1> */}
              </div>
              {/* <Marquee direction="left">
                IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER PLAYED
                SPORT? IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER
                PLAYED SPORT? IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE
                NEVER PLAYED SPORT?
              </Marquee> */}
            </div>

            <div className="answer"></div>
          </div>
        </div>
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
