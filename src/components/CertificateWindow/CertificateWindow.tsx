/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import './CertificateWindow.scss';
import { createPortal } from 'react-dom';
import { ItemsContext } from '../../ItemsContext';

const portal = document.getElementById('portal') as HTMLElement;

export const CertificateWindow: React.FC = ({}) => {
  const { setIsCertificateWindowOpen, isCertificateWindowOpen } =
    useContext(ItemsContext);

  const bodyTag = document.querySelector('body');

  useEffect(() => {
    if (isCertificateWindowOpen) {
      bodyTag?.classList.add('fixed');
    }

    if (!isCertificateWindowOpen) {
      bodyTag?.classList.remove('fixed');
    }
  }, [bodyTag?.classList, isCertificateWindowOpen]);

  const handleCloseCertificateWindow = () => {
    setIsCertificateWindowOpen(false);
    bodyTag?.classList.remove('fixed');
  };

  return createPortal(
    <div className="certificate-window">
      <div className="certificate-window__container">
        <div className="certificate-window__box">
          <button
            onClick={handleCloseCertificateWindow}
            className="certificate-window__close"
            type="button"
          >
            Close
          </button>

          <div className="certificate-window__image">
            <img
              src="https://vinogradova8.github.io/boxing/images/certificates/certificate-big.png"
              alt="Certificate"
            />
          </div>
        </div>
      </div>
    </div>,
    portal,
  );
};
