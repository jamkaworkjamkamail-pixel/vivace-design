/* Navigation component */
export const Nav = ({ transparent = false }: { transparent?: boolean }) => (
  <>
    {/* Desktop Navigation */}
    <nav class={`site-nav ${transparent ? 'transparent hero-nav' : ''}`}>
      <a href="/" class="nav-logo">Vivace Design</a>
      <ul class="nav-links">
        <li><a href="/" data-en="Home" data-mn="Нүүр хуудас">Home</a></li>
        <li><a href="/projects" data-en="Projects" data-mn="Төсөл">Projects</a></li>
        <li><a href="/categories" data-en="Categories" data-mn="Ангилал">Categories</a></li>
        <li><a href="/designers" data-en="Designers" data-mn="Дизайнеруud">Designers</a></li>
        <li><a href="/about" data-en="About" data-mn="Бидний тухай">About</a></li>
        <li><a href="/contact" data-en="Contact" data-mn="Холбоо барих">Contact</a></li>
      </ul>
      <div class="nav-right">
        <button class="lang-toggle" id="lang-toggle" aria-label="Switch language" title="Хэл солих / Switch language">
          <span class="lang-en">EN</span>
          <span class="lang-divider">/</span>
          <span class="lang-mn">МН</span>
        </button>
        <a href="/inquiry" class="nav-inquiry-btn btn-outline" data-en="Inquiry" data-mn="Лавлага">Inquiry</a>
      </div>
      <div class="nav-toggle" role="button" aria-label="Menu" tabindex={0}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>

    {/* Mobile Menu */}
    <div class="mobile-menu" role="dialog" aria-modal="true">
      <a href="/" data-en="Home" data-mn="Нүүр хуудас">Home</a>
      <a href="/projects" data-en="Projects" data-mn="Төсөл">Projects</a>
      <a href="/categories" data-en="Categories" data-mn="Ангилал">Categories</a>
      <a href="/designers" data-en="Designers" data-mn="Дизайнеруud">Designers</a>
      <a href="/about" data-en="About" data-mn="Бидний тухай">About</a>
      <a href="/contact" data-en="Contact" data-mn="Холбоо барих">Contact</a>
      <a href="/inquiry" data-en="Inquiry" data-mn="Лавлага">Inquiry</a>
      <button class="mobile-lang-toggle" id="mobile-lang-toggle" aria-label="Switch language">
        <span class="lang-en">English</span>
        <span> / </span>
        <span class="lang-mn">Монгол</span>
      </button>
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
          <p class="footer-tagline" data-en="Your dream space starts here. Interior design shaped with clarity, warmth, and identity." data-mn="Таны мөрөөдлийн орон зай эндээс эхэлнэ. Дизайн — тодорхой байдал, дулаан мэдрэмж, онцлогоор хийгдсэн.">
            Your dream space starts here. Interior design shaped with clarity, warmth, and identity.
          </p>
        </div>

        {/* Navigation */}
        <div class="footer-col">
          <div class="footer-col-title" data-en="Navigation" data-mn="Цэсиг">Navigation</div>
          <ul class="footer-links">
            <li><a href="/" data-en="Home" data-mn="Нүүр хуудас">Home</a></li>
            <li><a href="/projects" data-en="All Projects" data-mn="Бүх төсөл">All Projects</a></li>
            <li><a href="/categories" data-en="Categories" data-mn="Ангилал">Categories</a></li>
            <li><a href="/designers" data-en="Designers" data-mn="Дизайнеруud">Designers</a></li>
            <li><a href="/about" data-en="About" data-mn="Бидний тухай">About</a></li>
            <li><a href="/inquiry" data-en="Start Inquiry" data-mn="Лавлага илгээх">Start Inquiry</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div class="footer-col">
          <div class="footer-col-title" data-en="Categories" data-mn="Ангилал">Categories</div>
          <ul class="footer-links">
            <li><a href="/categories#kitchen" data-en="Kitchen" data-mn="Гал тогоо">Kitchen</a></li>
            <li><a href="/categories#living-room" data-en="Living Room" data-mn="Зочны өрөө">Living Room</a></li>
            <li><a href="/categories#master-bedroom" data-en="Bedroom" data-mn="Унтлагын өрөө">Bedroom</a></li>
            <li><a href="/categories#office" data-en="Office" data-mn="Оффис">Office</a></li>
            <li><a href="/categories#coffee-shop" data-en="Coffee Shop" data-mn="Кофе шоп">Coffee Shop</a></li>
            <li><a href="/categories#dental-clinic" data-en="Dental Clinic" data-mn="Шүдний клиник">Dental Clinic</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div class="footer-col">
          <div class="footer-col-title" data-en="Contact" data-mn="Холбоо барих">Contact</div>
          <div class="footer-contact-item">
            <span class="footer-contact-label" data-en="Address" data-mn="Хаяг">Address</span>
            <div class="footer-contact-val">
              ХУД 20-р хороо, Мишээл экспо,<br />
              Little Venice shopping mall,<br />
              M2 tower 15 давхарт, 1509 тоот
            </div>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-label" data-en="Email" data-mn="Имэйл">Email</span>
            <div class="footer-contact-val">vivacedesign07@gmail.com</div>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-label" data-en="Phone" data-mn="Утас">Phone</span>
            <div class="footer-contact-val">7272 3066 · 9006 3066</div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright" data-en="© 2024 Vivace Design Interior. All rights reserved." data-mn="© 2024 Vivace Design Interior. Бүх эрх хамгаалагдсан.">© 2024 Vivace Design Interior. All rights reserved.</p>
        <div class="footer-legal-links">
          <a href="/privacy" data-en="Privacy" data-mn="Нууцлал">Privacy</a>
          <a href="/contact" data-en="Contact" data-mn="Холбоо барих">Contact</a>
        </div>
      </div>
    </div>
  </footer>
)

