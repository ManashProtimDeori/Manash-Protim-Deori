import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { personalMedia, ProfessionalMoment } from '../../data/personalMedia';

const Moment: React.FC<{ moment: ProfessionalMoment; index: number }> = ({ moment, index }) => {
  const { isOwner } = useAuth();
  const [failed, setFailed] = useState(false);

  if (failed && !isOwner) return null;

  return (
    <figure className={`moment-card moment-${moment.aspect}`}>
      {!failed ? (
        <img
          src={moment.image}
          alt={moment.alt || moment.title || 'Professional event photograph'}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="moment-placeholder">
          <span>0{index + 1}</span>
          <strong>Event photo slot</strong>
          <small>{moment.image}</small>
        </div>
      )}
      <figcaption>
        <span className="eyebrow">0{index + 1}</span>
        <div>
          <strong>{moment.title || (isOwner ? 'Add event title' : '')}</strong>
          {(moment.location || moment.date) && <span>{[moment.location, moment.date].filter(Boolean).join(' · ')}</span>}
          {moment.context && <p>{moment.context}</p>}
        </div>
      </figcaption>
    </figure>
  );
};

export const ProfessionalMoments: React.FC = () => {
  const { isOwner } = useAuth();
  const active = personalMedia.moments.filter(moment => moment.enabled);

  if (active.length === 0 && !isOwner) return null;

  return (
    <section className="professional-moments wide" data-signal="marketing">
      <div className="moments-heading">
        <div>
          <span className="eyebrow">In the room</span>
          <h2>Work is also <em>where you show up.</em></h2>
          <p>Selected moments from professional events, conversations and environments — shown only when a real photograph and factual context are provided.</p>
        </div>
      </div>

      {active.length > 0 ? (
        <div className="moments-grid">
          {active.map((moment, index) => <Moment key={moment.id} moment={moment} index={index} />)}
        </div>
      ) : (
        <div className="owner-media-note">
          <span className="eyebrow">Owner preview</span>
          <p>Professional-event slots are ready. Add photographs to <code>public/images/events/</code> and enable the corresponding entries in <code>src/data/personalMedia.ts</code>.</p>
        </div>
      )}
    </section>
  );
};
