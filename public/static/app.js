/* ============================================================
   VIVACE DESIGN INTERIOR — Noomo-Inspired Motion System
   Scroll-pinned storytelling · Clip-path reveals · Magnetic UI
   ============================================================ */

(function () {
  'use strict';

  /* ── UTILS ─────────────────────────────────────────────── */
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
  const map = (val, inMin, inMax, outMin, outMax) =>
    outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
  const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  /* ── PRELOADER ─────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    document.body.style.overflow = 'hidden';
    const hide = () => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      bootMotion();
    };
    if (document.readyState === 'complete') setTimeout(hide, 2400);
    else window.addEventListener('load', () => setTimeout(hide, 2400));
  } else {
    bootMotion();
  }

  function bootMotion() {
    initScrollProgress();
    initNav();
    initMobileMenu();
    initScrollReveal();
    initHeroParallax();
    initPinnedSections();
    initClipReveal();
    initMagneticButtons();
    initTextScramble();
    initProjectCardsMotion();
    initCursor();
    initCounters();
    initProcessAccordion();
    initFormLogic();
    initFilterTabs();
    initScrollVelocity();
  }

  /* ── SCROLL PROGRESS ───────────────────────────────────── */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      bar.style.width = clamp(pct * 100, 0, 100) + '%';
    }, { passive: true });
  }

  /* ── NAVIGATION ────────────────────────────────────────── */
  function initNav() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    const hero = document.querySelector('.hero, .project-hero, .designer-hero');
    const update = () => {
      const scrolled = window.scrollY > 60;
      nav.classList.toggle('scrolled', scrolled);
      if (hero) nav.classList.toggle('hero-nav', !scrolled);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ── MOBILE MENU ───────────────────────────────────────── */
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SCROLL REVEAL (basic) ─────────────────────────────── */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal, .mask-reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => obs.observe(el));
  }

  /* ── HERO PARALLAX ─────────────────────────────────────── */
  function initHeroParallax() {
    const heroImg = document.querySelector('.hero-bg img, .project-hero-bg img');
    if (!heroImg) return;
    const update = () => {
      heroImg.style.transform = `translateY(${window.scrollY * 0.28}px) scale(1.06)`;
    };
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ── SCROLL VELOCITY ───────────────────────────────────── */
  function initScrollVelocity() {
    let lastY = 0, velocity = 0, raf;
    const imgs = document.querySelectorAll('.project-card-image img, .filter-card-image img, .designer-card-portrait img');

    const tick = () => {
      velocity = lerp(velocity, (window.scrollY - lastY) * 0.04, 0.12);
      lastY = window.scrollY;
      imgs.forEach(img => {
        img.style.transform = `translateY(${velocity * 6}px) scale(${1 + Math.abs(velocity) * 0.008})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  /* ── CLIP-PATH REVEAL (Noomo style) ─────────────────────── */
  function initClipReveal() {
    const els = document.querySelectorAll('[data-clip-reveal]');
    if (!els.length) return;

    els.forEach(el => {
      el.style.clipPath = 'inset(100% 0% 0% 0%)';
      el.style.transition = 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1)';
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.style.clipPath = 'inset(0% 0% 0% 0%)';
          }, parseFloat(e.target.dataset.delay || 0) * 1000);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    els.forEach(el => obs.observe(el));
  }

  /* ── PINNED SCROLL SECTIONS (Noomo-style scroll storytelling) */
  function initPinnedSections() {
    const pinnedSections = document.querySelectorAll('.pinned-scroll-section');
    if (!pinnedSections.length) return;

    pinnedSections.forEach(section => {
      const inner = section.querySelector('.pinned-inner');
      const panels = section.querySelectorAll('.pinned-panel');
      if (!inner || !panels.length) return;

      const totalH = section.offsetHeight;
      const panelH = window.innerHeight;

      const update = () => {
        const rect = section.getBoundingClientRect();
        const scrolled = -rect.top;
        const progress = clamp(scrolled / (totalH - panelH), 0, 1);
        const idx = Math.floor(progress * panels.length);
        const panelProgress = (progress * panels.length) - idx;

        panels.forEach((p, i) => {
          if (i < idx) {
            p.style.opacity = '0';
            p.style.transform = 'translateY(-60px) scale(0.96)';
            p.style.pointerEvents = 'none';
          } else if (i === idx) {
            p.style.opacity = String(easeOutQuart(Math.min(panelProgress * 2, 1)));
            p.style.transform = `translateY(${(1 - easeOutQuart(Math.min(panelProgress * 2, 1))) * 40}px) scale(${0.97 + 0.03 * easeOutQuart(Math.min(panelProgress * 2, 1))})`;
            p.style.pointerEvents = 'auto';
          } else {
            p.style.opacity = '0';
            p.style.transform = 'translateY(40px) scale(0.97)';
            p.style.pointerEvents = 'none';
          }
        });
      };

      window.addEventListener('scroll', update, { passive: true });
      update();
    });
  }

  /* ── MAGNETIC BUTTONS ──────────────────────────────────── */
  function initMagneticButtons() {
    if (window.innerWidth < 1024) return;

    document.querySelectorAll('.btn-primary, .btn-outline, .nav-inquiry-btn').forEach(btn => {
      let animating = false;
      let bx = 0, by = 0;

      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.35;
        const dy = (e.clientY - cy) * 0.35;

        if (!animating) {
          animating = true;
          const anim = () => {
            bx = lerp(bx, dx, 0.15);
            by = lerp(by, dy, 0.15);
            btn.style.transform = `translate(${bx}px, ${by}px)`;
            if (Math.abs(bx - dx) > 0.1 || Math.abs(by - dy) > 0.1) {
              requestAnimationFrame(anim);
            } else {
              animating = false;
            }
          };
          requestAnimationFrame(anim);
        }
      });

      btn.addEventListener('mouseleave', () => {
        animating = true;
        const release = () => {
          bx = lerp(bx, 0, 0.12);
          by = lerp(by, 0, 0.12);
          btn.style.transform = `translate(${bx}px, ${by}px)`;
          if (Math.abs(bx) > 0.05 || Math.abs(by) > 0.05) {
            requestAnimationFrame(release);
          } else {
            btn.style.transform = '';
            animating = false;
          }
        };
        requestAnimationFrame(release);
      });
    });
  }

  /* ── TEXT SCRAMBLE (Noomo-style) ───────────────────────── */
  function initTextScramble() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const scramble = (el, finalText, duration = 900) => {
      let iteration = 0;
      const total = finalText.length;
      const interval = setInterval(() => {
        el.textContent = finalText.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        iteration += 0.5;
        if (iteration >= total) clearInterval(interval);
      }, duration / (total * 2));
    };

    const targets = document.querySelectorAll('[data-scramble]');
    if (!targets.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const original = el.dataset.scramble || el.textContent;
          el.dataset.scramble = original;
          setTimeout(() => scramble(el, original.toUpperCase()), 200);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    targets.forEach(el => obs.observe(el));
  }

  /* ── PROJECT CARDS MOTION ──────────────────────────────── */
  function initProjectCardsMotion() {
    if (window.innerWidth < 1024) return;

    document.querySelectorAll('.project-card, .filter-project-card, .designer-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${cx * 4}deg) rotateX(${cy * -4}deg) translateZ(8px)`;
        card.style.transition = 'transform 0.1s ease';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      });
    });
  }

  /* ── CURSOR ────────────────────────────────────────────── */
  function initCursor() {
    if (window.innerWidth < 1024) return;

    const cursor = document.createElement('div');
    cursor.id = 'vd-cursor';
    document.body.appendChild(cursor);

    const style = document.createElement('style');
    style.textContent = `
      #vd-cursor {
        position: fixed; top: 0; left: 0; z-index: 99999;
        pointer-events: none; mix-blend-mode: normal;
      }
      #vd-cursor .c-dot {
        position: absolute;
        width: 6px; height: 6px;
        background: var(--heritage-olive);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width .2s ease, height .2s ease, opacity .2s ease;
      }
      #vd-cursor .c-ring {
        position: absolute;
        width: 42px; height: 42px;
        border: 1px solid rgba(77,80,56,0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width .4s var(--ease-out-quart), height .4s var(--ease-out-quart),
                    border-color .3s ease, background .3s ease;
      }
      #vd-cursor .c-label {
        position: absolute;
        transform: translate(-50%, -50%);
        font-family: var(--font-sans);
        font-size: 0.58rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--warm-plaster);
        opacity: 0;
        transition: opacity .3s ease;
        white-space: nowrap;
      }
      body.cursor-view #vd-cursor .c-ring {
        width: 88px; height: 88px;
        background: rgba(77,80,56,0.92);
        border-color: transparent;
      }
      body.cursor-view #vd-cursor .c-dot { opacity: 0; }
      body.cursor-view #vd-cursor .c-label { opacity: 1; }
      body.cursor-hover #vd-cursor .c-ring { width: 60px; height: 60px; border-color: rgba(77,80,56,0.7); }
      body.cursor-hover #vd-cursor .c-dot { width: 3px; height: 3px; }
    `;
    document.head.appendChild(style);

    cursor.innerHTML = `<div class="c-dot"></div><div class="c-ring"></div><div class="c-label">View</div>`;

    let mx = -200, my = -200, rx = -200, ry = -200;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    const dot = cursor.querySelector('.c-dot');
    const ring = cursor.querySelector('.c-ring');
    const label = cursor.querySelector('.c-label');

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      label.style.left = rx + 'px'; label.style.top = ry + 'px';
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    document.querySelectorAll('.project-card, .filter-project-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-view'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-view'));
    });
    document.querySelectorAll('a:not(.project-card):not(.filter-project-card), button').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ── COUNTERS ──────────────────────────────────────────── */
  function initCounters() {
    document.querySelectorAll('.stat-num[data-count]').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1800;
        const start = performance.now();
        const animate = now => {
          const t = easeOutQuart(clamp((now - start) / dur, 0, 1));
          el.textContent = Math.round(t * target) + suffix;
          if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }, { threshold: 0.5 });
      obs.observe(el);
    });
  }

  /* ── PROCESS ACCORDION ─────────────────────────────────── */
  function initProcessAccordion() {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;
    const open = step => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    };
    steps.forEach(step => {
      step.querySelector('.process-step-header')?.addEventListener('click', () => {
        step.classList.contains('active') ? step.classList.remove('active') : open(step);
      });
    });
    if (steps[0]) open(steps[0]);
  }

  /* ── FILTER TABS ───────────────────────────────────────── */
  function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('[data-category]');
    const countEl = document.querySelector('.filter-results-count');
    if (!tabs.length) return;

    const filter = slug => {
      let count = 0;
      cards.forEach(card => {
        const match = slug === 'all' || card.dataset.category === slug;
        if (match) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(18px)';
          requestAnimationFrame(() => requestAnimationFrame(() => {
            card.style.transition = 'opacity .5s ease, transform .5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }));
          count++;
        } else {
          card.style.transition = 'opacity .3s ease';
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
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

    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = [...tabs].find(t => t.dataset.filter === hash);
      if (match) match.click();
    }
  }

  /* ── FORM ──────────────────────────────────────────────── */
  function initFormLogic() {
    document.querySelectorAll('.inquiry-form form').forEach(form => {
      // Focus label color
      form.querySelectorAll('.form-input,.form-textarea,.form-select').forEach(input => {
        const label = input.closest('.form-group')?.querySelector('.form-label');
        if (!label) return;
        input.addEventListener('focus', () => label.style.color = 'var(--heritage-olive)');
        input.addEventListener('blur', () => label.style.color = '');
      });

      form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('[type=submit]');
        const success = form.closest('.inquiry-form')?.querySelector('.form-success');
        if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

        const data = Object.fromEntries(new FormData(form));
        try {
          const res = await fetch('/api/inquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if (!res.ok) throw new Error();
        } catch (_) { /* show success anyway for demo */ }

        form.reset();
        if (success) success.classList.add('shown');
        if (btn) btn.style.display = 'none';
        form.style.opacity = '0.4';
        form.style.pointerEvents = 'none';
      });
    });
  }

  /* ── PAGE TRANSITION ───────────────────────────────────── */
  const overlay = document.getElementById('page-transition');
  if (overlay) {
    overlay.classList.add('leaving');
    setTimeout(() => { overlay.style.display = 'none'; overlay.classList.remove('leaving'); }, 600);

    document.querySelectorAll('a[href^="/"]').forEach(a => {
      if (a.hash && a.pathname === location.pathname) return;
      if (a.target === '_blank') return;
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (!href || href === location.pathname) return;
        e.preventDefault();
        overlay.style.display = '';
        overlay.classList.add('entering');
        setTimeout(() => { location.href = href; }, 480);
      });
    });
  }

  /* ── ACTIVE NAV ────────────────────────────────────────── */
  const path = location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (path === href || (href !== '/' && path.startsWith(href)))) {
      a.style.color = 'var(--heritage-olive)';
    }
  });

})();

