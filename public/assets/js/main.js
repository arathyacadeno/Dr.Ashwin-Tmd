/**
 * Dr. Ashwin's TMD Clinic - Exact Figma Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHeroVideo();
  initHorizontalHeroScroll();
  initTreatmentStrips();
  initTreatmentsHoverCursor();
  initScrollDrivenCardStacking();
  initEquipmentDualScroll();
  initBookingModal();
  initNewsletter();
  initMetricsRotatingConvergence();
  initContactNavigationAnimation();
  initCarePrinciplesCards();
});

/* ==========================================================================
   Header Scroll & Mobile Menu
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (!header) return;

  let lastScrollY = window.scrollY;
  const scrollThreshold = 8;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const isMobileMenuOpen = navMenu && navMenu.style.display === 'flex';

    if (currentScrollY <= 50) {
      header.classList.remove('scrolled');
      header.classList.remove('nav-hidden');
      lastScrollY = currentScrollY;
      return;
    }

    header.classList.add('scrolled');

    // Do not hide navbar if mobile menu drawer is open
    if (isMobileMenuOpen) {
      lastScrollY = currentScrollY;
      return;
    }

    // Directional scroll check
    if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN -> Hide navbar
        header.classList.add('nav-hidden');
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP -> Reveal navbar
        header.classList.remove('nav-hidden');
      }
      lastScrollY = currentScrollY;
    }
  }, { passive: true });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = header.classList.contains('scrolled') ? 'rgba(255, 255, 255, 0.98)' : 'rgba(25, 25, 25, 0.98)';
        navMenu.style.padding = '2rem';
        navMenu.style.gap = '1.5rem';
        navMenu.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      }
    });
  }
}

/* ==========================================================================
   Our Treatments (Horizontal Multi-Strip Accordion)
   ========================================================================== */
function initTreatmentStrips() {
  const strips = document.querySelectorAll('.treatment-strip');

  strips.forEach(strip => {
    strip.addEventListener('click', function(e) {
      if (e.target.closest('button, a, input')) return;

      const isMobile = window.innerWidth <= 960;
      if (isMobile) {
        if (this.classList.contains('active')) {
          window.location.href = 'treatments.html';
        } else {
          strips.forEach(s => s.classList.remove('active'));
          this.classList.add('active');
        }
      } else {
        // Desktop: clicking on the strip with "Learn More" cursor navigates to treatments page
        window.location.href = 'treatments.html';
      }
    });

    strip.addEventListener('mouseenter', function() {
      if (window.innerWidth > 960) {
        strips.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
      }
    });

    // Keyboard accessibility: Enter or Space triggers navigation
    strip.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = 'treatments.html';
      }
    });
  });
}

/* ==========================================================================
   Treatments Custom Hover Cursor Follower ("Learn More ✦")
   ========================================================================== */
function initTreatmentsHoverCursor() {
  const container = document.getElementById('treatmentsStrips');
  const cursor = document.getElementById('treatmentsHoverCursor');
  if (!container || !cursor) return;

  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = -100;
  let mouseY = -100;
  let currentX = -100;
  let currentY = -100;
  let isHovering = false;
  let rafId = null;

  const updatePosition = () => {
    // Smooth lerp physics for cursor follower (floats lightly above-right of cursor)
    currentX += (mouseX + 10 - currentX) * 0.25;
    currentY += (mouseY - 16 - currentY) * 0.25;

    cursor.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;

    if (isHovering || Math.abs(mouseX + 10 - currentX) > 0.2 || Math.abs(mouseY - 16 - currentY) > 0.2) {
      rafId = requestAnimationFrame(updatePosition);
    } else {
      rafId = null;
    }
  };

  const scheduleUpdate = () => {
    if (!rafId) {
      rafId = requestAnimationFrame(updatePosition);
    }
  };

  container.addEventListener('mouseenter', (e) => {
    if (window.innerWidth <= 960) return;
    isHovering = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    currentX = mouseX + 10;
    currentY = mouseY - 16;
    cursor.classList.add('visible');
    scheduleUpdate();
  });

  container.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 960) return;
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isHovering) {
      isHovering = true;
      cursor.classList.add('visible');
    }
    scheduleUpdate();
  });

  container.addEventListener('mouseleave', () => {
    isHovering = false;
    cursor.classList.remove('visible');
  });

  // Clicking on any active strip directly triggers navigation to treatments page
  container.addEventListener('click', (e) => {
    const activeStrip = e.target.closest('.treatment-strip.active');
    if (activeStrip && !e.target.closest('button, a, input')) {
      window.location.href = 'treatments.html';
    }
  });
}

