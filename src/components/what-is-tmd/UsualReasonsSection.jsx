import React from 'react';

const reasons = [
  {
    num: '01',
    title: 'Night-time clenching',
    desc: 'Clenching or grinding while you sleep puts enormous force on the joint and muscles without you knowing.'
  },
  {
    num: '02',
    title: 'Daytime stress habits',
    desc: 'Bracing the jaw, holding teeth together, or chewing cheeks and pens during periods of focus or stress.'
  },
  {
    num: '03',
    title: 'Breathing & Airway',
    desc: 'Mouth breathing, snoring, or airway restriction at night can pull the jaw back and overload the joint.'
  },
  {
    num: '04',
    title: 'Structural friction',
    desc: 'A cushioning disc that has slipped slightly out of place, creating friction, clicking, or reduced movement.'
  },
  {
    num: '05',
    title: 'Posture & screen habits',
    desc: 'Forward head posture and desk work change how your jaw hangs and increase muscle fatigue.'
  },
  {
    num: '06',
    title: 'An impact or accident',
    desc: 'A direct knock to the jaw, a whiplash injury, or an unusually long dental appointment that overstretched the joint.'
  },
  {
    num: '07',
    title: 'Dental changes',
    desc: 'New crowns, missing teeth, or bite changes that subtly shift how your teeth meet and force the joint to adapt.'
  },
  {
    num: '08',
    title: 'Joint vulnerability',
    desc: 'General joint hypermobility, arthritis, or genetic factors that make joint tissues more susceptible to strain.'
  }
];

export const UsualReasonsSection = () => {
  return (
    <section className="tmd-reasons-section" id="usualReasons">
      <div className="tmd-reasons-header">
        <h2 className="tmd-section-title">The usual reasons</h2>
        <p className="tmd-reasons-subtitle">
          TMD rarely arrives from a single clear event. For most patients, several factors build up together until the system simply runs out of room to compensate.
        </p>
      </div>

      <div className="tmd-reasons-grid">
        {reasons.map((reason, idx) => (
          <div key={idx} className="tmd-reason-card">
            <div className="reason-top-row">
              <span className="reason-num">{reason.num}</span>
            </div>
            <h3 className="reason-title">{reason.title}</h3>
            <p className="reason-desc">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UsualReasonsSection;
