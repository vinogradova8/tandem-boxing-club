import React, { useRef, useState } from 'react';
import './QuestionBlock.scss';
import Marquee from 'react-fast-marquee';
// import i18next from '../../i18n';
// import faq from '../../api/faq.json';
// import { LOCALS } from '../../i18n/constants';
// import { useTranslation } from 'react-i18next';

type Props = {
  question: string;
  answerShort: string;
  answerFull: string;
};

export const QuestionBlock: React.FC<Props> = ({
  question,
  answerShort,
  answerFull,
}) => {
  // const { t } = useTranslation();

  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  const item = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //     if (item.current && !item.current.contains(e.target)) {
  //       setIsAnswerOpen(false);
  //     }
  //   };

  //   document.addEventListener('click', handleClick);

  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, [isAnswerOpen]);

  // const text =
  //   'IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER PLAYED SPORT?     ';

  return (
    <div
      ref={item}
      // onClick={() => setIsAnswerOpen(!isAnswerOpen)}
      className="question-block"
    >
      <div className="question-block__container">
        <div
          // ref={item}
          onClick={() => setIsAnswerOpen(!isAnswerOpen)}
          // onBlur={() => setIsAnswerOpen(false)}
          className="question-block__question question"
        >
          {!isAnswerOpen && (
            <p className="question__close">
              {question}
              {/* IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER PLAYED
              SPORT? */}
            </p>
          )}

          {isAnswerOpen && (
            <div className="question__open">
              <p className="question__stand">
                {question}
                {/* IS BOXING SUITABLE FOR ME IF A BEGINNER AND HAVE NEVER PLAYED
                SPORT? */}
              </p>

              <div className="question__running">
                <Marquee
                  direction={'left'}
                >{`${question} ${question} ${question}`}</Marquee>
              </div>
            </div>
          )}
        </div>

        {isAnswerOpen && (
          <div className="question-block__answer answer">
            <p className="answer__short">{answerShort}</p>
            <p className="answer__full">{answerFull}</p>
          </div>
        )}
      </div>
    </div>
  );
};
