/**
 * Vivace Design Interior — Unified i18n System v5 — PRODUCTION GRADE
 * ====================================================================
 * Handles:  data-i18n="key"          → looks up T[key][lang]
 *           data-en="..." data-mn="..." → legacy inline bilingual attrs
 *           data-i18n-ph="key"        → input placeholders
 *           data-i18n-html="key"      → innerHTML (for rich markup)
 *
 * FIX v5:  VivaceSplit-safe translateEl() — detects split elements
 *          and rebuilds split structure instead of destroying spans.
 *          Language toggle wired with retry so it survives GSAP timing.
 */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     FULL TRANSLATION DICTIONARY
  ───────────────────────────────────────────────────────── */
  var T = {

    /* ── NAV ── */
    'nav.home':          { en: 'Home',        mn: 'Нүүр' },
    'nav.projects':      { en: 'Projects',    mn: 'Төслүүд' },
    'nav.categories':    { en: 'Categories',  mn: 'Ангилал' },
    'nav.designers':     { en: 'Designers',   mn: 'Дизайнерууд' },
    'nav.about':         { en: 'About',       mn: 'Бидний тухай' },
    'nav.contact':       { en: 'Contact',     mn: 'Холбоо барих' },
    'nav.inquiry':       { en: 'Inquiry',     mn: 'Холбогдох' },

    /* ── HERO ── */
    'hero.eyebrow':      { en: 'Premium Interior Design Studio', mn: 'Тэргүүний Интерьер Дизайн Студи' },
    'hero.title':        { en: 'Your dream space starts here', mn: 'Таны мөрөөдлийн орон зай эндээс эхэлнэ' },
    'hero.subtitle':     { en: 'We create premium interior environments shaped with clarity, warmth, and lasting identity. Every space is a collaboration between craft and vision.', mn: 'Тодорхой байдал, дулаан мэдрэмж, тогтвортой онцлогоор хийгдсэн дотоод орчинг бид бүтээдэг. Бүх орон зай бол гар урлал ба алсын харааны хамтын бүтээл юм.' },
    'hero.btn.projects': { en: 'View Projects', mn: 'Төслүүд үзэх' },
    'hero.btn.inquiry':  { en: 'Start Inquiry', mn: 'Хүсэлт илгээх' },
    'hero.scroll':       { en: 'Scroll',        mn: 'Гүйлгэх' },

    /* ── INTRO SECTION ── */
    'intro.eyebrow':     { en: 'Welcome to Vivace',  mn: 'Vivace-д тавтай морил' },
    'intro.headline':    { en: 'Transforming Spaces, Elevating Lives', mn: 'Орон зайг өөрчилж, амьдралыг өргөмжлөх' },
    'intro.p1':          { en: 'Vivace Design Interior is a premium interior design studio based in Ulaanbaatar, Mongolia. We specialize in creating beautifully crafted spaces that combine elegance, functionality, and timeless design. Whether it\'s a luxurious residence, a modern office, a welcoming coffee shop, or a sophisticated dental clinic, we bring your vision to life with meticulous attention to detail.', mn: 'Vivace Design Interior бол Улаанбаатарт байрладаг тэргүүний дотоод дизайн студи юм. Бид болоовсронгуй байдал, ажиллагаа болон мөнхийн дизайнаар хослуулсан гоёмсог орон зай бүтээхэд мэргэшсэн. Тансаг орон сууц, орчин үеийн оффис, эелдэг кофе шоп, боловсронгуй шүдний эмнэлэг гэх мэт та бүхний алсын харааг нарийн зүйлд анхаарал хандуулснаар бодит болгодог.' },
    'intro.p2':          { en: 'Our team of three exceptional designers brings diverse expertise and a shared passion for creating interiors that resonate with your lifestyle and aspirations. Every project is a collaborative journey where creativity, precision, and craftsmanship come together to deliver spaces you\'ll love for years to come.', mn: 'Манай гурван онцгой дизайнерын баг нь олон талт туршлага болон таны амьдралын хэв маяг, мөрөөдөлтэй уялдсан дотоод засал дизайныг бүтээх хайр дурлалаар хангадаг. Төсөл бүр бүтээлч байдал, нарийвчлал, гар урлал нэгдэж та олон жилийн турш хайрлах орон зайг хүргэдэг хамтын аялал юм.' },
    'intro.btn':         { en: 'Learn More About Us',       mn: 'Бидний тухай илүү ихийг мэдэх' },
    'intro.tag':         { en: 'Est. 2024 · Ulaanbaatar',   mn: 'Үүссэн 2024 · Улаанбаатар' },

    /* ── PINNED PANELS ── */
    'panel.view':        { en: 'View Project',       mn: 'Төсөл үзэх' },
    'panel.scroll':      { en: 'Scroll to explore',  mn: 'Гүйлгэж үзэх' },
    'panel.designed':    { en: 'Designed by',        mn: 'Зохиогч:' },

    /* ── CATEGORIES SECTION (homepage) ── */
    'cat.eyebrow':       { en: 'Browse',             mn: 'Үзэх' },
    'cat.headline':      { en: 'Project Categories', mn: 'Төслийн ангилалууд' },
    'cat.view':          { en: 'View Projects',      mn: 'Төслүүд үзэх' },

    /* ── CATEGORY NAMES ── */
    'cat.kitchen':         { en: 'Kitchen',        mn: 'Гал тогоо' },
    'cat.living-room':     { en: 'Living Room',    mn: 'Зочны өрөө' },
    'cat.kids-room':       { en: 'Kids Room',      mn: 'Хүүхдийн өрөө' },
    'cat.work-room':       { en: 'Work Room',      mn: 'Ажлын өрөө' },
    'cat.office':          { en: 'Office',         mn: 'Оффис' },
    'cat.bathroom':        { en: 'Bathroom',       mn: 'Угаалгын өрөө' },
    'cat.master-bedroom':  { en: 'Master Bedroom', mn: 'Унтлагын өрөө' },
    'cat.auto-mall':       { en: 'Auto Mall',      mn: 'Авто молл' },
    'cat.esport-center':   { en: 'E-sport Center', mn: 'Е-спорт төв' },
    'cat.dental-clinic':   { en: 'Dental Clinic',  mn: 'Шүдний клиник' },
    'cat.coffee-shop':     { en: 'Coffee Shop',    mn: 'Кофе шоп' },

    /* ── H-SCROLL FEATURED ── */
    'featured.eyebrow':  { en: 'Selected Works',   mn: 'Сонгосон бүтээлүүд' },
    'featured.title.1':  { en: 'Featured',          mn: 'Онцлох' },
    'featured.title.2':  { en: 'Projects',           mn: 'Төслүүд' },

    /* ── DESIGNERS SECTION ── */
    'designers.eyebrow': { en: 'Creative Authorship', mn: 'Бүтээлч зохиогчид' },
    'designers.headline':{ en: 'Our Designers',        mn: 'Манай дизайнерууд' },
    'designers.all':     { en: 'All Designers',        mn: 'Бүх дизайнерууд' },
    'designers.portfolio':{ en: 'View Portfolio →',   mn: 'Портфолио үзэх →' },

    /* ── STATS BAR ── */
    'stats.projects':    { en: 'Projects Completed',  mn: 'Хэрэгжүүлсэн төсөл' },
    'stats.categories':  { en: 'Design Categories',   mn: 'Дизайны ангилал' },
    'stats.designers':   { en: 'Senior Designers',    mn: 'Мэргэжилтэн' },
    'stats.years':       { en: 'Years of Excellence', mn: 'Салбартаа ажилсан туршлага' },

    /* ── PROCESS SECTION ── */
    'process.eyebrow':   { en: 'How We Work',         mn: 'Үйлчилгээний дараалал' },
    'process.headline':  { en: 'Our Design Process',  mn: 'Үйлчилгээний дараалал' },
    'process.01.title':  { en: 'Discovery & Consultation', mn: 'Хэмжилт, уулзалт' },
    'process.01.body':   { en: 'We begin with a deep conversation — understanding not just what you need, but how you want to feel inside your space. We study your lifestyle, aspirations, material preferences, and the architectural context of the project.', mn: 'Хариулагчийн хэрэгцээ, хүсэл, төсвийг тодорхойлон анхан шатны зөвлөгөө өгнө. Талбай дээр хэмжилт хийж, орон зайн онцлогийг судална.' },
    'process.02.title':  { en: 'Concept Development', mn: 'Зураг, төсөл' },
    'process.02.body':   { en: 'Our designers develop a considered spatial and material narrative for your project. Concept boards, mood studies, and preliminary layouts are reviewed together in a collaborative session to align vision.', mn: 'Интерьер, замыглат тавилтын ерөнхий шийдэл, өнгө, зохион байгуулалт, хэв маягийг тодорхойно. Гүйцэтгэлд шаардлагатай нарийвчилсан зураг, төлөвлөлтийг боловсруулна.' },
    'process.03.title':  { en: 'Design Development',  mn: 'Төслийн гүйцэтгэл' },
    'process.03.body':   { en: 'With the concept confirmed, we develop detailed interior drawings, material specifications, furniture selections, lighting plans, and bespoke element designs. Every detail is considered with intention.', mn: 'Батлагдсан зургт дагуу ажлыг мөргөжлийн түвшинд гүйцэтгэнэ. Төслийн шалгах, бэлэн болсон орчинг хариулагчид хүлээлгэн өгнө.' },
    'process.04.title':  { en: 'Project Execution',   mn: 'Гүйцэтгэл, ажил хүлээлцэх' },
    'process.04.body':   { en: 'We manage the execution of your interior from contractor coordination and procurement to installation oversight — ensuring the realized space matches the design vision with precision.', mn: 'Ажлын хүлээлцэх нь гүйцэтгэлийг зураг төсөл, стандартын түгшин шалгасны дараа зохион байгуулалт, албан ёсны бичиг баримтаар хүлээлгэн өгнө.' },
    'process.05.title':  { en: 'Handover & Refinement', mn: 'Хүлээлгэн өгөлт & Сайжруулалт' },
    'process.05.body':   { en: 'We remain present through final installation, styling, and handover. Post-project, we are available for any refinements that ensure your space continues to evolve beautifully over time.', mn: 'Бид эцсийн суурилуулалт, загварчлал, хүлээлгэн өгөлт хүртэл хамт байдаг. Дараа нь таны орон зай цаг хугацааны туршид гоё хөгжсөөр байхын тулд аливаа нарийн тохируулга хийхэд бэлэн байдаг.' },

    /* ── INQUIRY SECTION (homepage/about CTA) ── */
    'inquiry.eyebrow':     { en: 'Get in Touch',  mn: 'Холбоо барих' },
    'inquiry.headline':    { en: "Let's create something beautiful together", mn: 'Хамтдаа гайхамшигтай зүйл бүтээцгээе' },
    'inquiry.body':        { en: 'Whether you have a clear vision or are just beginning to explore — we would love to hear about your space.', mn: 'Тодорхой санаа байгаа ч, эсвэл зүгээр л судалж эхэлж байгаа ч — таны орон зайн талаар сонсохыг хүсэж байна.' },
    'inquiry.btn':         { en: 'Start an Inquiry', mn: 'Хүсэлт илгээх' },
    'inquiry.label.email': { en: 'Email',         mn: 'И-мэйл' },
    'inquiry.label.phone': { en: 'Phone',         mn: 'Утас' },
    'inquiry.label.hours': { en: 'Studio Hours',  mn: 'Ажлын цаг' },
    'inquiry.hours.val':   { en: 'Mon–Fri, 09:00–18:00', mn: 'Да–Пү, 09:00–18:00' },

    /* ── FULL INQUIRY PAGE ── */
    'inqpage.eyebrow':      { en: 'Get in Touch',      mn: 'Холбоо барих' },
    'inqpage.headline':     { en: "Let's discuss your project", mn: 'Таны төслийг хэлэлцье' },
    'inqpage.body':         { en: 'Whether you have a clear vision or are just beginning to explore the possibilities — we would love to hear about your space. Leave your details and we will be in touch within 48 hours.', mn: 'Тодорхой санаа байгаа ч, эсвэл боломжуудыг судалж эхэлж байгаа ч — таны орон зайн талаар сонсохыг хүсэж байна. Мэдээллээ үлдээвэл 48 цагийн дотор холбогдоно.' },
    'inqpage.lbl.addr':     { en: 'Studio Address',    mn: 'Студийн хаяг' },
    'inqpage.lbl.email':    { en: 'Email',             mn: 'И-мэйл' },
    'inqpage.lbl.phone':    { en: 'Phone',             mn: 'Утас' },
    'inqpage.lbl.hours':    { en: 'Studio Hours',      mn: 'Ажлын цаг' },
    'inqpage.hours.val':    { en: 'Mon–Fri, 9:00–18:00', mn: 'Да–Пү, 09:00–18:00' },
    'inqpage.form.title':   { en: 'Leave a question',  mn: 'Асуулт үлдээх' },
    'inqpage.form.sub':     { en: "Tell us about your project and we'll be in touch with design guidance and next steps.", mn: 'Төслийнхөө тухай хэлж, бид дизайны удирдамж болон дараагийн алхмуудтай холбогдоно.' },
    'inqpage.lbl.name':     { en: 'Full Name *',       mn: 'Бүтэн нэр *' },
    'inqpage.lbl.phone2':   { en: 'Phone Number *',    mn: 'Утасны дугаар *' },
    'inqpage.lbl.email2':   { en: 'Email Address *',   mn: 'И-мэйл хаяг *' },
    'inqpage.lbl.cat':      { en: 'Project Category',  mn: 'Төслийн ангилал' },
    'inqpage.lbl.budget':   { en: 'Budget Range',      mn: 'Төсвийн хэмжээ' },
    'inqpage.lbl.time':     { en: 'Preferred Consultation', mn: 'Зөвлөлдөх цаг' },
    'inqpage.lbl.msg':      { en: 'Your Question or Message *', mn: 'Таны асуулт эсвэл мессеж *' },
    'inqpage.btn.send':     { en: 'Send Inquiry',      mn: 'Хүсэлт илгээх' },
    'inqpage.ph.name':      { en: 'Your name',         mn: 'Таны нэр' },
    'inqpage.ph.phone':     { en: '99001234',           mn: '99001234' },
    'inqpage.ph.email':     { en: 'your@email.com',    mn: 'your@email.com' },
    'inqpage.ph.msg':       { en: 'Tell us about your project — the space, your vision, or simply what\'s on your mind...', mn: 'Төслийнхөөсөө хэлээрэй — орон зай, алсын харааны тухай эсвэл зүгээр л бодож байгаа зүйлээ...' },
    'inqpage.ph.cat':       { en: 'Select a category...', mn: 'Ангилал сонгох...' },
    'inqpage.opt.multi':    { en: 'Multiple Spaces',   mn: 'Олон өрөө' },
    'inqpage.opt.other':    { en: 'Other / Not Sure',  mn: 'Бусад / Мэдэхгүй' },
    'inqpage.opt.budget0':  { en: 'Prefer not to say', mn: 'Хэлмээргүй байна' },
    'inqpage.opt.budget1':  { en: 'Under ₮10 million', mn: '₮10 саяас доош' },
    'inqpage.opt.budget2':  { en: '₮10–30 million',   mn: '₮10–30 сая' },
    'inqpage.opt.budget3':  { en: '₮30–80 million',   mn: '₮30–80 сая' },
    'inqpage.opt.budget4':  { en: '₮80 million+',     mn: '₮80 сая+' },
    'inqpage.opt.time0':    { en: 'Any time',          mn: 'Дурын цаг' },
    'inqpage.opt.time1':    { en: 'Morning (9–12)',    mn: 'Өглөө (9–12)' },
    'inqpage.opt.time2':    { en: 'Afternoon (12–17)', mn: 'Өдөр (12–17)' },
    'inqpage.opt.time3':    { en: 'Evening (17–19)',   mn: 'Орой (17–19)' },
    'inqpage.privacy':      { en: 'Your information is kept private and will only be used to respond to your inquiry. We do not share your details with third parties.', mn: 'Таны мэдээлэл нууцлалтай байх бөгөөд зөвхөн таны лавлагаанд хариулахад ашиглагдана. Бид таны мэдээллийг гуравдагч этгээдтэй хуваалцдаггүй.' },
    'inqpage.success.title':{ en: 'Thank you — message received.', mn: 'Баярлалаа — мессеж хүлээн авлаа.' },
    'inqpage.success.body': { en: 'We have received your inquiry and will be in touch within 48 hours. We look forward to learning about your project.', mn: 'Таны лавлагааг хүлээн авсан бөгөөд 48 цагийн дотор холбогдох болно. Таны төслийн талаар мэдэхийг тэсэн ядан хүлээж байна.' },

    /* ── PROJECTS PAGE ── */
    'projects.eyebrow':  { en: 'Our Work',     mn: 'Манай бүтээл' },
    'projects.headline': { en: 'All Projects', mn: 'Бүх төслүүд' },
    'projects.body':     { en: 'Explore our portfolio of completed interior projects — from intimate domestic spaces to ambitious commercial environments.', mn: 'Дуусгасан интерьер төслүүдийн портфолиог үзнэ үү — тухлаг гэр орноос томоохон арилжааны орчин хүртэл.' },
    'projects.all':      { en: 'All',          mn: 'Бүгд' },
    'projects.designed': { en: 'Designed by',  mn: 'Зохиогч:' },

    /* ── CATEGORIES PAGE ── */
    'catpage.eyebrow':   { en: 'Browse',       mn: 'Үзэх' },
    'catpage.headline':  { en: 'Categories',   mn: 'Ангилалууд' },
    'catpage.body':      { en: 'Browse our completed projects by space category. From intimate residences to ambitious commercial environments.', mn: 'Орон зайн ангилалаар дууссан төслүүдийг үзнэ үү. Тухлаг орон байрнаас томоохон арилжааны орчин хүртэл.' },
    'catpage.projects':  { en: 'projects',     mn: 'төсөл' },

    /* ── PROJECT DETAIL PAGE ── */
    'proj.back':         { en: 'Back to Projects',  mn: 'Төслүүд рүү буцах' },
    'proj.category':     { en: 'Category',           mn: 'Ангилал' },
    'proj.designer':     { en: 'Designer',           mn: 'Дизайнер' },
    'proj.location':     { en: 'Location',           mn: 'Байршил' },
    'proj.year':         { en: 'Year',               mn: 'Он' },
    'proj.area':         { en: 'Area',               mn: 'Талбай' },
    'proj.style':        { en: 'Style',              mn: 'Хэв маяг' },
    'proj.materials':    { en: 'Materials',          mn: 'Материалууд' },
    'proj.overview':     { en: 'Project Overview',   mn: 'Төслийн тоймлол' },
    'proj.designed.by':  { en: 'Designed by',        mn: 'Зохиогч:' },
    'proj.view.portfolio':{ en: 'View Portfolio',    mn: 'Портфолио үзэх' },
    'proj.related':      { en: 'Related Projects',   mn: 'Холбоотой төслүүд' },
    'proj.similar':      { en: 'Similar Work',       mn: 'Үүнтэй төстэй бүтээл' },
    'proj.interested':   { en: 'Interested in a similar project?', mn: 'Ийм төстэй төсөлд сонирхолтой байна уу?' },
    'proj.inquiry.cta':  { en: 'Let\'s discuss how we can bring a similar level of design thinking to your space.', mn: 'Таны орон зайд ижил түвшний дизайны сэтгэлгээг хэрхэн авчрах тухай ярилцацгаая.' },
    'proj.inquiry.btn':  { en: 'Start Inquiry',      mn: 'Хүсэлт илгээх' },
    'proj.get.in.touch': { en: 'Get in Touch',       mn: 'Холбоо барих' },

    /* ── CARD "DESIGNED BY" — used in components.tsx ProjectCard ── */
    'card.designed':     { en: 'Designed by',        mn: 'Зохиогч:' },

    /* ── DESIGNERS PAGE ── */
    'despage.eyebrow':   { en: 'Creative Authors',  mn: 'Бүтээлч зохиогчид' },
    'despage.headline':  { en: 'Our Designers',      mn: 'Манай дизайнерууд' },
    'despage.body':      { en: 'Three distinct creative voices. Each designer brings a deeply individual sensibility and an unwavering commitment to design excellence.', mn: 'Гурван өвөрмөц бүтээлч хоолой. Тус бүр хувийн мэдрэмжтэй, дизайны гүйцэтгэлд тогтвортой тууштай байдлыг авчирдаг.' },
    'despage.portfolio': { en: 'View Portfolio →',  mn: 'Портфолио үзэх →' },
    'despage.completed': { en: 'completed project',  mn: 'дууссан төсөл' },
    'despage.completeds':{ en: 'completed projects', mn: 'дууссан төслүүд' },

    /* ── DESIGNER PROFILE PAGE ── */
    'desprofile.back':      { en: 'All Designers',       mn: 'Бүх дизайнерууд' },
    'desprofile.philosophy':{ en: 'Design Philosophy',   mn: 'Дизайны философи' },
    'desprofile.selected':  { en: 'Selected Works',      mn: 'Сонгосон бүтээлүүд' },
    'desprofile.portfolio': { en: 'Portfolio',            mn: 'Портфолио' },
    'desprofile.cta.eye':   { en: 'Start a Conversation', mn: 'Яриа эхлэх' },
    'desprofile.cta.work':  { en: 'Work with',             mn: 'Хамтран ажиллах —' },
    'desprofile.cta.req':   { en: 'Request a consultation and begin your design journey together.', mn: 'Зөвлөгөө хүсэж, хамт дизайны аяллаа эхлэгтүн.' },
    'desprofile.cta.btn':   { en: 'Request Consultation', mn: 'Зөвлөгөө хүсэх' },
    'desprofile.proj.eye':  { en: 'Designer',             mn: 'Дизайнер' },
    'desprofile.proj.by':   { en: 'Designed by',          mn: 'Зохиогч:' },
    'desprofile.view':      { en: 'View Portfolio',        mn: 'Портфолио үзэх' },
    'desprofile.projects':  { en: 'Projects',             mn: 'Төслүүд' },

    /* ── ABOUT PAGE ── */
    'about.eyebrow':     { en: 'Welcome to Vivace',          mn: 'Vivace-д тавтай морил' },
    'about.headline':    { en: 'Creating elegant spaces that transform lives',    mn: 'Амьдралыг өөрчлөх гоёмсог орон зайг бүтээх' },
    'about.who.eye':     { en: 'Our Story',      mn: 'Манай түүх' },
    'about.who.h2':      { en: 'Where vision meets craftsmanship', mn: 'Алсын хараа ба гар урлал уулзах газар' },
    'about.who.p1':      { en: '"Vivachi Arte" LLC was founded in 2024 by founders L.Uyanga and B.Tuguldur, based on years of experience, accumulated knowledge, shared values and strategic goals, to advance interior design, execution, and custom furniture manufacturing to a new level.', mn: '"Вивачи Артэ" ХХК нь үүсгэн байгуулагч Л.Уянга болон Б.Төгөлдөр нарын олон жилийн туршлага, хуримтлуулсан мэдлэг, нэгдмэл үнэ цэнэ, стратегийн зорилгын хүрээнд 2024 онд "Вивачи Артэ" ХХК-ийг байгуулж, интерьер зураг төсөл, гүйцэтгэл, захиалгат тавилга үйлдвэрлэлийн чиглэлээр үйл ажиллагаагаа шинэ шатанд гарган ажиллаж байна.' },
    'about.who.p2':      { en: 'We design and implement tailored interior and furniture solutions for offices, service areas, residential apartments, restaurants, and various other spaces — from blueprints through manufacturing, installation, and key handover — and have successfully completed many projects.', mn: 'Бид оффис, үйлчилгээний талбай, амины орон сууц, ресторан зэрэг төрөл бүрийн орон зайд тохирсон интерьер болон тавилгын шийдлийг зураг төслөөс эхлэн үйлдвэрлэл, угсралт, түлхүүр гардуулах хүртэл логикоор нь хэрэгжүүлж, олон төслийг амжилттай хүлээлгэн өгөөд байна.' },
    'about.who.p3':      { en: 'Our factory is equipped with fully automated machinery that meets international quality standards, and has the capacity to manufacture paint finishes, woodwork, and all types of custom furniture to a high standard.', mn: 'Манай үйлдвэр нь олон улсын чанар стандартад нийцсэн бүрэн автомат тоног төхөөрөмжөөр тоноглогдсон бөгөөд будаг, модон хийц болон бүх төрлийн захиалгат тавилгыг өндөр чанартайгаар үйлдвэрлэх хүчин чадалтай.' },
    'about.who.p4':      { en: 'We prioritize experience, skill, creative thinking, and new ideas, and work to build a competitive, professional team in our industry. We also emphasize smart, responsible use in every material selection and planning decision, striving to create a perfect balance of aesthetics and functionality in every space.', mn: 'Бид туршлага, ур чадвар, бүтээлч сэтгэлгээ, шинэ санал санаачилгыг эрхэмлэн, салбартаа өрсөлдөх чадвартай, мэргэжлийн багийг бүрдүүлэн ажиллаж байна. Мөн материалын сонголт, төлөвлөлтийн шийдэл бүрд ухаалаг, хариуцлагатай хэрэглээг чухалчилж, орон зай бүрд гоо зүй болон хэрэглээний төгс тэнцвэрийг бий болгохыг зорьдог.' },
    'about.who.p5':      { en: 'We work to build long-term partnerships with client organizations, creating value through reliable execution, quality products, and integrated management service solutions.', mn: 'Бид харилцагч байгууллагуудтай урт хугацааны түншлэл бий болгож, найдвартай гүйцэтгэл, чанартай бүтээгдэхүүн, нэгдсэн удирдлагатай үйлчилгээний шийдлээр үнэ цэнэ бүтээхийг зорин ажиллаж байна.' },
    'about.values.eye':  { en: 'Our Approach', mn: 'Манай арга барил' },
    'about.values.h2':   { en: 'Our Values',   mn: 'Бидний үнэт зүйлс' },
    'about.v1.title':    { en: 'Individual Design', mn: 'Хувь хүний дизайн' },
    'about.v1.text':     { en: 'We believe every space should reflect the character and needs of those who inhabit it. Our designs are tailored specifically for you.', mn: 'Бид орон зай бүр түүнийг эзэмшигч хүмүүсийн зан чанар, хэрэгцээг тусгах ёстой гэдэгт итгэдэг. Манай дизайнууд танд тохируулагдсан байдаг.' },
    'about.v2.title':    { en: 'Quality & Craftsmanship',  mn: 'Чанар ба гар урлал' },
    'about.v2.text':     { en: 'We partner with the world\'s finest materials and skilled artisans to execute every detail to perfection.', mn: 'Бид дэлхийн шилдэг материал болон ур чадвартай урчуудтай хамтарч нарийн зүйл бүрийг төгс гүйцэтгэдэг.' },
    'about.v3.title':    { en: 'Timeless Elegance',      mn: 'Мөнхийн дэгжин байдал' },
    'about.v3.text':     { en: 'Our designs transcend trends, creating interiors that remain stylish and relevant for years to come.', mn: 'Манай дизайнууд трендээс давж, олон жилийн турш загвар, хамаатай хэвээр үлдэх дотоод засал дизайныг бүтээдэг.' },
    'about.v4.title':    { en: 'Collaborative Process', mn: 'Хамтын процесс' },
    'about.v4.text':     { en: 'We believe great design is born through collaboration. Your vision and our expertise combine to create extraordinary results.', mn: 'Бид агуу дизайн хамтын ажиллагаагаар бий болдог гэдэгт итгэдэг. Таны алсын хараа болон манай туршлага нэгдэж ер бусын үр дүнг бий болгодог.' },

    /* ── CONTACT PAGE ── */
    'contact.eyebrow':   { en: 'Get in Touch',   mn: 'Холбоо барих' },
    'contact.headline':  { en: 'Contact Us',     mn: 'Бидэнтэй холбоо барих' },
    'contact.lbl.addr':  { en: 'Studio Address', mn: 'Студийн хаяг' },
    'contact.lbl.email': { en: 'Email',          mn: 'И-мэйл' },
    'contact.lbl.phone': { en: 'Phone',          mn: 'Утас' },
    'contact.lbl.hours': { en: 'Studio Hours',   mn: 'Ажлын цаг' },
    'contact.hours.val': { en: 'Monday to Friday\n09:00 — 18:00', mn: 'Даваа - Баасан\n09:00 — 18:00' },
    'contact.btn':       { en: 'Start an Inquiry', mn: 'Хүсэлт илгээх' },

    /* ── FOOTER ── */
    'footer.tagline':      { en: 'Your dream space starts here. Interior design shaped with clarity, warmth, and identity.', mn: 'Таны мөрөөдлийн орон зай эндээс эхэлнэ. Тодорхой байдал, дулаан мэдрэмж, онцлогоор хийгдсэн интерьер дизайн.' },
    'footer.nav.title':    { en: 'Navigation',    mn: 'Цэс' },
    'footer.nav.home':     { en: 'Home',          mn: 'Нүүр хуудас' },
    'footer.nav.projects': { en: 'All Projects',  mn: 'Бүх төслүүд' },
    'footer.nav.cats':     { en: 'Categories',    mn: 'Ангилал' },
    'footer.nav.designers':{ en: 'Designers',     mn: 'Дизайнерууд' },
    'footer.nav.about':    { en: 'About',         mn: 'Бидний тухай' },
    'footer.nav.inquiry':  { en: 'Start Inquiry', mn: 'Хүсэлт илгээх' },
    'footer.cat.title':    { en: 'Categories',    mn: 'Ангилал' },
    'footer.contact.title':{ en: 'Contact',       mn: 'Холбоо барих' },
    'footer.addr.lbl':     { en: 'Address',       mn: 'Хаяг' },
    'footer.email.lbl':    { en: 'Email',         mn: 'И-мэйл' },
    'footer.phone.lbl':    { en: 'Phone',         mn: 'Утас' },
    'footer.copy':         { en: '© 2024 Vivace Design Interior. All rights reserved.', mn: '© 2024 Vivace Design Interior. Бүх эрх хамгаалагдсан.' },
    'footer.privacy':      { en: 'Privacy',       mn: 'Нууцлал' },
    'footer.contact.lnk':  { en: 'Contact',       mn: 'Холбоо барих' },

    /* ── MISC ── */
    'misc.not.found':    { en: 'Not found',           mn: 'Олдсонгүй' },
    'misc.back.projects':{ en: 'Back to Projects',    mn: 'Төслүүд рүү буцах' },
    'misc.back.des':     { en: 'Back to Designers',   mn: 'Дизайнерууд рүү буцах' },

    /* ── SOCIAL & COMPANY INFO ── */
    'social.instagram':  { en: '@vivace.design',      mn: '@vivace.design' },
    'social.facebook':   { en: 'Vivace Design',       mn: 'Vivace Design' },
    'company.stat.years':{ en: '2024',                mn: '2024' },
    'company.stat.desc.years': { en: 'Established',  mn: 'Үүссэн он' },
    'company.stat.ontime':{ en: '100%',               mn: '100%' },
    'company.stat.desc.ontime': { en: 'Projects delivered on time', mn: 'Төслүүдийг хугацаанд нь хүлээлгэн өгсөн' },
    'company.stat.experts':{ en: '150+',              mn: '150+' },
    'company.stat.desc.experts': { en: 'Professional partners', mn: 'Гаруй мэргэжилтэн' },
    'company.stat.projects':{ en: '300+',             mn: '300+' },
    'company.stat.desc.projects': { en: 'Projects completed', mn: 'Хэрэгжүүлсэн төсөл' },
  };

  /* ─────────────────────────────────────────────────────────
     CORE ENGINE
  ───────────────────────────────────────────────────────── */
  var LANG_KEY = 'vd_lang';
  var currentLang = localStorage.getItem(LANG_KEY) || 'mn';

  /** Get translation value for a key */
  function t(key) {
    var entry = T[key];
    if (!entry) return null;
    return entry[currentLang] || entry['en'] || null;
  }

  /**
   * Check if an element has been processed by VivaceSplit.
   * VivaceSplit wraps lines in <div style="overflow:hidden"> wrappers
   * that contain <div class="rvl-line"> children.
   */
  function isVivaceSplit(el) {
    // Check for overflow:hidden wrapper children (VivaceSplit line wrappers)
    var children = el.children;
    if (!children.length) return false;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      // VivaceSplit creates div wrappers with overflow:hidden style
      if (child.tagName === 'DIV' &&
          (child.style.overflow === 'hidden' ||
           child.classList.contains('rvl-line') ||
           child.classList.contains('vd-line') ||
           child.classList.contains('vd-char'))) {
        return true;
      }
    }
    return false;
  }

  /**
   * Apply translation to a VivaceSplit-processed element.
   * Instead of destroying the split structure, we update the text
   * inside the line spans while preserving GSAP animation targets.
   */
  function translateSplitEl(el, val) {
    // Strategy: clear the VivaceSplit wrappers and set plain text.
    // GSAP animation has already completed (yPercent is 0) by the time
    // user clicks language toggle, so we can safely reset.
    // Remove all children and set plain text — GSAP will re-animate on next scroll.
    el.innerHTML = '';
    el.textContent = val;
    // Re-expose for opacity: ensure element is visible
    el.style.opacity = '1';
    el.style.transform = '';
  }

  /**
   * Apply data-i18n="key" — updates text content safely.
   * Handles: VivaceSplit elements, btn-arrow spans, simple text.
   */
  function translateEl(el) {
    var key = el.getAttribute('data-i18n');
    if (!key) return;
    var val = t(key);
    if (val === null) return;

    // 1. VivaceSplit-processed element — safely reset
    if (isVivaceSplit(el)) {
      translateSplitEl(el, val);
      return;
    }

    // 2. Elements with .btn-arrow child spans — preserve the arrow
    var arrowSpan = el.querySelector('span.btn-arrow');
    if (arrowSpan) {
      // Find and update first text node
      for (var i = 0; i < el.childNodes.length; i++) {
        var node = el.childNodes[i];
        if (node.nodeType === 3 && node.nodeValue.trim() !== '') {
          node.nodeValue = val + ' ';
          return;
        }
      }
      // No text node found — insert before arrow
      el.insertBefore(document.createTextNode(val + ' '), arrowSpan);
      return;
    }

    // 3. Elements that contain only span children with data-i18n
    //    (e.g. <a data-i18n="key"><span data-i18n="subkey">...</span><span class="btn-arrow"></span></a>)
    //    Skip — children will be handled individually
    var onlySpanChildren = el.children.length > 0 && el.childNodes.length === el.children.length;
    if (onlySpanChildren && !el.querySelector('span.btn-arrow')) {
      // This element only has element children, no text nodes — skip
      // (its children are translated separately)
      return;
    }

    // 4. Simple element — set textContent directly
    el.textContent = val;
  }

  /** Apply data-en/data-mn="..." legacy inline attributes */
  function translateLegacyEl(el) {
    var val = el.getAttribute('data-' + currentLang);
    if (!val) val = el.getAttribute('data-en');
    if (!val) return;

    // Preserve child elements
    var updated = false;
    for (var i = 0; i < el.childNodes.length; i++) {
      var node = el.childNodes[i];
      if (node.nodeType === 3 && node.nodeValue.trim() !== '') {
        node.nodeValue = val;
        updated = true;
        break;
      }
    }
    if (!updated && el.children.length === 0) {
      el.textContent = val;
    }
  }

  /** Apply data-i18n-html="key" — sets innerHTML for rich markup */
  function translateHtmlEl(el) {
    var key = el.getAttribute('data-i18n-html');
    if (!key) return;
    var val = t(key);
    if (val === null) return;
    el.innerHTML = val;
  }

  /** Apply data-i18n-ph="key" — sets placeholder */
  function translatePlaceholder(el) {
    var key = el.getAttribute('data-i18n-ph');
    if (!key) return;
    var val = t(key);
    if (val === null) return;
    el.setAttribute('placeholder', val);
  }

  /** Apply ALL translations on the page */
  function applyAll() {
    document.documentElement.lang = currentLang;

    // data-i18n keys
    document.querySelectorAll('[data-i18n]').forEach(translateEl);

    // data-i18n-html keys (innerHTML)
    document.querySelectorAll('[data-i18n-html]').forEach(translateHtmlEl);

    // data-i18n-ph placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(translatePlaceholder);

    // Legacy data-en / data-mn attributes
    document.querySelectorAll('[data-en]').forEach(translateLegacyEl);

    // Process step bodies: container has data-en/data-mn, visible text is in <p> child
    document.querySelectorAll('.process-step-body').forEach(function(el) {
      var val = el.getAttribute('data-' + currentLang) || el.getAttribute('data-en');
      if (!val) return;
      var p = el.querySelector('p');
      if (p) p.textContent = val;
    });

    // Select options with data-i18n
    document.querySelectorAll('option[data-i18n]').forEach(function(option) {
      var key = option.getAttribute('data-i18n');
      var val = t(key);
      if (val !== null) option.textContent = val;
    });

    // Stat labels: elements like <div class="stat-label" data-i18n="stats.projects">
    // These may show raw key text if SSR rendered {s.key} — override with translation
    document.querySelectorAll('.stat-label[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (val !== null) el.textContent = val;
    });

    // Update active state on all lang-btn elements
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
  }

  /** Wire language toggle buttons — call this any time new buttons appear in DOM */
  function wireButtons() {
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      // Avoid double-binding
      if (btn.dataset.i18nBound) return;
      btn.dataset.i18nBound = '1';
      btn.addEventListener('click', function() {
        setLang(this.getAttribute('data-lang'));
      });
    });
    // Reflect current active state
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
  }

  /** Switch language, persist to localStorage, re-apply everything */
  function setLang(lang) {
    if (lang !== 'en' && lang !== 'mn') return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyAll();
    wireButtons();
    // GSAP feedback on toggles
    if (window.gsap) {
      document.querySelectorAll('.lang-toggle-wrap').forEach(function(w) {
        gsap.fromTo(w, { scale: 0.88 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
      });
    }
  }

  /** Public API — exposed on window so app.js can call applyAll() after animations */
  window.VDi18n = {
    t: t,
    setLang: setLang,
    getLang: function() { return currentLang; },
    applyAll: applyAll,
    wireButtons: wireButtons,
    T: T
  };

  /* ─────────────────────────────────────────────────────────
     INIT — robust timing strategy
  ───────────────────────────────────────────────────────── */
  function init() {
    wireButtons();
    applyAll();

    // Re-wire after 800ms to catch any late-rendered buttons (e.g. after GSAP entrance)
    setTimeout(function() {
      wireButtons();
      applyAll();
    }, 800);

    // Re-wire after 3000ms to catch buttons after full hero animation completes
    setTimeout(function() {
      wireButtons();
      applyAll();
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded — run immediately AND after a short delay
    init();
  }

})();
