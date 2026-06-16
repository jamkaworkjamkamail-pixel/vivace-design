/* Navigation component */
export const Nav = ({ transparent = false }: { transparent?: boolean }) => (
  <>
    {/* Desktop Navigation */}
    <nav class={`site-nav ${transparent ? 'transparent hero-nav' : ''}`}>
      <a href="/" class="nav-logo">Vivace Design</a>
      <ul class="nav-links">
        <li><a href="/">Нүүр</a></li>
        <li><a href="/projects">Төслүүд</a></li>
        <li><a href="/categories">Ангилал</a></li>
        <li><a href="/designers">Дизайнерууд</a></li>
        <li><a href="/about">Бидний тухай</a></li>
        <li><a href="/contact">Холбоо барих</a></li>
      </ul>
      <div class="nav-right">
        <a href="/inquiry" class="nav-inquiry-btn btn-outline">Холбогдох</a>
      </div>
      <div class="nav-toggle" role="button" aria-label="Menu" tabindex={0}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>

    {/* Mobile Menu */}
    <div class="mobile-menu" role="dialog" aria-modal="true">
      <a href="/">Нүүр</a>
      <a href="/projects">Төслүүд</a>
      <a href="/categories">Ангилал</a>
      <a href="/designers">Дизайнерууд</a>
      <a href="/about">Бидний тухай</a>
      <a href="/contact">Холбоо барих</a>
      <a href="/inquiry">Холбогдох</a>
    </div>
  </>
)

/* Footer component */
export const Footer = () => (
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        {/* Brand */}
        <div class="footer-brand">
          <div class="footer-logo">Vivace Design Interior</div>
          <p class="footer-tagline">
            Таны мөрөөдлийн орон зай эндээс эхэлнэ. Тодорхой байдал, дулаан мэдрэмж, тогтвортой онцлогоор хийгдсэн дотоод дизайн.
          </p>
        </div>

        {/* Navigation */}
        <div class="footer-col">
          <div class="footer-col-title">Цэс</div>
          <ul class="footer-links">
            <li><a href="/">Нүүр</a></li>
            <li><a href="/projects">Бүх төслүүд</a></li>
            <li><a href="/categories">Ангилал</a></li>
            <li><a href="/designers">Дизайнерууд</a></li>
            <li><a href="/about">Бидний тухай</a></li>
            <li><a href="/inquiry">Хүсэлт илгээх</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div class="footer-col">
          <div class="footer-col-title">Ангилал</div>
          <ul class="footer-links">
            <li><a href="/categories#kitchen">Гал тогоо</a></li>
            <li><a href="/categories#living-room">Зочны өрөө</a></li>
            <li><a href="/categories#master-bedroom">Унтлагын өрөө</a></li>
            <li><a href="/categories#office">Оффис</a></li>
            <li><a href="/categories#coffee-shop">Кофе шоп</a></li>
            <li><a href="/categories#dental-clinic">Шүдний клиник</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div class="footer-col">
          <div class="footer-col-title">Холбоо барих</div>
          <div class="footer-contact-item">
            <span class="footer-contact-label">Хаяг</span>
            <div class="footer-contact-val">
              ХУД 20-р хороо, Мишээл экспо,<br />
              Little Venice худалдааны төв,<br />
              M2 tower 15 давхарт, 1509 тоот
            </div>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-label">Имэйл</span>
            <div class="footer-contact-val">vivacedesign07@gmail.com</div>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-label">Утас</span>
            <div class="footer-contact-val">7272 3066 · 9006 3066</div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">© 2024 Vivace Design Interior. Бүх эрх хуулиар хамгаалагдсан.</p>
        <div class="footer-legal-links">
          <a href="/privacy">Нууцлал</a>
          <a href="/contact">Холбоо барих</a>
        </div>
      </div>
    </div>
  </footer>
)

/* Shared Inquiry CTA Section (home/about pages) */
export const InquirySection = () => (
  <section class="inquiry-section section" style="background: var(--off-white);">
    <div class="container">
      <div class="inquiry-grid">
        <div>
          <div class="eyebrow reveal">Холбоо барих</div>
          <h2 class="headline-lg reveal reveal-delay-1">Хамтдаа гайхалтай зүйл бүтээцгээе</h2>
          <p class="body-text reveal reveal-delay-2" style="margin-top: 1.5rem;">
            Тодорхой алсын харааны эзэн ч, эхлэлийн үе дэх ч — та бүхний орон зайн тухай сонсохыг бид хүсэж байна.
          </p>
          <a href="/inquiry" class="btn-primary reveal reveal-delay-3" style="margin-top: 2.5rem; display: inline-flex;">
            <span>Хүсэлт илгээх</span> <span class="btn-arrow"></span>
          </a>
        </div>
        <div class="inquiry-contact-block reveal reveal-delay-2">
          <div class="inquiry-contact-row">
            <span class="inquiry-contact-val">vivacedesign07@gmail.com</span>
          </div>
          <div class="inquiry-contact-row">
            <span class="inquiry-contact-val">7272 3066 · 9006 3066</span>
          </div>
          <div class="inquiry-contact-row">
            <span class="inquiry-contact-val">Даваа–Баасан, 09:00–18:00</span>
          </div>
        </div>
      </div>
    </div>
  </section>
)

/* Project Card component */
export const ProjectCard = ({ project, designer, variant = 'default' }: {
  project: any,
  designer: any,
  variant?: 'default' | 'filter'
}) => {
  const isFilter = variant === 'filter'
  return (
    <a
      href={`/projects/${project.id}`}
      class={isFilter ? 'filter-project-card' : 'project-card'}
      data-category={project.categorySlug}
    >
      <div class={isFilter ? 'filter-card-image' : 'project-card-image'}>
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
        />
        {!isFilter && (
          <span class="card-category-badge">{project.category}</span>
        )}
      </div>
      {isFilter ? (
        <div class="filter-card-body">
          <div class="filter-card-category">{project.category}</div>
          <div class="filter-card-title">{project.title}</div>
          <div class="filter-card-designer">
            Дизайнер: {designer?.name}
          </div>
        </div>
      ) : (
        <div class="project-card-meta">
          <div class="project-card-designer">
            Дизайнер: {designer?.name}
          </div>
          <div class="project-card-title">{project.title}</div>
          <div class="project-card-desc">{project.description}</div>
          <div class="project-card-footer">
            {project.location && <span class="project-meta-item">{project.location}</span>}
            {project.year && <span class="project-meta-item">{project.year}</span>}
            {project.area && <span class="project-meta-item">{project.area}</span>}
          </div>
        </div>
      )}
    </a>
  )
}
