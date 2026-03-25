/* Navigation component */
export const Nav = ({ transparent = false }: { transparent?: boolean }) => (
  <>
    {/* Desktop Navigation */}
    <nav class={`site-nav ${transparent ? 'transparent hero-nav' : ''}`}>
      <a href="/" class="nav-logo">Vivace Design</a>
      <ul class="nav-links">
        <li><a href="/" data-i18n="nav.home">Home</a></li>
        <li><a href="/projects" data-i18n="nav.projects">Projects</a></li>
        <li><a href="/categories" data-i18n="nav.categories">Categories</a></li>
        <li><a href="/designers" data-i18n="nav.designers">Designers</a></li>
        <li><a href="/about" data-i18n="nav.about">About</a></li>
        <li><a href="/contact" data-i18n="nav.contact">Contact</a></li>
      </ul>
      <div class="nav-right">
        {/* Language toggle — two separate buttons, CSS + JS controls active */}
        <div class="lang-toggle-wrap" aria-label="Select language">
          <button class="lang-btn active" data-lang="en" aria-label="English">EN</button>
          <span class="lang-sep" aria-hidden="true">/</span>
          <button class="lang-btn" data-lang="mn" aria-label="Монгол">МН</button>
        </div>
        <a href="/inquiry" class="nav-inquiry-btn btn-outline" data-i18n="nav.inquiry">Inquiry</a>
      </div>
      <div class="nav-toggle" role="button" aria-label="Menu" tabindex={0}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>

    {/* Mobile Menu */}
    <div class="mobile-menu" role="dialog" aria-modal="true">
      <a href="/" data-i18n="nav.home">Home</a>
      <a href="/projects" data-i18n="nav.projects">Projects</a>
      <a href="/categories" data-i18n="nav.categories">Categories</a>
      <a href="/designers" data-i18n="nav.designers">Designers</a>
      <a href="/about" data-i18n="nav.about">About</a>
      <a href="/contact" data-i18n="nav.contact">Contact</a>
      <a href="/inquiry" data-i18n="nav.inquiry">Inquiry</a>
      {/* Mobile language toggle */}
      <div class="mobile-lang-wrap lang-toggle-wrap">
        <button class="lang-btn mobile-lang-btn active" data-lang="en" aria-label="English">English</button>
        <span class="lang-sep" aria-hidden="true">/</span>
        <button class="lang-btn mobile-lang-btn" data-lang="mn" aria-label="Монгол">Монгол</button>
      </div>
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
          <p class="footer-tagline" data-i18n="footer.tagline">
            Your dream space starts here. Interior design shaped with clarity, warmth, and identity.
          </p>
        </div>

        {/* Navigation */}
        <div class="footer-col">
          <div class="footer-col-title" data-i18n="footer.nav.title">Navigation</div>
          <ul class="footer-links">
            <li><a href="/" data-i18n="footer.nav.home">Home</a></li>
            <li><a href="/projects" data-i18n="footer.nav.projects">All Projects</a></li>
            <li><a href="/categories" data-i18n="footer.nav.cats">Categories</a></li>
            <li><a href="/designers" data-i18n="footer.nav.designers">Designers</a></li>
            <li><a href="/about" data-i18n="footer.nav.about">About</a></li>
            <li><a href="/inquiry" data-i18n="footer.nav.inquiry">Start Inquiry</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div class="footer-col">
          <div class="footer-col-title" data-i18n="footer.cat.title">Categories</div>
          <ul class="footer-links">
            <li><a href="/categories#kitchen" data-i18n="cat.kitchen">Kitchen</a></li>
            <li><a href="/categories#living-room" data-i18n="cat.living-room">Living Room</a></li>
            <li><a href="/categories#master-bedroom" data-i18n="cat.master-bedroom">Master Bedroom</a></li>
            <li><a href="/categories#office" data-i18n="cat.office">Office</a></li>
            <li><a href="/categories#coffee-shop" data-i18n="cat.coffee-shop">Coffee Shop</a></li>
            <li><a href="/categories#dental-clinic" data-i18n="cat.dental-clinic">Dental Clinic</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div class="footer-col">
          <div class="footer-col-title" data-i18n="footer.contact.title">Contact</div>
          <div class="footer-contact-item">
            <span class="footer-contact-label" data-i18n="footer.addr.lbl">Address</span>
            <div class="footer-contact-val">
              ХУД 20-р хороо, Мишээл экспо,<br />
              Little Venice shopping mall,<br />
              M2 tower 15 давхарт, 1509 тоот
            </div>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-label" data-i18n="footer.email.lbl">Email</span>
            <div class="footer-contact-val">vivacedesign07@gmail.com</div>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-label" data-i18n="footer.phone.lbl">Phone</span>
            <div class="footer-contact-val">7272 3066 · 9006 3066</div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright" data-i18n="footer.copy">© 2024 Vivace Design Interior. All rights reserved.</p>
        <div class="footer-legal-links">
          <a href="/privacy" data-i18n="footer.privacy">Privacy</a>
          <a href="/contact" data-i18n="footer.contact.lnk">Contact</a>
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
          <div class="eyebrow reveal" data-i18n="inquiry.eyebrow">Get in Touch</div>
          <h2 class="headline-lg reveal reveal-delay-1" data-i18n="inquiry.headline">Let's create something beautiful together</h2>
          <p class="body-text reveal reveal-delay-2" style="margin-top: 1.5rem;" data-i18n="inquiry.body">
            Whether you have a clear vision or are just beginning to explore — we would love to hear about your space.
          </p>
          <a href="/inquiry" class="btn-primary reveal reveal-delay-3" style="margin-top: 2.5rem; display: inline-flex;">
            <span data-i18n="inquiry.btn">Start an Inquiry</span> <span class="btn-arrow"></span>
          </a>
        </div>
        <div class="inquiry-contact-block reveal reveal-delay-2">
          <div class="inquiry-contact-row">
            <span class="inquiry-contact-label" data-i18n="inquiry.label.email">Email</span>
            <span class="inquiry-contact-val">vivacedesign07@gmail.com</span>
          </div>
          <div class="inquiry-contact-row">
            <span class="inquiry-contact-label" data-i18n="inquiry.label.phone">Phone</span>
            <span class="inquiry-contact-val">7272 3066 · 9006 3066</span>
          </div>
          <div class="inquiry-contact-row">
            <span class="inquiry-contact-label" data-i18n="inquiry.label.hours">Studio Hours</span>
            <span class="inquiry-contact-val" data-i18n="inquiry.hours.val">Mon–Fri, 09:00–18:00</span>
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
          <span class="card-category-badge" data-i18n={`cat.${project.categorySlug}`}>{project.category}</span>
        )}
      </div>
      {isFilter ? (
        <div class="filter-card-body">
          <div class="filter-card-category" data-i18n={`cat.${project.categorySlug}`}>{project.category}</div>
          <div class="filter-card-title">{project.title}</div>
          <div class="filter-card-designer">
            <span data-i18n="card.designed">Designed by</span> {designer?.name}
          </div>
        </div>
      ) : (
        <div class="project-card-meta">
          <div class="project-card-designer">
            <span data-i18n="card.designed">Designed by</span> {designer?.name}
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
