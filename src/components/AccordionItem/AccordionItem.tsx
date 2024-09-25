import React, { useRef } from 'react';
import Marquee from 'react-fast-marquee';
import { Question } from '../../types/Questions';

type Props = {
  faq: Question;
  openId: number | null;
  setOpenId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const AccordionItem: React.FC<Props> = ({ faq, openId, setOpenId }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const clickHandler = (id: number) => {
    if (id === openId) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <li className="accordion__item">
      <div className="accordion__item-container">
        <div
          onClick={() => clickHandler(faq.id)}
          className="accordion__question question"
        >
          {openId !== faq.id && (
            <p className="question__close">{faq.question}</p>
          )}

          {openId === faq.id && (
            <div className="question__open">
              <p className="question__stand">{faq.question}</p>

              <div className="question__running">
                <Marquee
                  direction={'left'}
                >{`${faq.question} ${faq.question} ${faq.question}`}</Marquee>
              </div>
            </div>
          )}
        </div>

        <div
          className="accordion__collapse"
          style={
            openId === faq.id
              ? { height: itemRef.current?.scrollHeight }
              : { height: '0px' }
          }
        >
          <div ref={itemRef} className="accordion__answer answer">
            <p className="answer__short">{faq.shortAnswer}</p>
            <p className="answer__full">{faq.fullAnswer}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

// <form action="#" className="admin-faqs__form edit-form">
//   <h3>Edit a question</h3>

//   <div>
//     <div>
//       <label
//         className="edit-form__label"
//         htmlFor="edit-question"
//       >
//         Question
//       </label>
//       <input
//         id="edit-question"
//         className="edit-form__question"
//         type="text"
//         onChange={e => setQuestionToEdit(e.target.value)}
//         value={questionToEdit}
//       />
//     </div>

//     <div>
//       <label
//         htmlFor="edit-short-answer"
//         className="edit-form__label"
//       >
//         Short answer
//       </label>
//       <input
//         id="edit-short-answer"
//         className="edit-form__short-answer"
//         type="text"
//         onChange={e => setShortAnswerToEdit(e.target.value)}
//         value={shortAnswerToEdit}
//       />
//     </div>

//     <div>
//       <label
//         htmlFor="edit-full-answer"
//         className="edit-form__label"
//       >
//         Full answer
//       </label>
//       <textarea
//         id="edit-full-answer"
//         className="edit-form__full-answer"
//         rows={10}
//         onChange={e => setFullAnswerToEdit(e.target.value)}
//         value={fullAnswerToEdit}
//       />
//     </div>

//     <div className="edit-form__actions">
//       <button
//         onClick={() => {
//           if (questionToEditId !== null) {
//             handleSaveEditQuestion(questionToEditId);
//           }
//         }}
//         className="edit-form__save-button"
//         type="button"
//       >
//         Save
//       </button>
//       <button
//         onClick={handleCancelEditQuestion}
//         className="edit-form__cancel-button"
//       >
//         Cancel
//       </button>
//     </div>
//   </div>
// </form>