/* Full Inquiry Form Section (used on inquiry page standalone, NOT exported as InquirySection) */
const InquiryFormSection = ({ categories }: { categories?: any[] }) => (
  <section class="inquiry-section section">
    <div class="container">
      <div class="inquiry-grid">
        <div class="inquiry-text">
          <div class="eyebrow reveal" data-en="Leave a Question" data-mn="Асуулт үлдээх">Leave a Question</div>
          <h2 class="headline-lg reveal reveal-delay-1" data-en="Let's discuss your interior project" data-mn="Таны дотоод засалын төслийг хэлэлцье">Let's discuss your interior project</h2>
          <p class="body-text reveal reveal-delay-2" data-en="We welcome inquiries from clients who are ready to invest in a genuinely considered interior. Share your project details and we'll respond with design guidance and next steps." data-mn="Бодит байдлаар зохион бүтээгдсэн дотоод засалд хөрөнгө оруулахад бэлэн үйлчлүүлэгчдийн лавлагааг хүлээн авч байна. Төслийн мэдээллийг хуваалцаасанаар дизайны удирдамж болон дараагийн алхмуудаар хариулна.">
            We welcome inquiries from clients who are ready to invest in a genuinely considered interior. Share your project details and we'll respond with design guidance and next steps.
          </p>
          <div class="inquiry-details reveal reveal-delay-3">
            <div class="inquiry-detail-item">
              <span class="inquiry-detail-label" data-en="Email" data-mn="Имэйл">Email</span>
              <span class="inquiry-detail-value">vivacedesign07@gmail.com</span>
            </div>
            <div class="inquiry-detail-item">
              <span class="inquiry-detail-label" data-en="Phone" data-mn="Утас">Phone</span>
              <span class="inquiry-detail-value">7272 3066 · 9006 3066</span>
            </div>
            <div class="inquiry-detail-item">
              <span class="inquiry-detail-label" data-en="Studio" data-mn="Студи">Studio</span>
              <span class="inquiry-detail-value">M2 Tower, 15th Floor, Suite 1509</span>
            </div>
          </div>
        </div>
        <div class="inquiry-form reveal reveal-delay-2" style="background: var(--off-white);">
          <div class="form-title" data-en="Leave a question" data-mn="Асуулт үлдээх">Leave a question</div>
          <p class="form-subtitle" data-en="Tell us about your project and we'll be in touch with design guidance and next steps." data-mn="Төслийнхөө тухай хэлж, бид дизайны удирдамж болон дараагийн алхмуудтай холбогдоно.">
            Tell us about your project and we'll be in touch with design guidance and next steps.
          </p>
          <form>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="inq-name" data-en="Full Name *" data-mn="Бүтэн нэр *">Full Name *</label>
                <input type="text" id="inq-name" name="name" class="form-input" placeholder="Your name" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="inq-phone" data-en="Phone Number *" data-mn="Утасны дугаар *">Phone Number *</label>
                <input type="tel" id="inq-phone" name="phone" class="form-input" placeholder="99001234" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="inq-email" data-en="Email Address *" data-mn="Имэйл хаяг *">Email Address *</label>
              <input type="email" id="inq-email" name="email" class="form-input" placeholder="your@email.com" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="inq-message" data-en="Your Message *" data-mn="Таны мессеж *">Your Message *</label>
              <textarea id="inq-message" name="message" class="form-textarea" placeholder="Tell us about your project..." required></textarea>
            </div>
            <div class="form-submit-wrap">
              <button type="submit" class="btn-primary" data-en="Send Inquiry" data-mn="Лавлага илгээх">
                Send Inquiry <span class="btn-arrow"></span>
              </button>
            </div>
          </form>
          <div class="form-success">
            <div class="form-success-title" data-en="Thank you — message received." data-mn="Баярлалаа — мессеж хүлээн авлаа.">Thank you — message received.</div>
            <p class="form-success-text" data-en="We have received your inquiry and will be in touch within 48 hours." data-mn="Таны лавлагааг хүлээн авсан бөгөөд 48 цагийн дотор холбогдох болно.">
              We have received your inquiry and will be in touch within 48 hours.
            </p>
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
          <div class="filter-card-designer" data-en={`Designed by ${designer?.name}`} data-mn={`${designer?.name} зохиосон`}>Designed by {designer?.name}</div>
        </div>
      ) : (
        <div class="project-card-meta">
          <div class="project-card-designer" data-en={`Designed by ${designer?.name}`} data-mn={`${designer?.name} зохиосон`}>Designed by {designer?.name}</div>
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

/* InquirySection CTA component (home/about pages) */
export const InquirySection = () => (
  <section class="inquiry-section section" style="background: var(--off-white);">
    <div class="container">
      <div class="inquiry-grid">
        <div>
          <div class="eyebrow reveal" data-en="Get in Touch" data-mn="Холбоо барих">Get in Touch</div>
          <h2 class="headline-lg reveal reveal-delay-1" data-en="Let's create something beautiful together" data-mn="Хамтдаа гоё зүйл бүтээцгээе">Let's create something beautiful together</h2>
          <p class="body-text reveal reveal-delay-2" style="margin-top: 1.5rem;" data-en="Whether you have a clear vision or are just beginning to explore — we would love to hear about your space." data-mn="Тодорхой санаа байгаа ч, эсвэл зүгээр л судалж эхэлж байгаа ч — таны орон зайн талаар сонсохыг хүсэж байна.">
            Whether you have a clear vision or are just beginning to explore — we would love to hear about your space.
          </p>
          <a href="/inquiry" class="btn-primary reveal reveal-delay-3" style="margin-top: 2.5rem; display: inline-flex;" data-en="Start an Inquiry" data-mn="Хүсэлт илгээх">
            Start an Inquiry <span class="btn-arrow"></span>
          </a>
        </div>
        <div class="inquiry-contact-block reveal reveal-delay-2">
          <div class="inquiry-contact-row">
            <span class="inquiry-contact-label" data-en="Email" data-mn="И-мэйл">Email</span>
            <span class="inquiry-contact-val">vivacedesign07@gmail.com</span>
          </div>
          <div class="inquiry-contact-row">
            <span class="inquiry-contact-label" data-en="Phone" data-mn="Утас">Phone</span>
            <span class="inquiry-contact-val">7272 3066 · 9006 3066</span>
          </div>
          <div class="inquiry-contact-row">
            <span class="inquiry-contact-label" data-en="Studio Hours" data-mn="Ажлын цаг">Studio Hours</span>
            <span class="inquiry-contact-val" data-en="Mon–Fri, 09:00–18:00" data-mn="Да–Пү, 09:00–18:00">Mon–Fri, 09:00–18:00</span>
          </div>
        </div>
      </div>
    </div>
  </section>
)
