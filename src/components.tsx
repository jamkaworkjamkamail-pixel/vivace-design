/* Navigation component */
export const Nav = ({ transparent = false }: { transparent?: boolean }) => (
  <>
    {/* Desktop Navigation */}
    <nav class={`site-nav ${transparent ? 'transparent hero-nav' : ''}`}>
      <a href="/" class="nav-logo">Vivace Design</a>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/categories">Categories</a></li>
        <li><a href="/designers">Designers</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <a href="/inquiry" class="nav-inquiry-btn btn-outline">Inquiry</a>
      <div class="nav-toggle" role="button" aria-label="Menu" tabindex={0}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>

    {/* Mobile Menu */}
    <div class="mobile-menu" role="dialog" aria-modal="true">
      <a href="/">Home</a>
      <a href="/projects">Projects</a>
      <a href="/categories">Categories</a>
      <a href="/designers">Designers</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/inquiry">Inquiry</a>
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
          <p class="footer-tagline">Spaces designed to live beautifully. Interior design shaped with clarity, warmth, and identity.</p>
        </div>

        {/* Navigation */}
        <div class="footer-col">
          <div class="footer-col-title">Navigation</div>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/projects">All Projects</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/designers">Designers</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/inquiry">Start Inquiry</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div class="footer-col">
          <div class="footer-col-title">Categories</div>
          <ul class="footer-links">
            <li><a href="/categories#kitchen">Kitchen</a></li>
            <li><a href="/categories#living-room">Living Room</a></li>
            <li><a href="/categories#master-bedroom">Bedroom</a></li>
            <li><a href="/categories#office">Office</a></li>
            <li><a href="/categories#coffee-shop">Coffee Shop</a></li>
            <li><a href="/categories#dental-clinic">Dental Clinic</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div class="footer-col">
          <div class="footer-col-title">Contact</div>
          <div class="footer-contact-item">
            <span class="footer-contact-label">Address</span>
            <div class="footer-contact-val">
              ХУД 20-р хороо, Мишээл экспо,<br />
              Little Venice shopping mall,<br />
              M2 tower 15 давхарт, 1509 тоот
            </div>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-label">Email</span>
            <div class="footer-contact-val">vivacedesign07@gmail.com</div>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-label">Phone</span>
            <div class="footer-contact-val">7272 3066 · 9006 3066</div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">© 2024 Vivace Design Interior. All rights reserved.</p>
        <div class="footer-legal-links">
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </div>
  </footer>
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
          <div class="filter-card-designer">Designed by {designer?.name}</div>
        </div>
      ) : (
        <div class="project-card-meta">
          <div class="project-card-designer">Designed by {designer?.name}</div>
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
