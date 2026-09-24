'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useCms } from '@/context/CmsContext';

const defaultTestimonials = [
  {
    name: 'Priya Nair',
    time: '1 week ago',
    text: 'Visiting multiple clinics, Dr. Ashwin diagnosed the root cause of my jaw clenching and facial tension. Exceptional personal care and very polite staff.',
    avatar: '/assets/images/outcome_sunset.jpg',
  },
  {
    name: 'Vivek Menon',
    time: '2 weeks ago',
    text: 'Sleeping peacefully without jaw clenching was a dream for 5 years. The custom treatment plan changed my mornings forever. Very good service.',
    avatar: '/assets/images/outcome_running.jpg',
  },
  {
    name: 'Anjali R.',
    time: '3 weeks ago',
    text: 'For the first time in years, I enjoyed an entire vacation without worrying about jaw pain or migraines. Truly life-changing care and very good experience.',
    avatar: '/assets/images/outcome_laughing.jpg',
  },
  {
    name: 'Kavita Sundaram',
    time: '1 month ago',
    text: 'The treatment gave me my life back — it changed how I chew, speak, and smile without constant joint clicking. Highly recommended doctor.',
    avatar: '/assets/images/hero_smiling_woman.jpg',
  },
  {
    name: 'Dr. Arun Varma',
    time: '2 months ago',
    text: 'As a dental professional, the computerized T-scan and splint protocol eliminated my chronic bite fatigue completely. Outstanding results and care.',
    avatar: '/assets/images/outcome_eating.jpg',
  },
];

export default function Testimonials() {
  const { content } = useCms();

  const testimonials = useMemo(() => {
    if (content?.reviewContent && content?.reviewAuthor) {
      return [
        {
          name: content.reviewAuthor,
          time: 'Recently updated',
          text: content.reviewContent,
          avatar: '/assets/images/outcome_running.jpg',
        },
        ...defaultTestimonials.slice(1),
      ];
    }
    return defaultTestimonials;
  }, [content?.reviewContent, content?.reviewAuthor]);

  return (
    <section className="real-stories-section" id="stories">
      <div className="real-stories-container">
        <h2 className="real-stories-title">
          {content?.testimonialsSectionName ? (
            <>
              {content.testimonialsSectionName.split('.')[0]}.{' '}
              <span className="gold-highlight">
                {content.testimonialsSectionName.split('.')[1] || 'Real Freedom.'}
              </span>
            </>
          ) : (
            <>
              Real Stories. <span className="gold-highlight">Real Freedom.</span>
            </>
          )}
        </h2>
      </div>

      <div className="real-stories-slider-wrap" id="storiesSliderWrap">
        <div className="real-stories-track" id="storiesTrack">
          {/* First loop of cards */}
          {testimonials.map((t, idx) => (
            <div className="chat-review-card" key={`first-${idx}`}>
              <div className="chat-bubble">
                <p className="chat-bubble-text">{t.text}</p>
                <div className="chat-bubble-stars">★★★★★</div>
              </div>
              <div className="chat-author-row">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={42}
                  height={42}
                  className="chat-author-avatar"
                />
                <div className="chat-author-meta">
                  <span className="chat-author-name">{t.name}</span>
                  <span className="chat-author-time">{t.time}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicate set for infinite seamless loop */}
          {testimonials.map((t, idx) => (
            <div className="chat-review-card" key={`second-${idx}`} aria-hidden="true">
              <div className="chat-bubble">
                <p className="chat-bubble-text">{t.text}</p>
                <div className="chat-bubble-stars">★★★★★</div>
              </div>
              <div className="chat-author-row">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={42}
                  height={42}
                  className="chat-author-avatar"
                />
                <div className="chat-author-meta">
                  <span className="chat-author-name">{t.name}</span>
                  <span className="chat-author-time">{t.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
