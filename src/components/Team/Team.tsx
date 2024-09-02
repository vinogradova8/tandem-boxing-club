import React, { useEffect, useState } from 'react';
import './Team.scss';
import { team } from '../../api/axios';
import { Trainer } from '../../types/Trainer';
// import { useTranslation } from 'react-i18next';
// import { Loader } from '../Loader';
import '../../i18n';

export const Team: React.FC = ({}) => {
  // const [loader, setLoader] = useState(false);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  // const { t } = useTranslation();

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

  return (
    <main className="team">
      <div className="team__title-container">
        <h2 className="team__title page-title"></h2>
      </div>

      <div className="team__trainers">
        {errorMessage && <p>Failer to load info about our team</p>}
        {trainers.map(trainer => (
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
