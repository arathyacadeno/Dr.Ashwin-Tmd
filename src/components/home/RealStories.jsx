import React from 'react';
import { useClinic } from '../../context/ClinicContext';

export const RealStories = () => {
  const { testimonials } = useClinic();

  const reviews = testimonials && testimonials.length > 0 ? testimonials : [
    {
      id: 1,
      name: 'Priya Nair',
      timeAgo: '1 week ago',
      stars: 5,
      text: 'Visiting multiple clinics, Dr. Ashwin diagnosed the root cause of my jaw clenching and facial tension. Exceptional personal care and very polite staff.',
      avatar: '/assets/images/outcome_sunset.jpg'
    },
    {
      id: 2,
      name: 'Vivek Menon',
      timeAgo: '2 weeks ago',
      stars: 5,
      text: 'Sleeping peacefully without jaw clenching was a dream for 5 years. The custom treatment plan changed my mornings forever. Very good service.',
      avatar: '/assets/images/outcome_running.jpg'
    },
    {
      id: 3,
      name: 'Anjali R.',
      timeAgo: '3 weeks ago',
      stars: 5,
      text: 'For the first time in years, I enjoyed an entire vacation without worrying about jaw pain or migraines. Truly life-changing care and very good experience.',
      avatar: '/assets/images/outcome_laughing.jpg'
    },
    {
      id: 4,
      name: 'Kavita Sundaram',
      timeAgo: '1 month ago',
      stars: 5,
      text: 'The treatment gave me my life back — it changed how I chew, speak, and smile without constant joint clicking. Highly recommended doctor.',
      avatar: '/assets/images/hero_smiling_woman.jpg'
    },
    {
      id: 5,
      name: 'Dr. Arun Varma',
      timeAgo: '2 months ago',
      stars: 5,
      text: 'As a dental professional, the computerized T-scan and splint protocol eliminated my chronic bite fatigue completely. Outstanding results and care.',
      avatar: '/assets/images/outcome_eating.jpg'
    }
  ];

  return (
    <section className="real-stories-section" id="stories">
      <div className="real-stories-container">
        <h2 className="real-stories-title">
          Real Stories. <span className="gold-highlight">Real Freedom.</span>
        </h2>
      </div>

      <div className="real-stories-slider-wrap" id="storiesSliderWrap">
        <div className="real-stories-track" id="storiesTrack">
          {/* Primary Set */}
          {reviews.map((rev, i) => (
            <div key={`rev-${rev.id || i}`} className="chat-review-card">
              <div className="chat-bubble">
                <p className="chat-bubble-text">{rev.text}</p>
                <div className="chat-bubble-stars">
                  {'★'.repeat(rev.stars || 5)}
                </div>
              </div>
              <div className="chat-author-row">
                <img
                  src={rev.avatar || '/assets/images/hero_smiling_woman.jpg'}
                  alt={rev.name}
                  className="chat-author-avatar"
                />
                <div className="chat-author-meta">
                  <span className="chat-author-name">{rev.name}</span>
                  <span className="chat-author-time">{rev.timeAgo || 'Recently'}</span>
                </div>
              </div>
            </div>
          ))}

          {/* DUPLICATE SET FOR INFINITE SEAMLESS LOOP */}
          {reviews.map((rev, i) => (
            <div key={`rev-dup-${rev.id || i}`} className="chat-review-card" aria-hidden="true">
              <div className="chat-bubble">
                <p className="chat-bubble-text">{rev.text}</p>
                <div className="chat-bubble-stars">
                  {'★'.repeat(rev.stars || 5)}
                </div>
              </div>
              <div className="chat-author-row">
                <img
                  src={rev.avatar || '/assets/images/hero_smiling_woman.jpg'}
                  alt={rev.name}
                  className="chat-author-avatar"
                />
                <div className="chat-author-meta">
                  <span className="chat-author-name">{rev.name}</span>
                  <span className="chat-author-time">{rev.timeAgo || 'Recently'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealStories;
