import React, { useState } from 'react';
import './Accordion.scss';
import { Question } from '../../types/Questions';
import { AccordionItem } from '../AccordionItem/AccordionItem';

type Props = {
  faqs: Question[];
};

export const Accordion: React.FC<Props> = ({ faqs }) => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <ul className="accordion">
      {faqs.map(faq => (
        <AccordionItem
          key={faq.id}
          faq={faq}
          openId={openId}
          setOpenId={setOpenId}
        />
      ))}
    </ul>
  );
};
