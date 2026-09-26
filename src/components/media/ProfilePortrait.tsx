import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { personalMedia, PortraitSlot } from '../../data/personalMedia';

interface ProfilePortraitProps {
  slot?: 'main' | 'about';
  className?: string;
  priority?: boolean;
}

export const ProfilePortrait: React.FC<ProfilePortraitProps> = ({
  slot = 'main',
  className = '',
  priority = false,
}) => {
  const { isOwner } = useAuth();
  const media: PortraitSlot = personalMedia.profiles[slot];
  const [loaded, setLoaded] = useState(true);

  useEffect(() => setLoaded(true), [media.src]);

  return (
    <figure className={`portrait-frame portrait-${slot} ${className}`}>
      <div className="portrait-media">
        {loaded ? (
          <img
            src={media.src}
            alt={media.alt}
            style={{ objectPosition: media.objectPosition }}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setLoaded(false)}
          />
        ) : (
          <div className="portrait-fallback" aria-label={media.alt}>
            <span className="portrait-monogram">MPD</span>
            <span className="portrait-fallback-line">Portrait / reserved</span>
          </div>
        )}
      </div>
      <figcaption>
        <span>{media.label}</span>
        {isOwner && !loaded && (
          <span className="portrait-owner-hint">Replace {media.src}</span>
        )}
      </figcaption>
    </figure>
  );
};
