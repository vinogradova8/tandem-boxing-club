/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import './Team.scss';
import { gallery } from '../../api/axios';
import { Trainer } from '../../types/Trainer';
import { useTranslation } from 'react-i18next';
import { Loader } from '../Loader';
import '../../i18n';
import i18next from 'i18next';
import { ItemsContext } from '../../ItemsContext';
import { CertificateWindow } from '../CertificateWindow';
import { ContactButton } from '../ContactButton';
import { NotFoundPage } from '../NotFoundPage';

export const Team: React.FC = ({}) => {
  const [loader, setLoader] = useState(false);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const { t } = useTranslation();

  const itemRef = useRef<HTMLDivElement>(null);

  const { setIsCertificateWindowOpen, isCertificateWindowOpen } =
    useContext(ItemsContext);

  const bodyTag = document.querySelector('body');

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsCertificateWindowOpen(false);
        bodyTag?.classList.remove('fixed');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [bodyTag?.classList, isCertificateWindowOpen]);

  return (
    <>
      {loader && !errorMessage && <Loader></Loader>}
      {errorMessage && <NotFoundPage message={t('Something went wrong!')} />}
      {!loader && !errorMessage && (
        <main className="team">
          {isCertificateWindowOpen && <CertificateWindow />}

          <div className="team__title-container">
            <h2 className="team__title page-title big-title">
              {t('Your trainers')}
            </h2>
          </div>

          <div className="team__trainers">
            <div
              style={{ height: itemRef.current?.scrollHeight }}
              className="team__trainers-container"
            >
              {trainersFromServer.map(trainer => (
                <div key={trainer.id} className="trainer">
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

          <div className="team__certificate">
            <img
              onClick={() => {
                if (window.innerWidth > 640) {
                  setIsCertificateWindowOpen(true);
                }
              }}
              src="https://vinogradova8.github.io/boxing/images/certificates/certificate.png"
              alt="Certificate"
            />
            <div className="team__certificat-container"></div>
          </div>

          <ContactButton />
        </main>
      )}
    </>
  );
};