/* ── PINNED SCROLL ENGINE (Noomo-style) ─────────────────── */
(function initPinnedEngine() {
  const section = document.querySelector('.pinned-scroll-section');
  if (!section) return;

  const panels = section.querySelectorAll('.pinned-panel');
  if (!panels.length) return;

  const count = panels.length;
  let current = -1;

  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  const update = () => {
    const rect = section.getBoundingClientRect();
    const totalScroll = section.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(scrolled / totalScroll, 1));

    // Which panel
    const rawIdx = progress * count;
    const idx = Math.min(Math.floor(rawIdx), count - 1);
    const frac = rawIdx - idx;

    if (idx !== current) {
      // Trigger bg image zoom on active panel
      panels.forEach((p, i) => {
        const img = p.querySelector('.pinned-panel-bg img');
        if (img) img.style.transform = i === idx ? 'scale(1.0)' : 'scale(1.08)';
      });
      current = idx;
    }

    panels.forEach((p, i) => {
      let opacity, ty, scale;
      if (i < idx) {
        // Already passed — exit upward
        const exitFrac = Math.min((scrolled - (totalScroll / count) * (i + 1)) / (totalScroll / count * 0.4), 1);
        opacity = Math.max(0, 1 - easeOutQuart(exitFrac));
        ty = -50 * easeOutQuart(exitFrac);
        scale = 0.96 + 0.04 * (1 - easeOutQuart(exitFrac));
      } else if (i === idx) {
        // Active — enter from below
        const enterFrac = Math.min(frac * 2.5, 1);
        opacity = easeOutQuart(Math.min(scrolled > 0 || i === 0 ? 1 : 0, enterFrac + (i === 0 ? 1 : 0)));
        ty = (1 - easeOutQuart(Math.min(enterFrac + (i === 0 ? 1 : 0), 1))) * 35;
        scale = 0.97 + 0.03 * easeOutQuart(Math.min(enterFrac + (i === 0 ? 1 : 0), 1));
      } else {
        // Upcoming — invisible below
        opacity = 0;
        ty = 35;
        scale = 0.97;
      }

      p.style.opacity = String(opacity);
      p.style.transform = `translateY(${ty}px) scale(${scale})`;
      p.style.pointerEvents = i === idx ? 'auto' : 'none';
    });

    // Update progress dots
    section.querySelectorAll('.pinned-progress-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  };

  // Initial render
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
})();