/* ==========================================================================
   Consultation Booking Modal
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const openBtns = document.querySelectorAll('[data-open-modal="booking"]');
  const closeBtn = document.getElementById('modalCloseBtn');
  const form = document.getElementById('consultationForm');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('active');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName').value;
      const phone = document.getElementById('modalPhone').value;
      alert(`Thank you, ${name}! Your consultation request with Dr. Ashwin's clinic has been received. Our clinical coordinator will call you at ${phone} to confirm your appointment.`);
      form.reset();
      if (modal) modal.classList.remove('active');
    });
  }
}

/* ==========================================================================
   Newsletter Submission
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      alert(`Thank you for subscribing (${email}) to Dr. Ashwin TMD Clinic updates!`);
      form.reset();
    });
  }
}

/* ==========================================================================
   Hero Background Video & Scroll Interactions
   ========================================================================== */
function initHeroVideo() {
  const video = document.querySelector('.hero-bg-video');
  if (video) {
    // Ensure muted & playsinline attributes are set for autoplay compliance
    video.muted = true;
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback: video will play on first user interaction
        const startVideoOnInteraction = () => {
          video.play();
          window.removeEventListener('click', startVideoOnInteraction);
          window.removeEventListener('scroll', startVideoOnInteraction);
          window.removeEventListener('touchstart', startVideoOnInteraction);
        };
        window.addEventListener('click', startVideoOnInteraction);
        window.addEventListener('scroll', startVideoOnInteraction);
        window.addEventListener('touchstart', startVideoOnInteraction);
      });
    }
  }
}

/* ==========================================================================
   Hero Section - Two-Stage Interactive Architecture:
   Stage 1 (Initial / Scroll 0):
     - Split Hero layout: 50% left video, 50% right canvas with reviews and CTAs.
     - Visible and fully interactive immediately upon opening the website.
   Stage 2 (On Scroll Down):
     - Split hero fades out while video smoothly expands from 50% to 100% full-screen.
     - Video tint gently darkens.
     - Horizontal straight-line text ("Eat properly. Sleep deeply. Wake up feeling like yourself.")
       sweeps gracefully across the full-screen video from right to left.
     - When the text completes, the section unpins seamlessly and flows directly into the Doctor's Quote (#about).
   ========================================================================== */
