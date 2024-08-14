import React from 'react';
import './FAQ.scss';
// import i18next from '../../i18n';
// import faq from '../../api/faq.json';
// import { LOCALS } from '../../i18n/constants';
// import { useTranslation } from 'react-i18next';

export const FAQ: React.FC = ({}) => {
  // const { t } = useTranslation();

  return (
    <>
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
