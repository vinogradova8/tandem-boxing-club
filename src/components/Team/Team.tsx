/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import './Team.scss';
import { team } from '../../api/axios';
import { Trainer } from '../../types/Trainer';
import { useTranslation } from 'react-i18next';
// import { Loader } from '../Loader';
import '../../i18n';
// import i18next from 'i18next';
import { ItemsContext } from '../../ItemsContext';

export const Team: React.FC = ({}) => {
  // const [loader, setLoader] = useState(false);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const { t } = useTranslation();

  const { language } = useContext(ItemsContext);

  const getTeam = async () => {
    try {
      const response = await team.get('/trainers.json');

      setTrainers(response.data);
    } catch {
      setErrorMessage(true);
    } finally {
      // setLoader(false);
    }
  };

  useEffect(() => {
    // setLoader(true);

    getTeam();
  }, []);

  // let trainersFromServer;

  // useEffect(() => {
  //   trainersFromServer = trainers.filter(trainer => {
  //     if (i18next.language === 'eng') {
  //       return (trainer.language = 'eng');
  //     }
  //   });
  // }, [trainers]);

  // let currentTrainers = trainers.filter(
  // 	trainer => {
  // 		return trainer.language = i18next.language
  // 	},
  // );

  const trainersFromServer = useMemo(() => {
    //   if (i18next.language === 'eng') {
    //     return trainers.filter(trainer => (trainer.language = 'eng'));
    //   }

    //   if (i18next.language === 'deu') {
    //     return trainers.filter(trainer => (trainer.language = 'deu'));
    //   }

    return trainers.filter(trainer => (trainer.language = language));
  }, [language, trainers]);

  // let currentTrainers;

  // useEffect(() => {
  //   currentTrainers = trainers.filter(trainer => {
  //     return (trainer.language = language);
  //   });
  // }, [language, trainers]);

  // const trainersFromServer = trainers.filter(trainer => {
  //   if (i18next.language === 'eng') {
  //     return (trainer.language = 'eng');
  //   }

  //   if (i18next.language === 'ukr') {
  //     return (trainer.language = 'ukr');
  //   }

  //   if (i18next.language === 'deu') {
  //     return (trainer.language = 'deu');
  //   }

  //   return (trainer.language = 'eng');
  // });

  // console.log(i18next.language);

  // console.log('sdf');

  return (
    <main className="team">
      <div className="team__title-container">
        <h2 className="team__title page-title">{t('Team')}</h2>
      </div>

      <div className="team__trainers">
        {errorMessage && <p>Failer to load info about our team</p>}
        {trainersFromServer.map(trainer => (
          <div key={trainer.id} className="trainer">
            <div className="trainer__container">
              <div className="trainer__photo">
                <img src={trainer.media} alt="Trainer" />
              </div>

              <div className="trainer__cotent">
                <p className="trainer__name">{trainer.name}</p>

                <p className="trainer__level">{trainer.level}</p>

                <p className="trainer__info">{trainer.info}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
