/**
 * Vivace Design Interior — Unified i18n System v4
 * =================================================
 * Handles:  data-i18n="key"          → looks up T[key][lang]
 *           data-en="..." data-mn="..." → legacy inline bilingual attrs
 *           data-i18n-ph="key"        → input placeholders
 *           data-i18n-html="key"      → innerHTML (for rich markup)
 *           data-i18n-tpl="key"       → templates with {val}
 *
 * Language toggle: any button with [data-lang="en"] or [data-lang="mn"]
 * Active class .active is toggled automatically.
 */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     FULL TRANSLATION DICTIONARY
  ───────────────────────────────────────────────────────── */
  var T = {

    /* ── NAV ── */
    'nav.home':          { en: 'Home',        mn: 'Нүүр хуудас' },
    'nav.projects':      { en: 'Projects',    mn: 'Төслүүд' },
    'nav.categories':    { en: 'Categories',  mn: 'Ангилал' },
    'nav.designers':     { en: 'Designers',   mn: 'Дизайнерууд' },
    'nav.about':         { en: 'About',       mn: 'Бидний тухай' },
    'nav.contact':       { en: 'Contact',     mn: 'Холбоо барих' },
    'nav.inquiry':       { en: 'Inquiry',     mn: 'Лавлага' },

    /* ── HERO ── */
    'hero.eyebrow':      { en: 'Premium Interior Design Studio', mn: 'Тэргүүний Интерьер Дизайн Студи' },
    'hero.title.1':      { en: 'Your dream space',  mn: 'Таны мөрөөдлийн орон зай' },
    'hero.title.2':      { en: 'starts here',        mn: 'эндээс эхэлнэ' },
    'hero.subtitle':     { en: 'We create premium interior environments shaped with clarity, warmth, and lasting identity. Every space is a collaboration between craft and vision.', mn: 'Тодорхой байдал, дулаан мэдрэмж, тогтвортой онцлогоор хийгдсэн дотоод орчинг бид бүтээдэг. Бүх орон зай бол гар урлал ба алсын харааны хамтын бүтээл юм.' },
    'hero.btn.projects': { en: 'View Projects', mn: 'Төслүүд үзэх' },
    'hero.btn.inquiry':  { en: 'Start Inquiry', mn: 'Хүсэлт илгээх' },
    'hero.scroll':       { en: 'Scroll',        mn: 'Гүйлгэх' },

    /* ── INTRO SECTION ── */
    'intro.eyebrow':     { en: 'Studio Narrative',  mn: 'Студийн түүх' },
    'intro.headline':    { en: 'Interior design shaped with clarity, warmth, and identity.', mn: 'Тодорхой байдал, дулаан мэдрэмж, онцлогоор хийгдсэн интерьер дизайн.' },
    'intro.p1':          { en: 'Vivace Design Interior is a premium interior design studio based in Ulaanbaatar. We create considered environments for residential, commercial, and hospitality clients — spaces that balance beauty with the real rhythms of daily life.', mn: 'Vivace Design Interior нь Улаанбаатарт байрлах тэргүүний интерьер дизайн студи юм. Бид амьдрах, арилжааны болон зочид буудлын үйлчлүүлэгчдэд зориулсан орчинг бүтээдэг — өдөр тутмын амьдралын хэмнэлтэй уялддаг гоо зүй болон функцийн тэнцвэртэй орон зай.' },
    'intro.p2':          { en: 'Our work is driven by a deep respect for materiality, proportion, and light. We believe the best interiors are those that feel both timeless and deeply personal — environments that elevate the everyday.', mn: 'Бидний ажил нь материал, хэмжээ, гэрэлд гүнзгий хүндэтгэл дээр тулгуурладаг. Хамгийн сайн интерьер бол цаг хугацааны бус бөгөөд гүнзгий хувийн мэдрэмжтэй байдаг — өдөр тутмыг өргөмжилдөг орчин гэдэгт бид итгэдэг.' },
    'intro.btn':         { en: 'Our Approach',       mn: 'Манай арга барил' },
    'intro.tag':         { en: 'Est. Ulaanbaatar',   mn: 'Үүссэн. Улаанбаатар' },

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
    'about.eyebrow':     { en: 'Studio',          mn: 'Студи' },
    'about.headline':    { en: 'About Vivace',    mn: 'Vivace-ийн тухай' },
    'about.who.eye':     { en: 'Who We Are',      mn: 'Бид хэн бэ' },
    'about.who.h2':      { en: 'A premium interior design studio with a deep commitment to craft and beauty.', mn: 'Гар урлал болон гоо зүйд гүн тууштай тэргүүний интерьер дизайн студи.' },
    'about.who.p1':      { en: 'Vivace Design Interior was founded on a singular belief: that beautifully considered interior environments have the power to transform how people feel, work, and live.', mn: 'Vivace Design Interior нэгэн итгэл дээр үндэслэн байгуулагдсан: гоёор зохион бүтээгдсэн дотоод орчин нь хүмүүсийн мэдрэх, ажиллах, амьдрах байдлыг өөрчлөх хүчтэй.' },
    'about.who.p2':      { en: 'Our studio brings together three exceptionally talented interior designers — Zhantsannorov, Togoldor, and Ankhbayar — each with a distinctive creative voice and a shared commitment to excellence. We work across residential, commercial, hospitality, and wellness categories.', mn: 'Манай студи гурван онцгой авъяаслаг дотоод дизайнерыг нэгтгэдэг — Ц. Жанцанноров, Б. Төгөлдөр, Х. Анхбаяр — тус бүр онцлог бүтээлч хоолойтой, хамтын амжилтанд тууштай байдгийг авчирдаг. Бид орон сууц, арилжааны, зочид буудал болон эрүүл мэндийн салбарт ажилладаг.' },
    'about.who.p3':      { en: 'Every project we undertake begins with a genuine curiosity about the people who will inhabit the space. From that understanding, we build design narratives that are both precise and deeply human.', mn: 'Бидний хийдэг бүх төсөл нь орон зайд амьдрах хүмүүсийн тухай жинхэнэ сонирхлоос эхэлдэг. Тэр ойлголтоосоо бид нарийн бөгөөд гүнзгий хүний мэдрэмжтэй дизайны түүхийг бүтээдэг.' },
    'about.values.eye':  { en: 'What We Believe', mn: 'Бидний итгэл үнэмшил' },
    'about.values.h2':   { en: 'Design Values',   mn: 'Дизайны үнэт зүйлс' },
    'about.v1.title':    { en: 'Material Honesty', mn: 'Материалын үнэн чанар' },
    'about.v1.text':     { en: 'We work with materials that have genuine character — stone, timber, linen, plaster. We let them speak.', mn: 'Бид чулуу, мод, маалинцаг, шохойцог зэрэг жинхэнэ шинж чанартай материалтай ажилладаг. Тэдгээрт ярьах боломж олгодог.' },
    'about.v2.title':    { en: 'Spatial Clarity',  mn: 'Орон зайн тодорхой байдал' },
    'about.v2.text':     { en: 'Great interiors are defined by what is not there as much as what is. We value negative space as a design element.', mn: 'Гайхалтай дотоод засалыг байгаа зүйлээс ч илүү байхгүй зүйл тодорхойлдог. Бид хоосон орон зайг дизайны элемент болгон үнэлдэг.' },
    'about.v3.title':    { en: 'Human Scale',      mn: 'Хүний хэмжээс' },
    'about.v3.text':     { en: 'Every proportion, every surface, every object is considered in relation to the human body and human experience.', mn: 'Бүх харьцаа, бүх гадаргуу, бүх эдлэлийг хүний бие болон хүний туршлагатай уялдуулан тооцолддог.' },
    'about.v4.title':    { en: 'Timeless Restraint', mn: 'Цаг хугацааны бус зохицуулалт' },
    'about.v4.text':     { en: 'We resist trend. We design for permanence — spaces that will remain beautiful and relevant for decades.', mn: 'Бид трендийг тэсгэдэг. Бид тогтвортой зориулан дизайн хийдэг — арваад жилийн туршид гоё үзэсгэлэнтэй хэвээр байх орон зайнуудыг.' },

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
    'footer.nav.inquiry':  { en: 'Start Inquiry', mn: 'Лавлага илгээх' },
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
    'company.stat.years':{ en: '15 years',            mn: '15 жил' },
    'company.stat.desc.years': { en: 'Experience in the industry', mn: 'Салбартаа ажилсан туршлага' },
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
  var currentLang = localStorage.getItem(LANG_KEY) || 'en';

  /** Get translation value for a key */
  function t(key) {
    var entry = T[key];
    if (!entry) return null;
    return entry[currentLang] || entry['en'] || null;
  }

  /** Apply data-i18n="key" — updates text content, preserving child elements */
  function translateEl(el) {
    var key = el.getAttribute('data-i18n');
    if (!key) return;
    var val = t(key);
    if (val === null) return;

    // Find first text node and update it, preserving child elements (e.g. btn-arrow)
    var updated = false;
    for (var i = 0; i < el.childNodes.length; i++) {
      var node = el.childNodes[i];
      if (node.nodeType === 3 && node.nodeValue.trim() !== '') {
        node.nodeValue = val;
        updated = true;
        break;
      }
    }
    // If no text node found and no children, set textContent
    if (!updated && el.children.length === 0) {
      el.textContent = val;
    }
  }

  /** Apply data-en/data-mn="..." legacy inline attributes */
  function translateLegacyEl(el) {
    var val = el.getAttribute('data-' + currentLang);
    if (!val) {
      // fallback to en
      val = el.getAttribute('data-en');
    }
    if (!val) return;

    // Preserve child elements (btn-arrow spans etc.)
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

    // Legacy data-en / data-mn attributes (covers any remaining old markup)
    document.querySelectorAll('[data-en]').forEach(translateLegacyEl);

    // Process step bodies: the container has data-en/data-mn,
    // but the visible text is inside a <p> child — update the <p> too
    document.querySelectorAll('.process-step-body').forEach(function(el) {
      var val = el.getAttribute('data-' + currentLang) || el.getAttribute('data-en');
      if (!val) return;
      var p = el.querySelector('p');
      if (p) p.textContent = val;
    });

    // Update active state on all lang-btn elements
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
    // Subtle GSAP feedback animation on toggles
    if (window.gsap) {
      document.querySelectorAll('.lang-toggle-wrap').forEach(function(w) {
        gsap.fromTo(w, { scale: 0.88 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
      });
    }
  }

  /** Public API */
  window.VDi18n = {
    t: t,
    setLang: setLang,
    getLang: function() { return currentLang; },
    applyAll: applyAll,
    T: T
  };

  /* ─────────────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────────────── */
  function init() {
    // Wire all lang-btn elements
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setLang(this.getAttribute('data-lang'));
      });
    });
    // Apply saved language on load
    applyAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
