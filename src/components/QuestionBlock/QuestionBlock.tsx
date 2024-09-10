/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import './QuestionBlock.scss';
import Marquee from 'react-fast-marquee';
import { AnswerBlock } from '../AnswerBlock';
// import i18next from '../../i18n';
// import faq from '../../api/faq.json';
// import { LOCALS } from '../../i18n/constants';
// import { useTranslation } from 'react-i18next';

type Props = {
  id: number;
  question: string;
  shortAnswer: string;
  fullAnswer: string;
  whichAnswerIsOpen: number;
  setWhichAnswerIsOpen: React.Dispatch<React.SetStateAction<number>>;
};

export const QuestionBlock: React.FC<Props> = ({
  id,
  question,
  shortAnswer,
  fullAnswer,
  whichAnswerIsOpen,
  setWhichAnswerIsOpen,
}) => {
  // const { t } = useTranslation();

  // const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  const item = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //     if (item.current && !item.current.contains(e.target as any)) {
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
      // ref={item}
      // onClick={() => setIsAnswerOpen(!isAnswerOpen)}
      className="question-block"
    >
      <div className="question-block__container">
        <div
          ref={item}
          onClick={() => {
            if (whichAnswerIsOpen !== id) {
              setWhichAnswerIsOpen(id);
            } else {
              setWhichAnswerIsOpen(0);
            }
          }}
          className="question-block__question question"
        >
          {/* {!isAnswerOpen && <p className="question__close">{question}</p>} */}
          {whichAnswerIsOpen !== id && (
            <p className="question__close">{question}</p>
          )}

          {whichAnswerIsOpen === id && (
            <div className="question__open">
              <p className="question__stand">{question}</p>

              <div className="question__running">
                <Marquee
                  direction={'left'}
                >{`${question} ${question} ${question}`}</Marquee>
              </div>
            </div>
          )}
        </div>

        {whichAnswerIsOpen === id && (
          <AnswerBlock shortAnswer={shortAnswer} fullAnswer={fullAnswer} />
        )}
      </div>
    </div>
  );
};
