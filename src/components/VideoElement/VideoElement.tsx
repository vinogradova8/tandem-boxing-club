import React, { useRef, useState } from 'react';
import './VideoElement.scss';
import cn from 'classnames';

type Props = {
  poster: string;
  media: string;
};

export const VideoElement: React.FC<Props> = ({ poster, media }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isVideoShadowed, setIsVideoShadowed] = useState(true);

  return (
    <div className={cn('video', { 'video--shadow': isVideoShadowed })}>
      <video
        ref={videoRef}
        onClick={() => setIsVideoShadowed(!isVideoShadowed)}
        className="video__item"
        poster={poster}
        controls
        src={media}
        onBlur={() => {
          if (videoRef.current) {
            videoRef.current.pause();
          }

          setIsVideoShadowed(!isVideoShadowed);
        }}
      ></video>
    </div>
  );
};
