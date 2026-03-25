/* ============================================================
   VIVACE DESIGN INTERIOR — Motion System & Interactions
   Premium motion-led editorial website
   ============================================================ */

(function () {
  'use strict';

  /* ── PRELOADER ─────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hide = () => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initScrollReveal();
      initParallax();
    };
    document.body.style.overflow = 'hidden';
    if (document.readyState === 'complete') {
      setTimeout(hide, 2200);
    } else {
      window.addEventListener('load', () => setTimeout(hide, 2200));
    }
  } else {
    initScrollReveal();
    initParallax();
  }

  /* ── SCROLL PROGRESS BAR ───────────────────────────────── */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ── NAVIGATION ────────────────────────────────────────── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const heroSection = document.querySelector('.hero');
    const toggleClass = () => {
      const scrolled = window.scrollY > 60;
      nav.classList.toggle('scrolled', scrolled);
      if (heroSection) {
        nav.classList.toggle('hero-nav', !scrolled);
      }
    };
    toggleClass();
    window.addEventListener('scroll', toggleClass, { passive: true });
  }

  /* ── MOBILE MENU ───────────────────────────────────────── */
  const menuToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SCROLL REVEAL ─────────────────────────────────────── */
  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal, .mask-reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  /* ── PARALLAX ──────────────────────────────────────────── */
  function initParallax() {
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    if (!parallaxEls.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const update = () => {
      parallaxEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${center * speed}px)`;
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── PROJECT FILTER ────────────────────────────────────── */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('[data-category]');
  const resultsCount = document.querySelector('.filter-results-count');

  if (filterTabs.length && projectCards.length) {
    const updateCount = (count) => {
      if (resultsCount) {
        resultsCount.textContent = `${count} project${count !== 1 ? 's' : ''} found`;
      }
    };

    const filterProjects = (slug) => {
      let visible = 0;
      projectCards.forEach(card => {
        const match = slug === 'all' || card.dataset.category === slug;
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        if (match) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          card.style.display = '';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
          visible++;
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => { card.style.display = 'none'; }, 400);
        }
      });
      updateCount(visible);
    };

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        filterProjects(tab.dataset.filter);
      });
    });

    // Init count
    updateCount(projectCards.length);

    // Check URL hash for pre-selected filter
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const matchingTab = Array.from(filterTabs).find(t => t.dataset.filter === hash);
      if (matchingTab) {
        matchingTab.click();
      }
    }
  }

  /* ── PROCESS ACCORDION ─────────────────────────────────── */
  const processSteps = document.querySelectorAll('.process-step');
  if (processSteps.length) {
    const openStep = (step) => {
      processSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    };

    processSteps.forEach(step => {
      step.querySelector('.process-step-header')?.addEventListener('click', () => {
        if (step.classList.contains('active')) {
          step.classList.remove('active');
        } else {
          openStep(step);
        }
      });
    });

    // Open first by default
    openStep(processSteps[0]);
  }

  /* ── INQUIRY FORM ──────────────────────────────────────── */
  const inquiryForm = document.querySelector('.inquiry-form form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = inquiryForm.querySelector('[type="submit"]');
      const successEl = document.querySelector('.form-success');

      // Visual feedback
      if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
      }

      const formData = new FormData(inquiryForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          inquiryForm.reset();
          if (successEl) successEl.classList.add('shown');
          inquiryForm.style.opacity = '0.5';
          inquiryForm.style.pointerEvents = 'none';
        } else {
          throw new Error('Server error');
        }
      } catch {
        if (btn) {
          btn.textContent = 'Try Again';
          btn.disabled = false;
        }
        // For demo: show success anyway
        inquiryForm.reset();
        if (successEl) successEl.classList.add('shown');
        if (btn) { btn.style.display = 'none'; }
      }
    });

    // Premium input focus effects
    inquiryForm.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
      const label = input.closest('.form-group')?.querySelector('.form-label');
      if (label) {
        input.addEventListener('focus', () => {
          label.style.color = 'var(--heritage-olive)';
          label.style.transition = 'color 0.3s ease';
        });
        input.addEventListener('blur', () => {
          label.style.color = '';
        });
      }
    });
  }

  /* ── PAGE TRANSITIONS ──────────────────────────────────── */
  const transitionEl = document.getElementById('page-transition');
  if (transitionEl) {
    // Animate out on page load
    transitionEl.classList.add('leaving');
    setTimeout(() => {
      transitionEl.style.display = 'none';
      transitionEl.classList.remove('leaving');
    }, 600);

    // Animate in before navigation
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      // Skip same-page anchors
      if (link.hash && link.pathname === window.location.pathname) return;
      if (link.target === '_blank') return;

      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === window.location.pathname) return;
        e.preventDefault();
        transitionEl.style.display = '';
        transitionEl.classList.add('entering');
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    });
  }

  /* ── SMOOTH COUNTER ANIMATION ──────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  if (statNums.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(ease * target) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => observer.observe(el));
  }

  /* ── CURSOR EFFECT (desktop only) ─────────────────────── */
  if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.innerHTML = `<div class="cursor-dot"></div><div class="cursor-ring"></div>`;
    document.body.appendChild(cursor);

    const style = document.createElement('style');
    style.textContent = `
      #custom-cursor { pointer-events: none; position: fixed; z-index: 9999; top: 0; left: 0; mix-blend-mode: normal; }
      .cursor-dot { width: 5px; height: 5px; background: var(--heritage-olive); border-radius: 50%; position: absolute; transform: translate(-50%, -50%); transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease; }
      .cursor-ring { width: 36px; height: 36px; border: 1px solid rgba(77,80,56,0.35); border-radius: 50%; position: absolute; transform: translate(-50%, -50%); transition: transform 0.4s var(--ease-out-quart), width 0.3s ease, height 0.3s ease, border-color 0.3s ease; }
      body.hovering .cursor-ring { width: 54px; height: 54px; border-color: rgba(77,80,56,0.6); }
      body.hovering .cursor-dot { width: 3px; height: 3px; }
    `;
    document.head.appendChild(style);

    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.querySelector('.cursor-dot').style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    });

    const lerp = (a, b, t) => a + (b - a) * t;

    const animateCursor = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      cursor.querySelector('.cursor-ring').style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    document.querySelectorAll('a, button, .project-card, .designer-card, .category-item, .filter-tab').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  /* ── IMAGE LAZY LOAD ───────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach(img => imgObserver.observe(img));
  }

  /* ── ACTIVE NAV LINK ───────────────────────────────────── */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath === href || (href !== '/' && currentPath.startsWith(href)))) {
      link.style.color = 'var(--heritage-olive)';
    }
  });

})();
