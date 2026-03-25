/* ============================================================
   VIVACE DESIGN INTERIOR
   Full Noomo-Level Motion System v2 — GSAP 3.12 + SplitText
   100% Noomo motion DNA — zero compromise
   ============================================================ */

window.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────────────────────
     GSAP SETUP + NOOMO CUSTOM EASES
  ───────────────────────────────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // Noomo's exact easing signatures
  CustomEase.create('noomo',    '0.76, 0, 0.24, 1');       // precise, authoritative
  CustomEase.create('noomoOut', '0.22, 1, 0.36, 1');       // dramatic entry
  CustomEase.create('noomoIn',  '0.64, 0, 0.78, 0');       // sharp exit
  CustomEase.create('expo',     '0.16, 1, 0.3, 1');        // explosive entry
  CustomEase.create('smooth',   '0.45, 0, 0.55, 1');       // silky transition

  const isDesktop  = () => window.innerWidth > 1024;
  const isMobile   = () => window.innerWidth <= 768;
  const isReduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────────────────────
     SCROLL PROGRESS BAR
  ───────────────────────────────────────────────────────── */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    gsap.to(progressBar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 0.2 }
    });
  }

  /* ─────────────────────────────────────────────────────────
     PRELOADER  — Noomo: brand types in character by character,
     progress bar fills, then the whole screen splits open
  ───────────────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');

  if (preloader && !sessionStorage.getItem('vd_loaded')) {
    document.body.style.overflow = 'hidden';
    sessionStorage.setItem('vd_loaded', '1');

    const logo     = preloader.querySelector('.preloader-logo');
    const progress = preloader.querySelector('.preloader-progress-fill');
    const counter  = preloader.querySelector('.preloader-counter');
    const doorL    = preloader.querySelector('.preloader-door-left');
    const doorR    = preloader.querySelector('.preloader-door-right');

    // Character-by-character reveal using VivaceSplit
    let chars = null;
    if (logo) {
      try {
        const split = new VivaceSplit(logo, { type: 'chars' });
        chars = split.chars;
        if (chars.length) {
          gsap.set(chars, { opacity: 0, y: 22, rotateX: -60, transformOrigin: '50% 50% -20px' });
        }
      } catch(e) { chars = null; }
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Door split open (Noomo signature)
        const doorTl = gsap.timeline({
          onComplete: () => {
            if (preloader) preloader.style.display = 'none';
            document.body.style.overflow = '';
            runHeroEntrance();
          }
        });

        if (doorL && doorR) {
          doorTl
            .to(doorL, { xPercent: -100, duration: 1.0, ease: 'noomo' }, 0)
            .to(doorR, { xPercent:  100, duration: 1.0, ease: 'noomo' }, 0);
        } else {
          doorTl.to(preloader, { yPercent: -100, duration: 1.0, ease: 'noomo' }, 0);
        }
      }
    });

    if (chars) {
      tl.to(chars, { opacity: 1, y: 0, rotateX: 0, duration: 0.06, stagger: 0.05, ease: 'expo' }, 0.2);
    } else if (logo) {
      tl.fromTo(logo, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'noomoOut' }, 0.2);
    }

    if (progress) {
      tl.fromTo(progress, { scaleX: 0, transformOrigin: 'left center' },
                          { scaleX: 1, duration: 1.6, ease: 'smooth' }, 0.5);
    }

    if (counter) {
      const obj = { n: 0 };
      tl.to(obj, {
        n: 100,
        duration: 1.6,
        ease: 'smooth',
        onUpdate: () => { counter.textContent = Math.round(obj.n).toString().padStart(3, '0'); }
      }, 0.5);
    }

    tl.to({}, { duration: 0.3 }); // brief pause before doors open

  } else {
    if (preloader) preloader.style.display = 'none';
    runHeroEntrance();
  }

  /* ─────────────────────────────────────────────────────────
     HERO ENTRANCE  — Noomo: image scale-in + text mask wipe
     Each line lifts out from behind a clip mask
  ───────────────────────────────────────────────────────── */
  function runHeroEntrance() {
    const hero = document.querySelector('.hero');
    if (!hero) { initAll(); return; }

    const bg       = hero.querySelector('.hero-bg img');
    const eyebrow  = hero.querySelector('.hero-eyebrow');
    const titleEl  = hero.querySelector('.hero-title');
    const subtitle = hero.querySelector('.hero-subtitle');
    const actions  = hero.querySelector('.hero-actions');
    const cue      = hero.querySelector('.hero-scroll-cue');
    const counter  = hero.querySelector('.hero-counter');

    // VivaceSplit the hero title into lines
    let titleLines = null;
    if (titleEl) {
      try {
        const split = new VivaceSplit(titleEl, { type: 'lines', linesClass: 'split-line' });
        titleLines = split.lines;
        // Wrap each line in overflow:hidden mask
        titleLines.forEach(line => {
          const wrapper = document.createElement('div');
          wrapper.style.cssText = 'overflow:hidden; display:block;';
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
          gsap.set(line, { yPercent: 105 });
        });
      } catch(e) { titleLines = null; }
    }

    const tl = gsap.timeline({
      defaults: { ease: 'noomoOut' },
      onComplete: initAll
    });

    // 1. Image: scale from 1.18 to 1.0, fades in
    if (bg) tl.fromTo(bg, { scale: 1.2, opacity: 0 }, { scale: 1.0, opacity: 1, duration: 2.2, ease: 'noomo' }, 0);

    // 2. Eyebrow slides in from left
    if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8 }, 0.6);

    // 3. Title lines unmask from bottom
    if (titleLines && titleLines.length) {
      tl.to(titleLines, { yPercent: 0, duration: 1.2, stagger: 0.14, ease: 'noomo' }, 0.85);
    } else if (titleEl) {
      tl.fromTo(titleEl, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 }, 0.85);
    }

    // 4. Subtitle word-by-word
    if (subtitle) {
      tl.fromTo(subtitle, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 }, 1.5);
    }

    // 5. CTAs
    if (actions) tl.fromTo(actions, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 1.8);

    // 6. Scroll cue
    if (cue) tl.fromTo(cue, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.2);

    // 7. Counter (if any)
    if (counter) tl.fromTo(counter, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 2.0);
  }

  /* ─────────────────────────────────────────────────────────
     INIT ALL
  ───────────────────────────────────────────────────────── */
  function initAll() {
    initNav();
    initMobileMenu();
    initSplitTextReveals();
    initClipImageReveals();
    initPinnedScroll();
    initHorizontalScroll();
    initCategoryItems();
    initProjectCards();
    initDesignerCards();
    initParallax();
    initProcessAccordion();
    initCounters();
    initFilterTabs();
    initMagnetic();
    initCursor();
    initMarquee();
    initScrollVelocity();
    initFormLogic();
    initPageTransitions();
    initActiveNav();
    initScrollRevealBatch();
    initTextScramble();
    initHorizontalTextScroll();
  }

  /* ─────────────────────────────────────────────────────────
     NAVIGATION
  ───────────────────────────────────────────────────────── */
  function initNav() {
    const nav  = document.querySelector('.site-nav');
    if (!nav) return;
    const hero = document.querySelector('.hero, .project-hero, .designer-hero');

    if (hero) nav.classList.add('hero-nav');

    ScrollTrigger.create({
      start: 'top -60px',
      onEnter:     () => { nav.classList.add('scrolled');    nav.classList.remove('hero-nav'); },
      onLeaveBack: () => { nav.classList.remove('scrolled'); if (hero) nav.classList.add('hero-nav'); }
    });
  }

  /* ─────────────────────────────────────────────────────────
     MOBILE MENU
  ───────────────────────────────────────────────────────── */
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu   = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;

    const links = menu.querySelectorAll('a');

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (isOpen) {
        gsap.fromTo(links,
          { y: 50, opacity: 0, skewX: 4 },
          { y: 0, opacity: 1, skewX: 0, duration: 0.8, stagger: 0.09, ease: 'noomoOut', delay: 0.15 }
        );
      } else {
        gsap.to(links, { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: 'noomoIn' });
      }
    });

    links.forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ─────────────────────────────────────────────────────────
     SPLIT TEXT REVEALS  — safe, no-break version
     Only applies on homepage hero; inner pages use simple fade
  ───────────────────────────────────────────────────────── */
  function initSplitTextReveals() {
    const isHome = location.pathname === '/';

    // Helper: smart scroll trigger start — if element is near top of page use 'top bottom' 
    function smartStart(el) {
      const rect = el.getBoundingClientRect();
      const distFromTop = rect.top + window.scrollY;
      return distFromTop < window.innerHeight * 1.2 ? 'top bottom' : 'top 88%';
    }

    // ── Eyebrow labels — slide from left
    gsap.utils.toArray('.eyebrow').forEach(el => {
      if (el.closest('.hero, #preloader')) return;
      gsap.fromTo(el,
        { opacity: 0, x: -16 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'noomoOut',
          scrollTrigger: { trigger: el, start: smartStart(el), once: true }
        }
      );
    });

    // ── Major headlines
    gsap.utils.toArray('.headline-xl, .headline-lg, .headline-md, .intro-statement').forEach(el => {
      if (el.closest('.hero, #preloader')) return;

      // Only do VivaceSplit on homepage to avoid layout breaks on inner pages
      if (isHome && typeof VivaceSplit !== 'undefined') {
        let lines = null;
        try {
          const split = new VivaceSplit(el, { type: 'lines', linesClass: 'reveal-line' });
          lines = split.lines;
          if (lines && lines.length > 0) {
            lines.forEach(line => {
              const wrapper = document.createElement('div');
              wrapper.style.cssText = 'overflow:hidden; display:block;';
              line.parentNode.insertBefore(wrapper, line);
              wrapper.appendChild(line);
              gsap.set(line, { yPercent: 110 });
            });
            gsap.to(lines, {
              yPercent: 0, duration: 1.1, stagger: 0.11, ease: 'noomo',
              scrollTrigger: { trigger: el, start: smartStart(el), once: true }
            });
            return;
          }
        } catch(e) {}
      }

      // Simple fade-up for inner pages (reliable)
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'noomoOut',
          scrollTrigger: { trigger: el, start: smartStart(el), once: true }
        }
      );
    });

    // ── Body text — simple fade (word split only on homepage)
    gsap.utils.toArray('.body-text').forEach(el => {
      if (el.closest('.hero, #preloader')) return;

      if (isHome && typeof VivaceSplit !== 'undefined') {
        try {
          const split = new VivaceSplit(el, { type: 'words' });
          const words = split.words;
          if (words && words.length > 0) {
            gsap.set(words, { opacity: 0, y: 8 });
            gsap.to(words, {
              opacity: 1, y: 0, duration: 0.6, stagger: 0.022, ease: 'noomoOut',
              scrollTrigger: { trigger: el, start: smartStart(el), once: true }
            });
            return;
          }
        } catch(e) {}
      }

      // Inner pages — plain fade
      gsap.fromTo(el,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'noomoOut',
          scrollTrigger: { trigger: el, start: smartStart(el), once: true }
        }
      );
    });
  }

  /* ─────────────────────────────────────────────────────────
     TEXT SCRAMBLE  — Noomo: characters cycle on hover
  ───────────────────────────────────────────────────────── */
  function initTextScramble() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    function scramble(el) {
      const original = el.textContent;
      let frame = 0;
      const duration = 18;

      const anim = setInterval(() => {
        el.textContent = original
          .split('')
          .map((char, i) => {
            if (i < frame / 2) return original[i];
            return char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (frame >= duration * 2) {
          el.textContent = original;
          clearInterval(anim);
        }
        frame++;
      }, 28);
    }

    // Apply to eyebrow labels on hover
    document.querySelectorAll('.eyebrow').forEach(el => {
      el.addEventListener('mouseenter', () => scramble(el));
    });

    // Apply to nav links
    document.querySelectorAll('.nav-links a').forEach(el => {
      el.addEventListener('mouseenter', () => scramble(el));
    });
  }

  /* ─────────────────────────────────────────────────────────
     HORIZONTAL TEXT SCROLL  — Noomo: oversized text
     scrolls horizontally as user scrolls vertically
  ───────────────────────────────────────────────────────── */
  function initHorizontalTextScroll() {
    const strips = document.querySelectorAll('.h-scroll-text');
    strips.forEach(strip => {
      const dir = strip.dataset.dir === 'rtl' ? 1 : -1;
      gsap.to(strip, {
        xPercent: dir * 15,
        ease: 'none',
        scrollTrigger: {
          trigger: strip.parentElement || strip,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     CLIP-PATH IMAGE REVEALS  — Noomo signature bottom-to-top wipe
     with inner image scale compensation
  ───────────────────────────────────────────────────────── */
  function initClipImageReveals() {

    const containers = [
      ...document.querySelectorAll('.intro-image-wrap'),
      ...document.querySelectorAll('.process-image'),
      ...document.querySelectorAll('.designer-card-portrait'),
      ...document.querySelectorAll('.gallery-item'),
      ...document.querySelectorAll('[data-clip]'),
    ];

    containers.forEach((el, i) => {
      if (!el.style.overflow) el.style.overflow = 'hidden';

      gsap.fromTo(el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'noomo',
          delay: (i % 3) * 0.11,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );

      const img = el.querySelector('img');
      if (img) {
        gsap.fromTo(img,
          { scale: 1.14 },
          {
            scale: 1.0, duration: 1.7, ease: 'noomo',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          }
        );
      }
    });

    // Project card images — staggered wipe
    document.querySelectorAll('.project-card-image, .filter-card-image').forEach((el, i) => {
      if (!el.style.overflow) el.style.overflow = 'hidden';
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'noomo',
          delay: (i % 4) * 0.09,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        }
      );
    });
  }

  /* ─────────────────────────────────────────────────────────
     PINNED SCROLL STORYTELLING  — Noomo: sticky panel cycling
     Each panel fades/lifts in while prior panel exits up
  ───────────────────────────────────────────────────────── */
  function initPinnedScroll() {
    const section = document.querySelector('.pinned-scroll-section');
    if (!section) return;

    const panels = section.querySelectorAll('.pinned-panel');
    if (!panels.length) return;

    const N = panels.length;

    // Initial state: all hidden except first
    gsap.set(panels, { opacity: 0, y: 60, scale: 0.97 });
    gsap.set(panels[0], { opacity: 1, y: 0, scale: 1 });

    // Animate image inside first panel
    const firstImg = panels[0].querySelector('.pinned-panel-bg img');
    if (firstImg) gsap.set(firstImg, { scale: 1.0 });

    // Animate title chars for first panel
    const firstTitle = panels[0].querySelector('.pinned-panel-title');
    if (firstTitle && typeof VivaceSplit !== 'undefined') {
      try {
        const split = new VivaceSplit(firstTitle, { type: 'lines', linesClass: 'pp-line' });
        split.lines.forEach(l => {
          const w = document.createElement('div');
          w.style.cssText = 'overflow:hidden;';
          l.parentNode.insertBefore(w, l);
          w.appendChild(l);
        });
        gsap.set(split.lines, { yPercent: 0 }); // Already visible
      } catch(e) {}
    }

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${N * 110}%`,
      pin: '.pinned-inner',
      pinSpacing: true,
      onUpdate: self => {
        const prog = self.progress;
        const rawIdx = prog * N;
        const idx = Math.min(Math.floor(rawIdx), N - 1);
        const frac = rawIdx - idx;

        panels.forEach((panel, i) => {
          const dots = section.querySelectorAll('.pinned-dot');
          if (dots[i]) dots[i].classList.toggle('active', i === idx);

          const img = panel.querySelector('.pinned-panel-bg img');
          const title = panel.querySelector('.pinned-panel-title');

          if (i === idx) {
            // Entering panel
            const t = i === 0 ? 1 : Math.min(frac * 3.5, 1);
            const e = easeOutQuart(t);

            gsap.set(panel, {
              opacity: e,
              y: (1 - e) * 55,
              scale: 0.97 + 0.03 * e,
              pointerEvents: 'auto'
            });

            if (img) gsap.set(img, { scale: 1.08 - 0.08 * e });

          } else if (i < idx) {
            // Exiting panel — slide up
            const exitStart = (i + 1) / N;
            const exitProg  = Math.max(0, Math.min((prog - exitStart) / (0.25 / N), 1));
            const e = easeInQuart(exitProg);

            gsap.set(panel, {
              opacity: Math.max(0, 1 - e * 1.4),
              y: -55 * e,
              scale: 1 - 0.05 * e,
              pointerEvents: 'none'
            });
          } else {
            // Upcoming panel
            gsap.set(panel, { opacity: 0, y: 55, scale: 0.97, pointerEvents: 'none' });
          }
        });
      }
    });
  }

  // Easing helpers
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
  function easeInQuart(t)  { return t * t * t * t; }

  /* ─────────────────────────────────────────────────────────
     HORIZONTAL SCROLL SECTION  — Noomo: projects scroll sideways
     on pinned section while user scrolls vertically
  ───────────────────────────────────────────────────────── */
  function initHorizontalScroll() {
    const section = document.querySelector('.horizontal-scroll-section');
    if (!section || isMobile()) return;

    const track = section.querySelector('.h-scroll-track');
    if (!track) return;

    const cards = track.querySelectorAll('.h-scroll-card');
    if (!cards.length) return;

    // Total horizontal distance
    const totalWidth = track.scrollWidth - section.offsetWidth;

    // Entrance animations for cards
    cards.forEach((card, i) => {
      const img = card.querySelector('img');
      if (img) gsap.set(img, { scale: 1.08 });

      card.addEventListener('mouseenter', () => {
        if (img) gsap.to(img, { scale: 1.0, duration: 0.9, ease: 'noomoOut' });
        const title = card.querySelector('.h-card-title');
        if (title) gsap.to(title, { y: -4, duration: 0.4, ease: 'noomoOut' });
      });
      card.addEventListener('mouseleave', () => {
        if (img) gsap.to(img, { scale: 1.08, duration: 0.7, ease: 'noomo' });
        const title = card.querySelector('.h-card-title');
        if (title) gsap.to(title, { y: 0, duration: 0.4, ease: 'noomo' });
      });
    });

    gsap.to(track, {
      x: () => -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth + window.innerHeight * 0.5}`,
        pin: true,
        scrub: 1.0,
        invalidateOnRefresh: true,
        onUpdate: self => {
          // Progress label
          const counter = section.querySelector('.h-scroll-count');
          if (counter) {
            const idx = Math.min(Math.floor(self.progress * cards.length), cards.length - 1);
            counter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
          }
        }
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     CATEGORY ITEMS  — Noomo: full-screen rows, image reveal on hover
  ───────────────────────────────────────────────────────── */
  function initCategoryItems() {
    document.querySelectorAll('.category-full-item').forEach((item, i) => {
      // Scroll entrance — staggered from bottom
      gsap.fromTo(item,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'noomoOut', delay: i * 0.04,
          scrollTrigger: { trigger: item, start: 'top 92%', once: true }
        }
      );

      const bg     = item.querySelector('.category-full-item-bg');
      const img    = bg?.querySelector('img');
      const title  = item.querySelector('.category-full-title');
      const titleMn= item.querySelector('.category-full-title-mn');
      const arrow  = item.querySelector('.category-full-arrow');
      const num    = item.querySelector('.category-full-num');
      const line   = item.querySelector('.category-full-line');

      // Init defaults
      if (bg)    gsap.set(bg,    { scale: 1.08 });
      if (img)   gsap.set(img,   { scale: 1.0, filter: 'grayscale(0.4) brightness(0.55)' });
      if (arrow) gsap.set(arrow, { x: -24, opacity: 0 });
      if (num)   gsap.set(num,   { opacity: 0.3 });
      if (line)  gsap.set(line,  { scaleX: 0, transformOrigin: 'left' });

      item.addEventListener('mouseenter', () => {
        if (img)   gsap.to(img,   { scale: 1.04, filter: 'grayscale(0) brightness(0.7)', duration: 0.9, ease: 'noomoOut' });
        if (bg)    gsap.to(bg,    { scale: 1.0, duration: 0.9, ease: 'noomoOut' });
        if (title) gsap.to(title, { x: 28, duration: 0.65, ease: 'noomoOut', letterSpacing: '0.02em' });
        if (titleMn) gsap.to(titleMn, { x: 28, duration: 0.65, ease: 'noomoOut', delay: 0.04 });
        if (arrow) gsap.to(arrow, { x: 0, opacity: 1, duration: 0.55, ease: 'noomoOut' });
        if (num)   gsap.to(num,   { opacity: 0.9, duration: 0.4 });
        if (line)  gsap.to(line,  { scaleX: 1, duration: 0.7, ease: 'noomo' });
      });

      item.addEventListener('mouseleave', () => {
        if (img)   gsap.to(img,   { scale: 1.0, filter: 'grayscale(0.4) brightness(0.55)', duration: 0.8, ease: 'noomo' });
        if (bg)    gsap.to(bg,    { scale: 1.08, duration: 0.8, ease: 'noomo' });
        if (title) gsap.to(title, { x: 0, duration: 0.6, ease: 'noomo', letterSpacing: '-0.02em' });
        if (titleMn) gsap.to(titleMn, { x: 0, duration: 0.6, ease: 'noomo', delay: 0.02 });
        if (arrow) gsap.to(arrow, { x: -24, opacity: 0, duration: 0.4, ease: 'noomoIn' });
        if (num)   gsap.to(num,   { opacity: 0.3, duration: 0.4 });
        if (line)  gsap.to(line,  { scaleX: 0, duration: 0.4, ease: 'noomoIn', transformOrigin: 'right' });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     PROJECT CARDS  — 3D tilt + hover image scale
  ───────────────────────────────────────────────────────── */
  function initProjectCards() {
    document.querySelectorAll('.project-card, .filter-project-card, .h-scroll-card').forEach(card => {
      const img      = card.querySelector('img');
      const overlay  = card.querySelector('.project-card-overlay, .filter-card-overlay');
      const meta     = card.querySelector('.project-card-meta, .filter-card-meta');
      const category = card.querySelector('.project-card-category, .filter-card-cat');

      if (img) gsap.set(img, { scale: 1.06 });

      card.addEventListener('mouseenter', () => {
        if (img) gsap.to(img, { scale: 1.0, duration: 0.9, ease: 'noomoOut' });
        if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.4 });
        if (meta) gsap.to(meta, { opacity: 1, y: 0, duration: 0.5, ease: 'noomoOut' });
        if (category) gsap.to(category, { color: 'var(--warm-plaster)', duration: 0.3 });
      });

      card.addEventListener('mouseleave', () => {
        if (img) gsap.to(img, { scale: 1.06, duration: 0.7, ease: 'noomo' });
        if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4 });
        if (meta) gsap.to(meta, { opacity: 0, y: 8, duration: 0.3 });
        if (category) gsap.to(category, { color: '', duration: 0.3 });
      });

      // 3D tilt (desktop only)
      if (!isDesktop()) return;

      card.addEventListener('mousemove', e => {
        const r    = card.getBoundingClientRect();
        const cx   = (e.clientX - r.left) / r.width - 0.5;
        const cy   = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(card, {
          rotateY: cx * 8,
          rotateX: cy * -6,
          transformPerspective: 900,
          scale: 1.015,
          duration: 0.35,
          ease: 'noomoOut',
          overwrite: 'auto'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.9, ease: 'noomoOut', overwrite: 'auto' });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     DESIGNER CARDS
  ───────────────────────────────────────────────────────── */
  function initDesignerCards() {
    document.querySelectorAll('.designer-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 45 },
        {
          opacity: 1, y: 0, duration: 1.05, ease: 'noomoOut', delay: i * 0.14,
          scrollTrigger: { trigger: card, start: 'top 89%', once: true }
        }
      );

      const portrait  = card.querySelector('.designer-card-portrait img');
      const overlay   = card.querySelector('.designer-card-overlay');
      const content   = card.querySelector('.designer-card-overlay-content');
      const link      = card.querySelector('.designer-card-link');

      if (portrait) gsap.set(portrait, { filter: 'grayscale(0.15)' });
      if (overlay)  gsap.set(overlay,  { opacity: 0 });
      if (content)  gsap.set(content,  { opacity: 0, y: 16 });

      card.addEventListener('mouseenter', () => {
        if (portrait) gsap.to(portrait, { scale: 1.06, filter: 'grayscale(0)', duration: 0.85, ease: 'noomoOut' });
        if (overlay)  gsap.to(overlay,  { opacity: 1, duration: 0.5 });
        if (content)  gsap.to(content,  { opacity: 1, y: 0, duration: 0.5, ease: 'noomoOut' });
        if (link)     gsap.to(link,     { x: 6, duration: 0.4, ease: 'noomoOut' });
      });

      card.addEventListener('mouseleave', () => {
        if (portrait) gsap.to(portrait, { scale: 1.0, filter: 'grayscale(0.15)', duration: 0.7, ease: 'noomo' });
        if (overlay)  gsap.to(overlay,  { opacity: 0, duration: 0.4 });
        if (content)  gsap.to(content,  { opacity: 0, y: 16, duration: 0.3 });
        if (link)     gsap.to(link,     { x: 0, duration: 0.4, ease: 'noomo' });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     PARALLAX  — multi-layer depth scroll
  ───────────────────────────────────────────────────────── */
  function initParallax() {
    if (isReduced) return;

    // Hero background image
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.4 }
      });
    }

    // Project hero
    const projectBg = document.querySelector('.project-hero-bg img');
    if (projectBg) {
      gsap.to(projectBg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: '.project-hero', start: 'top top', end: 'bottom top', scrub: 1.4 }
      });
    }

    // Intro image
    const introImg = document.querySelector('.intro-image-wrap img');
    if (introImg) {
      gsap.to(introImg, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.intro-image-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8
        }
      });
    }

    // Process image
    const procImg = document.querySelector('.process-image img');
    if (procImg) {
      gsap.fromTo(procImg,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: '.process-grid', start: 'top bottom', end: 'bottom top', scrub: 2 }
        }
      );
    }

    // Generic data-parallax elements
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     AMBIENT STRIP
  ───────────────────────────────────────────────────────── */
  document.querySelectorAll('.ambient-strip-item').forEach((item, i) => {
    const img   = item.querySelector('img');
    const label = item.querySelector('.ambient-strip-item-label');

    gsap.fromTo(item,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.25,
        ease: 'noomo',
        delay: i * 0.14,
        scrollTrigger: { trigger: item, start: 'top 92%', once: true }
      }
    );

    if (img) gsap.set(img, { scale: 1.07 });
    if (label) gsap.set(label, { opacity: 0, y: 8 });

    item.addEventListener('mouseenter', () => {
      if (img)   gsap.to(img,   { scale: 1.0, duration: 0.9, ease: 'noomoOut' });
      if (label) gsap.to(label, { opacity: 1, y: 0, duration: 0.35 });
    });
    item.addEventListener('mouseleave', () => {
      if (img)   gsap.to(img,   { scale: 1.07, duration: 0.7, ease: 'noomo' });
      if (label) gsap.to(label, { opacity: 0, y: 8, duration: 0.25 });
    });
  });

  /* ─────────────────────────────────────────────────────────
     PROCESS ACCORDION
  ───────────────────────────────────────────────────────── */
  function initProcessAccordion() {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    const openStep = step => {
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
      if (body) gsap.to(body, { maxHeight: 300, paddingTop: '1rem', duration: 0.6, ease: 'noomoOut' });
      if (icon) gsap.to(icon, { rotation: 45, duration: 0.45, ease: 'noomoOut' });
    };

    steps.forEach(step => {
      step.querySelector('.process-step-header')?.addEventListener('click', () => {
        if (step.classList.contains('active')) {
          step.classList.remove('active');
          const body = step.querySelector('.process-step-body');
          const icon = step.querySelector('.process-step-icon');
          if (body) gsap.to(body, { maxHeight: 0, paddingTop: 0, duration: 0.4, ease: 'noomo' });
          if (icon) gsap.to(icon, { rotation: 0, duration: 0.35 });
        } else {
          openStep(step);
        }
      });
    });

    if (steps[0]) {
      const body = steps[0].querySelector('.process-step-body');
      const icon = steps[0].querySelector('.process-step-icon');
      steps[0].classList.add('active');
      if (body) gsap.set(body, { maxHeight: 300, paddingTop: '1rem' });
      if (icon) gsap.set(icon, { rotation: 45 });
    }
  }

  /* ─────────────────────────────────────────────────────────
     COUNTERS  — scroll-triggered count-up with easing
  ───────────────────────────────────────────────────────── */
  function initCounters() {
    document.querySelectorAll('.stat-num[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const obj    = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2.0,
        ease: 'power3.out',
        onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     FILTER TABS  — category filter with GSAP stagger
  ───────────────────────────────────────────────────────── */
  function initFilterTabs() {
    const tabs    = document.querySelectorAll('.filter-tab');
    const cards   = document.querySelectorAll('[data-category]');
    const countEl = document.querySelector('.filter-results-count');
    if (!tabs.length) return;

    const filter = slug => {
      const showing = [], hiding = [];
      let count = 0;

      cards.forEach(card => {
        const match = slug === 'all' || card.dataset.category === slug;
        match ? showing.push(card) : hiding.push(card);
        if (match) count++;
      });

      // Smooth hide
      gsap.to(hiding, {
        opacity: 0, y: 12, scale: 0.96,
        duration: 0.28, ease: 'noomoIn',
        onComplete: () => hiding.forEach(c => { c.style.display = 'none'; })
      });

      // Smooth show with stagger
      showing.forEach(c => { c.style.display = ''; });
      gsap.fromTo(showing,
        { opacity: 0, y: 22, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.06, ease: 'noomoOut', delay: 0.22 }
      );

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

    // Hash-based initial filter
    const hash = location.hash.replace('#', '');
    if (hash) {
      const match = [...tabs].find(t => t.dataset.filter === hash);
      if (match) setTimeout(() => match.click(), 350);
    }
  }

  /* ─────────────────────────────────────────────────────────
     MAGNETIC ELEMENTS  — Noomo: buttons pull to cursor
  ───────────────────────────────────────────────────────── */
  function initMagnetic() {
    if (!isDesktop()) return;

    document.querySelectorAll('.btn-primary, .btn-outline, .nav-inquiry-btn').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r  = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  * 0.5)) * 0.45;
        const dy = (e.clientY - (r.top  + r.height * 0.5)) * 0.45;
        gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'noomoOut', overwrite: true });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'noomoOut', overwrite: true });
      });
    });

    // Nav logo — subtle magnetic
    const logo = document.querySelector('.nav-logo');
    if (logo) {
      logo.addEventListener('mousemove', e => {
        const r  = logo.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) * 0.22;
        const dy = (e.clientY - (r.top  + r.height / 2)) * 0.22;
        gsap.to(logo, { x: dx, y: dy, duration: 0.5, ease: 'noomoOut', overwrite: true });
      });
      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, { x: 0, y: 0, duration: 0.9, ease: 'noomoOut', overwrite: true });
      });
    }
  }

  /* ─────────────────────────────────────────────────────────
     CURSOR  — Noomo: morphing cursor with context states
  ───────────────────────────────────────────────────────── */
  function initCursor() {
    if (!isDesktop()) return;

    const old = document.getElementById('vd-cursor');
    if (old) old.remove();

    const cursor = document.createElement('div');
    cursor.id = 'vd-cursor';
    cursor.innerHTML = `
      <div class="vdc-dot"></div>
      <div class="vdc-ring"></div>
      <div class="vdc-label">View</div>
    `;
    document.body.appendChild(cursor);

    const style = document.createElement('style');
    style.textContent = `
      body, a, button, [role="button"] { cursor: none !important; }
      #vd-cursor { position:fixed; top:0; left:0; z-index:999999; pointer-events:none; mix-blend-mode:normal; }
      .vdc-dot {
        position:absolute; width:6px; height:6px;
        background:var(--heritage-olive); border-radius:50%;
        transform:translate(-50%,-50%);
        transition:width .18s,height .18s,background .25s;
        will-change:transform;
      }
      .vdc-ring {
        position:absolute; width:42px; height:42px;
        border:1.5px solid rgba(77,80,56,0.5); border-radius:50%;
        transform:translate(-50%,-50%);
        will-change:transform;
        transition:width .5s cubic-bezier(.22,1,.36,1),
                   height .5s cubic-bezier(.22,1,.36,1),
                   background .35s, border-color .3s, border-radius .4s;
      }
      .vdc-label {
        position:absolute; transform:translate(-50%,-50%);
        font-family:var(--font-sans); font-size:0.55rem; letter-spacing:.22em;
        text-transform:uppercase; color:var(--off-white);
        opacity:0; pointer-events:none; white-space:nowrap; font-weight:500;
        transition:opacity .2s;
      }
      body.csr-hover .vdc-ring { width:56px; height:56px; border-color:rgba(77,80,56,0.75); }
      body.csr-hover .vdc-dot  { width:3px; height:3px; }
      body.csr-view  .vdc-ring { width:88px; height:88px; background:rgba(77,80,56,0.9); border-color:transparent; }
      body.csr-view  .vdc-dot  { opacity:0; width:0; height:0; }
      body.csr-view  .vdc-label { opacity:1; }
      body.csr-drag  .vdc-ring { width:70px; height:70px; border-radius:6px; background:rgba(34,34,23,0.8); border-color:transparent; }
      body.csr-drag  .vdc-label { opacity:1; font-size:.45rem; }
    `;
    document.head.appendChild(style);

    const dot   = cursor.querySelector('.vdc-dot');
    const ring  = cursor.querySelector('.vdc-ring');
    const label = cursor.querySelector('.vdc-label');

    let mx = -300, my = -300, lx = -300, ly = -300;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    document.addEventListener('mouseleave', () => gsap.to(cursor, { opacity: 0, duration: 0.3 }));
    document.addEventListener('mouseenter', () => gsap.to(cursor, { opacity: 1, duration: 0.3 }));

    // Lerp ring to cursor
    gsap.ticker.add(() => {
      lx += (mx - lx) * 0.1;
      ly += (my - ly) * 0.1;
      gsap.set(dot,   { x: mx, y: my });
      gsap.set(ring,  { x: lx, y: ly });
      gsap.set(label, { x: lx, y: ly });
    });

    // Context states
    document.querySelectorAll('.project-card, .filter-project-card, .h-scroll-card').forEach(el => {
      el.addEventListener('mouseenter', () => { document.body.classList.add('csr-view'); label.textContent = 'View'; });
      el.addEventListener('mouseleave', () => { document.body.classList.remove('csr-view'); });
    });

    document.querySelectorAll('.ambient-strip-item, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => { document.body.classList.add('csr-drag'); label.textContent = '↔ Explore'; });
      el.addEventListener('mouseleave', () => { document.body.classList.remove('csr-drag'); });
    });

    document.querySelectorAll('.designer-card').forEach(el => {
      el.addEventListener('mouseenter', () => { document.body.classList.add('csr-view'); label.textContent = 'Portfolio'; });
      el.addEventListener('mouseleave', () => { document.body.classList.remove('csr-view'); });
    });

    document.querySelectorAll('a:not(.project-card):not(.filter-project-card):not(.h-scroll-card):not(.designer-card), button, .category-full-item').forEach(el => {
      el.addEventListener('mouseenter', () => { if (!document.body.classList.contains('csr-view')) document.body.classList.add('csr-hover'); });
      el.addEventListener('mouseleave', () => document.body.classList.remove('csr-hover'));
    });
  }

  /* ─────────────────────────────────────────────────────────
     MARQUEE  — Noomo: GSAP-driven, pauses on hover
  ───────────────────────────────────────────────────────── */
  function initMarquee() {
    document.querySelectorAll('.noomo-marquee-track, .marquee-track').forEach(track => {
      const clone = track.cloneNode(true);
      track.parentElement.appendChild(clone);

      const tl = gsap.to([track, clone], {
        xPercent: -50,
        ease: 'none',
        duration: 32,
        repeat: -1
      });

      const container = track.closest('.noomo-marquee, .marquee-section');
      if (container) {
        container.addEventListener('mouseenter', () => gsap.to(tl, { timeScale: 0, duration: 0.5 }));
        container.addEventListener('mouseleave', () => gsap.to(tl, { timeScale: 1, duration: 0.5 }));
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     SCROLL VELOCITY DISTORTION  — Noomo: images skew with speed
  ───────────────────────────────────────────────────────── */
  function initScrollVelocity() {
    if (isReduced || !isDesktop()) return;

    let lastY = window.scrollY, vel = 0;

    const imgs = document.querySelectorAll(
      '.project-card-image img, .filter-card-image img, .designer-card-portrait img, .h-scroll-card img'
    );

    gsap.ticker.add(() => {
      const dy = window.scrollY - lastY;
      vel += (dy - vel) * 0.075;
      lastY = window.scrollY;

      const absVel = Math.abs(vel);
      if (absVel > 0.08) {
        gsap.set(imgs, {
          skewY: vel * 0.055,
          y: vel * 0.45,
          overwrite: 'auto'
        });
      } else if (absVel < 0.02) {
        gsap.to(imgs, { skewY: 0, y: 0, duration: 0.9, ease: 'noomoOut', overwrite: 'auto' });
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     FORM LOGIC  — floating label + submit animation
  ───────────────────────────────────────────────────────── */
  function initFormLogic() {
    // Floating labels
    document.querySelectorAll('.form-group').forEach(group => {
      const input = group.querySelector('.form-input, .form-textarea, .form-select');
      const label = group.querySelector('.form-label');
      if (!input || !label) return;

      const activate   = () => gsap.to(label, { y: -22, scale: 0.78, color: 'var(--heritage-olive)', transformOrigin: 'left', duration: 0.3, ease: 'noomoOut' });
      const deactivate = () => {
        if (!input.value) gsap.to(label, { y: 0, scale: 1, color: 'var(--sage-stone)', duration: 0.3, ease: 'noomo' });
      };

      input.addEventListener('focus', activate);
      input.addEventListener('blur',  deactivate);

      // Init — if already has value
      if (input.value) activate();
    });

    // Form submission
    document.querySelectorAll('.inquiry-form form').forEach(form => {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn     = form.querySelector('[type=submit]');
        const success = form.closest('.inquiry-form')?.querySelector('.form-success');

        if (btn) {
          gsap.to(btn, { opacity: 0.55, scale: 0.96, duration: 0.2 });
          btn.textContent = 'Sending…';
          btn.disabled = true;
        }

        try {
          await fetch('/api/inquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
          });
        } catch(_) {}

        form.reset();
        if (btn) gsap.to(btn, { opacity: 0, duration: 0.4, onComplete: () => { btn.style.display = 'none'; } });

        if (success) {
          gsap.set(success, { opacity: 0, y: 14, display: 'flex' });
          gsap.to(success,  { opacity: 1, y: 0, duration: 0.8, ease: 'noomoOut' });
        }

        gsap.to(form, { opacity: 0.2, duration: 0.5 });
        form.style.pointerEvents = 'none';
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     PAGE TRANSITIONS  — Noomo: heritage olive overlay swipe
  ───────────────────────────────────────────────────────── */
  function initPageTransitions() {
    const overlay = document.getElementById('page-transition');
    if (!overlay) return;

    // Entry: overlay exits upward
    gsap.set(overlay, { yPercent: 0 });
    gsap.to(overlay,  { yPercent: -100, duration: 0.75, ease: 'noomo', delay: 0.1 });

    // Exit: overlay enters from bottom
    document.querySelectorAll('a[href^="/"]').forEach(a => {
      if (a.hash && a.pathname === location.pathname) return;
      if (a.target === '_blank') return;

      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (!href || href === location.pathname) return;
        e.preventDefault();

        gsap.set(overlay, { yPercent: 100, display: 'block' });
        gsap.to(overlay,  {
          yPercent: 0, duration: 0.6, ease: 'noomo',
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
        a.style.setProperty('color', 'var(--heritage-olive)', 'important');
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     SCROLL REVEAL BATCH  — robust, handles top-of-page elements
  ───────────────────────────────────────────────────────── */
  function initScrollRevealBatch() {
    // Stats items
    ScrollTrigger.batch('.stat-item', {
      onEnter: batch => gsap.fromTo(batch,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'noomoOut' }
      ),
      start: 'top 95%',
      once: true
    });

    // Section dividers draw in
    gsap.utils.toArray('.intro-divider, .section-divider').forEach(el => {
      gsap.fromTo(el,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.1, ease: 'noomo',
          scrollTrigger: { trigger: el, start: 'top 95%', once: true }
        }
      );
    });

    // .reveal elements — IntersectionObserver with generous rootMargin
    // Handles elements already in viewport on page load
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Small stagger based on position
          const delay = parseFloat(entry.target.style.transitionDelay) || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay * 1000);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,           // trigger when 5% visible — catches near-top elements
      rootMargin: '0px 0px 0px 0px'  // no negative margin — catch everything
    });

    document.querySelectorAll('.reveal').forEach(el => {
      // Skip if already handled by GSAP text split
      if (el.classList.contains('headline-xl') || el.classList.contains('headline-lg') ||
          el.classList.contains('headline-md') || el.classList.contains('body-text') ||
          el.classList.contains('eyebrow') || el.closest('.hero, #preloader')) return;
      observer.observe(el);
    });

    // Force-show any .reveal elements that are already in viewport right now
    // (handles page top elements on inner pages)
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        if (el.closest('.hero, #preloader')) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 50) {
          el.classList.add('visible');
        }
      });
    }, 100);
  }

  /* ─────────────────────────────────────────────────────────
     HORIZONTAL WORD SCRAMBLE  — Noomo: large oversized words
     that run across full width and scramble on view
  ───────────────────────────────────────────────────────── */
  // (handled in initHorizontalTextScroll + initTextScramble)

}); // end DOMContentLoaded