function initHorizontalHeroScroll() {
  const heroTrack = document.getElementById('hero');
  const videoBox = document.getElementById('heroVideoBox');
  const videoTint = document.getElementById('heroVideoTint');
  const figmaStage = document.getElementById('heroFigmaStage');
  const textScrollStage = document.getElementById('heroTextScrollStage');
  const straightTextEl = document.getElementById('heroStraightText');

  if (!heroTrack || !videoBox || !figmaStage || !textScrollStage || !straightTextEl) return;

  const getMetrics = () => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    // Phase 1: Split hero fades out and video expands
    const dTransition = Math.max(450, Math.round(vh * 0.5));
    // Phase 2: Horizontal text sweeps across smoothly from right to left
    const dTextScroll = Math.max(1400, Math.round(vh * 1.6));
    // Phase 3: Buffer after text ends and exits completely BEFORE unpinning to next section
    const dExitPause = Math.max(450, Math.round(vh * 0.5));
    const totalTrackScroll = dTransition + dTextScroll + dExitPause;
    return { vh, vw, dTransition, dTextScroll, dExitPause, totalTrackScroll };
  };

  const updateTrackHeight = () => {
    const { vh, totalTrackScroll } = getMetrics();
    heroTrack.style.height = `${vh + totalTrackScroll}px`;
  };

  const render = () => {
    const { vw, dTransition, dTextScroll, totalTrackScroll } = getMetrics();
    const isDesktop = vw > 900;
    const rect = heroTrack.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const currentScroll = window.scrollY - trackTop;

    // ------------------------------------------------------------------------
    // Case 1: Initial state on open (scroll <= 0)
    // First show this: Split Hero visible immediately!
    // ------------------------------------------------------------------------
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

    // ------------------------------------------------------------------------
    // Case 2: Phase 1 (0 < currentScroll <= dTransition)
    // Video expands from 50% to 100%, and split hero fades out
    // ------------------------------------------------------------------------
    if (currentScroll <= dTransition) {
      const p1 = currentScroll / dTransition; // 0.0 -> 1.0
      const ease1 = p1 * p1;

      // Fade out Stage 1 content
      const figmaOp = Math.max(0, 1 - ease1 * 1.15);
      figmaStage.style.display = figmaOp > 0 ? 'block' : 'none';
      figmaStage.style.opacity = figmaOp.toFixed(3);
      figmaStage.style.pointerEvents = figmaOp > 0.5 ? 'auto' : 'none';

      // Expand video from 50% to 100% on desktop (stays 100% on mobile)
      if (isDesktop) {
        const currentWidth = 50 + (ease1 * 50);
        videoBox.style.width = `${currentWidth.toFixed(2)}%`;
      } else {
        videoBox.style.width = '100%';
      }

      // Tint darkens slightly for contrast
      if (videoTint) {
        const tint = 0.08 + (ease1 * (0.35 - 0.08));
        videoTint.style.background = `rgba(0, 0, 0, ${tint.toFixed(2)})`;
      }

      // Text scroll stage hidden until ready
      textScrollStage.style.display = 'none';
      textScrollStage.style.opacity = '0';
      return;
    }

    // ------------------------------------------------------------------------
    // Case 3: Phase 2 (dTransition < currentScroll <= dTransition + dTextScroll)
    // Full-screen video + Horizontal text scroll animation
    // ------------------------------------------------------------------------
    // Ensure Stage 1 is fully hidden and video is 100%
    figmaStage.style.display = 'none';
    figmaStage.style.pointerEvents = 'none';
    videoBox.style.width = '100%';
    if (videoTint) videoTint.style.background = 'rgba(0, 0, 0, 0.35)';

    const scrollInPhase2 = currentScroll - dTransition;

    if (scrollInPhase2 <= dTextScroll) {
      const p2 = Math.max(0, Math.min(1, scrollInPhase2 / dTextScroll)); // 0.0 -> 1.0

      // Sweep horizontal text across the screen
      const textWidth = straightTextEl.scrollWidth || 2000;
      // Start entering from comfortable right position
      const startX = vw * 0.45;
      // End: completely off-screen to the left (past entire text width with extra clearance)
      const endX = -(textWidth + vw * 0.25);
      const currentX = startX - (p2 * (startX - endX));

      // Opacity: fade in smoothly, stay solid, and fade out cleanly as text ends (0.85 -> 1.0)
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

    // ------------------------------------------------------------------------
    // Case 4: Phase 3 (Text is completely ended -> clear buffer then unpin)
    // ------------------------------------------------------------------------
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
}

/* ==========================================================================
   Lifestyle Transformations - Scroll-Driven Card Stacking (Stacking Cards / Card Overlap)
   ========================================================================== */
function initScrollDrivenCardStacking() {
  const cards = document.querySelectorAll('.outcome-stacked-card');
  if (!cards.length) return;

  const firstCardImg = document.querySelector('.first-card-slide-img');
  const firstCardText = document.querySelector('.first-card-text-side');
  let isTicking = false;

  const animateNumberCount = (el, targetNum) => {
    if (!el || el.dataset.hasCounted === 'true') return;
    el.dataset.hasCounted = 'true';

    const targetStr = String(targetNum).padStart(2, '0');
    let current = 0;
    const duration = 360; // snappy 360ms duration
    const stepTime = Math.max(35, Math.floor(duration / (targetNum + 1)));

    el.textContent = '00';
    if (el._countTimer) clearInterval(el._countTimer);
    el._countTimer = setInterval(() => {
      current++;
      if (current >= targetNum) {
        el.textContent = targetStr;
        clearInterval(el._countTimer);
        el._countTimer = null;
      } else {
        el.textContent = String(current).padStart(2, '0');
      }
    }, stepTime);
  };

  const updateCardStack = () => {
    const vh = window.innerHeight;

    // Trigger matching animation for first card image and text when opening the section
    if (cards[0]) {
      const rect0 = cards[0].getBoundingClientRect();
      if (rect0.top < vh * 0.85 && rect0.bottom > 0) {
        if (firstCardImg) firstCardImg.classList.add('slide-in-active');
        if (firstCardText) firstCardText.classList.add('slide-in-active');
      } else if (rect0.top >= vh) {
        if (firstCardImg) firstCardImg.classList.remove('slide-in-active');
        if (firstCardText) firstCardText.classList.remove('slide-in-active');
      }
    }

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const numEl = card.querySelector('.outcome-big-number');

      // Animate numbers 1 to 5 as their respective card enters the viewport
      if (numEl) {
        const isVisible = rect.top < vh * 0.82 && rect.bottom > vh * 0.12;
        if (isVisible) {
          if (!numEl.classList.contains('number-active')) {
            numEl.classList.add('number-active');
            animateNumberCount(numEl, i + 1);
          }
        } else if (rect.top >= vh) {
          if (numEl._countTimer) {
            clearInterval(numEl._countTimer);
            numEl._countTimer = null;
          }
          numEl.classList.remove('number-active');
          numEl.dataset.hasCounted = 'false';
          numEl.textContent = String(i + 1).padStart(2, '0');
        }
      }

      // Find how much this card is overlapped by subsequent full-screen cards
      let totalOverlap = 0;

      for (let j = i + 1; j < cards.length; j++) {
        const nextCard = cards[j];
        const nextRect = nextCard.getBoundingClientRect();

        // As nextCard scrolls from bottom of viewport (vh) to top (0)
        if (nextRect.top < vh && nextRect.top > 0) {
          const overlapProg = (vh - nextRect.top) / vh;
          totalOverlap += overlapProg;
        } else if (nextRect.top <= 0) {
          totalOverlap += 1;
        }
      }

      // Continuous scroll-driven depth scaling (pure white background maintained, no dimming or blur)
      const scale = Math.max(0.92, 1 - totalOverlap * 0.03);

      card.style.transform = `scale(${scale.toFixed(4)})`;
      card.style.filter = 'none';
    });

    isTicking = false;
  };

  const onScrollOrResize = () => {
    if (!isTicking) {
      requestAnimationFrame(updateCardStack);
      isTicking = true;
    }
  };

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize, { passive: true });

  // IntersectionObserver for silky smooth trigger upon card entrance
  if ('IntersectionObserver' in window && cards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const idx = Array.from(cards).indexOf(card);
          const numEl = card.querySelector('.outcome-big-number');
          if (numEl && !numEl.classList.contains('number-active')) {
            numEl.classList.add('number-active');
            animateNumberCount(numEl, idx + 1);
          }
          if (idx === 0) {
            if (firstCardImg) firstCardImg.classList.add('slide-in-active');
            if (firstCardText) firstCardText.classList.add('slide-in-active');
          }
        }
      });
    }, { threshold: 0.18 });
    cards.forEach((card) => observer.observe(card));
  }

  // Initial calculation
  updateCardStack();
}

