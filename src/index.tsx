import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { Nav, Footer, ProjectCard, InquirySection } from './components'
import {
  designers, projects, categories,
  getProjectsByCategory, getProjectsByDesigner,
  getProjectById, getDesignerById, getFeaturedProjects
} from './data/projects'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))
app.use(renderer)
app.use('/api/*', cors())

// Favicon
app.get('/favicon.ico', (c) => c.body('', 204))

/* ═══════════════════════════════════════════════════════════
   HOMEPAGE
═══════════════════════════════════════════════════════════ */
app.get('/', (c) => {
  const featured = getFeaturedProjects().slice(0, 7)

  return c.render(
    <>
      {/* Preloader — Noomo door-split style */}
      <div id="preloader">
        <div class="preloader-door-left"></div>
        <div class="preloader-door-right"></div>
        <div class="preloader-logo">Vivace Design Interior</div>
        <div class="preloader-progress"><div class="preloader-progress-fill"></div></div>
        <div class="preloader-counter">000</div>
      </div>

      <Nav transparent={true} />

      {/* ── HERO ── */}
      <section class="hero">
        <div class="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=85"
            alt="Vivace Design Interior — premium interior design studio"
            data-parallax="0.12"
          />
        </div>
        <div class="hero-overlay"></div>

        <div class="hero-content container">
          <div class="hero-eyebrow">
            <span data-i18n="hero.eyebrow">Тэргүүний Интерьер Дизайн Студи</span>
          </div>
          <h1 class="hero-title" data-i18n="hero.title">
            Таны мөрөөдлийн орон сууц эндээс эхэлнэ
          </h1>
          <p class="hero-subtitle" data-i18n="hero.subtitle">
            Тодорхой байдал, дулаан мэдрэмж, тогтвортой онцлогоор хийгдсэн дотоод орчинг бид бүтээдэг.
            Бүх орон зай бол гар урлал ба алсын харааны хамтын бүтээл юм.
          </p>
          <div class="hero-actions">
            <a href="/projects" class="btn-primary">
              <span data-i18n="hero.btn.projects">Төслүүд үзэх</span> <span class="btn-arrow"></span>
            </a>
            <a href="/inquiry" class="btn-outline" data-i18n="hero.btn.inquiry">Хүсэлт илгээх</a>
          </div>
        </div>

        <div class="hero-scroll-cue">
          <div class="scroll-line"></div>
          <span data-i18n="hero.scroll">Гүйлгэх</span>
        </div>
      </section>

      {/* ── MARQUEE (Noomo-style pausing strip) ── */}
      <div class="noomo-marquee" aria-hidden="true">
        <div class="noomo-marquee-track">
          {[
            { en: 'Kitchen',        mn: 'Гал тогоо' },
            { en: 'Living Room',    mn: 'Зочны өрөө' },
            { en: 'Master Bedroom', mn: 'Унтлагын өрөө' },
            { en: 'Office',         mn: 'Оффис' },
            { en: 'Coffee Shop',    mn: 'Кофе шоп' },
            { en: 'Dental Clinic',  mn: 'Шүдний клиник' },
            { en: 'Kids Room',      mn: 'Хүүхдийн өрөө' },
            { en: 'Auto Mall',      mn: 'Авто молл' },
            { en: 'E-sport Center', mn: 'Е-спорт төв' },
            { en: 'Bathroom',       mn: 'Угаалгын өрөө' },
            { en: 'Work Room',      mn: 'Ажлын өрөө' },
          ].map((item, i) => (
            <>
              <span class="noomo-marquee-item" data-en={item.en} data-mn={item.mn}>{item.mn}</span>
              <span class="noomo-marquee-sep"></span>
            </>
          ))}
        </div>
      </div>

      {/* ── BRAND INTRO ── */}
      <section class="intro-section section">
        <div class="container">
          <div class="intro-grid">
            <div class="intro-image-wrap reveal">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80"
                alt="Vivace Design Interior studio"
                loading="lazy"
              />
              <div class="intro-tag" data-i18n="intro.tag">Үүссэн 2024 · Улаанбаатар</div>
            </div>
            <div class="intro-text-wrap">
              <div class="eyebrow reveal" data-i18n="intro.eyebrow">Vivace-д тавтай морил</div>
              <h2 class="intro-statement reveal reveal-delay-1" data-i18n="intro.headline">
                Орон зайг өөрчилж, амьдралыг өргөмжлөх
              </h2>
              <div class="intro-divider reveal reveal-delay-2"></div>
              <p class="body-text reveal reveal-delay-3" data-i18n="intro.p1">
                Vivace Design Interior бол Улаанбаатарт байрладаг тэргүүний дотоод дизайн студи юм.
                Бид болоовсронгуй байдал, ажиллагаа болон мөнхийн дизайнаар хослуулсан гоёмсог орон зай бүтээхэд мэргэшсэн.
                Тансаг орон сууц, орчин үеийн оффис, эелдэг кофе шоп, боловсронгуй шүдний эмнэлэг гэх мэт 
                та бүхний алсын харааг нарийн зүйлд анхаарал хандуулснаар бодит болгодог.
              </p>
              <br />
              <p class="body-text reveal reveal-delay-4" data-i18n="intro.p2">
                Манай гурван онцгой дизайнерын баг нь олон талт туршлага болон таны амьдралын хэв маяг, 
                мөрөөдөлтэй уялдсан дотоод засал дизайныг бүтээх хайр дурлалаар хангадаг. Төсөл бүр бүтээлч байдал, 
                нарийвчлал, гар урлал нэгдэж та олон жилийн турш хайрлах орон зайг хүргэдэг хамтын аялал юм.
              </p>
              <br />
              <a href="/about" class="btn-outline reveal reveal-delay-5" style="margin-top: 1rem; display: inline-flex;">
                <span data-i18n="intro.btn">Бидний тухай илүү ихийг мэдэх</span> <span class="btn-arrow"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PINNED SCROLL — Featured Projects Storytelling (Noomo) ── */}
      <section class="pinned-scroll-section" id="pinned-stories">
        <div class="pinned-inner">
          {featured.slice(0, 4).map((project, i) => {
            const designer = getDesignerById(project.designerId)
            return (
              <div class="pinned-panel" key={project.id}>
                {/* Background image */}
                <div class="pinned-panel-bg">
                  <img src={project.coverImage} alt={project.title} loading={i === 0 ? 'eager' : 'lazy'} />
                </div>
                <div class="pinned-panel-overlay"></div>

                {/* Content */}
                <div class="pinned-panel-content">
                  <div>
                    <div class="pinned-panel-label">{project.category}</div>
                    <h2 class="pinned-panel-title">
                      {project.title.split(' — ')[0]}<br />
                      <em>{project.title.split(' — ')[1] || ''}</em>
                    </h2>
                    <p class="pinned-panel-desc">{project.description}</p>
                    <div class="pinned-panel-designer">
                      <span data-i18n="panel.designed">Designed by</span> {designer?.name}
                    </div>
                    <div class="pinned-panel-meta">
                      {project.location && <span>{project.location}</span>}
                      {project.year && <span>{project.year}</span>}
                      {project.area && <span>{project.area}</span>}
                    </div>
                    <a href={`/projects/${project.id}`} class="btn-primary" style="margin-top: 2rem; display: inline-flex; background: var(--warm-plaster); color: var(--deep-olive); border-color: var(--warm-plaster);">
                      <span data-i18n="panel.view">View Project</span> <span class="btn-arrow"></span>
                    </a>
                  </div>
                  <div class="pinned-panel-right">
                    <div class="pinned-panel-index">0{i + 1}</div>
                  </div>
                </div>

                {/* Progress dots — Noomo style */}
                <div class="pinned-progress-bar">
                  <div class="pinned-progress-dots">
                    {featured.slice(0, 4).map((_, di) => (
                      <button class={`pinned-dot ${di === 0 && i === 0 ? 'active' : ''}`} key={di} aria-label={`Project ${di + 1}`}></button>
                    ))}
                  </div>
                </div>
                <div class="pinned-scroll-hint" data-i18n="panel.scroll">Scroll to explore</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── AMBIENT STRIP ── */}
      <div class="ambient-strip">
        {[
          { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', key: 'cat.kitchen', en: 'Kitchen' },
          { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80', key: 'cat.master-bedroom', en: 'Bedroom' },
          { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80', key: 'cat.coffee-shop', en: 'Coffee Shop' },
        ].map(item => (
          <div class="ambient-strip-item" key={item.en}>
            <img src={item.src} alt={item.en} loading="lazy" />
            <span class="ambient-strip-item-label" data-i18n={item.key}>{item.en}</span>
          </div>
        ))}
      </div>

      {/* ── CATEGORIES — Noomo full-screen style ── */}
      <section style="background: var(--deep-olive);">
        <div style="padding: 5rem var(--gutter) 3rem; max-width: var(--max-width); margin: 0 auto;">
          <div class="eyebrow" style="color: var(--sage-stone);" data-i18n="cat.eyebrow">Browse</div>
          <h2 class="headline-lg" style="color: var(--warm-plaster); margin-top: 0.5rem;" data-i18n="cat.headline">Project Categories</h2>
        </div>
        <div>
          {categories.map((cat, i) => {
            const catImages = [
              'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
              'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
              'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=1200&q=80',
              'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80',
              'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
              'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
              'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
              'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
              'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
              'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80',
              'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80',
            ]
            return (
              <a href={`/categories#${cat.slug}`} class="category-full-item" key={cat.slug}>
                <div class="category-full-item-bg">
                  <img src={catImages[i % catImages.length]} alt={cat.label} loading="lazy" />
                </div>
                <div class="category-full-content">
                  <div>
                    <div class="category-full-title" data-i18n={`cat.${cat.slug}`}>{cat.label}</div>
                  </div>
                  <div class="category-full-arrow" data-i18n="cat.view">View Projects</div>
                </div>
                <span class="category-full-num">{String(i + 1).padStart(2, '0')}</span>
                <div class="category-full-line"></div>
              </a>
            )
          })}
        </div>
      </section>

      {/* ── H-SCROLL TEXT STRIP ── */}
      <div class="h-scroll-text-section dark" aria-hidden="true">
        <span class="h-scroll-text" data-dir="ltr">Interior Design — Vivace — Ulaanbaatar — Premium Spaces — Crafted Interiors — Interior Design — Vivace</span>
      </div>

      {/* ── HORIZONTAL SCROLL — Featured Projects ── */}
      <section class="horizontal-scroll-section">
        <div class="h-scroll-header">
          <div class="h-scroll-header-left">
            <div class="h-scroll-eyebrow" data-i18n="featured.eyebrow">Selected Works</div>
            <h2 class="h-scroll-title">
              <span data-i18n="featured.title.1">Featured</span> <em style="font-style:italic;" data-i18n="featured.title.2">Projects</em>
            </h2>
          </div>
          <span class="h-scroll-count">01 / 07</span>
        </div>
        <div class="h-scroll-track">
          {featured.map((project, i) => {
            const designer = getDesignerById(project.designerId)
            return (
              <a href={`/projects/${project.id}`} class="h-scroll-card" key={project.id}>
                <div class="h-scroll-card-image">
                  <img src={project.coverImage} alt={project.title} loading={i === 0 ? 'eager' : 'lazy'} />
                  <div class="h-scroll-card-overlay"></div>
                  <span class="h-scroll-card-cat">{project.category}</span>
                </div>
                <div class="h-scroll-card-meta">
                  <div class="h-scroll-card-designer">
                    <span data-i18n="panel.designed">Designed by</span> {designer?.name}
                  </div>
                  <div class="h-card-title">{project.title}</div>
                  <p class="h-scroll-card-desc">{project.description}</p>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* ── DESIGNERS ── */}
      <section class="designers-section section">
        <div class="container">
          <div class="section-header">
            <div class="section-title-group">
              <div class="eyebrow reveal" data-i18n="designers.eyebrow">Creative Authorship</div>
              <h2 class="headline-lg reveal reveal-delay-1" data-i18n="designers.headline">Our Designers</h2>
            </div>
            <a href="/designers" class="btn-outline reveal reveal-delay-2">
              <span data-i18n="designers.all">All Designers</span> <span class="btn-arrow"></span>
            </a>
          </div>
          <div class="designers-grid">
            {designers.map((d, i) => {
              const designerProjects = getProjectsByDesigner(d.id)
              return (
                <a href={`/designers/${d.id}`} class={`designer-card reveal reveal-delay-${i + 1}`} key={d.id}>
                  <div class="designer-card-portrait">
                    <img src={d.portrait} alt={d.name} loading="lazy" />
                    <div class="designer-card-overlay"></div>
                    <div class="designer-card-overlay-content">
                      <p>{d.approach}</p>
                    </div>
                  </div>
                  <div class="designer-card-role">{d.role}</div>
                  <div class="designer-card-name">{d.name}</div>
                  <div class="designer-card-specialties">
                    {d.specialties.slice(0, 3).map(s => (
                      <span class="specialty-tag" key={s}>{s}</span>
                    ))}
                  </div>
                  <div class="designer-card-link" data-i18n="designers.portfolio">
                    View Portfolio →
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div class="stats-bar">
        <div class="container">
          <div class="stats-grid">
            {[
              { count: 85, suffix: '+', key: 'stats.projects' },
              { count: 11, suffix: '',  key: 'stats.categories' },
              { count: 3,  suffix: '',  key: 'stats.designers' },
              { count: 7,  suffix: '+', key: 'stats.years' },
            ].map(s => (
              <div class="stat-item reveal" key={s.key}>
                <div class="stat-num" data-count={s.count} data-suffix={s.suffix}>0{s.suffix}</div>
                <div class="stat-label" data-i18n={s.key}>{s.key}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROCESS SECTION ── */}
      <section class="process-section section">
        <div class="container">
          <div class="section-header">
            <div class="section-title-group">
              <div class="eyebrow reveal" data-i18n="process.eyebrow">How We Work</div>
              <h2 class="headline-lg reveal reveal-delay-1" data-i18n="process.headline">Our Design Process</h2>
            </div>
          </div>
          <div class="process-grid">
            <div class="process-steps">
              {[
                { num: '01', titleKey: 'process.01.title', bodyKey: 'process.01.body',
                  title: 'Discovery & Consultation',
                  body: 'We begin with a deep conversation — understanding not just what you need, but how you want to feel inside your space.' },
                { num: '02', titleKey: 'process.02.title', bodyKey: 'process.02.body',
                  title: 'Concept Development',
                  body: 'Our designers develop a considered spatial and material narrative for your project.' },
                { num: '03', titleKey: 'process.03.title', bodyKey: 'process.03.body',
                  title: 'Design Development',
                  body: 'With the concept confirmed, we develop detailed interior drawings, material specifications, furniture selections, and lighting plans.' },
                { num: '04', titleKey: 'process.04.title', bodyKey: 'process.04.body',
                  title: 'Project Execution',
                  body: 'We manage the execution of your interior from contractor coordination and procurement to installation oversight.' },
                { num: '05', titleKey: 'process.05.title', bodyKey: 'process.05.body',
                  title: 'Handover & Refinement',
                  body: 'We remain present through final installation, styling, and handover. Post-project, we are available for any refinements.' },
              ].map((step) => (
                <div class="process-step reveal" key={step.num}>
                  <div class="process-step-header">
                    <span class="process-step-num">{step.num}</span>
                    <span class="process-step-title" data-i18n={step.titleKey}>{step.title}</span>
                    <span class="process-step-icon">+</span>
                  </div>
                  <div class="process-step-body" data-i18n-body={step.bodyKey}>
                    <p data-i18n={step.bodyKey}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div class="process-image">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80"
                alt="Design process"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── INQUIRY SECTION ── */}
      <InquirySection />

      <Footer />
    </>,
    { title: undefined }
  )
})

/* ═══════════════════════════════════════════════════════════
   ALL PROJECTS (with filter)
═══════════════════════════════════════════════════════════ */
app.get('/projects', (c) => {
  return c.render(
    <>
      <Nav />
      <div class="filter-section" style="padding-top: calc(var(--nav-height) + 3rem);">
        <div class="container">
          <div class="filter-header">
            <div class="eyebrow reveal" data-i18n="projects.eyebrow">Our Work</div>
            <h1 class="headline-xl reveal reveal-delay-1" data-i18n="projects.headline">All Projects</h1>
            <p class="body-text reveal reveal-delay-2" style="margin-top: 1rem;" data-i18n="projects.body">
              Explore our portfolio of completed interior projects — from intimate domestic spaces to ambitious commercial environments.
            </p>

            {/* Filter Tabs */}
            <div class="filter-tabs">
              <button class="filter-tab active" data-filter="all" data-i18n="projects.all">All</button>
              {categories.map(cat => (
                <button class="filter-tab" data-filter={cat.slug} key={cat.slug} data-i18n={`cat.${cat.slug}`}>
                  {cat.label}
                </button>
              ))}
            </div>
            <span class="filter-results-count"></span>
          </div>

          <div class="projects-filter-grid">
            {projects.map((project) => {
              const designer = getDesignerById(project.designerId)
              return (
                <a
                  href={`/projects/${project.id}`}
                  class="filter-project-card reveal"
                  data-category={project.categorySlug}
                  key={project.id}
                >
                  <div class="filter-card-image">
                    <img src={project.coverImage} alt={project.title} loading="lazy" />
                  </div>
                  <div class="filter-card-body">
                    <div class="filter-card-category" data-i18n={`cat.${project.categorySlug}`}>{project.category}</div>
                    <div class="filter-card-title">{project.title}</div>
                    <div class="filter-card-designer">
                      <span data-i18n="projects.designed">Designed by</span> {designer?.name}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>,
    { title: 'All Projects' }
  )
})

/* ═══════════════════════════════════════════════════════════
   CATEGORIES PAGE
═══════════════════════════════════════════════════════════ */
app.get('/categories', (c) => {
  return c.render(
    <>
      <Nav />
      <div style="padding-top: calc(var(--nav-height) + 3rem); padding-bottom: 6rem; background: var(--cream);">
        <div class="container">
          <div class="eyebrow reveal" data-i18n="catpage.eyebrow">Browse</div>
          <h1 class="headline-xl reveal reveal-delay-1" style="margin-bottom: 1rem;" data-i18n="catpage.headline">Categories</h1>
          <p class="body-text reveal reveal-delay-2" style="margin-bottom: 4rem;" data-i18n="catpage.body">
            Browse our completed projects by space category. From intimate residences to ambitious commercial environments.
          </p>

          {categories.map((cat, catIndex) => {
            const catProjects = getProjectsByCategory(cat.slug)
            if (!catProjects.length) return null
            return (
              <div id={cat.slug} style="margin-bottom: 6rem; scroll-margin-top: 100px;" key={cat.slug}>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; border-bottom: 1px solid var(--warm-plaster-dark); padding-bottom: 1.2rem; flex-wrap: wrap; gap: 1rem;">
                  <div>
                    <span style="font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--sage-stone); display: block; margin-bottom: 0.3rem; font-family: var(--font-sans);">{String(catIndex + 1).padStart(2, '0')}</span>
                    <h2 style="font-family: var(--font-serif); font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 300; color: var(--deep-olive);" data-i18n={`cat.${cat.slug}`}>
                      {cat.label}
                    </h2>
                  </div>
                  <span style="font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--sage-stone); font-family: var(--font-sans);">
                    {catProjects.length} <span data-i18n="catpage.projects">projects</span>
                  </span>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr)); gap: 1.5rem;">
                  {catProjects.map((project) => {
                    const designer = getDesignerById(project.designerId)
                    return (
                      <a href={`/projects/${project.id}`} class="filter-project-card reveal" key={project.id}>
                        <div class="filter-card-image">
                          <img src={project.coverImage} alt={project.title} loading="lazy" />
                        </div>
                        <div class="filter-card-body">
                          <div class="filter-card-title">{project.title}</div>
                          <div class="filter-card-designer">
                            <span data-i18n="projects.designed">Designed by</span> {designer?.name}
                          </div>
                          {project.year && <div style="font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--warm-plaster-dark); margin-top: 0.3rem;">{project.year} · {project.location}</div>}
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </>,
    { title: 'Categories' }
  )
})

/* ═══════════════════════════════════════════════════════════
   PROJECT DETAIL
═══════════════════════════════════════════════════════════ */
app.get('/projects/:id', (c) => {
  const id = c.req.param('id')
  const project = getProjectById(id)

  if (!project) {
    return c.render(
      <>
        <Nav />
        <div style="min-height: 80vh; display: flex; align-items: center; justify-content: center; background: var(--cream);">
          <div class="container" style="text-align: center;">
            <h1 class="headline-lg" style="margin-bottom: 1rem;" data-i18n="misc.not.found">Project not found</h1>
            <a href="/projects" class="btn-primary" data-i18n="proj.back">Back to Projects</a>
          </div>
        </div>
        <Footer />
      </>,
      { title: 'Not Found' }
    )
  }

  const designer = getDesignerById(project.designerId)
  const related = projects
    .filter(p => p.categorySlug === project.categorySlug && p.id !== project.id)
    .slice(0, 3)

  return c.render(
    <>
      <Nav transparent={true} />
      <div class="project-detail">

        {/* Hero */}
        <div class="project-hero">
          <div class="project-hero-bg">
            <img src={project.coverImage} alt={project.title} />
          </div>
          <div class="project-hero-overlay"></div>
          <div class="project-hero-content container">
            <a href="/projects" class="back-link" style="color: var(--sage-stone);" data-i18n="proj.back">Back to Projects</a>
            <div class="project-hero-category">{project.category}</div>
            <h1 class="project-hero-title">{project.title}</h1>
            <div class="project-hero-designer">
              <span data-i18n="proj.designed.by">Designed by</span> {designer?.name}
            </div>
          </div>
        </div>

        {/* Meta Bar */}
        <div class="project-meta-bar">
          <div class="container">
            <div class="project-meta-list">
              {project.location && (
                <div class="project-meta-pair">
                  <span class="project-meta-key" data-i18n="proj.location">Location</span>
                  <span class="project-meta-val">{project.location}</span>
                </div>
              )}
              {project.year && (
                <div class="project-meta-pair">
                  <span class="project-meta-key" data-i18n="proj.year">Year</span>
                  <span class="project-meta-val">{project.year}</span>
                </div>
              )}
              {project.area && (
                <div class="project-meta-pair">
                  <span class="project-meta-key" data-i18n="proj.area">Area</span>
                  <span class="project-meta-val">{project.area}</span>
                </div>
              )}
              {project.style && (
                <div class="project-meta-pair">
                  <span class="project-meta-key" data-i18n="proj.style">Style</span>
                  <span class="project-meta-val">{project.style}</span>
                </div>
              )}
              <div class="project-meta-pair">
                <span class="project-meta-key" data-i18n="proj.designer">Designer</span>
                <span class="project-meta-val">{designer?.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div class="project-body">
          <div class="container">
            <div class="project-body-grid">
              {/* Sidebar */}
              <div>
                <div class="project-sidebar-label" data-i18n="proj.category">Category</div>
                <div class="project-sidebar-val">{project.category}</div>

                <div class="project-sidebar-label" data-i18n="proj.designer">Designer</div>
                <div class="project-sidebar-val">
                  <a href={`/designers/${project.designerId}`} style="color: var(--heritage-olive);">
                    {designer?.name}
                  </a>
                </div>

                {project.materials && project.materials.length > 0 && (
                  <>
                    <div class="project-sidebar-label" style="margin-top: 1rem;" data-i18n="proj.materials">Materials</div>
                    <div class="materials-list">
                      {project.materials.map(m => (
                        <span class="material-tag" key={m}>{m}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <div class="eyebrow reveal" data-i18n="proj.overview">Project Overview</div>
                <p class="project-description reveal reveal-delay-1">{project.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div class="project-gallery-section">
          <div class="container">
            <div class="project-gallery-grid">
              {project.gallery.map((img, i) => (
                <div class={`gallery-item ${i === 1 ? 'tall' : ''} reveal`} key={i}>
                  <img src={img} alt={`${project.title} — view ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Designer CTA */}
        <div style="background: var(--off-white); padding: 5rem 0; border-top: 1px solid var(--warm-plaster-dark);">
          <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
              <div>
                <div class="eyebrow reveal" data-i18n="desprofile.proj.eye">Designer</div>
                <h3 class="headline-md reveal reveal-delay-1" style="margin-bottom: 1rem;">
                  <span data-i18n="desprofile.proj.by">Designed by</span> {designer?.name}
                </h3>
                <p class="body-text reveal reveal-delay-2">{designer?.bio}</p>
                <a href={`/designers/${project.designerId}`} class="btn-outline reveal reveal-delay-3" style="margin-top: 2rem; display: inline-flex;">
                  <span data-i18n="desprofile.view">View Portfolio</span> <span class="btn-arrow"></span>
                </a>
              </div>
              <div style="height: 360px; overflow: hidden;" class="reveal reveal-delay-2">
                <img src={designer?.portrait} alt={designer?.name} style="width:100%; height:100%; object-fit: cover;" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <div class="related-section">
            <div class="container">
              <div class="eyebrow reveal" data-i18n="proj.similar">Similar Work</div>
              <h3 class="headline-md reveal reveal-delay-1" data-i18n="proj.related">Related Projects</h3>
              <div class="related-grid">
                {related.map((rp) => {
                  const rpDesigner = getDesignerById(rp.designerId)
                  return (
                    <a href={`/projects/${rp.id}`} class="filter-project-card reveal" key={rp.id}>
                      <div class="filter-card-image">
                        <img src={rp.coverImage} alt={rp.title} loading="lazy" />
                      </div>
                      <div class="filter-card-body">
                        <div class="filter-card-category" data-i18n={`cat.${rp.categorySlug}`}>{rp.category}</div>
                        <div class="filter-card-title">{rp.title}</div>
                        <div class="filter-card-designer">
                          <span data-i18n="projects.designed">Designed by</span> {rpDesigner?.name}
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Inquiry CTA */}
        <div style="background: var(--deep-olive); padding: 5rem 0;">
          <div class="container" style="text-align: center;">
            <div class="eyebrow" style="justify-content: center; color: var(--sage-stone);" data-i18n="proj.get.in.touch">Get in Touch</div>
            <h3 class="headline-md" style="color: var(--warm-plaster); margin-bottom: 1rem; margin-top: 0.5rem;" data-i18n="proj.interested">
              Interested in a similar project?
            </h3>
            <p style="font-size: 0.9rem; color: var(--warm-plaster-dark); max-width: 45ch; margin: 0 auto 2.5rem; line-height: 1.7;" data-i18n="proj.inquiry.cta">
              Let's discuss how we can bring a similar level of design thinking to your space.
            </p>
            <a href="/inquiry" class="btn-primary" style="background: var(--warm-plaster); color: var(--deep-olive); border-color: var(--warm-plaster);">
              <span data-i18n="proj.inquiry.btn">Start Inquiry</span> <span class="btn-arrow"></span>
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </>,
    { title: project.title }
  )
})

/* ═══════════════════════════════════════════════════════════
   DESIGNERS LIST
═══════════════════════════════════════════════════════════ */
app.get('/designers', (c) => {
  return c.render(
    <>
      <Nav />
      <div style="padding-top: calc(var(--nav-height) + 3rem); background: var(--off-white);">
        <div class="container" style="padding-bottom: 5rem;">
          <div class="eyebrow reveal" data-i18n="despage.eyebrow">Creative Authors</div>
          <h1 class="headline-xl reveal reveal-delay-1" style="margin-bottom: 1rem;" data-i18n="despage.headline">Our Designers</h1>
          <p class="body-text reveal reveal-delay-2" style="margin-bottom: 5rem;" data-i18n="despage.body">
            Three distinct creative voices. Each designer brings a deeply individual sensibility and an unwavering commitment to design excellence.
          </p>

          <div class="designers-grid">
            {designers.map((d, i) => {
              const dProjects = getProjectsByDesigner(d.id)
              return (
                <a href={`/designers/${d.id}`} class={`designer-card reveal reveal-delay-${i + 1}`} key={d.id}>
                  <div class="designer-card-portrait">
                    <img src={d.portrait} alt={d.name} loading="lazy" />
                    <div class="designer-card-overlay"></div>
                    <div class="designer-card-overlay-content">
                      <p>{d.approach}</p>
                    </div>
                  </div>
                  <div class="designer-card-role">{d.role}</div>
                  <div class="designer-card-name">{d.name}</div>
                  <div class="designer-card-specialties">
                    {d.specialties.map(s => <span class="specialty-tag" key={s}>{s}</span>)}
                  </div>
                  <div style="font-size: 0.65rem; color: var(--sage-stone); letter-spacing: 0.1em; margin-bottom: 0.8rem;">
                    {dProjects.length} <span data-i18n={dProjects.length === 1 ? 'despage.completed' : 'despage.completeds'}>completed projects</span>
                  </div>
                  <div class="designer-card-link" data-i18n="despage.portfolio">View Portfolio →</div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>,
    { title: 'Designers' }
  )
})

/* ═══════════════════════════════════════════════════════════
   DESIGNER PROFILE
═══════════════════════════════════════════════════════════ */
app.get('/designers/:id', (c) => {
  const id = c.req.param('id')
  const designer = getDesignerById(id)

  if (!designer) {
    return c.render(
      <>
        <Nav />
        <div style="min-height:80vh;display:flex;align-items:center;justify-content:center;background:var(--cream);">
          <div class="container" style="text-align:center;">
            <h1 class="headline-lg" style="margin-bottom:1rem;" data-i18n="misc.not.found">Designer not found</h1>
            <a href="/designers" class="btn-primary" data-i18n="desprofile.back">Back to Designers</a>
          </div>
        </div>
        <Footer />
      </>,
      { title: 'Not Found' }
    )
  }

  const dProjects = getProjectsByDesigner(designer.id)

  return c.render(
    <>
      <Nav transparent={true} />
      <div class="designer-profile">

        {/* Hero */}
        <div class="designer-hero">
          <div class="designer-hero-portrait">
            <img src={designer.portrait} alt={designer.name} />
          </div>
          <div class="designer-hero-content">
            <a href="/designers" class="back-link" style="color: var(--sage-stone); margin-bottom: 3rem;" data-i18n="desprofile.back">
              All Designers
            </a>
            <div class="designer-hero-role">{designer.role}</div>
            <div class="designer-hero-name">{designer.name}</div>
            <p class="designer-hero-intro">{designer.bio}</p>
          </div>
        </div>

        {/* Approach */}
        <div class="designer-approach">
          <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 5rem; align-items: start;">
              <div>
                <div class="eyebrow reveal" data-i18n="desprofile.philosophy">Design Philosophy</div>
                <div style="margin-top: 1rem;">
                  {designer.specialties.map(s => (
                    <div style="font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--sage-stone); padding: 0.5rem 0; border-bottom: 1px solid var(--warm-plaster-dark);" key={s}>{s}</div>
                  ))}
                </div>
              </div>
              <div>
                <blockquote class="approach-quote reveal">
                  "{designer.approach}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div style="padding: var(--section-pad) 0; background: var(--cream);">
          <div class="container">
            <div class="section-header">
              <div class="section-title-group">
                <div class="eyebrow reveal" data-i18n="desprofile.selected">Selected Works</div>
                <h2 class="headline-lg reveal reveal-delay-1" data-i18n="desprofile.portfolio">Portfolio</h2>
              </div>
              <span style="font-size: 0.7rem; letter-spacing: 0.15em; color: var(--sage-stone); text-transform: uppercase; font-family: var(--font-sans);">
                {dProjects.length} <span data-i18n="desprofile.projects">Projects</span>
              </span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr)); gap: 2rem; margin-top: 2rem;">
              {dProjects.map((project, i) => (
                <a href={`/projects/${project.id}`} class={`filter-project-card reveal reveal-delay-${(i % 4) + 1}`} key={project.id}>
                  <div class="filter-card-image">
                    <img src={project.coverImage} alt={project.title} loading="lazy" />
                  </div>
                  <div class="filter-card-body">
                    <div class="filter-card-category" data-i18n={`cat.${project.categorySlug}`}>{project.category}</div>
                    <div class="filter-card-title">{project.title}</div>
                    <div style="font-size: 0.62rem; letter-spacing: 0.15em; color: var(--warm-plaster-dark); text-transform: uppercase; margin-top: 0.2rem;">
                      {project.year} · {project.location}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry CTA */}
        <div style="background: var(--warm-plaster); padding: 5rem 0;">
          <div class="container">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2rem;">
              <div>
                <div class="eyebrow reveal" data-i18n="desprofile.cta.eye">Start a Conversation</div>
                <h3 class="headline-md reveal reveal-delay-1" style="margin-top: 0.5rem;">
                  <span data-i18n="desprofile.cta.work">Work with</span> {designer.name}
                </h3>
                <p class="body-text reveal reveal-delay-2" style="margin-top: 0.75rem;" data-i18n="desprofile.cta.req">
                  Request a consultation and begin your design journey together.
                </p>
              </div>
              <a href="/inquiry" class="btn-primary reveal reveal-delay-3">
                <span data-i18n="desprofile.cta.btn">Request Consultation</span> <span class="btn-arrow"></span>
              </a>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>,
    { title: designer.name }
  )
})

/* ═══════════════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════════════ */
app.get('/about', (c) => {
  return c.render(
    <>
      <Nav transparent={true} />
      <div style="min-height: 100vh;">
        {/* Hero */}
        <div style="height: 65svh; min-height: 500px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; background: var(--deep-olive);">
          <div style="position: absolute; inset: 0;">
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80" alt="Vivace Design studio" style="width:100%;height:100%;object-fit:cover;opacity:0.4;" />
          </div>
          <div class="container" style="position: relative; z-index: 1; text-align: center;">
            <div class="eyebrow" style="color: var(--sage-stone); font-size: 0.9rem;" data-i18n="about.eyebrow">Vivace-д тавтай морил</div>
            <h1 class="headline-xl" style="color: var(--warm-plaster); margin-top: 1rem; font-size: clamp(2.5rem, 6vw, 4.5rem);" data-i18n="about.headline">Амьдралыг өөрчлөх гоёмсог орон зайг бүтээх</h1>
          </div>
        </div>

        {/* Content */}
        <div style="padding: var(--section-pad) 0; background: var(--off-white);">
          <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start;">
              <div>
                <div class="eyebrow reveal" data-i18n="about.who.eye">Манай түүх</div>
                <h2 class="headline-md reveal reveal-delay-1" style="margin-bottom: 2rem;" data-i18n="about.who.h2">
                  Алсын хараа ба гар урлал уулзах газар
                </h2>
                <p class="body-text reveal reveal-delay-2" style="margin-bottom: 1.5rem;" data-i18n="about.who.p1">
                  "Вивачи Артэ" ХХК нь үүсгэн байгуулагч Л.Уянга болон Б.Төгөлдөр нарын олон жилийн туршлага, хуримтлуулсан мэдлэг, нэгдмэл үнэ цэнэ, стратегийн зорилгын хүрээнд 2024 онд "Вивачи Артэ" ХХК-ийг байгуулж, интерьер зураг төсөл, гүйцэтгэл, захиалгат тавилга үйлдвэрлэлийн чиглэлээр үйл ажиллагаагаа шинэ шатанд гарган ажиллаж байна.
                </p>
                <p class="body-text reveal reveal-delay-3" style="margin-bottom: 1.5rem;" data-i18n="about.who.p2">
                  Бид оффис, үйлчилгээний талбай, амины орон сууц, ресторан зэрэг төрөл бүрийн орон зайд тохирсон интерьер болон тавилгын шийдлийг зураг төслөөс эхлэн үйлдвэрлэл, угсралт, түлхүүр гардуулах хүртэл логикоор нь хэрэгжүүлж, олон төслийг амжилттай хүлээлгэн өгөөд байна.
                </p>
                <p class="body-text reveal reveal-delay-4" style="margin-bottom: 1.5rem;" data-i18n="about.who.p3">
                  Манай үйлдвэр нь олон улсын чанар стандартад нийцсэн бүрэн автомат тоног төхөөрөмжөөр тоноглогдсон бөгөөд будаг, модон хийц болон бүх төрлийн захиалгат тавилгыг өндөр чанартайгаар үйлдвэрлэх хүчин чадалтай.
                </p>
                <p class="body-text reveal reveal-delay-5" style="margin-bottom: 1.5rem;" data-i18n="about.who.p4">
                  Бид туршлага, ур чадвар, бүтээлч сэтгэлгээ, шинэ санал санаачилгыг эрхэмлэн, салбартаа өрсөлдөх чадвартай, мэргэжлийн багийг бүрдүүлэн ажиллаж байна. Мөн материалын сонголт, төлөвлөлтийн шийдэл бүрд ухаалаг, хариуцлагатай хэрэглээг чухалчилж, орон зай бүрд гоо зүй болон хэрэглээний төгс тэнцвэрийг бий болгохыг зорьдог.
                </p>
                <p class="body-text reveal reveal-delay-6" data-i18n="about.who.p5">
                  Бид харилцагч байгууллагуудтай урт хугацааны түншлэл бий болгож, найдвартай гүйцэтгэл, чанартай бүтээгдэхүүн, нэгдсэн удирдлагатай үйлчилгээний шийдлээр үнэ цэнэ бүтээхийг зорин ажиллаж байна.
                </p>
              </div>
              <div>
                <div style="height: 500px; overflow: hidden;" class="reveal">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="Studio interior" style="width:100%;height:100%;object-fit:cover;" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div style="padding: var(--section-pad) 0; background: var(--cream);">
          <div class="container">
            <div class="eyebrow reveal" data-i18n="about.values.eye">Манай арга барил</div>
            <h2 class="headline-lg reveal reveal-delay-1" style="margin-bottom: 4rem;" data-i18n="about.values.h2">Бидний үнэт зүйлс</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 3rem;">
              {[
                { titleKey: 'about.v1.title', textKey: 'about.v1.text', title: 'Хувь хүний дизайн', text: 'Бид орон зай бүр түүнийг эзэмшигч хүмүүсийн зан чанар, хэрэгцээг тусгах ёстой гэдэгт итгэдэг. Манай дизайнууд танд тохируулагдсан байдаг.' },
                { titleKey: 'about.v2.title', textKey: 'about.v2.text', title: 'Чанар ба гар урлал',  text: 'Бид дэлхийн шилдэг материал болон ур чадвартай урчуудтай хамтарч нарийн зүйл бүрийг төгс гүйцэтгэдэг.' },
                { titleKey: 'about.v3.title', textKey: 'about.v3.text', title: 'Мөнхийн дэгжин байдал',      text: 'Манай дизайнууд трендээс давж, олон жилийн турш загвар, хамаатай хэвээр үлдэх дотоод засал дизайныг бүтээдэг.' },
                { titleKey: 'about.v4.title', textKey: 'about.v4.text', title: 'Хамтын процесс', text: 'Бид агуу дизайн хамтын ажиллагаагаар бий болдог гэдэгт итгэдэг. Таны алсын хараа болон манай туршлага нэгдэж ер бусын үр дүнг бий болгодог.' },
              ].map(v => (
                <div class="reveal" key={v.title}>
                  <div style="width: 2rem; height: 1px; background: var(--heritage-olive); margin-bottom: 1.2rem;"></div>
                  <h3 style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 400; color: var(--deep-olive); margin-bottom: 0.75rem;" data-i18n={v.titleKey}>{v.title}</h3>
                  <p style="font-size: 0.88rem; color: var(--sage-stone); line-height: 1.75; font-weight: 300;" data-i18n={v.textKey}>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <InquirySection />
      </div>
      <Footer />
    </>,
    { title: 'About' }
  )
})

/* ═══════════════════════════════════════════════════════════
   INQUIRY PAGE
═══════════════════════════════════════════════════════════ */
app.get('/inquiry', (c) => {
  return c.render(
    <>
      <Nav />
      <div style="padding-top: calc(var(--nav-height) + 3rem); background: var(--cream);">
        <div class="container" style="padding-bottom: 6rem;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start;">
            <div>
              <div class="eyebrow reveal" data-i18n="inqpage.eyebrow">Get in Touch</div>
              <h1 class="headline-xl reveal reveal-delay-1" style="margin-bottom: 1.5rem;" data-i18n="inqpage.headline">
                Let's discuss your project
              </h1>
              <p class="body-text reveal reveal-delay-2" style="margin-bottom: 3rem;" data-i18n="inqpage.body">
                Whether you have a clear vision or are just beginning to explore the possibilities — we would love to hear about your space.
                Leave your details and we will be in touch within 48 hours.
              </p>
              <div style="margin-top: 2rem;" class="reveal reveal-delay-3">
                <div class="inquiry-detail-item" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                  <span class="inquiry-detail-label" data-i18n="inqpage.lbl.addr">Studio Address</span>
                  <div class="inquiry-detail-value">
                    ХУД 20-р хороо, Мишээл экспо,<br />
                    Little Venice shopping mall,<br />
                    M2 tower 15 давхарт, 1509 тоот
                  </div>
                </div>
                <div class="inquiry-detail-item" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                  <span class="inquiry-detail-label" data-i18n="inqpage.lbl.email">Email</span>
                  <div class="inquiry-detail-value">vivacedesign07@gmail.com</div>
                </div>
                <div class="inquiry-detail-item" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                  <span class="inquiry-detail-label" data-i18n="inqpage.lbl.phone">Phone</span>
                  <div class="inquiry-detail-value">7272 3066 · 9006 3066</div>
                </div>
                <div class="inquiry-detail-item">
                  <span class="inquiry-detail-label" data-i18n="inqpage.lbl.hours">Studio Hours</span>
                  <div class="inquiry-detail-value" data-i18n="inqpage.hours.val">Mon–Fri, 9:00–18:00</div>
                </div>
              </div>
            </div>

            <div class="reveal reveal-delay-2">
              <div class="inquiry-form" style="background: var(--off-white);">
                <div class="form-title" data-i18n="inqpage.form.title">Leave a question</div>
                <p class="form-subtitle" data-i18n="inqpage.form.sub">Tell us about your project and we'll be in touch with design guidance and next steps.</p>
                <form>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="inq-name" data-i18n="inqpage.lbl.name">Full Name *</label>
                      <input type="text" id="inq-name" name="name" class="form-input" data-i18n-ph="inqpage.ph.name" placeholder="Your name" required />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="inq-phone" data-i18n="inqpage.lbl.phone2">Phone Number *</label>
                      <input type="tel" id="inq-phone" name="phone" class="form-input" placeholder="99001234" required />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="inq-email" data-i18n="inqpage.lbl.email2">Email Address *</label>
                    <input type="email" id="inq-email" name="email" class="form-input" placeholder="your@email.com" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="inq-category" data-i18n="inqpage.lbl.cat">Project Category</label>
                    <select id="inq-category" name="category" class="form-select">
                      <option value="" data-i18n="inqpage.ph.cat">Select a category...</option>
                      {categories.map(cat => (
                        <option value={cat.slug} key={cat.slug} data-i18n={`cat.${cat.slug}`}>{cat.label}</option>
                      ))}
                      <option value="multiple" data-i18n="inqpage.opt.multi">Multiple Spaces</option>
                      <option value="other" data-i18n="inqpage.opt.other">Other / Not Sure</option>
                    </select>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="inq-budget" data-i18n="inqpage.lbl.budget">Budget Range</label>
                      <select id="inq-budget" name="budget" class="form-select">
                        <option value="" data-i18n="inqpage.opt.budget0">Prefer not to say</option>
                        <option value="under-10m" data-i18n="inqpage.opt.budget1">Under ₮10 million</option>
                        <option value="10-30m" data-i18n="inqpage.opt.budget2">₮10–30 million</option>
                        <option value="30-80m" data-i18n="inqpage.opt.budget3">₮30–80 million</option>
                        <option value="80m-plus" data-i18n="inqpage.opt.budget4">₮80 million+</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="inq-time" data-i18n="inqpage.lbl.time">Preferred Consultation</label>
                      <select id="inq-time" name="preferred_time" class="form-select">
                        <option value="" data-i18n="inqpage.opt.time0">Any time</option>
                        <option value="morning" data-i18n="inqpage.opt.time1">Morning (9–12)</option>
                        <option value="afternoon" data-i18n="inqpage.opt.time2">Afternoon (12–17)</option>
                        <option value="evening" data-i18n="inqpage.opt.time3">Evening (17–19)</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="inq-message" data-i18n="inqpage.lbl.msg">Your Question or Message *</label>
                    <textarea id="inq-message" name="message" class="form-textarea" data-i18n-ph="inqpage.ph.msg" placeholder="Tell us about your project..." required></textarea>
                  </div>
                  <p class="form-privacy" data-i18n="inqpage.privacy">
                    Your information is kept private and will only be used to respond to your inquiry.
                    We do not share your details with third parties.
                  </p>
                  <div class="form-submit-wrap">
                    <button type="submit" class="btn-primary">
                      <span data-i18n="inqpage.btn.send">Send Inquiry</span> <span class="btn-arrow"></span>
                    </button>
                  </div>
                </form>
                <div class="form-success">
                  <div class="form-success-title" data-i18n="inqpage.success.title">Thank you — message received.</div>
                  <p class="form-success-text" data-i18n="inqpage.success.body">
                    We have received your inquiry and will be in touch within 48 hours.
                    We look forward to learning about your project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>,
    { title: 'Inquiry' }
  )
})

/* ═══════════════════════════════════════════════════════════
   CONTACT PAGE
═══════════════════════════════════════════════════════════ */
app.get('/contact', (c) => {
  return c.render(
    <>
      <Nav />
      <div style="padding-top: calc(var(--nav-height) + 3rem); background: var(--cream); min-height: 80vh;">
        <div class="container" style="padding-bottom: 6rem;">
          <div class="eyebrow reveal" data-i18n="contact.eyebrow">Get in Touch</div>
          <h1 class="headline-xl reveal reveal-delay-1" style="margin-bottom: 4rem;" data-i18n="contact.headline">Contact Us</h1>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;">
            <div>
              <div class="reveal reveal-delay-1" style="margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                <div class="eyebrow" style="margin-bottom: 0.5rem;" data-i18n="contact.lbl.addr">Studio Address</div>
                <div style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: 300; color: var(--deep-olive); line-height: 1.5;">
                  ХУД 20-р хороо, Мишээл экспо,<br />
                  Little Venice shopping mall,<br />
                  M2 tower 15 давхарт, 1509 тоот
                </div>
              </div>
              <div class="reveal reveal-delay-2" style="margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                <div class="eyebrow" style="margin-bottom: 0.5rem;" data-i18n="contact.lbl.email">Email</div>
                <div style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: 300; color: var(--deep-olive); line-height: 1.5;">
                  vivacedesign07@gmail.com
                </div>
              </div>
              <div class="reveal reveal-delay-3" style="margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                <div class="eyebrow" style="margin-bottom: 0.5rem;" data-i18n="contact.lbl.phone">Phone</div>
                <div style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: 300; color: var(--deep-olive); line-height: 1.5;">
                  7272 3066<br />9006 3066
                </div>
              </div>
              <div class="reveal reveal-delay-4" style="margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                <div class="eyebrow" style="margin-bottom: 0.5rem;" data-i18n="contact.lbl.hours">Studio Hours</div>
                <div style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: 300; color: var(--deep-olive); line-height: 1.5; white-space: pre-line;" data-i18n="contact.hours.val">
                  Monday to Friday{'\n'}09:00 — 18:00
                </div>
              </div>
              <a href="/inquiry" class="btn-primary reveal reveal-delay-5" data-i18n="contact.btn">
                Start an Inquiry <span class="btn-arrow"></span>
              </a>
            </div>
            <div class="reveal reveal-delay-2" style="height: 580px; overflow: hidden; background: var(--warm-plaster);">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="Vivace Design studio office"
                style="width:100%;height:100%;object-fit:cover;"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>,
    { title: 'Contact' }
  )
})

/* ═══════════════════════════════════════════════════════════
   API — INQUIRIES
═══════════════════════════════════════════════════════════ */
app.post('/api/inquiries', async (c) => {
  const body = await c.req.json()
  const { name, email, phone, category, budget, preferred_time, message } = body

  if (!name || !email || !phone || !message) {
    return c.json({ error: 'Missing required fields' }, 400)
  }

  // In production, this would save to D1/KV or send via email API
  console.log('New inquiry received:', { name, email, phone, category, message })

  return c.json({
    success: true,
    message: 'Inquiry received. We will contact you within 48 hours.',
  })
})

/* ═══════════════════════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════════════════════ */
export default app
