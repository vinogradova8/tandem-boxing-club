/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import React, { useEffect, useMemo, useState } from 'react';
import './Team.scss';
import { gallery } from '../../api/axios';
import { Trainer } from '../../types/Trainer';
import { useTranslation } from 'react-i18next';
import { Loader } from '../Loader';
import '../../i18n';
import i18next from 'i18next';

export const Team: React.FC = ({}) => {
  const [loader, setLoader] = useState(false);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const { t } = useTranslation();

  const getTeam = async () => {
    try {
      const response = await gallery.get('/trainers.json');

      setTrainers(response.data);
    } catch {
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    getTeam();
  }, []);

  const trainersFromServer = useMemo(() => {
    return trainers.filter(trainer => trainer.language === i18next.language);
  }, [trainers, i18next.language]);

  return (
    <>
      {loader ? (
        <Loader></Loader>
      ) : (
        <main className="team">
          <div className="team__title-container">
            <h2 className="team__title page-title big-title">
              {t('Our Team')}
            </h2>
          </div>

          <div className="team__trainers">
            <div className="team__trainers-container">
              {errorMessage && <p>Failer to load info about our team</p>}
              {trainersFromServer.map(trainer => (
                <div
                  key={trainer.id}
                  id={`my${trainer.id}`}
                  className="trainer"
                >
                  <div className="trainer__container">
                    <div className="trainer__photo">
                      <img src={trainer.media} alt="Trainer" />
                    </div>

                    <div className="trainer__cotent">
                      <p className="trainer__name">{trainer.name}</p>

                      <div className="trainer__info">
                        <p className="trainer__level">{trainer.level}</p>

                        <p className="trainer__experience">{trainer.info}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="team__certificate"></div>

          <div className="support__contact-us-bottom contact-us-bottom">
            <button
              className="support__contact-button 
					contact-button"
            >
              {t('Contact us')}
            </button>
          </div>
        </main>
      )}
    </>
  );
};
