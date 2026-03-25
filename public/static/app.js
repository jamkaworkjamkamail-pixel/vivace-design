/* ============================================================
   VIVACE DESIGN INTERIOR
   Full Noomo-Level Motion System — GSAP + ScrollTrigger
   Every animation hand-crafted, zero compromise
   ============================================================ */

window.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────────────────────
     GSAP SETUP
  ───────────────────────────────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // Noomo's signature easing
  CustomEase.create('noomo', '0.76, 0, 0.24, 1');
  CustomEase.create('noomoOut', '0.25, 1, 0.5, 1');
  CustomEase.create('noomoIn', '0.5, 0, 0.75, 0');

  const isDesktop = window.innerWidth > 1024;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────────────────────
     SCROLL PROGRESS BAR
  ───────────────────────────────────────────────────────── */
  const bar = document.getElementById('scroll-progress');
  if (bar) {
    gsap.to(bar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 0.3 }
    });
  }

  /* ─────────────────────────────────────────────────────────
     PRELOADER  (Noomo: brand name types in, bar fills, doors open)
  ───────────────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    document.body.style.overflow = 'hidden';

    const logo = preloader.querySelector('.preloader-logo');
    const line = preloader.querySelector('.preloader-line');

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloader, {
          yPercent: -100,
          duration: 1.1,
          ease: 'noomo',
          onComplete: () => {
            preloader.style.display = 'none';
            document.body.style.overflow = '';
            launchHeroEntrance();
          }
        });
      }
    });

    tl.set(logo, { opacity: 0, y: 18 })
      .to(logo, { opacity: 1, y: 0, duration: 0.9, ease: 'noomoOut' }, 0.2)
      .fromTo(line, { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 1.1, ease: 'noomo' }, 0.5)
      .to({}, { duration: 0.4 }); // hold

  } else {
    launchHeroEntrance();
  }

  /* ─────────────────────────────────────────────────────────
     HERO ENTRANCE  (Noomo: staggered lines + image scale)
  ───────────────────────────────────────────────────────── */
  function launchHeroEntrance() {
    const hero = document.querySelector('.hero');
    if (!hero) { initAll(); return; }

    const img = hero.querySelector('.hero-bg img');
    const eyebrow = hero.querySelector('.hero-eyebrow');
    const titleEl = hero.querySelector('.hero-title');
    const subtitle = hero.querySelector('.hero-subtitle');
    const actions = hero.querySelector('.hero-actions');
    const scrollCue = hero.querySelector('.hero-scroll-cue');

    // Split title into lines
    const titleLines = splitIntoLines(titleEl);

    const tl = gsap.timeline({ defaults: { ease: 'noomoOut' } });

    if (img) {
      tl.fromTo(img, { scale: 1.18, opacity: 0 }, { scale: 1.0, opacity: 1, duration: 2.2, ease: 'noomo' }, 0);
    }
    if (eyebrow) {
      tl.fromTo(eyebrow, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5);
    }
    if (titleLines.length) {
      tl.fromTo(titleLines,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'noomo' },
        0.7
      );
    } else if (titleEl) {
      tl.fromTo(titleEl, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, 0.7);
    }
    if (subtitle) {
      tl.fromTo(subtitle, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 }, 1.2);
    }
    if (actions) {
      tl.fromTo(actions, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, 1.45);
    }
    if (scrollCue) {
      tl.fromTo(scrollCue, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.8);
    }

    tl.eventCallback('onComplete', initAll);
  }

  /* ─────────────────────────────────────────────────────────
     SPLIT LINES HELPER
  ───────────────────────────────────────────────────────── */
  function splitIntoLines(el) {
    if (!el) return [];
    const text = el.innerText;
    const words = text.split(' ');
    // Wrap each word in a span.word inside a span.line (overflow:hidden)
    const lineGroups = [];
    let currentLine = [];
    let lineWidth = 0;
    const elWidth = el.offsetWidth || 800;

    // Simple split: if text has <br>, split there; otherwise split by ~50% width
    const htmlContent = el.innerHTML;
    if (htmlContent.includes('<br>') || htmlContent.includes('<em>')) {
      // Keep as-is, use clipLine approach
      const parts = htmlContent.split(/<br\s*\/?>/i);
      el.innerHTML = parts.map(p =>
        `<span class="gsap-line" style="display:block;overflow:hidden;"><span class="gsap-line-inner" style="display:block;">${p}</span></span>`
      ).join('');
      return el.querySelectorAll('.gsap-line-inner');
    }

    el.innerHTML = `<span class="gsap-line" style="display:block;overflow:hidden;"><span class="gsap-line-inner" style="display:block;">${text}</span></span>`;
    return el.querySelectorAll('.gsap-line-inner');
  }

  /* ─────────────────────────────────────────────────────────
     INIT ALL — after hero entrance completes
  ───────────────────────────────────────────────────────── */
  function initAll() {
    initNav();
    initMobileMenu();
    initSectionTextReveals();
    initClipImageReveals();
    initPinnedScrollSection();
    initCategoryFullItems();
    initProjectCards3D();
    initDesignerCards();
    initParallaxImages();
    initProcessAccordion();
    initCounters();
    initFilterTabs();
    initMagneticElements();
    initCursor();
    initMarquee();
    initScrollVelocity();
    initFormLogic();
    initPageTransitions();
    initAmbientStrip();
    initActiveNav();
  }

  /* ─────────────────────────────────────────────────────────
     NAV
  ───────────────────────────────────────────────────────── */
  function initNav() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    const hero = document.querySelector('.hero, .project-hero, .designer-hero');
    ScrollTrigger.create({
      start: 'top -60px',
      onEnter: () => { nav.classList.add('scrolled'); if (hero) nav.classList.remove('hero-nav'); },
      onLeaveBack: () => { nav.classList.remove('scrolled'); if (hero) nav.classList.add('hero-nav'); }
    });
  }

  /* ─────────────────────────────────────────────────────────
     MOBILE MENU
  ───────────────────────────────────────────────────────── */
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;

    const links = menu.querySelectorAll('a');

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (isOpen) {
        gsap.fromTo(links,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'noomoOut', delay: 0.1 }
        );
      }
    });

    links.forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ─────────────────────────────────────────────────────────
     SECTION TEXT REVEALS  (Noomo: line-by-line mask wipe)
  ───────────────────────────────────────────────────────── */
  function initSectionTextReveals() {
    // Eyebrow labels
    gsap.utils.toArray('.eyebrow').forEach(el => {
      if (el.closest('.hero')) return;
      gsap.fromTo(el,
        { opacity: 0, x: -16 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'noomoOut',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      );
    });

    // All headlines — split into lines
    gsap.utils.toArray('.headline-xl, .headline-lg, .headline-md, .intro-statement, .project-description, .approach-quote').forEach(el => {
      if (el.closest('.hero, #preloader')) return;
      const lines = splitIntoLines(el);
      if (lines.length) {
        gsap.fromTo(lines,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.1, ease: 'noomo',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          }
        );
      } else {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'noomoOut',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          }
        );
      }
    });

    // Body text — word by word fade
    gsap.utils.toArray('.body-text, .form-subtitle, .pinned-panel-desc, .hero-subtitle').forEach(el => {
      if (el.closest('.hero')) return;
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'noomoOut',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });
  }

  /* ─────────────────────────────────────────────────────────
     CLIP-PATH IMAGE REVEALS  (Noomo signature: bottom-to-top wipe)
  ───────────────────────────────────────────────────────── */
  function initClipImageReveals() {
    // Every image container that should reveal
    const containers = gsap.utils.toArray([
      '.intro-image-wrap',
      '.process-image',
      '.designer-card-portrait',
      '.clip-item [data-clip-reveal]',
      '.ambient-strip-item',
      '.gallery-item',
      '[data-clip-reveal]'
    ]);

    containers.forEach((el, i) => {
      // Wrap if not already
      if (!el.style.overflow) el.style.overflow = 'hidden';

      gsap.fromTo(el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'noomo',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          },
          delay: (i % 3) * 0.12
        }
      );

      // Subtle inner image parallax during reveal
      const img = el.querySelector('img');
      if (img) {
        gsap.fromTo(img,
          { scale: 1.12 },
          {
            scale: 1.0,
            duration: 1.6,
            ease: 'noomo',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          }
        );
      }
    });

    // Project card images
    gsap.utils.toArray('.project-card-image, .filter-card-image').forEach((el, i) => {
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'noomo',
          delay: (i % 4) * 0.1,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      );
    });
  }

  /* ─────────────────────────────────────────────────────────
     PINNED SCROLL SECTION  (Noomo: sticky storytelling)
  ───────────────────────────────────────────────────────── */
  function initPinnedScrollSection() {
    const section = document.querySelector('.pinned-scroll-section');
    if (!section) return;

    const panels = section.querySelectorAll('.pinned-panel');
    if (!panels.length) return;

    const count = panels.length;

    // Set initial states
    gsap.set(panels, { opacity: 0, y: 50, scale: 0.97 });
    gsap.set(panels[0], { opacity: 1, y: 0, scale: 1 });

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${count * 120}%`,
      pin: '.pinned-inner',
      pinSpacing: true,
      scrub: false,
      onUpdate: self => {
        const prog = self.progress;
        const rawIdx = prog * count;
        const idx = Math.min(Math.floor(rawIdx), count - 1);
        const frac = rawIdx - idx;

        panels.forEach((p, i) => {
          const dots = section.querySelectorAll('.pinned-progress-dot');
          if (dots[i]) dots[i].classList.toggle('active', i === idx);

          if (i === idx) {
            // Active panel: entered
            const t = Math.min(frac * 2.8, 1);
            const ease = 1 - Math.pow(1 - t, 4);
            const entered = i === 0 ? 1 : ease;
            gsap.set(p, {
              opacity: entered,
              y: (1 - entered) * 45,
              scale: 0.97 + 0.03 * entered,
              pointerEvents: 'auto'
            });

            // Image zoom in as panel enters
            const img = p.querySelector('.pinned-panel-bg img');
            if (img) gsap.set(img, { scale: 1.08 - 0.08 * entered });

          } else if (i < idx) {
            // Passed: exit upward
            const exitT = Math.min((prog - (i + 1) / count) / (0.3 / count), 1);
            const ease = 1 - Math.pow(1 - Math.max(0, exitT), 3);
            gsap.set(p, {
              opacity: 1 - ease,
              y: -40 * ease,
              scale: 1 - 0.04 * ease,
              pointerEvents: 'none'
            });
          } else {
            // Upcoming: invisible
            gsap.set(p, { opacity: 0, y: 50, scale: 0.97, pointerEvents: 'none' });
          }
        });
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     CATEGORY FULL ITEMS  (Noomo: full-screen hover with image reveal)
  ───────────────────────────────────────────────────────── */
  function initCategoryFullItems() {
    document.querySelectorAll('.category-full-item').forEach((item, i) => {
      // Scroll entrance
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'noomoOut',
          scrollTrigger: { trigger: item, start: 'top 90%', once: true },
          delay: i * 0.04
        }
      );

      // Hover: expand height slightly + image saturate
      const bg = item.querySelector('.category-full-item-bg');
      const img = bg?.querySelector('img');
      const title = item.querySelector('.category-full-title');
      const titleMn = item.querySelector('.category-full-title-mn');
      const arrow = item.querySelector('.category-full-arrow');
      const num = item.querySelector('.category-full-num');

      item.addEventListener('mouseenter', () => {
        if (img) gsap.to(img, { scale: 1.0, filter: 'grayscale(0) brightness(0.72)', duration: 0.9, ease: 'noomoOut' });
        if (bg) gsap.to(bg, { scale: 1.0, duration: 0.9, ease: 'noomoOut' });
        if (title) gsap.to(title, { x: 24, letterSpacing: '-0.01em', duration: 0.6, ease: 'noomoOut' });
        if (titleMn) gsap.to(titleMn, { x: 24, duration: 0.6, ease: 'noomoOut', delay: 0.04 });
        if (arrow) gsap.to(arrow, { x: 0, opacity: 1, duration: 0.5, ease: 'noomoOut' });
        if (num) gsap.to(num, { opacity: 0.8, duration: 0.4 });
      });

      item.addEventListener('mouseleave', () => {
        if (img) gsap.to(img, { scale: 1.08, filter: 'grayscale(0.35) brightness(0.6)', duration: 0.8, ease: 'noomo' });
        if (bg) gsap.to(bg, { scale: 1.08, duration: 0.8, ease: 'noomo' });
        if (title) gsap.to(title, { x: 0, letterSpacing: '-0.02em', duration: 0.6, ease: 'noomo' });
        if (titleMn) gsap.to(titleMn, { x: 0, duration: 0.6, ease: 'noomo', delay: 0.02 });
        if (arrow) gsap.to(arrow, { x: -20, opacity: 0, duration: 0.4, ease: 'noomoIn' });
        if (num) gsap.to(num, { opacity: 0.3, duration: 0.4 });
      });

      // Init arrow position
      if (arrow) gsap.set(arrow, { x: -20, opacity: 0 });
      if (bg) gsap.set(bg, { scale: 1.08 });
      if (img) gsap.set(img, { scale: 1.08, filter: 'grayscale(0.35) brightness(0.6)' });
    });
  }

  /* ─────────────────────────────────────────────────────────
     PROJECT CARDS 3D TILT  (Noomo: perspective mouse follow)
  ───────────────────────────────────────────────────────── */
  function initProjectCards3D() {
    if (!isDesktop) return;

    document.querySelectorAll('.project-card, .filter-project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: cx * 7,
          rotateX: cy * -7,
          transformPerspective: 800,
          transformOrigin: 'center center',
          scale: 1.02,
          duration: 0.4,
          ease: 'noomoOut'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0, rotateX: 0, scale: 1,
          duration: 0.9, ease: 'noomoOut'
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     DESIGNER CARDS
  ───────────────────────────────────────────────────────── */
  function initDesignerCards() {
    document.querySelectorAll('.designer-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'noomoOut', delay: i * 0.15,
          scrollTrigger: { trigger: card, start: 'top 88%', once: true }
        }
      );

      const overlay = card.querySelector('.designer-card-overlay');
      const overlayContent = card.querySelector('.designer-card-overlay-content');
      const portrait = card.querySelector('.designer-card-portrait img');

      if (overlay) gsap.set(overlay, { opacity: 0 });
      if (overlayContent) gsap.set(overlayContent, { opacity: 0, y: 12 });

      card.addEventListener('mouseenter', () => {
        if (portrait) gsap.to(portrait, { scale: 1.06, filter: 'grayscale(0)', duration: 0.8, ease: 'noomoOut' });
        if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.5 });
        if (overlayContent) gsap.to(overlayContent, { opacity: 1, y: 0, duration: 0.5, ease: 'noomoOut' });
      });
      card.addEventListener('mouseleave', () => {
        if (portrait) gsap.to(portrait, { scale: 1.0, filter: 'grayscale(0.2)', duration: 0.7, ease: 'noomo' });
        if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4 });
        if (overlayContent) gsap.to(overlayContent, { opacity: 0, y: 12, duration: 0.3 });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     PARALLAX IMAGES  (scroll-linked depth)
  ───────────────────────────────────────────────────────── */
  function initParallaxImages() {
    if (isReduced) return;

    // Hero background
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    // Project hero
    const projBg = document.querySelector('.project-hero-bg img');
    if (projBg) {
      gsap.to(projBg, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.project-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    // Intro image parallax
    const introImg = document.querySelector('.intro-image-wrap img');
    if (introImg) {
      gsap.to(introImg, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.intro-image-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }

    // Process sticky image
    const procImg = document.querySelector('.process-image img');
    if (procImg) {
      gsap.fromTo(procImg,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: '.process-grid',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
          }
        }
      );
    }
  }

  /* ─────────────────────────────────────────────────────────
     AMBIENT STRIP
  ───────────────────────────────────────────────────────── */
  function initAmbientStrip() {
    const items = document.querySelectorAll('.ambient-strip-item');
    items.forEach((item, i) => {
      const img = item.querySelector('img');
      const label = item.querySelector('.ambient-strip-item-label');

      // Scroll clip reveal
      gsap.fromTo(item,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'noomo',
          delay: i * 0.15,
          scrollTrigger: { trigger: item, start: 'top 90%', once: true }
        }
      );

      if (img) gsap.set(img, { scale: 1.06 });

      item.addEventListener('mouseenter', () => {
        if (img) gsap.to(img, { scale: 1.0, duration: 0.9, ease: 'noomoOut' });
        if (label) gsap.to(label, { opacity: 1, y: 0, duration: 0.35 });
      });
      item.addEventListener('mouseleave', () => {
        if (img) gsap.to(img, { scale: 1.06, duration: 0.7, ease: 'noomo' });
        if (label) gsap.to(label, { opacity: 0, y: 6, duration: 0.25 });
      });
      if (label) gsap.set(label, { opacity: 0, y: 6 });
    });
  }

  /* ─────────────────────────────────────────────────────────
     PROCESS ACCORDION
  ───────────────────────────────────────────────────────── */
  function initProcessAccordion() {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    const open = step => {
      steps.forEach(s => {
        s.classList.remove('active');
        const body = s.querySelector('.process-step-body');
        const icon = s.querySelector('.process-step-icon');
        if (body) gsap.to(body, { maxHeight: 0, paddingTop: 0, duration: 0.45, ease: 'noomo' });
        if (icon) gsap.to(icon, { rotation: 0, duration: 0.4, ease: 'noomoOut' });
      });
      step.classList.add('active');
      const body = step.querySelector('.process-step-body');
      const icon = step.querySelector('.process-step-icon');
      if (body) gsap.to(body, { maxHeight: 240, paddingTop: '1rem', duration: 0.55, ease: 'noomoOut' });
      if (icon) gsap.to(icon, { rotation: 45, duration: 0.4, ease: 'noomoOut' });
    };

    steps.forEach(step => {
      step.querySelector('.process-step-header')?.addEventListener('click', () => {
        step.classList.contains('active') ? (() => {
          step.classList.remove('active');
          const body = step.querySelector('.process-step-body');
          const icon = step.querySelector('.process-step-icon');
          if (body) gsap.to(body, { maxHeight: 0, paddingTop: 0, duration: 0.4, ease: 'noomo' });
          if (icon) gsap.to(icon, { rotation: 0, duration: 0.35 });
        })() : open(step);
      });
    });

    // Open first
    if (steps[0]) {
      const body = steps[0].querySelector('.process-step-body');
      const icon = steps[0].querySelector('.process-step-icon');
      steps[0].classList.add('active');
      if (body) gsap.set(body, { maxHeight: 240, paddingTop: '1rem' });
      if (icon) gsap.set(icon, { rotation: 45 });
    }
  }

  /* ─────────────────────────────────────────────────────────
     COUNTERS  (scroll-triggered count-up)
  ───────────────────────────────────────────────────────── */
  function initCounters() {
    document.querySelectorAll('.stat-num[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      gsap.fromTo({ val: 0 }, { val: target },
        {
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () { el.textContent = Math.round(this.targets()[0].val) + suffix; },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });
  }

  /* ─────────────────────────────────────────────────────────
     FILTER TABS  (smooth filter animation)
  ───────────────────────────────────────────────────────── */
  function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('[data-category]');
    const countEl = document.querySelector('.filter-results-count');
    if (!tabs.length) return;

    const filter = slug => {
      let count = 0;
      const showing = [], hiding = [];

      cards.forEach(card => {
        const match = slug === 'all' || card.dataset.category === slug;
        match ? showing.push(card) : hiding.push(card);
        if (match) count++;
      });

      // Hide
      gsap.to(hiding, {
        opacity: 0, y: 10, duration: 0.3, ease: 'noomoIn',
        onComplete: () => hiding.forEach(c => c.style.display = 'none')
      });

      // Show
      showing.forEach(c => { c.style.display = ''; c.style.opacity = '0'; });
      gsap.to(showing, {
        opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: 'noomoOut', delay: 0.2
      });
      gsap.fromTo(showing, { y: 18 }, { y: 0, duration: 0.55, stagger: 0.05, ease: 'noomoOut', delay: 0.2 });

      if (countEl) countEl.textContent = `${count} project${count !== 1 ? 's' : ''}`;
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        filter(tab.dataset.filter);
      });
    });

    if (countEl) countEl.textContent = `${cards.length} projects`;

    const hash = location.hash.replace('#', '');
    if (hash) {
      const match = [...tabs].find(t => t.dataset.filter === hash);
      if (match) { setTimeout(() => match.click(), 300); }
    }
  }

  /* ─────────────────────────────────────────────────────────
     MAGNETIC ELEMENTS  (Noomo: every interactive el pulls to cursor)
  ───────────────────────────────────────────────────────── */
  function initMagneticElements() {
    if (!isDesktop) return;

    document.querySelectorAll('.btn-primary, .btn-outline, .nav-inquiry-btn, .designer-card-link').forEach(el => {
      let ox = 0, oy = 0;

      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.42;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.42;
        gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'noomoOut', overwrite: true });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'noomoOut', overwrite: true });
      });
    });

    // Nav logo magnetic
    const logo = document.querySelector('.nav-logo');
    if (logo) {
      logo.addEventListener('mousemove', e => {
        const rect = logo.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
        gsap.to(logo, { x: dx, y: dy, duration: 0.5, ease: 'noomoOut' });
      });
      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, { x: 0, y: 0, duration: 0.8, ease: 'noomoOut' });
      });
    }
  }

  /* ─────────────────────────────────────────────────────────
     CURSOR  (Noomo: large morph cursor with label state)
  ───────────────────────────────────────────────────────── */
  function initCursor() {
    if (!isDesktop) return;

    // Remove old cursor if exists
    const old = document.getElementById('vd-cursor');
    if (old) old.remove();

    const cursor = document.createElement('div');
    cursor.id = 'vd-cursor';
    cursor.innerHTML = `
      <div class="c-dot"></div>
      <div class="c-ring"></div>
      <div class="c-label">View</div>
    `;
    document.body.appendChild(cursor);

    const styleEl = document.createElement('style');
    styleEl.textContent = `
      body { cursor: none; }
      a, button, [role=button] { cursor: none; }
      #vd-cursor { position:fixed; top:0; left:0; z-index:99999; pointer-events:none; }
      .c-dot {
        position:absolute; width:7px; height:7px;
        background:var(--heritage-olive); border-radius:50%;
        transform:translate(-50%,-50%);
        transition: width .2s ease, height .2s ease, background .3s ease;
      }
      .c-ring {
        position:absolute; width:44px; height:44px;
        border:1.5px solid rgba(77,80,56,0.55); border-radius:50%;
        transform:translate(-50%,-50%);
        transition: width .45s cubic-bezier(.25,1,.5,1),
                    height .45s cubic-bezier(.25,1,.5,1),
                    border-color .3s ease, background .35s ease, opacity .3s ease;
      }
      .c-label {
        position:absolute; transform:translate(-50%,-50%);
        font-family:var(--font-sans); font-size:0.56rem; letter-spacing:.2em;
        text-transform:uppercase; color:var(--warm-plaster);
        opacity:0; white-space:nowrap; font-weight:400;
        transition:opacity .25s ease;
        pointer-events:none;
      }

      /* HOVER — links/buttons */
      body.cur-hover .c-ring { width:60px; height:60px; border-color:rgba(77,80,56,0.8); }
      body.cur-hover .c-dot  { width:4px; height:4px; }

      /* VIEW — project cards */
      body.cur-view .c-ring  {
        width:96px; height:96px;
        background:rgba(77,80,56,0.92); border-color:transparent;
      }
      body.cur-view .c-dot   { width:0; height:0; opacity:0; }
      body.cur-view .c-label { opacity:1; }

      /* DRAG — images */
      body.cur-drag .c-ring  {
        width:72px; height:72px; border-radius:4px;
        background:rgba(34,34,23,0.75); border-color:transparent;
      }
      body.cur-drag .c-label { opacity:1; }
      body.cur-drag .c-label::before { content:'↔'; margin-right:.3em; }

      /* DARK background override */
      .categories-section .c-ring,
      .stats-bar .c-ring { border-color:rgba(210,203,193,0.4); }
    `;
    document.head.appendChild(styleEl);

    const dot = cursor.querySelector('.c-dot');
    const ring = cursor.querySelector('.c-ring');
    const label = cursor.querySelector('.c-label');

    let mx = -200, my = -200, rx = -200, ry = -200;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    document.addEventListener('mouseleave', () => gsap.to(cursor, { opacity: 0, duration: 0.3 }));
    document.addEventListener('mouseenter', () => gsap.to(cursor, { opacity: 1, duration: 0.3 }));

    gsap.ticker.add(() => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      gsap.set(dot, { x: mx, y: my });
      gsap.set(ring, { x: rx, y: ry });
      gsap.set(label, { x: rx, y: ry });
    });

    // State changes
    document.querySelectorAll('.project-card, .filter-project-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cur-view'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cur-view'));
    });

    document.querySelectorAll('.ambient-strip-item, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cur-drag'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cur-drag'));
    });

    document.querySelectorAll('a:not(.project-card):not(.filter-project-card), button, .category-full-item, .designer-card').forEach(el => {
      el.addEventListener('mouseenter', () => { if (!document.body.classList.contains('cur-view')) document.body.classList.add('cur-hover'); });
      el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
    });
  }

  /* ─────────────────────────────────────────────────────────
     MARQUEE  (Noomo: hover-pause + GSAP-driven)
  ───────────────────────────────────────────────────────── */
  function initMarquee() {
    const tracks = document.querySelectorAll('.noomo-marquee-track, .marquee-track');
    tracks.forEach(track => {
      const clone = track.cloneNode(true);
      track.parentElement.appendChild(clone);

      const duration = 30;
      const tl = gsap.to([track, clone], {
        xPercent: -50,
        ease: 'none',
        duration,
        repeat: -1
      });

      track.closest('.noomo-marquee, .marquee-section')?.addEventListener('mouseenter', () => tl.pause());
      track.closest('.noomo-marquee, .marquee-section')?.addEventListener('mouseleave', () => tl.play());
    });
  }

  /* ─────────────────────────────────────────────────────────
     SCROLL VELOCITY SKEW  (Noomo: images tilt with scroll speed)
  ───────────────────────────────────────────────────────── */
  function initScrollVelocity() {
    if (isReduced || !isDesktop) return;

    let lastY = 0, vel = 0;
    const images = document.querySelectorAll(
      '.project-card-image img, .filter-card-image img, .designer-card-portrait img, .category-full-item-bg img'
    );

    gsap.ticker.add(() => {
      const dy = window.scrollY - lastY;
      vel += (dy - vel) * 0.08;
      lastY = window.scrollY;

      if (Math.abs(vel) > 0.05) {
        gsap.set(images, {
          skewY: vel * 0.06,
          y: vel * 0.5,
          overwrite: 'auto'
        });
      } else {
        gsap.to(images, { skewY: 0, y: 0, duration: 0.8, ease: 'noomoOut', overwrite: 'auto' });
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     FORM LOGIC
  ───────────────────────────────────────────────────────── */
  function initFormLogic() {
    document.querySelectorAll('.inquiry-form form').forEach(form => {
      form.querySelectorAll('.form-input,.form-textarea,.form-select').forEach(input => {
        const label = input.closest('.form-group')?.querySelector('.form-label');
        if (!label) return;
        input.addEventListener('focus', () => gsap.to(label, { color: 'var(--heritage-olive)', duration: 0.3 }));
        input.addEventListener('blur', () => gsap.to(label, { color: 'var(--sage-stone)', duration: 0.3 }));
      });

      form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('[type=submit]');
        const success = form.closest('.inquiry-form')?.querySelector('.form-success');

        // Button morph
        if (btn) {
          gsap.to(btn, { opacity: 0.6, scale: 0.97, duration: 0.2 });
          btn.textContent = 'Sending...';
          btn.disabled = true;
        }

        try {
          const res = await fetch('/api/inquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
          });
          if (!res.ok) throw new Error();
        } catch (_) {}

        form.reset();
        if (btn) btn.style.display = 'none';
        if (success) {
          gsap.set(success, { opacity: 0, y: 12, display: 'block' });
          gsap.to(success, { opacity: 1, y: 0, duration: 0.7, ease: 'noomoOut' });
          success.classList.add('shown');
        }
        gsap.to(form, { opacity: 0.3, duration: 0.5 });
        form.style.pointerEvents = 'none';
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     PAGE TRANSITIONS  (Noomo: olive overlay swipe)
  ───────────────────────────────────────────────────────── */
  function initPageTransitions() {
    const overlay = document.getElementById('page-transition');
    if (!overlay) return;

    // Exit animation on load
    gsap.set(overlay, { yPercent: -100 });

    document.querySelectorAll('a[href^="/"]').forEach(a => {
      if (a.hash && a.pathname === location.pathname) return;
      if (a.target === '_blank') return;

      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (!href || href === location.pathname) return;
        e.preventDefault();

        gsap.set(overlay, { yPercent: 100, display: 'block' });
        gsap.to(overlay, {
          yPercent: 0,
          duration: 0.55,
          ease: 'noomo',
          onComplete: () => { location.href = href; }
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     ACTIVE NAV
  ───────────────────────────────────────────────────────── */
  function initActiveNav() {
    const path = location.pathname;
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && (path === href || (href !== '/' && path.startsWith(href)))) {
        a.style.color = 'var(--heritage-olive)';
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     STATS ITEMS — stagger reveal
  ───────────────────────────────────────────────────────── */
  ScrollTrigger.batch('.stat-item', {
    onEnter: batch => gsap.fromTo(batch,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'noomoOut' }
    ),
    start: 'top 88%',
    once: true
  });

  /* ─────────────────────────────────────────────────────────
     SECTION DIVIDERS — draw in from left
  ───────────────────────────────────────────────────────── */
  gsap.utils.toArray('.intro-divider, .section-divider').forEach(el => {
    gsap.fromTo(el,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1, duration: 1.1, ease: 'noomo',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      }
    );
  });

}); // end DOMContentLoaded