/* ==========================================================================
   Advanced Equipment - Dual-Column Vertical Parallax Scroll
   - Sticky pinned stage at 100vh with centered title
   - Left stream scrolls UP as user scrolls down
   - Right stream moves in COUNTER-DIRECTION
   - Dynamic active-card highlight on scroll near viewport center
   ========================================================================== */
function initEquipmentDualScroll() {
  const track = document.getElementById('equipmentScrollTrack');
  const leftStream = document.getElementById('equipmentStreamLeft');
  const rightStream = document.getElementById('equipmentStreamRight');
  const cards = document.querySelectorAll('.equipment-scroll-card');

  if (!track || !leftStream || !rightStream) return;

  const updateDualScroll = () => {
    if (window.innerWidth <= 960) {
      leftStream.style.transform = 'none';
      rightStream.style.transform = 'none';
      return;
    }

    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const totalScroll = rect.height - vh;

    if (totalScroll <= 0) return;

    // Normalized progress (0 at top of track pinned, 1 at release)
    const current = -rect.top;
    const progress = Math.max(0, Math.min(1, current / totalScroll));

    const leftHeight = leftStream.offsetHeight || 1210;
    const rightHeight = rightStream.offsetHeight || 1210;
    const cardHalf = 190;
    const centerFocusY = (vh * 0.5) + 20;

    // Left stream: starts with Card 1 centered and glides UPWARDS to Card 3
    const leftStartY = centerFocusY - cardHalf;
    const leftEndY = centerFocusY - (leftHeight - cardHalf);
    const yLeft = leftStartY + (progress * (leftEndY - leftStartY));

    // Right stream: starts with Card 6 centered and glides DOWNWARDS to Card 4 (Counter-direction)
    const rightStartY = centerFocusY - (rightHeight - cardHalf);
    const rightEndY = centerFocusY - cardHalf;
    const yRight = rightStartY + (progress * (rightEndY - rightStartY));

    leftStream.style.transform = `translate3d(0, ${yLeft.toFixed(1)}px, 0)`;
    rightStream.style.transform = `translate3d(0, ${yRight.toFixed(1)}px, 0)`;

    // Center focal highlight: card closest to vertical center gets active glowing blue border
    let closestCard = null;
    let minDistance = Infinity;

    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.top + cardRect.height / 2;
      const dist = Math.abs(cardCenter - centerFocusY);

      if (cardRect.bottom > 50 && cardRect.top < vh - 50 && dist < minDistance) {
        minDistance = dist;
        closestCard = card;
      }
    });

    if (closestCard) {
      cards.forEach(card => {
        if (card === closestCard) {
          card.classList.add('active-card');
        } else {
          card.classList.remove('active-card');
        }
      });
    }
  };

  let isTicking = false;
  const onScroll = () => {
    if (!isTicking) {
      requestAnimationFrame(() => {
        updateDualScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateDualScroll();
}

// Sticky Scroll Pinning & Word-by-Word Reveal Animation for Doctor Section
document.addEventListener('DOMContentLoaded', () => {
  const stickySection = document.querySelector('.doctor-sticky-section');
  const revealWords = document.querySelectorAll('.reveal-word');
  const authorBlock = document.querySelector('.doc-author-block');

  if (!stickySection || revealWords.length === 0) return;

  const handleStickyScroll = () => {
    const rect = stickySection.getBoundingClientRect();
    const totalScrollable = stickySection.offsetHeight - window.innerHeight;

    if (totalScrollable <= 0) return;

    // Calculate scroll progress through sticky section (0 to 1)
    let progress = -rect.top / totalScrollable;
    progress = Math.max(0, Math.min(1, progress));

    // 1. Doctor Image Scale (0.75 to 1.05)
    const scale = 0.75 + (progress * 0.30);
    stickySection.style.setProperty('--doc-scale', scale);

    // 2. Word-by-Word Text Highlight Reveal
    const totalWords = revealWords.length;
    const activeWordCount = Math.floor(progress * (totalWords + 2));

    revealWords.forEach((word, index) => {
      if (index <= activeWordCount) {
        word.classList.add('active');
      } else {
        word.classList.remove('active');
      }
    });

    if (authorBlock) {
      if (progress >= 0.75) {
        authorBlock.classList.add('active', 'revealed');
      } else {
        authorBlock.classList.remove('active', 'revealed');
      }
    }
  };

  window.addEventListener('scroll', handleStickyScroll, { passive: true });
  handleStickyScroll();
});

/* ==========================================================================
   Rotating Convergence Animation for Metric Bubbles Section
   ========================================================================== */
function initMetricsRotatingConvergence() {
  const cluster = document.querySelector('.metrics-cluster');
  const wrapper = document.querySelector('.metrics-cluster-wrapper');
  if (!cluster || !wrapper) return;

  cluster.classList.add('ready-to-converge');

  let hasConverged = false;
  let animTimeout = null;

  const triggerConvergence = () => {
    cluster.classList.remove('ready-to-converge', 'is-floating', 'is-converged');
    // Force DOM reflow to allow clean keyframe restart
    void cluster.offsetWidth;
    cluster.classList.add('is-converging');

    if (animTimeout) clearTimeout(animTimeout);
    animTimeout = setTimeout(() => {
      cluster.classList.remove('is-converging');
      cluster.classList.add('is-converged', 'is-floating');
    }, 2600);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasConverged) {
          hasConverged = true;
          triggerConvergence();
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(wrapper);
  } else {
    triggerConvergence();
  }

  // Interactive Replay: clicking anywhere on the cluster replays the rotating convergence
  cluster.addEventListener('click', () => {
    if (!cluster.classList.contains('is-converging')) {
      triggerConvergence();
    }
  });
}

/* ==========================================================================
   Page Transition & Subpage Entrance Animation (Smooth reveal when opened)
   ========================================================================== */
function initContactNavigationAnimation() {
  // Smooth page transition when clicking subpage links from other pages
  const subpageLinks = document.querySelectorAll('a[href="contact.html"], a[href="/contact"], a[href="about.html"], a[href="/about"]');
  subpageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      const targetUrl = link.getAttribute('href');
      if (window.location.pathname.endsWith(targetUrl)) return;
      e.preventDefault();
      document.body.style.transition = 'opacity 0.28s ease-out, transform 0.28s ease-out';
      document.body.style.opacity = '0';
      document.body.style.transform = 'scale(0.99)';
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 260);
    });
  });

  // Direct entrance animations if loaded on contact page
  if (document.body.classList.contains('contact-page-body') || document.body.classList.contains('is-contact-page') || window.location.pathname.includes('contact.html')) {
    const hero = document.querySelector('.contact-header');
    const mainGrid = document.querySelector('.contact-form-row') || document.querySelector('.contact-main-grid');
    const detailsGrid = document.querySelector('.contact-details-grid');
    const mapContainer = document.querySelector('.contact-map-wrapper') || document.querySelector('.contact-map-container');

    const animatedElements = [hero, mainGrid, detailsGrid, mapContainer].filter(Boolean);

    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`;
      
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 40);
      });
    });
  }
}

/* ==========================================================================
   Care Principles - 4 Interactive Sliding / Fanned Cards Logic
   ========================================================================== */
function initCarePrinciplesCards() {
  const section = document.getElementById('care-principles');
  const track = document.getElementById('careCardsTrack');
  if (!section || !track) return;

  const cards = track.querySelectorAll('.care-card');
  if (!cards.length) return;

  let targetTrackX = 0;
  let currentTrackX = 0;
  let targetNormX = 0;
  let currentNormX = 0;
  let targetNormY = 0;
  let currentNormY = 0;
  let isMouseOver = false;
  let rafId = null;

  // Max sliding distance horizontally on wide screen
  const getMaxSlide = () => {
    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 768) return 0;
    // Allow responsive sliding so outer cards reach center focus
    return Math.max(160, Math.min(320, (trackWidth - viewportWidth) / 2 + 100));
  };

  function update() {
    // Smooth lerp interpolation
    const ease = 0.085;
    currentTrackX += (targetTrackX - currentTrackX) * ease;
    currentNormX += (targetNormX - currentNormX) * ease;
    currentNormY += (targetNormY - currentNormY) * ease;

    if (window.innerWidth > 768) {
      track.style.setProperty('--track-tx', `${currentTrackX.toFixed(2)}px`);

      // Micro parallax per card for 3D fanning feel
      cards.forEach((card, index) => {
        // Only apply parallax if card is not currently hovered
        if (!card.matches(':hover')) {
          const spreadFactor = (index - 1.5); // -1.5, -0.5, 0.5, 1.5
          const cardPX = currentNormX * spreadFactor * 10;
          const cardPY = currentNormY * 8;
          const cardPRot = currentNormX * (spreadFactor * 1.2);

          card.style.setProperty('--card-px', `${cardPX.toFixed(2)}px`);
          card.style.setProperty('--card-py', `${cardPY.toFixed(2)}px`);
          card.style.setProperty('--card-prot', `${cardPRot.toFixed(2)}deg`);
        } else {
          card.style.setProperty('--card-px', `0px`);
          card.style.setProperty('--card-py', `0px`);
          card.style.setProperty('--card-prot', `0deg`);
        }
      });
    }

    // Continue animation loop while active or easing
    if (isMouseOver || Math.abs(targetTrackX - currentTrackX) > 0.1 || Math.abs(currentNormX) > 0.005) {
      rafId = requestAnimationFrame(update);
    } else {
      rafId = null;
    }
  }

  function startLoop() {
    if (!rafId) {
      rafId = requestAnimationFrame(update);
    }
  }

  // Mouse move handler on section
  section.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized coordinates (-1 to 1)
    targetNormX = ((x / rect.width) * 2) - 1;
    targetNormY = ((y / rect.height) * 2) - 1;

    // Clamp normalized values
    targetNormX = Math.max(-1, Math.min(1, targetNormX));
    targetNormY = Math.max(-1, Math.min(1, targetNormY));

    // Slide track in opposite direction to follow mouse gaze
    const maxSlide = getMaxSlide();
    targetTrackX = -targetNormX * maxSlide;

    isMouseOver = true;
    startLoop();
  });

  section.addEventListener('mouseenter', () => {
    isMouseOver = true;
    startLoop();
  });

  section.addEventListener('mouseleave', () => {
    isMouseOver = false;
    // Gently glide back toward center rest position
    targetTrackX = 0;
    targetNormX = 0;
    targetNormY = 0;
    startLoop();
  });

  // Window resize check
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      track.style.removeProperty('--track-tx');
      cards.forEach(c => {
        c.style.removeProperty('--card-px');
        c.style.removeProperty('--card-py');
        c.style.removeProperty('--card-prot');
      });
    }
  });
}

