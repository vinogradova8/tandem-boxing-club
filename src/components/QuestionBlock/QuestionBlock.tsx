import React from 'react';
import './QuestionBlock.scss';
// import Marquee from 'react-double-marquee';
// import i18next from '../../i18n';
// import faq from '../../api/faq.json';
// import { LOCALS } from '../../i18n/constants';
// import { useTranslation } from 'react-i18next';

export const QuestionBlock: React.FC = ({}) => {
  // const { t } = useTranslation();

  // const text =
  //   'IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER PLAYED SPORT?';

  return (
    <div className="question-block">
      <div className="question-block__container">
        <p className="question">
          IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER PLAYED SPORT?
        </p>
        <div className="running-question">
          {/* <Marquee direction={'left'}>{`${text} ${text} ${text}`}</Marquee> */}
        </div>

        <div className="answer">
          <p className="answer__small"></p>
          <p className="answer__full"></p>
        </div>
      </div>
    </div>
  );
};
