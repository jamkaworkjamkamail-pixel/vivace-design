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
            alt="Vivace Design Interior — тэргүүний дотоод дизайн студи"
            data-parallax="0.12"
          />
        </div>
        <div class="hero-overlay"></div>

        <div class="hero-content container">
          <div class="hero-eyebrow">
            <span>Тэргүүний Интерьер Дизайн Студи</span>
          </div>
          <h1 class="hero-title">
            Таны мөрөөдлийн орон сууц эндээс эхэлнэ
          </h1>
          <p class="hero-subtitle">
            Тодорхой байдал, дулаан мэдрэмж, тогтвортой онцлогоор хийгдсэн дотоод орчинг бид бүтээдэг.
            Бүх орон зай бол гар урлал ба алсын харааны хамтын бүтээл юм.
          </p>
          <div class="hero-actions">
            <a href="/projects" class="btn-primary">
              <span>Төслүүд үзэх</span> <span class="btn-arrow"></span>
            </a>
            <a href="/inquiry" class="btn-outline">Хүсэлт илгээх</a>
          </div>
        </div>

        <div class="hero-scroll-cue">
          <div class="scroll-line"></div>
          <span>Гүйлгэх</span>
        </div>
      </section>

      {/* ── MARQUEE (Noomo-style pausing strip) ── */}
      <div class="noomo-marquee" aria-hidden="true">
        <div class="noomo-marquee-track">
          {[
            'Гал тогоо',
            'Зочны өрөө',
            'Унтлагын өрөө',
            'Оффис',
            'Кофе шоп',
            'Шүдний клиник',
            'Хүүхдийн өрөө',
            'Авто молл',
            'Е-спорт төв',
            'Угаалгын өрөө',
            'Ажлын өрөө',
          ].map((item, i) => (
            <>
              <span class="noomo-marquee-item">{item}</span>
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
                alt="Vivace Design Interior студи"
                loading="lazy"
              />
              <div class="intro-tag">Үүссэн 2024 · Улаанбаатар</div>
            </div>
            <div class="intro-text-wrap">
              <div class="eyebrow reveal">Vivace-д тавтай морил</div>
              <h2 class="intro-statement reveal reveal-delay-1">
                Орон зайг өөрчилж, амьдралыг өргөмжлөх
              </h2>
              <div class="intro-divider reveal reveal-delay-2"></div>
              <p class="body-text reveal reveal-delay-3">
                <strong>Vivace Design Interior</strong> нь Улаанбаатар хотод байрлах дотоод интерьерийн тэргүүлэгч студи юм.
              </p>
              <p class="body-text reveal reveal-delay-3" style="margin-top: 0.75rem;">
                Бид гоо зүй, функциональ байдал болон мөнхийн үнэ цэнийг хослуулсан, тансаг орон зайг бүтээхэд мэргэшсэн.
              </p>
              <p class="body-text reveal reveal-delay-3" style="margin-top: 0.75rem;">
                Тансаг орон сууц, орчин үеийн оффис, тав тухтай кофе шоп, нарийн төлөвлөлт шаардсан шүдний эмнэлэг зэрэг төрөл бүрийн орон зайд бид таны алсын харааг бодит болгож, жижиг деталь бүрд анхаарал хандуулан ажилладаг.
              </p>
              <br />
              <p class="body-text reveal reveal-delay-4">
                Манай гурван дизайнероос бүрдсэн баг нь олон талт туршлага, бүтээлч сэтгэлгээ, мөн таны амьдралын хэв маяг, хүсэл мөрөөдөлд нийцсэн шийдлүүдийг бий болгох хүсэл эрмэлзлээр нэгдсэн.
              </p>
              <p class="body-text reveal reveal-delay-4" style="margin-top: 0.75rem;">
                Бидний хувьд төсөл бүр нь бүтээлч байдал, нарийвчлал, гар урлалын нэгдэл бөгөөд таны олон жилийн турш хайрлах орон зайг хамтдаа бүтээх аялал юм.
              </p>
              <br />
              <a href="/about" class="btn-outline reveal reveal-delay-5" style="margin-top: 1rem; display: inline-flex;">
                <span>Бидний тухай илүү ихийг мэдэх</span> <span class="btn-arrow"></span>
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
                      Дизайнер: {designer?.name}
                    </div>
                    <div class="pinned-panel-meta">
                      {project.location && <span>{project.location}</span>}
                      {project.year && <span>{project.year}</span>}
                      {project.area && <span>{project.area}</span>}
                    </div>
                    <a href={`/projects/${project.id}`} class="btn-primary" style="margin-top: 2rem; display: inline-flex; background: var(--warm-plaster); color: var(--deep-olive); border-color: var(--warm-plaster);">
                      <span>Төсөл үзэх</span> <span class="btn-arrow"></span>
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
                      <button class={`pinned-dot ${di === 0 && i === 0 ? 'active' : ''}`} key={di} aria-label={`Төсөл ${di + 1}`}></button>
                    ))}
                  </div>
                </div>
                <div class="pinned-scroll-hint">Гүйлгэж үзэх</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── AMBIENT STRIP ── */}
      <div class="ambient-strip">
        {[
          { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', label: 'Гал тогоо' },
          { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80', label: 'Унтлагын өрөө' },
          { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80', label: 'Кофе шоп' },
        ].map(item => (
          <div class="ambient-strip-item" key={item.label}>
            <img src={item.src} alt={item.label} loading="lazy" />
            <span class="ambient-strip-item-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── CATEGORIES — Noomo full-screen style ── */}
      <section style="background: var(--deep-olive);">
        <div style="padding: 5rem var(--gutter) 3rem; max-width: var(--max-width); margin: 0 auto;">
          <div class="eyebrow" style="color: var(--sage-stone);">Үзэх</div>
          <h2 class="headline-lg" style="color: var(--warm-plaster); margin-top: 0.5rem;">Төслийн ангилал</h2>
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
                    <div class="category-full-title">{cat.label}</div>
                  </div>
                  <div class="category-full-arrow">Төслүүд үзэх</div>
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
        <span class="h-scroll-text" data-dir="ltr">Дотоод дизайн — Vivace — Улаанбаатар — Тансаг орон зай — Гар урлал — Дотоод дизайн — Vivace</span>
      </div>

      {/* ── HORIZONTAL SCROLL — Featured Projects ── */}
      <section class="horizontal-scroll-section">
        <div class="h-scroll-header">
          <div class="h-scroll-header-left">
            <div class="h-scroll-eyebrow">Сонгосон бүтээлүүд</div>
            <h2 class="h-scroll-title">
              <span>Онцлох</span> <em style="font-style:italic;">Төслүүд</em>
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
                    Дизайнер: {designer?.name}
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
              <div class="eyebrow reveal">Бүтээлч зохиогчид</div>
              <h2 class="headline-lg reveal reveal-delay-1">Манай дизайнерууд</h2>
            </div>
            <a href="/designers" class="btn-outline reveal reveal-delay-2">
              <span>Бүх дизайнерууд</span> <span class="btn-arrow"></span>
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
                  <div class="designer-card-link">
                    Портфолио үзэх →
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
              { count: 85, suffix: '+', label: 'Төсөл' },
              { count: 11, suffix: '',  label: 'Ангилал' },
              { count: 3,  suffix: '',  label: 'Дизайнер' },
              { count: 7,  suffix: '+', label: 'Жил' },
            ].map(s => (
              <div class="stat-item reveal" key={s.label}>
                <div class="stat-num" data-count={s.count} data-suffix={s.suffix}>0{s.suffix}</div>
                <div class="stat-label">{s.label}</div>
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
              <div class="eyebrow reveal">Бидний ажлын арга</div>
              <h2 class="headline-lg reveal reveal-delay-1">Дизайны үйл явц</h2>
            </div>
          </div>
          <div class="process-grid">
            <div class="process-steps">
              {[
                { num: '01',
                  title: 'Судалгаа ба зөвлөгөө',
                  body: 'Бид гүнзгий яриаас эхэлдэг — зөвхөн юу хэрэгтэйг биш, таны орон зайд ямар мэдрэмж төрүүлэхийг ойлгоно.' },
                { num: '02',
                  title: 'Концепц боловсруулах',
                  body: 'Манай дизайнерууд таны төслийн орон зайн болон материалын цогц дүрслэлийг боловсруулна.' },
                { num: '03',
                  title: 'Дизайн хөгжүүлэх',
                  body: 'Концепц баталгаажсаны дараа дотоод зураг, материалын тодорхойлолт, тавилга сонголт, гэрэлтүүлгийн төлөвлөгөөг нарийвчлан боловсруулна.' },
                { num: '04',
                  title: 'Төсөл хэрэгжүүлэх',
                  body: 'Гүйцэтгэгчтэй зохицуулалт, худалдан авалт, угсралтын хяналт зэрэг бүх үе шатыг бид удирдана.' },
                { num: '05',
                  title: 'Хүлээлгэн өгөх ба нарийвчлал',
                  body: 'Эцсийн угсралт, засал чимэглэл, хүлээлгэн өгөх хүртэл бид байна. Төслийн дараа ч дуусгалт өөрчлөлтөд бэлэн байна.' },
              ].map((step) => (
                <div class="process-step reveal" key={step.num}>
                  <div class="process-step-header">
                    <span class="process-step-num">{step.num}</span>
                    <span class="process-step-title">{step.title}</span>
                    <span class="process-step-icon">+</span>
                  </div>
                  <div class="process-step-body">
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div class="process-image">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80"
                alt="Дизайны үйл явц"
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
            <div class="eyebrow reveal">Манай бүтээлүүд</div>
            <h1 class="headline-xl reveal reveal-delay-1">Бүх төслүүд</h1>
            <p class="body-text reveal reveal-delay-2" style="margin-top: 1rem;">
              Гүйцэлдсэн дотоод дизайны бүтээлүүдийн цуглуулгыг үзэх — хувийн орон зайгаас эхлээд томоохон арилжааны орчин хүртэл.
            </p>

            {/* Filter Tabs */}
            <div class="filter-tabs">
              <button class="filter-tab active" data-filter="all">Бүгд</button>
              {categories.map(cat => (
                <button class="filter-tab" data-filter={cat.slug} key={cat.slug}>
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
                    <div class="filter-card-category">{project.category}</div>
                    <div class="filter-card-title">{project.title}</div>
                    <div class="filter-card-designer">
                      Дизайнер: {designer?.name}
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
    { title: 'Бүх төслүүд' }
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
          <div class="eyebrow reveal">Үзэх</div>
          <h1 class="headline-xl reveal reveal-delay-1" style="margin-bottom: 1rem;">Ангилал</h1>
          <p class="body-text reveal reveal-delay-2" style="margin-bottom: 4rem;">
            Гүйцэлдсэн төслүүдийг орон зайн ангиллаар үзэх. Хувийн орон сууцнаас томоохон арилжааны орчин хүртэл.
          </p>

          {categories.map((cat, catIndex) => {
            const catProjects = getProjectsByCategory(cat.slug)
            if (!catProjects.length) return null
            return (
              <div id={cat.slug} style="margin-bottom: 6rem; scroll-margin-top: 100px;" key={cat.slug}>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; border-bottom: 1px solid var(--warm-plaster-dark); padding-bottom: 1.2rem; flex-wrap: wrap; gap: 1rem;">
                  <div>
                    <span style="font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--sage-stone); display: block; margin-bottom: 0.3rem; font-family: var(--font-sans);">{String(catIndex + 1).padStart(2, '0')}</span>
                    <h2 style="font-family: var(--font-serif); font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 300; color: var(--deep-olive);">
                      {cat.label}
                    </h2>
                  </div>
                  <span style="font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--sage-stone); font-family: var(--font-sans);">
                    {catProjects.length} төсөл
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
                            Дизайнер: {designer?.name}
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
    { title: 'Ангилал' }
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
            <h1 class="headline-lg" style="margin-bottom: 1rem;">Төсөл олдсонгүй</h1>
            <a href="/projects" class="btn-primary">Төслүүд рүү буцах</a>
          </div>
        </div>
        <Footer />
      </>,
      { title: 'Олдсонгүй' }
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
            <a href="/projects" class="back-link" style="color: var(--sage-stone);">Төслүүд рүү буцах</a>
            <div class="project-hero-category">{project.category}</div>
            <h1 class="project-hero-title">{project.title}</h1>
            <div class="project-hero-designer">
              Дизайнер: {designer?.name}
            </div>
          </div>
        </div>

        {/* Meta Bar */}
        <div class="project-meta-bar">
          <div class="container">
            <div class="project-meta-list">
              {project.location && (
                <div class="project-meta-pair">
                  <span class="project-meta-key">Байршил</span>
                  <span class="project-meta-val">{project.location}</span>
                </div>
              )}
              {project.year && (
                <div class="project-meta-pair">
                  <span class="project-meta-key">Он</span>
                  <span class="project-meta-val">{project.year}</span>
                </div>
              )}
              {project.area && (
                <div class="project-meta-pair">
                  <span class="project-meta-key">Талбай</span>
                  <span class="project-meta-val">{project.area}</span>
                </div>
              )}
              {project.style && (
                <div class="project-meta-pair">
                  <span class="project-meta-key">Хэв маяг</span>
                  <span class="project-meta-val">{project.style}</span>
                </div>
              )}
              <div class="project-meta-pair">
                <span class="project-meta-key">Дизайнер</span>
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
                <div class="project-sidebar-label">Ангилал</div>
                <div class="project-sidebar-val">{project.category}</div>

                <div class="project-sidebar-label">Дизайнер</div>
                <div class="project-sidebar-val">
                  <a href={`/designers/${project.designerId}`} style="color: var(--heritage-olive);">
                    {designer?.name}
                  </a>
                </div>

                {project.materials && project.materials.length > 0 && (
                  <>
                    <div class="project-sidebar-label" style="margin-top: 1rem;">Материал</div>
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
                <div class="eyebrow reveal">Төслийн тойм</div>
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
                  <img src={img} alt={`${project.title} — ${i + 1}-р харагдац`} loading="lazy" />
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
                <div class="eyebrow reveal">Дизайнер</div>
                <h3 class="headline-md reveal reveal-delay-1" style="margin-bottom: 1rem;">
                  Дизайнер: {designer?.name}
                </h3>
                <p class="body-text reveal reveal-delay-2">{designer?.bio}</p>
                <a href={`/designers/${project.designerId}`} class="btn-outline reveal reveal-delay-3" style="margin-top: 2rem; display: inline-flex;">
                  <span>Портфолио үзэх</span> <span class="btn-arrow"></span>
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
              <div class="eyebrow reveal">Төстэй бүтээлүүд</div>
              <h3 class="headline-md reveal reveal-delay-1">Холбогдох төслүүд</h3>
              <div class="related-grid">
                {related.map((rp) => {
                  const rpDesigner = getDesignerById(rp.designerId)
                  return (
                    <a href={`/projects/${rp.id}`} class="filter-project-card reveal" key={rp.id}>
                      <div class="filter-card-image">
                        <img src={rp.coverImage} alt={rp.title} loading="lazy" />
                      </div>
                      <div class="filter-card-body">
                        <div class="filter-card-category">{rp.category}</div>
                        <div class="filter-card-title">{rp.title}</div>
                        <div class="filter-card-designer">
                          Дизайнер: {rpDesigner?.name}
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
            <div class="eyebrow" style="justify-content: center; color: var(--sage-stone);">Холбоо барих</div>
            <h3 class="headline-md" style="color: var(--warm-plaster); margin-bottom: 1rem; margin-top: 0.5rem;">
              Ижил төстэй төсөлд сонирхолтой байна уу?
            </h3>
            <p style="font-size: 0.9rem; color: var(--warm-plaster-dark); max-width: 45ch; margin: 0 auto 2.5rem; line-height: 1.7;">
              Таны орон зайд ижил дизайны сэтгэлгээг хэрхэн авчрах талаар хамтдаа ярилцъя.
            </p>
            <a href="/inquiry" class="btn-primary" style="background: var(--warm-plaster); color: var(--deep-olive); border-color: var(--warm-plaster);">
              <span>Хүсэлт илгээх</span> <span class="btn-arrow"></span>
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
          <div class="eyebrow reveal">Бүтээлч зохиогчид</div>
          <h1 class="headline-xl reveal reveal-delay-1" style="margin-bottom: 1rem;">Манай дизайнерууд</h1>
          <p class="body-text reveal reveal-delay-2" style="margin-bottom: 5rem;">
            Гурван өвөрмөц бүтээлч дуу хоолой. Дизайн дээд зэргийн гүйцэтгэлд тутам хувь хүний мэдрэмж, урлагийн хэл дүүрэн баг.
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
                    {dProjects.length} гүйцэлдсэн төсөл
                  </div>
                  <div class="designer-card-link">Портфолио үзэх →</div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>,
    { title: 'Дизайнерууд' }
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
            <h1 class="headline-lg" style="margin-bottom:1rem;">Дизайнер олдсонгүй</h1>
            <a href="/designers" class="btn-primary">Дизайнерууд рүү буцах</a>
          </div>
        </div>
        <Footer />
      </>,
      { title: 'Олдсонгүй' }
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
            <a href="/designers" class="back-link" style="color: var(--sage-stone); margin-bottom: 3rem;">
              Бүх дизайнерууд
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
                <div class="eyebrow reveal">Дизайны философи</div>
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
                <div class="eyebrow reveal">Сонгосон бүтээлүүд</div>
                <h2 class="headline-lg reveal reveal-delay-1">Портфолио</h2>
              </div>
              <span style="font-size: 0.7rem; letter-spacing: 0.15em; color: var(--sage-stone); text-transform: uppercase; font-family: var(--font-sans);">
                {dProjects.length} төсөл
              </span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr)); gap: 2rem; margin-top: 2rem;">
              {dProjects.map((project, i) => (
                <a href={`/projects/${project.id}`} class={`filter-project-card reveal reveal-delay-${(i % 4) + 1}`} key={project.id}>
                  <div class="filter-card-image">
                    <img src={project.coverImage} alt={project.title} loading="lazy" />
                  </div>
                  <div class="filter-card-body">
                    <div class="filter-card-category">{project.category}</div>
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
                <div class="eyebrow reveal">Яриа эхлүүлэх</div>
                <h3 class="headline-md reveal reveal-delay-1" style="margin-top: 0.5rem;">
                  {designer.name}-тай хамтран ажиллах
                </h3>
                <p class="body-text reveal reveal-delay-2" style="margin-top: 0.75rem;">
                  Зөвлөгөө авахаар хүсэлт илгээж, дизайны аяллаа хамтдаа эхлүүлэх.
                </p>
              </div>
              <a href="/inquiry" class="btn-primary reveal reveal-delay-3">
                <span>Зөвлөгөө хүсэх</span> <span class="btn-arrow"></span>
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
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80" alt="Vivace Design студи" style="width:100%;height:100%;object-fit:cover;opacity:0.4;" />
          </div>
          <div class="container" style="position: relative; z-index: 1; text-align: center;">
            <div class="eyebrow" style="color: var(--sage-stone); font-size: 0.9rem;">Vivace-д тавтай морил</div>
            <h1 class="headline-xl" style="color: var(--warm-plaster); margin-top: 1rem; font-size: clamp(2.5rem, 6vw, 4.5rem);">Амьдралыг өөрчлөх гоёмсог орон зайг бүтээх</h1>
          </div>
        </div>

        {/* Content */}
        <div style="padding: var(--section-pad) 0; background: var(--off-white);">
          <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start;">
              <div>
                <div class="eyebrow reveal">Манай түүх</div>
                <h2 class="headline-md reveal reveal-delay-1" style="margin-bottom: 2rem;">
                  Алсын хараа ба гар урлал уулзах газар
                </h2>
                <p class="body-text reveal reveal-delay-2" style="margin-bottom: 1.5rem;">
                  "Вивачи Артэ" ХХК нь үүсгэн байгуулагч Л.Уянга болон Б.Төгөлдөр нарын олон жилийн туршлага, хуримтлуулсан мэдлэг, нэгдмэл үнэ цэнэ, стратегийн зорилгын хүрээнд 2024 онд "Вивачи Артэ" ХХК-ийг байгуулж, интерьер зураг төсөл, гүйцэтгэл, захиалгат тавилга үйлдвэрлэлийн чиглэлээр үйл ажиллагаагаа шинэ шатанд гарган ажиллаж байна.
                </p>
                <p class="body-text reveal reveal-delay-3" style="margin-bottom: 1.5rem;">
                  Бид оффис, үйлчилгээний талбай, амины орон сууц, ресторан зэрэг төрөл бүрийн орон зайд тохирсон интерьер болон тавилгын шийдлийг зураг төслөөс эхлэн үйлдвэрлэл, угсралт, түлхүүр гардуулах хүртэл логикоор нь хэрэгжүүлж, олон төслийг амжилттай хүлээлгэн өгөөд байна.
                </p>
                <p class="body-text reveal reveal-delay-4" style="margin-bottom: 1.5rem;">
                  Манай үйлдвэр нь олон улсын чанар стандартад нийцсэн бүрэн автомат тоног төхөөрөмжөөр тоноглогдсон бөгөөд будаг, модон хийц болон бүх төрлийн захиалгат тавилгыг өндөр чанартайгаар үйлдвэрлэх хүчин чадалтай.
                </p>
                <p class="body-text reveal reveal-delay-5" style="margin-bottom: 1.5rem;">
                  Бид туршлага, ур чадвар, бүтээлч сэтгэлгээ, шинэ санал санаачилгыг эрхэмлэн, салбартаа өрсөлдөх чадвартай, мэргэжлийн багийг бүрдүүлэн ажиллаж байна. Мөн материалын сонголт, төлөвлөлтийн шийдэл бүрд ухаалаг, хариуцлагатай хэрэглээг чухалчилж, орон зай бүрд гоо зүй болон хэрэглээний төгс тэнцвэрийг бий болгохыг зорьдог.
                </p>
                <p class="body-text reveal reveal-delay-6">
                  Бид харилцагч байгууллагуудтай урт хугацааны түншлэл бий болгож, найдвартай гүйцэтгэл, чанартай бүтээгдэхүүн, нэгдсэн удирдлагатай үйлчилгээний шийдлээр үнэ цэнэ бүтээхийг зорин ажиллаж байна.
                </p>
              </div>
              <div>
                <div style="height: 500px; overflow: hidden;" class="reveal">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="Студийн дотоод орчин" style="width:100%;height:100%;object-fit:cover;" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div style="padding: var(--section-pad) 0; background: var(--cream);">
          <div class="container">
            <div class="eyebrow reveal">Манай арга барил</div>
            <h2 class="headline-lg reveal reveal-delay-1" style="margin-bottom: 4rem;">Бидний үнэт зүйлс</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 3rem;">
              {[
                { title: 'Хувь хүний дизайн', text: 'Бид орон зай бүр түүнийг эзэмшигч хүмүүсийн зан чанар, хэрэгцээг тусгах ёстой гэдэгт итгэдэг. Манай дизайнууд танд тохируулагдсан байдаг.' },
                { title: 'Чанар ба гар урлал', text: 'Бид дэлхийн шилдэг материал болон ур чадвартай урчуудтай хамтарч нарийн зүйл бүрийг төгс гүйцэтгэдэг.' },
                { title: 'Мөнхийн дэгжин байдал', text: 'Манай дизайнууд трендээс давж, олон жилийн турш загвар, хамаатай хэвээр үлдэх дотоод засал дизайныг бүтээдэг.' },
                { title: 'Хамтын процесс', text: 'Бид агуу дизайн хамтын ажиллагаагаар бий болдог гэдэгт итгэдэг. Таны алсын хараа болон манай туршлага нэгдэж ер бусын үр дүнг бий болгодог.' },
              ].map(v => (
                <div class="reveal" key={v.title}>
                  <div style="width: 2rem; height: 1px; background: var(--heritage-olive); margin-bottom: 1.2rem;"></div>
                  <h3 style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 400; color: var(--deep-olive); margin-bottom: 0.75rem;">{v.title}</h3>
                  <p style="font-size: 0.88rem; color: var(--sage-stone); line-height: 1.75; font-weight: 300;">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <InquirySection />
      </div>
      <Footer />
    </>,
    { title: 'Бидний тухай' }
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
              <div class="eyebrow reveal">Холбоо барих</div>
              <h1 class="headline-xl reveal reveal-delay-1" style="margin-bottom: 1.5rem;">
                Төслөө хамтдаа ярилцъя
              </h1>
              <p class="body-text reveal reveal-delay-2" style="margin-bottom: 3rem;">
                Тодорхой алсын харааны эзэн ч, боломжуудыг судлаж буй ч — та бүхний орон зайн тухай сонсохыг бид хүсэж байна.
                Мэдээллээ үлдээгээрэй, 48 цагийн дотор холбогдоно.
              </p>
              <div style="margin-top: 2rem;" class="reveal reveal-delay-3">
                <div class="inquiry-detail-item" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                  <span class="inquiry-detail-label">Студийн хаяг</span>
                  <div class="inquiry-detail-value">
                    ХУД 20-р хороо, Мишээл экспо,<br />
                    Little Venice shopping mall,<br />
                    M2 tower 15 давхарт, 1509 тоот
                  </div>
                </div>
                <div class="inquiry-detail-item" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                  <span class="inquiry-detail-label">Имэйл</span>
                  <div class="inquiry-detail-value">vivacedesign07@gmail.com</div>
                </div>
                <div class="inquiry-detail-item" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                  <span class="inquiry-detail-label">Утас</span>
                  <div class="inquiry-detail-value">7272 3066 · 9006 3066</div>
                </div>
                <div class="inquiry-detail-item">
                  <span class="inquiry-detail-label">Студийн цагийн хуваарь</span>
                  <div class="inquiry-detail-value">Даваа–Баасан, 09:00–18:00</div>
                </div>
              </div>
            </div>

            <div class="reveal reveal-delay-2">
              <div class="inquiry-form" style="background: var(--off-white);">
                <div class="form-title">Асуулт үлдээх</div>
                <p class="form-subtitle">Төслийнхөө талаар бидэнд хэлээрэй, дизайны чиглүүлэг болон дараагийн алхмуудаар холбогдоно.</p>
                <form>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="inq-name">Бүтэн нэр *</label>
                      <input type="text" id="inq-name" name="name" class="form-input" placeholder="Таны нэр" required />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="inq-phone">Утасны дугаар *</label>
                      <input type="tel" id="inq-phone" name="phone" class="form-input" placeholder="99001234" required />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="inq-email">Имэйл хаяг *</label>
                    <input type="email" id="inq-email" name="email" class="form-input" placeholder="your@email.com" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="inq-category">Төслийн ангилал</label>
                    <select id="inq-category" name="category" class="form-select">
                      <option value="">Ангилал сонгох...</option>
                      {categories.map(cat => (
                        <option value={cat.slug} key={cat.slug}>{cat.label}</option>
                      ))}
                      <option value="multiple">Олон орон зай</option>
                      <option value="other">Бусад / Тодорхойгүй</option>
                    </select>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="inq-budget">Төсөвийн хэмжээ</label>
                      <select id="inq-budget" name="budget" class="form-select">
                        <option value="">Хэлэхгүй байх</option>
                        <option value="under-10m">10 сая ₮-с доош</option>
                        <option value="10-30m">10–30 сая ₮</option>
                        <option value="30-80m">30–80 сая ₮</option>
                        <option value="80m-plus">80 сая ₮-с дээш</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="inq-time">Зөвлөгөөний цаг</label>
                      <select id="inq-time" name="preferred_time" class="form-select">
                        <option value="">Дурын цагт</option>
                        <option value="morning">Өглөө (9–12)</option>
                        <option value="afternoon">Өдөр (12–17)</option>
                        <option value="evening">Орой (17–19)</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="inq-message">Таны асуулт эсвэл мессеж *</label>
                    <textarea id="inq-message" name="message" class="form-textarea" placeholder="Төслийнхөө талаар бидэнд хэлээрэй..." required></textarea>
                  </div>
                  <p class="form-privacy">
                    Таны мэдээлэл нууцлагдах бөгөөд зөвхөн таны хүсэлтэд хариу өгөхөд ашиглагдана.
                    Бид таны мэдээллийг гуравдагч этгээдэд дамжуулахгүй.
                  </p>
                  <div class="form-submit-wrap">
                    <button type="submit" class="btn-primary">
                      <span>Хүсэлт илгээх</span> <span class="btn-arrow"></span>
                    </button>
                  </div>
                </form>
                <div class="form-success">
                  <div class="form-success-title">Баярлалаа — мессеж хүлээн авлаа.</div>
                  <p class="form-success-text">
                    Таны хүсэлтийг хүлээн авсан бөгөөд 48 цагийн дотор холбогдоно.
                    Таны төслийн талаар сонсохыг тэсэн ядан хүлээж байна.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>,
    { title: 'Хүсэлт' }
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
          <div class="eyebrow reveal">Холбоо барих</div>
          <h1 class="headline-xl reveal reveal-delay-1" style="margin-bottom: 4rem;">Бидэнтэй холбогдох</h1>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;">
            <div>
              <div class="reveal reveal-delay-1" style="margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                <div class="eyebrow" style="margin-bottom: 0.5rem;">Студийн хаяг</div>
                <div style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: 300; color: var(--deep-olive); line-height: 1.5;">
                  ХУД 20-р хороо, Мишээл экспо,<br />
                  Little Venice shopping mall,<br />
                  M2 tower 15 давхарт, 1509 тоот
                </div>
              </div>
              <div class="reveal reveal-delay-2" style="margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                <div class="eyebrow" style="margin-bottom: 0.5rem;">Имэйл</div>
                <div style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: 300; color: var(--deep-olive); line-height: 1.5;">
                  vivacedesign07@gmail.com
                </div>
              </div>
              <div class="reveal reveal-delay-3" style="margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                <div class="eyebrow" style="margin-bottom: 0.5rem;">Утас</div>
                <div style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: 300; color: var(--deep-olive); line-height: 1.5;">
                  7272 3066<br />9006 3066
                </div>
              </div>
              <div class="reveal reveal-delay-4" style="margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid var(--warm-plaster-dark);">
                <div class="eyebrow" style="margin-bottom: 0.5rem;">Студийн цагийн хуваарь</div>
                <div style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: 300; color: var(--deep-olive); line-height: 1.5;">
                  Даваа — Баасан<br />09:00 — 18:00
                </div>
              </div>
              <a href="/inquiry" class="btn-primary reveal reveal-delay-5">
                Хүсэлт илгээх <span class="btn-arrow"></span>
              </a>
            </div>
            <div class="reveal reveal-delay-2" style="height: 580px; overflow: hidden; background: var(--warm-plaster);">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="Vivace Design студийн оффис"
                style="width:100%;height:100%;object-fit:cover;"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>,
    { title: 'Холбоо барих' }
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
