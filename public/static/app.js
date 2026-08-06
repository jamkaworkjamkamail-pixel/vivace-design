/* ============================================================
   VIVACE DESIGN INTERIOR
   Noomo-Level Motion System v3 — GSAP 3.12
   Zero dark-screen bugs. All animations reliable.
   ============================================================ */

/* ── Scroll restoration: always start at top on new page load ── */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────────────────────
     GSAP SETUP + NOOMO CUSTOM EASES
  ───────────────────────────────────────────────────────── */
  if (typeof gsap === 'undefined') return; // Safety guard

  gsap.registerPlugin(ScrollTrigger, CustomEase);

  CustomEase.create('noomo',    '0.76, 0, 0.24, 1');
  CustomEase.create('noomoOut', '0.22, 1, 0.36, 1');
  CustomEase.create('noomoIn',  '0.64, 0, 0.78, 0');
  CustomEase.create('expo',     '0.16, 1, 0.3, 1');
  CustomEase.create('smooth',   '0.45, 0, 0.55, 1');

  const isDesktop = () => window.innerWidth > 1024;
  const isMobile  = () => window.innerWidth <= 768;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
     PRELOADER — Door-split Noomo style
     Only runs on first visit (sessionStorage guard)
     CRITICAL: Never block page content on revisit
  ───────────────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  const isFirstVisit = !sessionStorage.getItem('vd_v3_loaded');

  if (preloader) {
    if (isFirstVisit) {
      sessionStorage.setItem('vd_v3_loaded', '1');
      document.body.style.overflow = 'hidden';

      const logo     = preloader.querySelector('.preloader-logo');
      const progress = preloader.querySelector('.preloader-progress-fill');
      const counter  = preloader.querySelector('.preloader-counter');
      const doorL    = preloader.querySelector('.preloader-door-left');
      const doorR    = preloader.querySelector('.preloader-door-right');

      // Char-by-char reveal
      let chars = null;
      if (logo && typeof VivaceSplit !== 'undefined') {
        try {
          const split = new VivaceSplit(logo, { type: 'chars' });
          chars = split.chars;
          if (chars && chars.length) {
            gsap.set(chars, { opacity: 0, y: 18, rotateX: -50, transformOrigin: '50% 50% -15px' });
          }
        } catch(e) { chars = null; }
      }

      const tl = gsap.timeline({
        onComplete: function() {
          // Doors slide open — Noomo signature
          const exitTl = gsap.timeline({
            onComplete: function() {
              preloader.style.display = 'none';
              document.body.style.overflow = '';
              runHeroEntrance();
            }
          });

          if (doorL && doorR) {
            exitTl
              .to(doorL, { xPercent: -100, duration: 1.0, ease: 'noomo' }, 0)
              .to(doorR, { xPercent:  100, duration: 1.0, ease: 'noomo' }, 0);
          } else {
            exitTl.to(preloader, { yPercent: -100, duration: 0.9, ease: 'noomo' }, 0);
          }
        }
      });

      if (chars) {
        tl.to(chars, { opacity: 1, y: 0, rotateX: 0, duration: 0.055, stagger: 0.045, ease: 'expo' }, 0.15);
      } else if (logo) {
        tl.fromTo(logo, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'noomoOut' }, 0.15);
      }

      if (progress) {
        tl.fromTo(progress,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.6, ease: 'smooth' }, 0.4);
      }

      if (counter) {
        const obj = { n: 0 };
        tl.to(obj, {
          n: 100,
          duration: 1.6,
          ease: 'smooth',
          onUpdate: function() {
            counter.textContent = Math.round(obj.n).toString().padStart(3, '0');
          }
        }, 0.4);
      }

      tl.to({}, { duration: 0.25 }); // brief hold before doors

    } else {
      // Return visit — instantly hide preloader, no blocking
      preloader.style.display = 'none';
      runHeroEntrance();
    }
  } else {
    runHeroEntrance();
  }

  /* ─────────────────────────────────────────────────────────
     HERO ENTRANCE — Line mask wipe + image scale
  ───────────────────────────────────────────────────────── */
  function runHeroEntrance() {
    const hero = document.querySelector('.hero');
    if (!hero) {
      initAll();
      return;
    }

    const bg       = hero.querySelector('.hero-bg img');
    const eyebrow  = hero.querySelector('.hero-eyebrow');
    const titleEl  = hero.querySelector('.hero-title');
    const subtitle = hero.querySelector('.hero-subtitle');
    const actions  = hero.querySelector('.hero-actions');
    const cue      = hero.querySelector('.hero-scroll-cue');

    // DISABLED VivaceSplit for hero title to prevent text breaking issues
    // Keep title as plain text for better language switching support
    const titleLines = null;

    const tl = gsap.timeline({
      defaults: { ease: 'noomoOut' },
      onComplete: initAll
    });

    if (bg) {
      tl.fromTo(bg,
        { scale: 1.18, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 2.2, ease: 'noomo' }, 0);
    }

    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8 }, 0.55);
    }

    // Simple fade-up animation for title (no split)
    if (titleEl) {
      gsap.set(titleEl, { opacity: 0, y: 40 });
      tl.to(titleEl, { opacity: 1, y: 0, duration: 1.15 }, 0.8);
    }

    if (subtitle) {
      gsap.set(subtitle, { opacity: 0, y: 18 });
      tl.to(subtitle, { opacity: 1, y: 0, duration: 0.9 }, 1.45);
    }

    if (actions) {
      gsap.set(actions, { opacity: 0, y: 14 });
      tl.to(actions, { opacity: 1, y: 0, duration: 0.8 }, 1.75);
    }

    if (cue) {
      gsap.set(cue, { opacity: 0 });
      tl.to(cue, { opacity: 1, duration: 0.6 }, 2.2);
    }
  }

  /* ─────────────────────────────────────────────────────────
     INIT ALL — called after hero entrance (or immediately on inner pages)
  ───────────────────────────────────────────────────────── */
  function initAll() {
    initNav();
    initMobileMenu();
    initTextReveals();
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
    initRevealBatch();
    initTextScramble();
    initHScrollText();
    // Re-apply i18n AFTER all animations are set up
    // This ensures VivaceSplit-processed elements are correctly translated
    if (window.VDi18n) {
      window.VDi18n.wireButtons();
      window.VDi18n.applyAll();
    }
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
      onEnter:     function() { nav.classList.add('scrolled');    nav.classList.remove('hero-nav'); },
      onLeaveBack: function() { nav.classList.remove('scrolled'); if (hero) nav.classList.add('hero-nav'); }
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

    toggle.addEventListener('click', function() {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (isOpen) {
        gsap.fromTo(links,
          { y: 45, opacity: 0, skewX: 3 },
          { y: 0, opacity: 1, skewX: 0, duration: 0.75, stagger: 0.08, ease: 'noomoOut', delay: 0.12 }
        );
      } else {
        gsap.to(links, { y: -18, opacity: 0, duration: 0.25, stagger: 0.03, ease: 'noomoIn' });
      }
    });

    links.forEach(function(a) {
      a.addEventListener('click', function() {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     TEXT REVEALS — scrolltriggered, no VivaceSplit on inner pages
  ───────────────────────────────────────────────────────── */
  function initTextReveals() {
    const isHome = location.pathname === '/';

    function smartStart(el) {
      const rect = el.getBoundingClientRect();
      const absTop = rect.top + window.scrollY;
      return absTop < window.innerHeight ? 'top bottom' : 'top 88%';
    }

    // Eyebrow labels
    gsap.utils.toArray('.eyebrow').forEach(function(el) {
      if (el.closest('.hero, #preloader')) return;
      gsap.fromTo(el,
        { opacity: 0, x: -14 },
        {
          opacity: 1, x: 0, duration: 0.75, ease: 'noomoOut',
          scrollTrigger: { trigger: el, start: smartStart(el), once: true }
        }
      );
    });

    // Headlines — VivaceSplit only on homepage
    gsap.utils.toArray('.headline-xl, .headline-lg, .headline-md, .intro-statement').forEach(function(el) {
      if (el.closest('.hero, #preloader')) return;

      if (isHome && typeof VivaceSplit !== 'undefined') {
        var lines = null;
        try {
          var sp = new VivaceSplit(el, { type: 'lines', linesClass: 'rvl-line' });
          lines = sp.lines;
          if (lines && lines.length > 0) {
            lines.forEach(function(l) {
              var w = document.createElement('div');
              w.style.cssText = 'overflow:hidden; display:block;';
              l.parentNode.insertBefore(w, l);
              w.appendChild(l);
              gsap.set(l, { yPercent: 108 });
            });
            gsap.to(lines, {
              yPercent: 0, duration: 1.05, stagger: 0.1, ease: 'noomo',
              scrollTrigger: { trigger: el, start: smartStart(el), once: true }
            });
            return;
          }
        } catch(e) {}
      }

      // Fallback: simple fade-up (works everywhere)
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'noomoOut',
          scrollTrigger: { trigger: el, start: smartStart(el), once: true }
        }
      );
    });

    // Body text
    gsap.utils.toArray('.body-text').forEach(function(el) {
      if (el.closest('.hero, #preloader')) return;

      if (isHome && typeof VivaceSplit !== 'undefined') {
        try {
          var sp = new VivaceSplit(el, { type: 'words' });
          var words = sp.words;
          if (words && words.length > 0) {
            gsap.set(words, { opacity: 0, y: 8 });
            gsap.to(words, {
              opacity: 1, y: 0, duration: 0.55, stagger: 0.02, ease: 'noomoOut',
              scrollTrigger: { trigger: el, start: smartStart(el), once: true }
            });
            return;
          }
        } catch(e) {}
      }

      gsap.fromTo(el,
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'noomoOut',
          scrollTrigger: { trigger: el, start: smartStart(el), once: true }
        }
      );
    });
  }

  /* ─────────────────────────────────────────────────────────
     TEXT SCRAMBLE — characters cycle on hover
  ───────────────────────────────────────────────────────── */
  function initTextScramble() {
    var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    function scramble(el) {
      var orig = el.textContent;
      var frame = 0, dur = 16;
      var anim = setInterval(function() {
        el.textContent = orig.split('').map(function(c, i) {
          if (i < frame / 2) return orig[i];
          return c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        if (frame >= dur * 2) { el.textContent = orig; clearInterval(anim); }
        frame++;
      }, 28);
    }

    document.querySelectorAll('.eyebrow').forEach(function(el) {
      el.addEventListener('mouseenter', function() { scramble(el); });
    });
    document.querySelectorAll('.nav-links a').forEach(function(el) {
      el.addEventListener('mouseenter', function() { scramble(el); });
    });
  }

  /* ─────────────────────────────────────────────────────────
     H-SCROLL TEXT — oversized parallax text strip
  ───────────────────────────────────────────────────────── */
  function initHScrollText() {
    document.querySelectorAll('.h-scroll-text').forEach(function(strip) {
      var dir = strip.dataset.dir === 'rtl' ? 1 : -1;
      gsap.to(strip, {
        xPercent: dir * 14,
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
     CLIP-PATH IMAGE REVEALS — bottom-to-top wipe
  ───────────────────────────────────────────────────────── */
  function initClipImageReveals() {
    var containers = [
      ...document.querySelectorAll('.intro-image-wrap'),
      ...document.querySelectorAll('.process-image'),
      ...document.querySelectorAll('.designer-card-portrait'),
      ...document.querySelectorAll('.gallery-item'),
      ...document.querySelectorAll('[data-clip]')
    ];

    containers.forEach(function(el, i) {
      if (!el.style.overflow) el.style.overflow = 'hidden';
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.35, ease: 'noomo',
          delay: (i % 3) * 0.1,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      );

      var img = el.querySelector('img');
      if (img) {
        gsap.fromTo(img,
          { scale: 1.12 },
          { scale: 1.0, duration: 1.6, ease: 'noomo',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
        );
      }
    });

    // Project/filter card images
    document.querySelectorAll('.project-card-image, .filter-card-image').forEach(function(el, i) {
      if (!el.style.overflow) el.style.overflow = 'hidden';
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.05, ease: 'noomo',
          delay: (i % 4) * 0.08,
          scrollTrigger: { trigger: el, start: 'top 94%', once: true }
        }
      );
    });
  }

  /* ─────────────────────────────────────────────────────────
     PINNED SCROLL — sticky panel cycling (Noomo signature)
  ───────────────────────────────────────────────────────── */
  function initPinnedScroll() {
    var section = document.querySelector('.pinned-scroll-section');
    if (!section) return;

    var panels = section.querySelectorAll('.pinned-panel');
    if (!panels.length) return;

    var N = panels.length;

    gsap.set(panels, { opacity: 0, y: 55, scale: 0.97 });
    gsap.set(panels[0], { opacity: 1, y: 0, scale: 1 });

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=' + (N * 110) + '%',
      pin: '.pinned-inner',
      pinSpacing: true,
      onUpdate: function(self) {
        var prog  = self.progress;
        var rawIdx = prog * N;
        var idx   = Math.min(Math.floor(rawIdx), N - 1);
        var frac  = rawIdx - idx;

        panels.forEach(function(panel, i) {
          var dots = section.querySelectorAll('.pinned-dot');
          if (dots[i]) dots[i].classList.toggle('active', i === idx);

          var img = panel.querySelector('.pinned-panel-bg img');

          if (i === idx) {
            var t = (i === 0) ? 1 : Math.min(frac * 3.5, 1);
            var e = easeOutQ(t);
            gsap.set(panel, { opacity: e, y: (1 - e) * 52, scale: 0.97 + 0.03 * e, pointerEvents: 'auto' });
            if (img) gsap.set(img, { scale: 1.08 - 0.08 * e });
          } else if (i < idx) {
            var exitStart = (i + 1) / N;
            var ep = Math.max(0, Math.min((prog - exitStart) / (0.25 / N), 1));
            var ee = easeInQ(ep);
            gsap.set(panel, { opacity: Math.max(0, 1 - ee * 1.4), y: -52 * ee, scale: 1 - 0.04 * ee, pointerEvents: 'none' });
          } else {
            gsap.set(panel, { opacity: 0, y: 52, scale: 0.97, pointerEvents: 'none' });
          }
        });
      }
    });
  }

  function easeOutQ(t) { return 1 - Math.pow(1 - t, 4); }
  function easeInQ(t)  { return t * t * t * t; }

  /* ─────────────────────────────────────────────────────────
     HORIZONTAL SCROLL — projects scroll sideways
  ───────────────────────────────────────────────────────── */
  function initHorizontalScroll() {
    var section = document.querySelector('.horizontal-scroll-section');
    if (!section || isMobile()) return;

    var track = section.querySelector('.h-scroll-track');
    if (!track) return;

    var cards = track.querySelectorAll('.h-scroll-card');
    if (!cards.length) return;

    var totalWidth = track.scrollWidth - section.offsetWidth;

    cards.forEach(function(card) {
      var img = card.querySelector('img');
      if (img) gsap.set(img, { scale: 1.07 });

      card.addEventListener('mouseenter', function() {
        if (img) gsap.to(img, { scale: 1.0, duration: 0.85, ease: 'noomoOut' });
        var title = card.querySelector('.h-card-title');
        if (title) gsap.to(title, { y: -4, duration: 0.38, ease: 'noomoOut' });
      });
      card.addEventListener('mouseleave', function() {
        if (img) gsap.to(img, { scale: 1.07, duration: 0.7, ease: 'noomo' });
        var title = card.querySelector('.h-card-title');
        if (title) gsap.to(title, { y: 0, duration: 0.38, ease: 'noomo' });
      });
    });

    gsap.to(track, {
      x: function() { return -totalWidth; },
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: function() { return '+=' + (totalWidth + window.innerHeight * 0.5); },
        pin: true,
        scrub: 1.0,
        invalidateOnRefresh: true,
        onUpdate: function(self) {
          var counter = section.querySelector('.h-scroll-count');
          if (counter) {
            var idx = Math.min(Math.floor(self.progress * cards.length), cards.length - 1);
            counter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
          }
        }
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     CATEGORY ITEMS — full-screen rows with hover image reveal
  ───────────────────────────────────────────────────────── */
  function initCategoryItems() {
    document.querySelectorAll('.category-full-item').forEach(function(item, i) {
      gsap.fromTo(item,
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'noomoOut', delay: i * 0.04,
          scrollTrigger: { trigger: item, start: 'top 93%', once: true }
        }
      );

      var bg     = item.querySelector('.category-full-item-bg');
      var img    = bg ? bg.querySelector('img') : null;
      var title  = item.querySelector('.category-full-title');
      var titleMn= item.querySelector('.category-full-title-mn');
      var arrow  = item.querySelector('.category-full-arrow');
      var num    = item.querySelector('.category-full-num');
      var line   = item.querySelector('.category-full-line');

      if (bg)    gsap.set(bg,    { scale: 1.06 });
      if (img)   gsap.set(img,   { scale: 1.0, filter: 'grayscale(0.35) brightness(0.55)' });
      if (arrow) gsap.set(arrow, { x: -20, opacity: 0 });
      if (num)   gsap.set(num,   { opacity: 0.28 });
      if (line)  gsap.set(line,  { scaleX: 0, transformOrigin: 'left' });

      item.addEventListener('mouseenter', function() {
        if (img)    gsap.to(img,    { scale: 1.04, filter: 'grayscale(0) brightness(0.68)', duration: 0.85, ease: 'noomoOut' });
        if (bg)     gsap.to(bg,     { scale: 1.0, duration: 0.85, ease: 'noomoOut' });
        if (title)  gsap.to(title,  { x: 26, duration: 0.6, ease: 'noomoOut' });
        if (titleMn)gsap.to(titleMn,{ x: 26, duration: 0.6, ease: 'noomoOut', delay: 0.04 });
        if (arrow)  gsap.to(arrow,  { x: 0, opacity: 1, duration: 0.5, ease: 'noomoOut' });
        if (num)    gsap.to(num,    { opacity: 0.9, duration: 0.38 });
        if (line)   gsap.to(line,   { scaleX: 1, duration: 0.65, ease: 'noomo' });
      });

      item.addEventListener('mouseleave', function() {
        if (img)    gsap.to(img,    { scale: 1.0, filter: 'grayscale(0.35) brightness(0.55)', duration: 0.75, ease: 'noomo' });
        if (bg)     gsap.to(bg,     { scale: 1.06, duration: 0.75, ease: 'noomo' });
        if (title)  gsap.to(title,  { x: 0, duration: 0.55, ease: 'noomo' });
        if (titleMn)gsap.to(titleMn,{ x: 0, duration: 0.55, ease: 'noomo', delay: 0.02 });
        if (arrow)  gsap.to(arrow,  { x: -20, opacity: 0, duration: 0.38, ease: 'noomoIn' });
        if (num)    gsap.to(num,    { opacity: 0.28, duration: 0.38 });
        if (line)   gsap.to(line,   { scaleX: 0, duration: 0.38, ease: 'noomoIn', transformOrigin: 'right' });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     PROJECT CARDS — 3D tilt + hover image scale
  ───────────────────────────────────────────────────────── */
  function initProjectCards() {
    document.querySelectorAll('.project-card, .filter-project-card, .h-scroll-card').forEach(function(card) {
      var img      = card.querySelector('img');
      var overlay  = card.querySelector('.project-card-overlay, .filter-card-overlay, .h-scroll-card-overlay');
      var meta     = card.querySelector('.project-card-meta, .filter-card-meta');
      var category = card.querySelector('.project-card-category, .filter-card-cat');

      if (img) gsap.set(img, { scale: 1.05 });

      card.addEventListener('mouseenter', function() {
        if (img)      gsap.to(img,      { scale: 1.0, duration: 0.85, ease: 'noomoOut' });
        if (overlay)  gsap.to(overlay,  { opacity: 1, duration: 0.38 });
        if (meta)     gsap.to(meta,     { opacity: 1, y: 0, duration: 0.5, ease: 'noomoOut' });
        if (category) gsap.to(category, { color: 'var(--warm-plaster)', duration: 0.28 });
      });

      card.addEventListener('mouseleave', function() {
        if (img)      gsap.to(img,      { scale: 1.05, duration: 0.65, ease: 'noomo' });
        if (overlay)  gsap.to(overlay,  { opacity: 0, duration: 0.38 });
        if (meta)     gsap.to(meta,     { opacity: 0, y: 8, duration: 0.28 });
        if (category) gsap.to(category, { color: '', duration: 0.28 });
      });

      // 3D tilt — desktop only
      if (!isDesktop()) return;

      card.addEventListener('mousemove', function(e) {
        var r  = card.getBoundingClientRect();
        var cx = (e.clientX - r.left) / r.width  - 0.5;
        var cy = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(card, {
          rotateY: cx * 8, rotateX: cy * -6,
          transformPerspective: 900, scale: 1.012,
          duration: 0.32, ease: 'noomoOut', overwrite: 'auto'
        });
      });

      card.addEventListener('mouseleave', function() {
        gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.85, ease: 'noomoOut', overwrite: 'auto' });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     DESIGNER CARDS
  ───────────────────────────────────────────────────────── */
  function initDesignerCards() {
    document.querySelectorAll('.designer-card').forEach(function(card, i) {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'noomoOut', delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 90%', once: true }
        }
      );

      var portrait = card.querySelector('.designer-card-portrait img');
      var overlay  = card.querySelector('.designer-card-overlay');
      var content  = card.querySelector('.designer-card-overlay-content');
      var link     = card.querySelector('.designer-card-link');

      if (portrait) gsap.set(portrait, { filter: 'grayscale(0.12)' });
      if (overlay)  gsap.set(overlay,  { opacity: 0 });
      if (content)  gsap.set(content,  { opacity: 0, y: 14 });

      card.addEventListener('mouseenter', function() {
        if (portrait) gsap.to(portrait, { scale: 1.06, filter: 'grayscale(0)', duration: 0.8, ease: 'noomoOut' });
        if (overlay)  gsap.to(overlay,  { opacity: 1, duration: 0.45 });
        if (content)  gsap.to(content,  { opacity: 1, y: 0, duration: 0.45, ease: 'noomoOut' });
        if (link)     gsap.to(link,     { x: 5, duration: 0.38, ease: 'noomoOut' });
      });

      card.addEventListener('mouseleave', function() {
        if (portrait) gsap.to(portrait, { scale: 1.0, filter: 'grayscale(0.12)', duration: 0.65, ease: 'noomo' });
        if (overlay)  gsap.to(overlay,  { opacity: 0, duration: 0.38 });
        if (content)  gsap.to(content,  { opacity: 0, y: 14, duration: 0.28 });
        if (link)     gsap.to(link,     { x: 0, duration: 0.38, ease: 'noomo' });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     PARALLAX — multi-layer depth
  ───────────────────────────────────────────────────────── */
  function initParallax() {
    if (isReduced) return;

    var heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 24, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.4 }
      });
    }

    var projectBg = document.querySelector('.project-hero-bg img');
    if (projectBg) {
      gsap.to(projectBg, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: '.project-hero', start: 'top top', end: 'bottom top', scrub: 1.4 }
      });
    }

    var introImg = document.querySelector('.intro-image-wrap img');
    if (introImg) {
      gsap.to(introImg, {
        yPercent: -10, ease: 'none',
        scrollTrigger: { trigger: '.intro-image-wrap', start: 'top bottom', end: 'bottom top', scrub: 1.8 }
      });
    }

    var procImg = document.querySelector('.process-image img');
    if (procImg) {
      gsap.fromTo(procImg,
        { yPercent: -5 },
        { yPercent: 5, ease: 'none',
          scrollTrigger: { trigger: '.process-grid', start: 'top bottom', end: 'bottom top', scrub: 2 } }
      );
    }

    document.querySelectorAll('[data-parallax]').forEach(function(el) {
      var speed = parseFloat(el.dataset.parallax) || 0.15;
      gsap.to(el, {
        yPercent: speed * 100, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     AMBIENT STRIP
  ───────────────────────────────────────────────────────── */
  document.querySelectorAll('.ambient-strip-item').forEach(function(item, i) {
    var img   = item.querySelector('img');
    var label = item.querySelector('.ambient-strip-item-label');

    gsap.fromTo(item,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2, ease: 'noomo', delay: i * 0.13,
        scrollTrigger: { trigger: item, start: 'top 93%', once: true }
      }
    );

    if (img)   gsap.set(img,   { scale: 1.06 });
    if (label) gsap.set(label, { opacity: 0, y: 7 });

    item.addEventListener('mouseenter', function() {
      if (img)   gsap.to(img,   { scale: 1.0,  duration: 0.85, ease: 'noomoOut' });
      if (label) gsap.to(label, { opacity: 1, y: 0, duration: 0.32 });
    });
    item.addEventListener('mouseleave', function() {
      if (img)   gsap.to(img,   { scale: 1.06, duration: 0.65, ease: 'noomo' });
      if (label) gsap.to(label, { opacity: 0, y: 7, duration: 0.22 });
    });
  });

  /* ─────────────────────────────────────────────────────────
     PROCESS ACCORDION
  ───────────────────────────────────────────────────────── */
  function initProcessAccordion() {
    var steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    function openStep(step) {
      steps.forEach(function(s) {
        s.classList.remove('active');
        var body = s.querySelector('.process-step-body');
        var icon = s.querySelector('.process-step-icon');
        if (body) gsap.to(body, { maxHeight: 0, paddingTop: 0, duration: 0.42, ease: 'noomo' });
        if (icon) gsap.to(icon, { rotation: 0, duration: 0.38, ease: 'noomoOut' });
      });
      step.classList.add('active');
      var body = step.querySelector('.process-step-body');
      var icon = step.querySelector('.process-step-icon');
      if (body) gsap.to(body, { maxHeight: 280, paddingTop: '1rem', duration: 0.55, ease: 'noomoOut' });
      if (icon) gsap.to(icon, { rotation: 45, duration: 0.42, ease: 'noomoOut' });
    }

    steps.forEach(function(step) {
      var header = step.querySelector('.process-step-header');
      if (header) {
        header.addEventListener('click', function() {
          if (step.classList.contains('active')) {
            step.classList.remove('active');
            var body = step.querySelector('.process-step-body');
            var icon = step.querySelector('.process-step-icon');
            if (body) gsap.to(body, { maxHeight: 0, paddingTop: 0, duration: 0.38, ease: 'noomo' });
            if (icon) gsap.to(icon, { rotation: 0, duration: 0.32 });
          } else {
            openStep(step);
          }
        });
      }
    });

    if (steps[0]) {
      var b0 = steps[0].querySelector('.process-step-body');
      var i0 = steps[0].querySelector('.process-step-icon');
      steps[0].classList.add('active');
      if (b0) gsap.set(b0, { maxHeight: 280, paddingTop: '1rem' });
      if (i0) gsap.set(i0, { rotation: 45 });
    }
  }

  /* ─────────────────────────────────────────────────────────
     COUNTERS
  ───────────────────────────────────────────────────────── */
  function initCounters() {
    document.querySelectorAll('.stat-num[data-count]').forEach(function(el) {
      var target = parseInt(el.dataset.count);
      var suffix = el.dataset.suffix || '';
      var obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 2.0, ease: 'power3.out',
        onUpdate: function() { el.textContent = Math.round(obj.val) + suffix; },
        scrollTrigger: { trigger: el, start: 'top 87%', once: true }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     FILTER TABS
  ───────────────────────────────────────────────────────── */
  function initFilterTabs() {
    var tabs    = document.querySelectorAll('.filter-tab');
    var cards   = document.querySelectorAll('[data-category]');
    var countEl = document.querySelector('.filter-results-count');
    if (!tabs.length) return;

    function filter(slug) {
      var showing = [], hiding = [];
      var count = 0;
      cards.forEach(function(card) {
        var match = slug === 'all' || card.dataset.category === slug;
        (match ? showing : hiding).push(card);
        if (match) count++;
      });

      gsap.to(hiding, {
        opacity: 0, y: 10, scale: 0.96,
        duration: 0.24, ease: 'noomoIn',
        onComplete: function() { hiding.forEach(function(c) { c.style.display = 'none'; }); }
      });

      showing.forEach(function(c) {
        c.style.display = '';
        // .reveal class-тай бол visible болгоно — filter хийгдэхэд зураг харагдана
        c.classList.add('visible');
        // img lazy load force trigger
        c.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
          if (img.dataset.src) { img.src = img.dataset.src; }
        });
      });

      gsap.fromTo(showing,
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.055, ease: 'noomoOut', delay: 0.15 }
      );

      if (countEl) countEl.textContent = count + ' төсөл';
    }

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        filter(tab.dataset.filter);
      });
    });

    if (countEl) countEl.textContent = cards.length + ' төсөл';

    // Анхны load: бүх card-уудыг visible болгоно (reveal CSS conflict арилгах)
    cards.forEach(function(c) { c.classList.add('visible'); });

    var hash = location.hash.replace('#', '');
    if (hash) {
      var match = Array.from(tabs).find(function(t) { return t.dataset.filter === hash; });
      if (match) setTimeout(function() { match.click(); }, 350);
    }
  }

  /* ─────────────────────────────────────────────────────────
     MAGNETIC ELEMENTS
  ───────────────────────────────────────────────────────── */
  function initMagnetic() {
    if (!isDesktop()) return;

    document.querySelectorAll('.btn-primary, .btn-outline, .nav-inquiry-btn').forEach(function(el) {
      el.addEventListener('mousemove', function(e) {
        var r  = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width  * 0.5)) * 0.42;
        var dy = (e.clientY - (r.top  + r.height * 0.5)) * 0.42;
        gsap.to(el, { x: dx, y: dy, duration: 0.38, ease: 'noomoOut', overwrite: true });
      });
      el.addEventListener('mouseleave', function() {
        gsap.to(el, { x: 0, y: 0, duration: 0.75, ease: 'noomoOut', overwrite: true });
      });
    });

    var logo = document.querySelector('.nav-logo');
    if (logo) {
      logo.addEventListener('mousemove', function(e) {
        var r  = logo.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width  / 2)) * 0.2;
        var dy = (e.clientY - (r.top  + r.height / 2)) * 0.2;
        gsap.to(logo, { x: dx, y: dy, duration: 0.45, ease: 'noomoOut', overwrite: true });
      });
      logo.addEventListener('mouseleave', function() {
        gsap.to(logo, { x: 0, y: 0, duration: 0.85, ease: 'noomoOut', overwrite: true });
      });
    }
  }

  /* ─────────────────────────────────────────────────────────
     CURSOR — morphing context cursor
  ───────────────────────────────────────────────────────── */
  function initCursor() {
    if (!isDesktop()) return;

    var old = document.getElementById('vd-cursor');
    if (old) old.remove();

    var cursor = document.createElement('div');
    cursor.id  = 'vd-cursor';
    cursor.innerHTML = '<div class="vdc-dot"></div><div class="vdc-ring"></div><div class="vdc-label">View</div>';
    document.body.appendChild(cursor);

    var style = document.createElement('style');
    style.textContent = [
      'body,a,button,[role="button"]{cursor:none!important}',
      '#vd-cursor{position:fixed;top:0;left:0;z-index:999999;pointer-events:none}',
      '.vdc-dot{position:absolute;width:6px;height:6px;background:var(--heritage-olive);border-radius:50%;transform:translate(-50%,-50%);transition:width .18s,height .18s;will-change:transform}',
      '.vdc-ring{position:absolute;width:42px;height:42px;border:1.5px solid rgba(77,80,56,.5);border-radius:50%;transform:translate(-50%,-50%);will-change:transform;transition:width .45s cubic-bezier(.22,1,.36,1),height .45s cubic-bezier(.22,1,.36,1),background .32s,border-color .28s,border-radius .38s}',
      '.vdc-label{position:absolute;transform:translate(-50%,-50%);font-family:var(--font-sans);font-size:.54rem;letter-spacing:.22em;text-transform:uppercase;color:var(--off-white);opacity:0;pointer-events:none;white-space:nowrap;font-weight:500;transition:opacity .2s}',
      'body.csr-hover .vdc-ring{width:54px;height:54px;border-color:rgba(77,80,56,.75)}',
      'body.csr-hover .vdc-dot{width:3px;height:3px}',
      'body.csr-view .vdc-ring{width:86px;height:86px;background:rgba(77,80,56,.9);border-color:transparent}',
      'body.csr-view .vdc-dot{opacity:0;width:0;height:0}',
      'body.csr-view .vdc-label{opacity:1}',
      'body.csr-drag .vdc-ring{width:68px;height:68px;border-radius:6px;background:rgba(34,34,23,.8);border-color:transparent}',
      'body.csr-drag .vdc-label{opacity:1;font-size:.44rem}'
    ].join('\n');
    document.head.appendChild(style);

    var dot   = cursor.querySelector('.vdc-dot');
    var ring  = cursor.querySelector('.vdc-ring');
    var label = cursor.querySelector('.vdc-label');
    var mx = -400, my = -400, lx = -400, ly = -400;

    document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });
    document.addEventListener('mouseleave', function() { gsap.to(cursor, { opacity: 0, duration: 0.28 }); });
    document.addEventListener('mouseenter', function() { gsap.to(cursor, { opacity: 1, duration: 0.28 }); });

    gsap.ticker.add(function() {
      lx += (mx - lx) * 0.1;
      ly += (my - ly) * 0.1;
      gsap.set(dot,   { x: mx, y: my });
      gsap.set(ring,  { x: lx, y: ly });
      gsap.set(label, { x: lx, y: ly });
    });

    function addState(els, cls, txt) {
      els.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
          document.body.classList.add(cls);
          if (txt) label.textContent = txt;
        });
        el.addEventListener('mouseleave', function() {
          document.body.classList.remove(cls);
        });
      });
    }

    addState(document.querySelectorAll('.project-card,.filter-project-card,.h-scroll-card'), 'csr-view', 'View');
    addState(document.querySelectorAll('.ambient-strip-item,.gallery-item'), 'csr-drag', '↔ Explore');
    addState(document.querySelectorAll('.designer-card'), 'csr-view', 'Portfolio');

    document.querySelectorAll('a:not(.project-card):not(.filter-project-card):not(.h-scroll-card):not(.designer-card),button,.category-full-item').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        if (!document.body.classList.contains('csr-view')) document.body.classList.add('csr-hover');
      });
      el.addEventListener('mouseleave', function() { document.body.classList.remove('csr-hover'); });
    });
  }

  /* ─────────────────────────────────────────────────────────
     MARQUEE
  ───────────────────────────────────────────────────────── */
  function initMarquee() {
    document.querySelectorAll('.noomo-marquee-track, .marquee-track').forEach(function(track) {
      var clone = track.cloneNode(true);
      track.parentElement.appendChild(clone);

      var tl = gsap.to([track, clone], {
        xPercent: -50, ease: 'none', duration: 32, repeat: -1
      });

      var container = track.closest('.noomo-marquee, .marquee-section');
      if (container) {
        container.addEventListener('mouseenter', function() { gsap.to(tl, { timeScale: 0, duration: 0.5 }); });
        container.addEventListener('mouseleave', function() { gsap.to(tl, { timeScale: 1, duration: 0.5 }); });
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     SCROLL VELOCITY DISTORTION
  ───────────────────────────────────────────────────────── */
  function initScrollVelocity() {
    if (isReduced || !isDesktop()) return;

    var lastY = window.scrollY, vel = 0;
    var imgs = document.querySelectorAll(
      '.project-card-image img,.filter-card-image img,.designer-card-portrait img,.h-scroll-card img'
    );

    gsap.ticker.add(function() {
      var dy = window.scrollY - lastY;
      vel += (dy - vel) * 0.08;
      lastY = window.scrollY;
      var abs = Math.abs(vel);
      if (abs > 0.1) {
        gsap.set(imgs, { skewY: vel * 0.05, y: vel * 0.42, overwrite: 'auto' });
      } else if (abs < 0.03) {
        gsap.to(imgs, { skewY: 0, y: 0, duration: 0.85, ease: 'noomoOut', overwrite: 'auto' });
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     FORM LOGIC
  ───────────────────────────────────────────────────────── */
  function initFormLogic() {
    document.querySelectorAll('.form-group').forEach(function(group) {
      var input = group.querySelector('.form-input,.form-textarea,.form-select');
      var label = group.querySelector('.form-label');
      if (!input || !label) return;

      var activate   = function() { gsap.to(label, { y: -22, scale: 0.78, color: 'var(--heritage-olive)', transformOrigin: 'left', duration: 0.28, ease: 'noomoOut' }); };
      var deactivate = function() { if (!input.value) gsap.to(label, { y: 0, scale: 1, color: 'var(--sage-stone)', duration: 0.28, ease: 'noomo' }); };

      input.addEventListener('focus', activate);
      input.addEventListener('blur',  deactivate);
      if (input.value) activate();
    });

    // ── EmailJS init (Public Key) ──────────────────────────────
    // TODO: Replace with your actual EmailJS Public Key
    // Get it from: emailjs.com → Account → API Keys
    var EMAILJS_PUBLIC_KEY    = 'YOUR_PUBLIC_KEY';
    var EMAILJS_SERVICE_ID    = 'YOUR_SERVICE_ID';
    var EMAILJS_TEMPLATE_ID   = 'YOUR_TEMPLATE_ID';

    if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    document.querySelectorAll('.inquiry-form form').forEach(function(form) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        var btn     = form.querySelector('[type=submit]');
        var success = form.closest('.inquiry-form') && form.closest('.inquiry-form').querySelector('.form-success');
        var errorBox = form.closest('.inquiry-form') && form.closest('.inquiry-form').querySelector('.form-error');

        if (btn) {
          gsap.to(btn, { opacity: 0.5, scale: 0.95, duration: 0.18 });
          btn.querySelector('span') ? btn.querySelector('span').textContent = 'Илгээж байна…' : (btn.textContent = 'Илгээж байна…');
          btn.disabled = true;
        }

        var data = Object.fromEntries(new FormData(form));

        // Budget label нэмэх
        var budgetMap = {
          'under-10m': '10 сая ₮-с доош',
          '10-30m': '10–30 сая ₮',
          '30-80m': '30–80 сая ₮',
          '80m-plus': '80 сая ₮-с дээш',
          '': 'Хэлэхгүй байх'
        };
        var timeMap = {
          'morning': 'Өглөө (9–12)',
          'afternoon': 'Өдөр (12–17)',
          'evening': 'Орой (17–19)',
          '': 'Дурын цагт'
        };
        data.budget_label    = budgetMap[data.budget]    || data.budget    || '—';
        data.time_label      = timeMap[data.preferred_time] || data.preferred_time || '—';
        data.submitted_at    = new Date().toLocaleString('mn-MN', { timeZone: 'Asia/Ulaanbaatar' });

        var sent = false;

        // ── EmailJS ───────────────────────────────────────────
        if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
          try {
            await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
              from_name:    data.name      || '',
              from_email:   data.email     || '',
              from_phone:   data.phone     || '',
              category:     data.category  || '—',
              budget:       data.budget_label,
              preferred_time: data.time_label,
              message:      data.message   || '',
              submitted_at: data.submitted_at,
              to_email:     'vivacedesign07@gmail.com',
            });
            sent = true;
          } catch(err) {
            console.warn('EmailJS error:', err);
          }
        }

        // ── Fallback: /api/inquiries (console.log only) ───────
        if (!sent) {
          try {
            await fetch('/api/inquiries', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
          } catch(_) {}
        }

        form.reset();
        if (btn) gsap.to(btn, { opacity: 0, duration: 0.38, onComplete: function() { btn.style.display = 'none'; } });

        if (success) {
          gsap.set(success, { opacity: 0, y: 12, display: 'flex' });
          gsap.to(success,  { opacity: 1, y: 0, duration: 0.75, ease: 'noomoOut' });
        }

        gsap.to(form, { opacity: 0.15, duration: 0.45 });
        form.style.pointerEvents = 'none';
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     PAGE TRANSITIONS — Noomo olive overlay swipe
     CRITICAL FIX: overlay starts off-screen (translateY(100%))
     and STAYS off-screen unless user clicks a link.
     We only animate it INTO view during navigation.
     On page entry we animate it OUT (downward exit).
  ───────────────────────────────────────────────────────── */
  function initPageTransitions() {
    var overlay = document.getElementById('page-transition');
    if (!overlay) return;

    // On page ENTRY: overlay comes FROM top (yPercent -100 → visible → exit up)
    // We animate it from the "just arrived" position going away
    gsap.fromTo(overlay,
      { yPercent: 0 },
      { yPercent: -100, duration: 0.7, ease: 'noomo', delay: 0.05,
        onStart: function() { overlay.style.pointerEvents = 'none'; }
      }
    );

    // On link click: overlay sweeps UP from bottom
    document.querySelectorAll('a[href^="/"]').forEach(function(a) {
      if (a.hash && a.pathname === location.pathname) return;
      if (a.target === '_blank') return;

      a.addEventListener('click', function(e) {
        var href = a.getAttribute('href');
        if (!href || href === location.pathname) return;
        e.preventDefault();

        overlay.style.pointerEvents = 'all';
        gsap.fromTo(overlay,
          { yPercent: 100 },
          {
            yPercent: 0, duration: 0.55, ease: 'noomo',
            onComplete: function() { window.scrollTo(0, 0); location.href = href; }
          }
        );
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     ACTIVE NAV
  ───────────────────────────────────────────────────────── */
  function initActiveNav() {
    var path = location.pathname;
    document.querySelectorAll('.nav-links a').forEach(function(a) {
      var href = a.getAttribute('href');
      if (href && (path === href || (href !== '/' && path.startsWith(href)))) {
        a.style.setProperty('color', 'var(--heritage-olive)', 'important');
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     REVEAL BATCH — IntersectionObserver for .reveal elements
  ───────────────────────────────────────────────────────── */
  function initRevealBatch() {
    // Stats
    ScrollTrigger.batch('.stat-item', {
      onEnter: function(batch) {
        gsap.fromTo(batch,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.11, ease: 'noomoOut' }
        );
      },
      start: 'top 96%',
      once: true
    });

    // Dividers
    gsap.utils.toArray('.intro-divider,.section-divider').forEach(function(el) {
      gsap.fromTo(el,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.05, ease: 'noomo',
          scrollTrigger: { trigger: el, start: 'top 96%', once: true } }
      );
    });

    // .reveal IntersectionObserver
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var delay = parseFloat(entry.target.style.transitionDelay) || 0;
          setTimeout(function() {
            entry.target.classList.add('visible');
          }, delay * 1000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.04, rootMargin: '0px 0px 0px 0px' });

    document.querySelectorAll('.reveal').forEach(function(el) {
      // Skip elements managed by GSAP directly
      if (el.classList.contains('headline-xl') || el.classList.contains('headline-lg') ||
          el.classList.contains('headline-md') || el.classList.contains('intro-statement') ||
          el.classList.contains('body-text')   || el.classList.contains('eyebrow') ||
          el.closest('.hero, #preloader')) return;
      observer.observe(el);
    });

    // Force-show already-in-viewport .reveal elements
    setTimeout(function() {
      document.querySelectorAll('.reveal:not(.visible)').forEach(function(el) {
        if (el.closest('.hero, #preloader')) return;
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 80) {
          el.classList.add('visible');
        }
      });
    }, 80);
  }


}); // end DOMContentLoaded
