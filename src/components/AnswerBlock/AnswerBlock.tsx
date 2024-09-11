import React, { useEffect } from 'react';
import './AnswerBlock.scss';

type Props = {
  shortAnswer: string;
  fullAnswer: string;
};

export const AnswerBlock: React.FC<Props> = ({ shortAnswer, fullAnswer }) => {
  useEffect(() => {
    // const question = document.querySelector('.question-block');
    const answer = document.querySelector('.answer');

    answer?.classList.add('answer--open');
    // question?.classList.add('question--open');
  }, []);

  return (
    <div className="answer">
      <p className="answer__short">{shortAnswer}</p>
      <p className="answer__full">{fullAnswer}</p>
    </div>
  );
};
