import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";

import { getSectorPrimaryHref, workSectors } from "../src/data/workSectors.js";

const page = readFileSync(new URL("../src/app/page.jsx", import.meta.url), "utf8");
const adminOpinionPage = readFileSync(new URL("../src/app/admin/opiniones/page.jsx", import.meta.url), "utf8");
const experiencePage = readFileSync(new URL("../src/app/experience/page.jsx", import.meta.url), "utf8");
const formPage = readFileSync(new URL("../src/app/form/page.jsx", import.meta.url), "utf8");
const experienceAdminComponent = readFileSync(new URL("../src/components/ExperienceAdmin.jsx", import.meta.url), "utf8");
const experienceComponent = readFileSync(new URL("../src/components/ExperienceSection.jsx", import.meta.url), "utf8");
const experienceData = readFileSync(new URL("../src/data/experienceReviews.js", import.meta.url), "utf8");
const contactData = readFileSync(new URL("../src/data/contact.js", import.meta.url), "utf8");
const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
const layout = readFileSync(new URL("../src/app/layout.jsx", import.meta.url), "utf8");

describe("clean portfolio baseline", () => {
  it("uses the modern portfolio sections as the new starting structure", () => {
    for (const id of ["about", "work", "services", "agenda", "process"]) {
      assert.match(page, new RegExp(`id="${id}"`));
    }
    assert.doesNotMatch(page, /<ExperiencePreview \/>/);
    assert.doesNotMatch(page, /href: "#experiencias"/);
    assert.doesNotMatch(page, /id="contact"/);
  });

  it("removed the previous globe intro implementation", () => {
    assert.doesNotMatch(page, /IntroSequence|DotMatrixGlobe|GlobeToMapTransform|PortfolioVideoGallery/);
    assert.doesNotMatch(css, /intro-v0|portfolio-v0|hero-globe-v0/);
  });

  it("uses Thiago Maneyro as the public name with a sharper hero value stack", () => {
    assert.match(page, /const name = "Thiago Maneyro"/);
    assert.match(layout, /Thiago Maneyro \| Portfolio/);
    assert.doesNotMatch(page, /Estructura inicial\. Copy pendiente\./);
    assert.match(page, /Agiliz[aá] tus procesos/);
    assert.match(page, /Mejor[aá] tu huella digital/);
    assert.match(page, /M[aá]s exposici[oó]n, m[aá]s ventas/);
    assert.doesNotMatch(page, /Desarrollo webs, e-commerce y sistemas a medida/);
    assert.match(page, /Soluciones digitales para mejorar la conversi[oó]n/);
    assert.match(page, /Agendar diagn[oó]stico/);
    assert.match(page, /Ver trabajos/);
    assert.match(page, /className="hero-values"/);
    assert.match(page, /hero-primary-cta/);
    assert.match(page, /hero-result-highlight/);
    assert.match(css, /hero-values[\s\S]*font-size: clamp\(2\.05rem/);
    assert.match(css, /hero-primary-cta/);
    assert.match(css, /hero-result-highlight/);
    assert.match(css, /#38bdf8/);
    assert.match(css, /hero-vertical-name/);
    assert.match(css, /--hero-profile-height: clamp\(360px, 56svh, 500px\)/);
    assert.match(css, /\.hero-vertical-name \{[\s\S]*min-height: var\(--hero-profile-height\)/);
    assert.match(css, /\.hero-profile-card \{[\s\S]*min-height: var\(--hero-profile-height\)/);
  });

  it("shows the commercial service offer instead of placeholder services", () => {
    assert.match(page, /Servicios que transforman tu negocio/);
    assert.match(page, /Desarrollo Web/);
    assert.match(page, /Landing Page/);
    assert.match(page, /E-Commerce/);
    assert.match(page, /Sistemas e IA/);
    assert.match(page, /Web institucional/);
    assert.match(page, /Cat[aá]logo/);
    assert.doesNotMatch(page, /"Portfolio", "Ecommerce", "Sistema"/);
    assert.doesNotMatch(page, /<p>Pendiente\\.<\/p>/);
    assert.match(page, /service\.description/);
  });

  it("turns the process into a conversion-focused five-step path", () => {
    for (const copy of [
      "Nos conocemos",
      "Entendemos el problema",
      "Planificamos y presupuestamos",
      "Trabajamos con comunicación real",
      "Entregamos y acompañamos",
    ]) {
      assert.match(page, new RegExp(copy));
    }

    assert.match(page, /entender tu negocio/);
    assert.match(page, /no construir por construir/);
    assert.match(page, /ideas visuales/);
    assert.match(page, /2 a 4 semanas/);
    assert.match(page, /mantenimiento y soporte/);
    assert.match(page, /HighlightedText/);
    assert.match(page, /process-hook-highlight/);
    assert.match(page, /activeProcessIndex/);
    assert.match(page, /activeProcess\.detail/);
    assert.match(page, /aria-expanded=\{isOpen\}/);
    assert.match(page, /process-book/);
    assert.match(page, /process-side-rail/);
    assert.match(page, /process-dark-panel/);
    assert.match(page, /process-card-grid/);
    assert.match(page, /process-mini-card/);
    assert.match(page, /process-detail-strip/);
    assert.match(page, /Proceso/);
    assert.match(page, /¿Cómo trabajamos\?/);
    assert.match(page, /Agendar una llamada/);
    assert.match(page, /href="#agenda"/);
    assert.match(css, /process-section/);
    assert.match(css, /process-book/);
    assert.match(css, /process-book[\s\S]*width: min\(1120px, calc\(100% - 48px\)\)/);
    assert.match(css, /process-side-rail/);
    assert.match(css, /process-dark-panel/);
    assert.match(css, /process-dark-panel[\s\S]*gap: clamp\(22px, 3svh, 38px\)/);
    assert.match(css, /process-mini-card[\s\S]*min-height: clamp\(188px, 22svh, 220px\)/);
    assert.match(css, /process-card-grid/);
    assert.match(css, /process-mini-card/);
    assert.match(css, /process-mini-card\[aria-expanded="true"\]/);
    assert.match(css, /process-detail-strip/);
    assert.match(css, /process-detail/);
    assert.match(css, /process-hook-highlight/);
    assert.match(css, /@keyframes process-hook-reveal/);
    assert.match(css, /background-size: 100% 0\.22em/);
    assert.doesNotMatch(css, /#06081d|#090d2b|#050716/);
    assert.doesNotMatch(page, /Por definir\./);
    assert.doesNotMatch(page, /herramienta escalable/);
  });

  it("places the process directly after services before asking for agenda", () => {
    assert.ok(
      page.indexOf('id="services"') < page.indexOf('id="process"'),
      "services should appear before process",
    );
    assert.ok(
      page.indexOf('id="process"') < page.indexOf('id="agenda"'),
      "process should appear before agenda",
    );
  });

  it("publishes real contact channels and a lightweight scheduling intake", () => {
    assert.match(contactData, /contactEmail = "tmaneyro@gmail\.com"/);
    assert.match(contactData, /contactPhoneHref = "tel:\+5491169004497"/);
    assert.match(contactData, /contactWhatsappHref = "https:\/\/wa\.me\/5491169004497"/);
    assert.match(page, /agendaForm/);
    assert.match(page, /agendaWhatsappHref/);
    assert.match(page, /agendaMailHref/);
    assert.match(page, /FloatingWhatsappButton/);
    assert.match(page, /aria-label="Escribir por WhatsApp"/);
    assert.match(page, /floating-whatsapp/);
    assert.match(page, /onInput=\{updateAgendaForm\}/);
    assert.match(page, /className="agenda-form/);
    assert.match(page, /Consulta inicial/);
    assert.match(page, /Agendemos una llamada simple/);
    assert.match(page, /15-20 minutos/);
    assert.match(page, /Enviar por email/);
    assert.match(css, /agenda-section/);
    assert.match(css, /agenda-form/);
    assert.match(css, /floating-whatsapp/);
    assert.match(css, /#25d366/);
  });

  it("keeps agenda as the single conversion section instead of duplicating contact", () => {
    assert.doesNotMatch(page, /Mandame el contexto y lo bajamos a tierra/);
    assert.doesNotMatch(page, /Qué mandarme/);
    assert.doesNotMatch(page, /contact-layout/);
    assert.doesNotMatch(page, /Contacto", href: "#contact"/);
    assert.doesNotMatch(css, /contact-section/);
    assert.doesNotMatch(css, /contact-brief/);
  });

  it("adds a client experience request form for review approval", () => {
    assert.doesNotMatch(page, /href: "#experiencias"/);
    assert.doesNotMatch(page, /<ExperiencePreview \/>/);
    assert.doesNotMatch(page, /Prueba social/);
    assert.doesNotMatch(page, /Pasarela de comentarios/);
    assert.doesNotMatch(page, /experience-request-form/);
    assert.match(page, /ExperiencePublicPreview/);
    assert.match(formPage, /ExperienceSection/);
    assert.match(formPage, /Dejar experiencia \| Thiago Maneyro/);
    assert.match(experiencePage, /ExperienceSection/);
    assert.match(experiencePage, /Volver al portfolio/);
    assert.match(experienceComponent, /Experiencias/);
    assert.match(experienceComponent, /ExperiencePreview/);
    assert.match(experienceComponent, /ExperiencePublicPreview/);
    assert.match(experienceComponent, /defaultExperienceForm/);
    assert.match(experienceComponent, /initialExperienceReviews/);
    assert.match(experienceComponent, /EXPERIENCE_PUBLIC_ENABLED_KEY/);
    assert.match(experienceComponent, /EXPERIENCE_REVIEWS_KEY/);
    assert.match(experienceComponent, /getVisibleExperienceReviews/);
    assert.match(experienceComponent, /isVisible: false/);
    assert.match(experienceComponent, /experienceForm/);
    assert.match(experienceComponent, /experienceReviews/);
    assert.match(experienceComponent, /selectedImages/);
    assert.match(experienceComponent, /experienceSubmission/);
    assert.match(experienceComponent, /updateExperienceForm/);
    assert.match(experienceComponent, /updateSelectedImages/);
    assert.match(experienceComponent, /buildExperienceLinks/);
    assert.match(experienceComponent, /document\.querySelectorAll\("#form \.animate-on-scroll"\)/);
    assert.match(experienceComponent, /classList\.add\("animate-in"\)/);
    assert.match(experienceComponent, /submitExperienceRequest/);
    assert.match(experienceComponent, /copyExperienceRequest/);
    assert.match(experienceComponent, /resetExperienceRequest/);
    assert.match(experienceComponent, /Solicitud de experiencia para el portfolio/);
    assert.match(experienceComponent, /URL del proyecto opcional/);
    assert.match(experienceComponent, /Fotos del proyecto/);
    assert.match(experienceComponent, /accept="image\/\*"/);
    assert.match(experienceComponent, /multiple name="photos"/);
    assert.match(experienceComponent, /Autorizo que Thiago revise este material/);
    assert.match(formPage, /href="\/"/);
    assert.match(experiencePage, /href="\/"/);
    assert.doesNotMatch(formPage, /\/#experiencias/);
    assert.doesNotMatch(experiencePage, /\/#experiencias/);
    assert.match(experienceComponent, /Preparar solicitud/);
    assert.match(experienceComponent, /Solicitud preparada/);
    assert.match(experienceComponent, /Enviar por WhatsApp/);
    assert.doesNotMatch(experienceComponent, /window\.open\(whatsappHref/);
    assert.doesNotMatch(experienceComponent, /Abrir WhatsApp/);
    assert.match(experienceComponent, /Copiar texto/);
    assert.match(experienceComponent, /experience-request-form/);
    assert.match(experienceComponent, /experience-delivery-panel/);
    assert.match(experienceComponent, /ExperienceReviewCarousel/);
    assert.match(experienceData, /tm-experience-reviews/);
    assert.match(experienceComponent, /Pasarela de reseñas/);
    assert.match(experienceComponent, /Pasarela de comentarios/);
    assert.match(experienceComponent, /La mejor reseña no es perfecta/);
    assert.match(experienceComponent, /Contá tu experiencia/);
    assert.match(experienceComponent, /Dejar experiencia/);
    assert.match(css, /experiences-home-section/);
    assert.match(css, /experiences-preview-hero/);
    assert.match(css, /experiences-layout/);
    assert.match(css, /experience-route-section/);
    assert.match(css, /experience-page-header/);
    assert.match(css, /experience-request-card/);
    assert.match(css, /experience-request-form/);
    assert.match(css, /experience-delivery-panel/);
    assert.match(css, /experience-delivery-actions/);
    assert.match(css, /experience-upload-zone/);
    assert.match(css, /experience-photo-preview/);
    assert.match(css, /experience-marquee/);
    assert.match(css, /experience-review-card/);
    assert.match(css, /experience-review-media/);
    assert.match(css, /@keyframes experience-marquee/);
    assert.doesNotMatch(experienceComponent, /Blog & Experiencias/);
    assert.doesNotMatch(experienceComponent, /Video testimonial/);
    assert.doesNotMatch(experienceComponent, /Enviar testimonio/);
    assert.doesNotMatch(css, /experience-video-frame/);
  });

  it("adds a local admin dashboard to publish or hide client opinions", () => {
    assert.match(adminOpinionPage, /ExperienceAdmin/);
    assert.match(adminOpinionPage, /Admin opiniones \| Thiago Maneyro/);
    assert.match(adminOpinionPage, /Volver al portfolio/);
    assert.match(experienceData, /EXPERIENCE_REVIEWS_KEY = "tm-experience-reviews"/);
    assert.match(experienceData, /EXPERIENCE_PUBLIC_ENABLED_KEY = "tm-experience-public-enabled"/);
    assert.match(experienceData, /defaultAdminReviewForm/);
    assert.match(experienceData, /normalizeExperienceReviews/);
    assert.match(experienceData, /getVisibleExperienceReviews/);
    assert.match(experienceAdminComponent, /Panel privado/);
    assert.match(experienceAdminComponent, /Opiniones/);
    assert.match(experienceAdminComponent, /Cargar opinión/);
    assert.match(experienceAdminComponent, /Mostrar opiniones/);
    assert.match(experienceAdminComponent, /Ocultar opiniones/);
    assert.match(experienceAdminComponent, /toggleReview/);
    assert.match(experienceAdminComponent, /deleteReview/);
    assert.match(experienceAdminComponent, /localStorage\.setItem\(EXPERIENCE_REVIEWS_KEY/);
    assert.match(experienceAdminComponent, /localStorage\.setItem\(EXPERIENCE_PUBLIC_ENABLED_KEY/);
    assert.match(experienceAdminComponent, /data-visible=\{review\.isVisible !== false\}/);
    assert.match(css, /admin-dashboard-section/);
    assert.match(css, /admin-publish-card/);
    assert.match(css, /admin-review-list/);
    assert.match(css, /public-experiences-section/);
    assert.match(css, /public-experience-intro/);
  });

  it("models work by business sector with the expected project folders", () => {
    assert.deepEqual(
      workSectors.map((sector) => sector.title),
      ["Software para Empresas", "E-commerce", "Inmobiliarias"],
    );

    assert.deepEqual(
      workSectors.map((sector) => sector.projects.map((project) => project.name)),
      [
        ["Club Amsterdam", "Panel Admin Club Amsterdam DEMO"],
        ["IG Detail"],
        ["Sebastian Esquivel Propiedades", "De Fazio Propiedades"],
      ],
    );
  });

  it("prepares every work project with live links, hero captures, and description space", () => {
    const softwareSector = workSectors.find((sector) => sector.id === "software-empresas");
    const ecommerceSector = workSectors.find((sector) => sector.id === "ecommerce");
    const realEstateSector = workSectors.find((sector) => sector.id === "inmobiliarias");

    assert.equal(getSectorPrimaryHref(softwareSector), "https://clubamsterdam.app/");
    assert.equal(getSectorPrimaryHref(ecommerceSector), "https://front-end-igdetailing-shop.vercel.app/");
    assert.equal(
      getSectorPrimaryHref(realEstateSector),
      "https://sebastian-esquivel-propiedades.vercel.app/",
    );

    assert.deepEqual(
      workSectors.flatMap((sector) => sector.projects.map((project) => project.href)),
      [
        "https://clubamsterdam.app/",
        "https://club-amsterdam-frontend-ionn7bhpi-maneyraos-projects.vercel.app/demo-admin?tab=agenda&date=2026-05-22&range=day",
        "https://front-end-igdetailing-shop.vercel.app/",
        "https://sebastian-esquivel-propiedades.vercel.app/",
        "https://landing-de-fazio.vercel.app/index.html",
      ],
    );

    for (const project of workSectors.flatMap((sector) => sector.projects)) {
      assert.match(project.cover, /^\/images\/work\/.+\.png$/);
      assert.doesNotMatch(project.description, /Espacio para escribir/);
      assert.ok(
        existsSync(new URL(`../public${project.cover}`, import.meta.url)),
        `${project.cover} should exist`,
      );
    }

    assert.match(softwareSector.projects[0].description, /Mat[ií]as Damonte/);
    assert.equal(softwareSector.projects[0].cover, "/images/work/club-amsterdam-public-agenda.png");
    assert.match(softwareSector.projects[1].description, /dashboard interno/);
    assert.match(softwareSector.projects[1].description, /hecho a medida/);
    assert.equal(softwareSector.projects[1].cover, "/images/work/club-amsterdam-admin-agenda.png");
    assert.match(ecommerceSector.projects[0].description, /negocio que estaba empezando desde cero/);
    assert.match(realEstateSector.projects[0].description, /servicio premium/);
    assert.match(realEstateSector.projects[1].description, /API de Xintel/);

    assert.match(page, /ProjectShowcase/);
    assert.match(page, /splitProjectDescription/);
    assert.match(page, /linear-project-showcase/);
    assert.match(page, /project-description-copy/);
    assert.match(page, /project\.cover/);
    assert.match(page, /project\.description/);
    assert.doesNotMatch(page, /window\.open\(href/);
    assert.match(css, /linear-project-showcase/);
    assert.match(css, /project-cover/);
    assert.match(css, /project-description-panel/);
    assert.match(css, /project-description-copy/);
  });

  it("uses the Linear card interaction structure for the work sectors", () => {
    assert.match(page, /linear-feature-grid/);
    assert.match(page, /linear-feature-card/);
    assert.match(page, /layoutId=.?{`feature-\${sector.id}`}/);
    assert.match(page, /linear-feature-modal/);
    assert.match(page, /onNavigate=\{setSelectedSectorId\}/);
    assert.match(page, /linear-modal-toolbar/);
    assert.match(page, /linear-modal-switcher/);
    assert.match(page, /Volver a rubros/);
    assert.match(page, /Siguiente/);
    assert.match(page, /aria-label=\{`Abrir casos de \${sector\.title}`\}/);
    assert.match(page, /linear-card-action/);
    assert.doesNotMatch(page, /<button aria-hidden="true" className="linear-plus-button"/);
    assert.match(css, /linear-work-section[\s\S]*padding: clamp\(54px, 7svh, 78px\)/);
    assert.match(css, /linear-work-section > \.container[\s\S]*1320px/);
    assert.match(css, /linear-feature-card[\s\S]*min-height: clamp\(320px, 40svh, 400px\)/);
    assert.match(css, /linear-card-action/);
    assert.match(css, /linear-feature-modal-shell[\s\S]*align-items: center/);
    assert.match(css, /linear-feature-modal[\s\S]*width: min\(1120px/);
    assert.match(css, /linear-feature-modal[\s\S]*border-radius: 22px/);
    assert.match(css, /linear-modal-toolbar/);
    assert.match(css, /linear-modal-switcher/);
  });

  it("re-observes scroll animated work cards after sector modal remounts", () => {
    assert.match(
      page,
      /document\.querySelectorAll\("\.animate-on-scroll"\)[\s\S]*observers\.observe\(element\)[\s\S]*\}, \[selectedSectorId\]\);/,
    );
  });

  it("keeps closed Linear cards visually faithful to the v0 template", () => {
    assert.doesNotMatch(page, /linear-card-kicker/);
    assert.doesNotMatch(page, /linear-card-projects/);
    assert.doesNotMatch(page, /linear-hover-label/);
    assert.match(page, /linear-plus-button/);
  });

  it("renders sector-specific visual scenes instead of generic placeholder art", () => {
    assert.deepEqual(
      workSectors.map((sector) => sector.visual),
      ["operations-dashboard", "commerce-checkout", "real-estate-blueprint"],
    );

    assert.match(page, /function SectorVisual/);
    assert.match(page, /sector-visual--software/);
    assert.match(page, /sector-visual--commerce/);
    assert.match(page, /sector-visual--real-estate/);
    assert.doesNotMatch(page, /<img src=\{sector\.illustration\}/);
    assert.match(css, /sector-visual/);
    assert.match(css, /software-window/);
    assert.match(css, /commerce-product/);
    assert.match(css, /estate-building/);
  });

  it("turns the TM hero block into an interactive about card with smooth modal content", () => {
    assert.match(page, /hero-profile-card/);
    assert.match(page, /layoutId="about-profile-card"/);
    assert.match(page, /AboutProfileModal/);
    assert.match(page, /Soy Thiago Maneyro, desarrollador de software/);
    assert.doesNotMatch(page, /Versi[oó]n m[aá]s corta y m[aá]s fuerte/);
    assert.doesNotMatch(page, /aboutProfileStrong/);
    assert.doesNotMatch(css, /about-profile-strong/);
    assert.match(css, /hero-profile-card:hover/);
    assert.match(css, /about-profile-modal/);
  });
});
