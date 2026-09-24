'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCms } from '@/context/CmsContext';

export default function Hero() {
  const { content } = useCms();
  const heroRef = useRef(null);
  const videoBoxRef = useRef(null);
  const videoTintRef = useRef(null);
  const figmaStageRef = useRef(null);
  const textScrollStageRef = useRef(null);
  const straightTextRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Autoplay compliance
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.play().catch(() => {
        const startOnInteraction = () => {
          videoRef.current?.play();
          window.removeEventListener('click', startOnInteraction);
          window.removeEventListener('scroll', startOnInteraction);
          window.removeEventListener('touchstart', startOnInteraction);
        };
        window.addEventListener('click', startOnInteraction);
        window.addEventListener('scroll', startOnInteraction);
        window.addEventListener('touchstart', startOnInteraction);
      });
    }

    const heroTrack = heroRef.current;
    const videoBox = videoBoxRef.current;
    const videoTint = videoTintRef.current;
    const figmaStage = figmaStageRef.current;
    const textScrollStage = textScrollStageRef.current;
    const straightTextEl = straightTextRef.current;

    if (!heroTrack || !videoBox || !figmaStage || !textScrollStage || !straightTextEl) return;

    const getMetrics = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const dTransition = Math.max(450, Math.round(vh * 0.5));
      const dTextScroll = Math.max(1400, Math.round(vh * 1.6));
      const dExitPause = Math.max(450, Math.round(vh * 0.5));
      const totalTrackScroll = dTransition + dTextScroll + dExitPause;
      return { vh, vw, dTransition, dTextScroll, dExitPause, totalTrackScroll };
    };

    const updateTrackHeight = () => {
      const { vh, totalTrackScroll } = getMetrics();
      heroTrack.style.height = `${vh + totalTrackScroll}px`;
    };

    const render = () => {
      const { vw, dTransition, dTextScroll } = getMetrics();
      const isDesktop = vw > 900;
      const rect = heroTrack.getBoundingClientRect();
      const trackTop = window.scrollY + rect.top;
      const currentScroll = window.scrollY - trackTop;

      if (currentScroll <= 0) {
        figmaStage.style.display = 'block';
        figmaStage.style.opacity = '1';
        figmaStage.style.pointerEvents = 'auto';

        videoBox.style.right = '0';
        videoBox.style.left = 'auto';
        videoBox.style.width = isDesktop ? '50%' : '100%';
        if (videoTint) videoTint.style.background = 'rgba(0, 0, 0, 0.08)';

        textScrollStage.style.display = 'none';
        textScrollStage.style.opacity = '0';
        return;
      }

      if (currentScroll <= dTransition) {
        const p1 = currentScroll / dTransition;
        const ease1 = p1 * p1;

        const figmaOp = Math.max(0, 1 - ease1 * 1.15);
        figmaStage.style.display = figmaOp > 0 ? 'block' : 'none';
        figmaStage.style.opacity = figmaOp.toFixed(3);
        figmaStage.style.pointerEvents = figmaOp > 0.5 ? 'auto' : 'none';

        if (isDesktop) {
          const currentWidth = 50 + ease1 * 50;
          videoBox.style.width = `${currentWidth.toFixed(2)}%`;
        } else {
          videoBox.style.width = '100%';
        }

        if (videoTint) {
          const tint = 0.08 + ease1 * (0.35 - 0.08);
          videoTint.style.background = `rgba(0, 0, 0, ${tint.toFixed(2)})`;
        }

        textScrollStage.style.display = 'none';
        textScrollStage.style.opacity = '0';
        return;
      }

      figmaStage.style.display = 'none';
      figmaStage.style.pointerEvents = 'none';
      videoBox.style.width = '100%';
      if (videoTint) videoTint.style.background = 'rgba(0, 0, 0, 0.35)';

      const scrollInPhase2 = currentScroll - dTransition;

      if (scrollInPhase2 <= dTextScroll) {
        const p2 = Math.max(0, Math.min(1, scrollInPhase2 / dTextScroll));

        const textWidth = straightTextEl.scrollWidth || 2000;
        const startX = vw * 0.45;
        const endX = -(textWidth + vw * 0.25);
        const currentX = startX - p2 * (startX - endX);

        let textOp = 1;
        if (p2 < 0.12) {
          textOp = p2 / 0.12;
        } else if (p2 > 0.85) {
          textOp = Math.max(0, (1 - p2) / 0.15);
        }

        textScrollStage.style.display = textOp > 0 ? 'flex' : 'none';
        textScrollStage.style.opacity = textOp.toFixed(3);
        textScrollStage.style.transform = `translate3d(${currentX.toFixed(1)}px, 0, 0)`;
        return;
      }

      textScrollStage.style.display = 'none';
      textScrollStage.style.opacity = '0';
    };

    let isTicking = false;
    const onScrollOrResize = () => {
      if (!isTicking) {
        requestAnimationFrame(() => {
          render();
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', () => {
      updateTrackHeight();
      onScrollOrResize();
    }, { passive: true });

    updateTrackHeight();
    render();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <div className="hero-pinned-track" id="hero" ref={heroRef}>
      <div className="hero-sticky-stage" id="heroStickyStage">
        {/* Video Container: LEFT / EXPANDING ON SCROLL */}
        <div className="hero-figma-video-col" id="heroVideoBox" ref={videoBoxRef}>
          <video
            ref={videoRef}
            className="hero-bg-video"
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/images/hero_smiling_woman.jpg"
          >
            <source src="/assets/images/Woman_running_in_park_202608281117.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-video-tint" id="heroVideoTint" ref={videoTintRef}></div>
        </div>

        {/* Main Hero Container with Exact Dual-Tone Split Headline */}
        <div className="hero-figma-main-container" id="heroFigmaStage" ref={figmaStageRef}>
          <div className="hero-figma-left-content" id="heroLeftContent">
            <div className="figma-headline-wrap">
              <h1 className="figma-headline-line line-1">
                {content?.heroHeading ? content.heroHeading.split('For')[0].trim() || content.heroHeading : 'Advanced TMD & TMJ Care'}
              </h1>
              <h2 className="figma-headline-line line-2">
                {content?.heroHeading && content.heroHeading.includes('For')
                  ? `For ${content.heroHeading.split('For')[1].trim()}`
                  : 'For Better Jaw Health'}
              </h2>
            </div>
          </div>

          {/* Bottom Action Block: Rating Stack & CTA Buttons */}
          <div className="figma-right-actions-block">
            <div className="figma-primary-cta-col">
              <div className="figma-social-proof-row">
                <div className="figma-avatar-pile">
                  <Image src="/assets/images/og image.png" alt="Dr. Ashwin" width={40} height={40} className="figma-avatar-img" />
                  <Image src="/assets/images/outcome_eating.jpg" alt="Patient eating" width={40} height={40} className="figma-avatar-img" />
                  <Image src="/assets/images/outcome_laughing.jpg" alt="Patient laughing" width={40} height={40} className="figma-avatar-img" />
                  <Image src="/assets/images/hero_smiling_woman.jpg" alt="Patient smiling" width={40} height={40} className="figma-avatar-img" />
                </div>

                <div className="figma-rating-group">
                  <div className="figma-star-row">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <div className="figma-rating-number">4.9/5</div>
                </div>
              </div>

              <Link href="/contact" className="figma-gold-btn" id="heroConsultBtn">
                {content?.heroCta1 || 'Book a consultation'}
              </Link>
            </div>

            <Link href="#what-is-tmd" className="figma-outline-btn">
              {content?.heroCta2 || 'See how we help'}
            </Link>
          </div>
        </div>

        {/* Second Stage: Full-Screen Video with Horizontal Text Sweep */}
        <div className="hero-text-scroll-stage" id="heroTextScrollStage" ref={textScrollStageRef}>
          <div className="hero-straight-line-text" id="heroStraightText" ref={straightTextRef}>
            Eat properly. Sleep deeply. Wake up feeling like yourself.
          </div>
        </div>
      </div>
    </div>
  );
}
