"use client";

import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowUpRight, Bot, Code2, LayoutTemplate, Menu, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ExperiencePublicPreview } from "../components/ExperienceSection.jsx";
import { contactEmail, contactPhoneDisplay, contactPhoneHref, contactWhatsappHref } from "../data/contact.js";
import { getSectorPrimaryHref, sectorHasLink, workSectors } from "../data/workSectors.js";

const navItems = [
  { label: "Perfil", href: "#about" },
  { label: "Trabajos", href: "#work" },
  { label: "Servicios", href: "#services" },
  { label: "Proceso", href: "#process" },
  { label: "Agenda", href: "#agenda" },
];

const motionSpring = { type: "spring", stiffness: 120, damping: 20, duration: 1.2 };
const serviceSlots = [
  {
    accent: "cyan",
    description:
      "Web institucional, portfolio, landing, e-commerce y sitios a medida con SEO técnico, performance y estructura comercial clara.",
    icon: Code2,
    tags: ["Web institucional", "Portfolio", "SEO"],
    title: "Desarrollo Web",
  },
  {
    accent: "blue",
    description:
      "Páginas para campañas o lanzamientos: una oferta, un CTA y recorrido pensado para convertir visitas en consultas.",
    icon: LayoutTemplate,
    tags: ["Landing", "Lead gen", "WhatsApp"],
    title: "Landing Page",
  },
  {
    accent: "cyan",
    description:
      "Tiendas online y catálogos digitales con productos, combos, consultas por WhatsApp y estructura lista para pagos.",
    icon: ShoppingBag,
    tags: ["E-commerce", "Catálogo", "Checkout ready"],
    title: "E-Commerce",
  },
  {
    accent: "violet",
    badge: "+ IA",
    description:
      "Reservas, CRM liviano, dashboards y automatizaciones con IA para ordenar tareas, bajar trabajo manual y responder más rápido.",
    icon: Bot,
    tags: ["CRM", "Reservas", "Automatización"],
    title: "Sistemas e IA",
  },
];
const processSlots = [
  {
    number: "01",
    title: "Nos conocemos",
    summary: "Una llamada para alinear negocio, persona y confianza antes de construir.",
    detail: [
      {
        highlights: ["entender tu negocio", "necesidad real detrás del proyecto", "herramienta tan importante"],
        text: "Empezamos con una llamada para entender tu negocio, tu idea y la necesidad real detrás del proyecto. Me parece fundamental conocernos para que sepas qué tipo de persona estará desarrollando una herramienta tan importante para tu negocio.",
      },
      {
        highlights: ["no se trata solo de crear software", "confianza, la claridad y los valores"],
        text: "No se trata solo de crear software, sino de acompañarte a construir una herramienta que tenga sentido, que se pueda usar y que ayude a impulsar tu negocio. Para mí, Thiago, la confianza, la claridad y los valores con los que trabajamos son la base de cualquier buen proyecto.",
      },
    ],
  },
  {
    number: "02",
    title: "Entendemos el problema",
    summary: "Detectamos qué solución puede aportar más valor al negocio.",
    detail: [
      {
        highlights: ["ahorrar tiempo", "ordenar procesos", "vender más", "automatizar tareas", "escalar una operación"],
        text: "Antes de proponer una solución, buscamos entender qué querés mejorar: ahorrar tiempo, ordenar procesos, vender más, automatizar tareas, mejorar la experiencia de tus clientes o escalar una operación que hoy depende demasiado de trabajo manual.",
      },
      {
        highlights: ["no construir por construir", "aportar más valor"],
        text: "El objetivo es no construir por construir, sino detectar qué solución puede aportar más valor y qué problema conviene resolver primero.",
      },
    ],
  },
  {
    number: "03",
    title: "Planificamos y presupuestamos",
    summary: "Opciones claras, recomendación concreta y decisión con contexto.",
    detail: [
      {
        highlights: ["propuesta de trabajo", "opciones posibles", "presupuesto alineado"],
        text: "Con el contexto claro, presentamos una propuesta de trabajo con opciones posibles, una recomendación concreta y un presupuesto alineado al alcance del proyecto.",
      },
      {
        highlights: ["ideas visuales", "pre-desarrolladas", "decisión con claridad"],
        text: "También mostramos primeros ejemplos o ideas visuales y pre-desarrolladas de cómo podría verse o funcionar la solución, para que tomes la decisión con claridad antes de avanzar.",
      },
    ],
  },
  {
    number: "04",
    title: "Trabajamos con comunicación real",
    summary: "Avances desde la primera semana, transparencia y foco.",
    detail: [
      {
        highlights: ["transparencia es fundamental", "primera semana ya presentamos avances"],
        text: "Una vez iniciado el proyecto, la transparencia es fundamental. Durante la primera semana ya presentamos avances y mantenemos una comunicación clara sobre qué se está haciendo, por qué y en qué etapa estamos.",
      },
      {
        highlights: ["2 a 4 semanas", "desarrollo, ajustes y pruebas finales"],
        text: "Cada proyecto tiene su complejidad, pero normalmente trabajamos con plazos de 2 a 4 semanas entre acuerdo, desarrollo, ajustes y pruebas finales.",
      },
    ],
  },
  {
    number: "05",
    title: "Entregamos y acompañamos",
    summary: "Publicamos, damos soporte y sostenemos la evolución de la herramienta.",
    detail: [
      {
        highlights: ["no termina cuando el proyecto está online", "mantenimiento y soporte"],
        text: "La entrega no termina cuando el proyecto está online. También ofrecemos mantenimiento y soporte para realizar ajustes, resolver errores y acompañar la evolución de la herramienta una vez que empieza a usarse en el negocio real.",
      },
      {
        highlights: ["se mejora, se adapta y se sostiene"],
        text: "Porque una buena solución no solo se desarrolla: también se mejora, se adapta y se sostiene.",
      },
    ],
  },
];
const defaultAgendaForm = {
  brief: "",
  email: "",
  name: "",
  phone: "",
  project: "",
  time: "",
};
const aboutProfileLong = [
  "Soy Thiago Maneyro, desarrollador de software enfocado en crear soluciones digitales que ayudan a negocios, marcas y profesionales a optimizar procesos, mejorar su presencia online y adaptarse a las nuevas reglas del mercado.",
  "Mi trabajo combina desarrollo web, automatización, inteligencia artificial y análisis de datos con una mirada estratégica de negocio. Ayudo a implementar herramientas digitales que facilitan el día a día, reducen tareas manuales y permiten tomar mejores decisiones.",
  "Además del desarrollo técnico, también me enfoco en construir una presencia digital sólida mediante diseños modernos, funcionales y adaptados a cada rubro. Mi objetivo no es solo crear una herramienta, sino desarrollar soluciones que realmente aporten valor, transmitan confianza y acompañen el crecimiento del negocio.",
  "Trabajo principalmente con emprendedores, profesionales independientes y pymes que necesitan profesionalizarse, ordenar sus procesos o mejorar su forma de vender y comunicarse en el entorno digital.",
  "Me gusta trabajar con comunicación clara, compromiso real y responsabilidad en cada etapa del proyecto. Para mí, la transparencia, el cumplimiento y la ética laboral son fundamentales.",
  "Actualmente trabajo con tecnologías como Next.js, React, Tailwind CSS, FastAPI, PostgreSQL, Supabase, Railway, Vercel e integraciones con herramientas de inteligencia artificial.",
];

function Icon({ name }) {
  if (name === "menu") {
    return <Menu size={24} strokeWidth={2} />;
  }

  if (name === "close") {
    return <X size={20} strokeWidth={2} />;
  }

  if (name === "plus") {
    return <Plus size={18} strokeWidth={2} />;
  }

  return <ArrowUpRight size={18} strokeWidth={2} />;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedText({ highlights = [], text }) {
  if (highlights.length === 0) return text;

  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join("|")})`, "gi");

  return text.split(pattern).map((part, index) => {
    const isHighlighted = highlights.some((highlight) => highlight.toLowerCase() === part.toLowerCase());

    if (!isHighlighted) return part;

    return (
      <strong className="process-hook-highlight" key={`${part}-${index}`}>
        <u>{part}</u>
      </strong>
    );
  });
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("Thiago Maneyro");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [selectedSectorId, setSelectedSectorId] = useState(null);
  const [agendaForm, setAgendaForm] = useState(defaultAgendaForm);
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const name = "Thiago Maneyro";
  const selectedSector = workSectors.find((sector) => sector.id === selectedSectorId);
  const activeProcess = processSlots[activeProcessIndex] ?? processSlots[0];
  const agendaMessage = encodeURIComponent(
    `Hola Thiago, quiero agendar una llamada por un proyecto.

Nombre: ${agendaForm.name || "Sin completar"}
Telefono: ${agendaForm.phone || "Sin completar"}
Email: ${agendaForm.email || "Sin completar"}
Tipo de proyecto: ${agendaForm.project || "Sin completar"}
Horario preferido: ${agendaForm.time || "Sin completar"}
Detalle: ${agendaForm.brief || "Sin completar"}`,
  );
  const agendaWhatsappHref = `${contactWhatsappHref}?text=${agendaMessage}`;
  const agendaMailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
    "Consulta por proyecto",
  )}&body=${agendaMessage}`;
  useEffect(() => {
    const observers = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );

    document.querySelectorAll(".animate-on-scroll").forEach((element) => observers.observe(element));

    return () => observers.disconnect();
  }, [selectedSectorId]);

  useEffect(() => {
    if (typedText.length >= name.length) return;

    const timer = window.setTimeout(() => {
      setTypedText(name.slice(0, typedText.length + 1));
    }, 95);

    return () => window.clearTimeout(timer);
  }, [name, typedText]);

  useEffect(() => {
    if (!aboutOpen && !selectedSector) return;

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setAboutOpen(false);
      setSelectedSectorId(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aboutOpen, selectedSector]);

  const closeMenu = () => setMobileMenuOpen(false);
  const updateAgendaForm = (event) => {
    const { name: fieldName, value } = event.target;
    setAgendaForm((current) => ({ ...current, [fieldName]: value }));
  };

  return (
    <>
      <header className="site-header">
        <div className="container">
          <nav className="site-nav">
            <a className="logo" href="#about" aria-label="Inicio">
              TM
            </a>

            <div className="nav-links">
              {navItems.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </div>

            <a className="desktop-cta" href="#agenda">
              Agendar llamada
              <Icon />
            </a>

            <button
              aria-label="Abrir menu"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen((open) => !open)}
              type="button"
            >
              <Icon name={mobileMenuOpen ? "close" : "menu"} />
            </button>
          </nav>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section className="hero animate-on-scroll" id="about">
          <div className="container">
            <div className="hero-layout">
              <div className="hero-vertical-name" aria-label={name}>
                {typedText}
                {typedText.length < name.length && <span className="typing-cursor">|</span>}
              </div>

              <div className="hero-content-wrapper">
                <div className="hero-image-container">
                  <div className="hero-image-bg" />
                  {!aboutOpen && <HeroProfileCard onOpen={() => setAboutOpen(true)} />}
                </div>

                <div className="hero-content">
                  <span className="hero-role">Desarrollo web, e-commerce, sistemas e IA</span>
                  <h1
                    className="hero-values"
                    aria-label="Agilizá tus procesos, mejorá tu huella digital, más exposición y más ventas"
                  >
                    <span>Agilizá tus procesos</span>
                    <span>Mejorá tu huella digital</span>
                    <span className="hero-result-highlight">Más exposición, más ventas</span>
                  </h1>
                  <p className="hero-subcopy">
                    Soluciones digitales para mejorar la conversión, sumar tickets y fortalecer tu marca adoptando
                    tecnologías actuales.
                  </p>
                  <div className="hero-actions">
                    <a className="hero-primary-cta" href="#agenda">
                      Agendar diagnóstico
                      <Icon />
                    </a>
                    <a className="hero-secondary-cta" href="#work">
                      Ver trabajos
                    </a>
                  </div>
                  <div className="hero-location">Next.js · React · FastAPI · Supabase · Vercel · IA</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee-wrapper" aria-hidden="true">
          <div className="marquee-content">
            {[0, 1].map((track) => (
              <div className="marquee-text" key={track}>
                <span>Portfolio</span>
                <span className="marquee-dot">/</span>
                <span>Development</span>
                <span className="marquee-dot">/</span>
                <span>Ecommerce</span>
                <span className="marquee-dot">/</span>
                <span>Systems</span>
                <span className="marquee-dot">/</span>
              </div>
            ))}
          </div>
        </div>

        <section className="section linear-work-section" id="work">
          <div className="container">
            <SectionHeader eyebrow="Casos por rubro" title="Work" />

            <div className="linear-feature-grid">
              {workSectors.map((sector) => (
                <div className="linear-feature-slot" key={sector.id}>
                  {selectedSectorId !== sector.id && (
                    <WorkSectorCard
                      onSelect={setSelectedSectorId}
                      sector={sector}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container services-container">
            <div className="services-heading animate-on-scroll">
              <span className="section-eyebrow">Qué puedo construir</span>
              <h2>Servicios que transforman tu negocio</h2>
              <p>
                Soluciones digitales para emprendedores, profesionales y pymes que necesitan vender mejor, ordenar
                procesos o verse más confiables online.
              </p>
            </div>

            <div className="services-grid">
              {serviceSlots.map((service) => {
                const ServiceIcon = service.icon;

                return (
                  <article
                    className={`service-card service-card-${service.accent} animate-on-scroll`}
                    key={service.title}
                  >
                    {service.badge && <em className="service-badge">{service.badge}</em>}
                    <div className="service-icon-tile" aria-hidden="true">
                      <ServiceIcon size={34} strokeWidth={2.1} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="service-tags" aria-label={`Incluye ${service.title}`}>
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="container process-book">
            <aside className="process-side-rail" aria-hidden="true">
              <span>Proceso</span>
              <span>Decisión</span>
              <span>Producción</span>
            </aside>

            <div className="process-dark-panel animate-on-scroll">
              <div className="process-dark-header">
                <div>
                  <span className="process-kicker">
                    <span aria-hidden="true" />
                    Proceso
                  </span>
                  <h2>¿Cómo trabajamos?</h2>
                </div>
                <span className="process-header-line" aria-hidden="true" />
              </div>

              <div className="process-card-grid">
                {processSlots.map((process, index) => {
                  const isOpen = activeProcessIndex === index;

                  return (
                    <button
                      aria-controls="process-active-detail"
                      aria-expanded={isOpen}
                      className="process-mini-card"
                      key={process.title}
                      onClick={() => setActiveProcessIndex(index)}
                      type="button"
                    >
                      <span className="process-mini-number">{process.number}.</span>
                      <h3>{process.title}</h3>
                      <p>{process.summary}</p>
                    </button>
                  );
                })}
              </div>

              <div className="process-detail-strip">
                <div className="process-proof-cluster" aria-hidden="true">
                  <span>TM</span>
                  <span>UX</span>
                  <span>IA</span>
                  <span>OK</span>
                </div>

                <AnimatePresence mode="wait">
                  <Motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="process-strip-copy"
                    exit={{ opacity: 0, y: 8 }}
                    id="process-active-detail"
                    initial={{ opacity: 0, y: 8 }}
                    key={activeProcess.number}
                    transition={{ duration: 0.24 }}
                  >
                    <span>Etapa {activeProcess.number}</span>
                    <div className="process-detail">
                      {activeProcess.detail.map((paragraph) => (
                        <p key={paragraph.text}>
                          <HighlightedText highlights={paragraph.highlights} text={paragraph.text} />
                        </p>
                      ))}
                    </div>
                  </Motion.div>
                </AnimatePresence>

                <a className="process-strip-cta" href="#agenda">
                  Agendar una llamada
                  <Icon />
                </a>
              </div>
            </div>
          </div>
        </section>

        <ExperiencePublicPreview />

        <section className="section agenda-section" id="agenda">
          <div className="container agenda-layout">
            <div className="agenda-copy animate-on-scroll">
              <span className="section-eyebrow">Consulta inicial</span>
              <h2>Agendemos una llamada simple</h2>
              <p>
                En 15-20 minutos revisamos qué necesitás, qué conviene construir primero y si tiene sentido avanzar.
                Si encaja, te paso una propuesta clara con alcance y próximos pasos.
              </p>
              <div className="agenda-direct-links">
                <a href={contactPhoneHref}>{contactPhoneDisplay}</a>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </div>
            </div>

            <div className="agenda-form-card animate-on-scroll">
              <form className="agenda-form" onSubmit={(event) => event.preventDefault()}>
                <label>
                  <span>Nombre</span>
                  <input
                    name="name"
                    onChange={updateAgendaForm}
                    onInput={updateAgendaForm}
                    placeholder="Tu nombre"
                    type="text"
                    value={agendaForm.name}
                  />
                </label>
                <label>
                  <span>WhatsApp</span>
                  <input
                    name="phone"
                    onChange={updateAgendaForm}
                    onInput={updateAgendaForm}
                    placeholder="+54 9..."
                    type="tel"
                    value={agendaForm.phone}
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    name="email"
                    onChange={updateAgendaForm}
                    onInput={updateAgendaForm}
                    placeholder="tu@mail.com"
                    type="email"
                    value={agendaForm.email}
                  />
                </label>
                <label>
                  <span>Proyecto</span>
                  <input
                    name="project"
                    onChange={updateAgendaForm}
                    onInput={updateAgendaForm}
                    placeholder="Web, e-commerce, sistema, IA..."
                    type="text"
                    value={agendaForm.project}
                  />
                </label>
                <label>
                  <span>Cuándo te queda cómodo</span>
                  <input
                    name="time"
                    onChange={updateAgendaForm}
                    onInput={updateAgendaForm}
                    placeholder="Ej: martes a la tarde"
                    type="text"
                    value={agendaForm.time}
                  />
                </label>
                <label className="agenda-form-wide">
                  <span>Qué necesitás resolver</span>
                  <textarea
                    name="brief"
                    onChange={updateAgendaForm}
                    onInput={updateAgendaForm}
                    placeholder="Contame brevemente qué querés construir o mejorar."
                    value={agendaForm.brief}
                  />
                </label>

                <div className="agenda-actions">
                  <a href={agendaWhatsappHref} rel="noreferrer" target="_blank">
                    Enviar por WhatsApp
                    <Icon />
                  </a>
                  <a href={agendaMailHref}>
                    Enviar por email
                    <Icon />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>

      </main>

      <FloatingWhatsappButton />

      <AnimatePresence>
        {aboutOpen && <AboutProfileModal onClose={() => setAboutOpen(false)} />}
        {selectedSector && (
          <SectorModal
            key={selectedSector.id}
            onClose={() => setSelectedSectorId(null)}
            onNavigate={setSelectedSectorId}
            sector={selectedSector}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function FloatingWhatsappButton() {
  const message = encodeURIComponent("Hola Thiago, vi tu portfolio y quiero hablar sobre un proyecto.");
  const href = `${contactWhatsappHref}?text=${message}`;

  return (
    <a
      aria-label="Escribir por WhatsApp"
      className="floating-whatsapp"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <span className="floating-whatsapp-icon" aria-hidden="true">
        W
      </span>
      <span className="floating-whatsapp-copy">WhatsApp</span>
    </a>
  );
}

function HeroProfileCard({ onOpen }) {
  return (
    <Motion.button
      aria-label="Abrir perfil de Thiago Maneyro"
      className="hero-profile-card"
      layoutId="about-profile-card"
      onClick={onOpen}
      transition={motionSpring}
      type="button"
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="hero-profile-grain" aria-hidden="true" />
      <Motion.span className="hero-profile-initials" layoutId="about-profile-initials">
        TM
      </Motion.span>
      <span className="hero-profile-meta">
        <span>About</span>
        <span className="hero-profile-plus">
          <Icon name="plus" />
        </span>
      </span>
    </Motion.button>
  );
}

function WorkSectorCard({ onSelect, sector }) {
  const hasLink = sectorHasLink(sector);

  const handleSelect = () => {
    onSelect(sector.id);
  };

  return (
    <Motion.button
      aria-label={`Abrir casos de ${sector.title}`}
      className="linear-feature-card animate-on-scroll"
      data-has-link={hasLink ? "true" : "false"}
      layoutId={`feature-${sector.id}`}
      onClick={handleSelect}
      transition={motionSpring}
      type="button"
    >
      <span aria-hidden="true" className="linear-plus-button">
        <Icon name="plus" />
      </span>

      <Motion.div className="linear-card-illustration" layoutId={`illustration-${sector.id}`}>
        <SectorVisual visual={sector.visual} />
      </Motion.div>

      <div className="linear-card-body">
        <Motion.h3 className="linear-card-title" layoutId={`title-${sector.id}`}>
          {sector.title}
        </Motion.h3>
        <span className="linear-card-action">Ver casos</span>
      </div>
    </Motion.button>
  );
}

function SectorVisual({ visual }) {
  if (visual === "commerce-checkout") {
    return (
      <div aria-hidden="true" className="sector-visual sector-visual--commerce">
        <span className="commerce-card commerce-card--primary">
          <span />
          <span />
          <span />
        </span>
        <span className="commerce-card commerce-card--secondary">
          <span />
          <span />
        </span>
        <span className="commerce-product commerce-product--one" />
        <span className="commerce-product commerce-product--two" />
        <span className="commerce-bag">
          <span />
        </span>
        <span className="commerce-total">
          <span />
          <span />
        </span>
      </div>
    );
  }

  if (visual === "real-estate-blueprint") {
    return (
      <div aria-hidden="true" className="sector-visual sector-visual--real-estate">
        <span className="estate-blueprint-grid" />
        <span className="estate-building">
          <span />
          <span />
          <span />
        </span>
        <span className="estate-floorplan">
          <span />
          <span />
          <span />
        </span>
        <span className="estate-key" />
        <span className="estate-pin" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="sector-visual sector-visual--software">
      <span className="software-window software-window--main">
        <span />
        <span />
        <span />
      </span>
      <span className="software-window software-window--ghost" />
      <span className="software-window software-window--panel" />
      <span className="software-table">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="software-automation-line" />
      <span className="software-node software-node--one" />
      <span className="software-node software-node--two" />
    </div>
  );
}

function SectorModal({ onClose, onNavigate, sector }) {
  const href = getSectorPrimaryHref(sector);
  const hasLink = sectorHasLink(sector);
  const currentIndex = workSectors.findIndex((workSector) => workSector.id === sector.id);
  const previousSector = workSectors[(currentIndex - 1 + workSectors.length) % workSectors.length];
  const nextSector = workSectors[(currentIndex + 1) % workSectors.length];

  return (
    <>
      <Motion.button
        aria-label="Cerrar detalle de rubro"
        className="linear-feature-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        type="button"
      />

      <div className="linear-feature-modal-shell">
        <Motion.article
          className="linear-feature-modal"
          layoutId={`feature-${sector.id}`}
          onClick={(event) => event.stopPropagation()}
          transition={motionSpring}
        >
          <div className="linear-modal-toolbar">
            <button className="linear-modal-back" onClick={onClose} type="button">
              Volver a rubros
            </button>

            <div className="linear-modal-switcher" aria-label="Cambiar rubro de trabajo">
              <button
                aria-label={`Ver ${previousSector.title}`}
                onClick={() => onNavigate(previousSector.id)}
                type="button"
              >
                Anterior
              </button>
              <button aria-label={`Ver ${nextSector.title}`} onClick={() => onNavigate(nextSector.id)} type="button">
                Siguiente
              </button>
            </div>

            <button aria-label="Cerrar" className="linear-modal-close" onClick={onClose} type="button">
              <Icon name="close" />
            </button>
          </div>

          <Motion.div
            className="linear-modal-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.32, duration: 0.38 }}
          >
            <div className="linear-modal-hero">
              <Motion.div className="linear-modal-illustration" layoutId={`illustration-${sector.id}`}>
                <SectorVisual visual={sector.visual} />
              </Motion.div>

              <div className="linear-modal-heading">
                <span>{sector.label}</span>
                <Motion.h2 layoutId={`title-${sector.id}`}>{sector.title}</Motion.h2>
                <p>Casos reales ordenados por rubro. Podés leer el contexto, abrir cada proyecto o pasar al siguiente sector sin cerrar esta vista.</p>
              </div>
            </div>

            <ProjectShowcase projects={sector.projects} />

            <div className="linear-modal-footer">
              <button className="linear-modal-back" onClick={onClose} type="button">
                Volver a trabajos
              </button>

              <a
                aria-disabled={!hasLink}
                className="linear-modal-cta"
                href={hasLink ? href : undefined}
                onClick={(event) => {
                  if (!hasLink) event.preventDefault();
                }}
                rel={hasLink ? "noreferrer" : undefined}
                target={hasLink ? "_blank" : undefined}
              >
                {hasLink ? "Abrir proyecto destacado" : "Agregar link despues"}
                <Icon />
              </a>
            </div>
          </Motion.div>
        </Motion.article>
      </div>
    </>
  );
}

function splitProjectDescription(description) {
  if (!description) return ["Espacio para escribir la descripción del proyecto."];

  const sentences = description.match(/[^.!?]+[.!?]+/g) ?? [description];
  const paragraphs = [];

  for (let index = 0; index < sentences.length; index += 2) {
    paragraphs.push(sentences.slice(index, index + 2).join(" ").trim());
  }

  return paragraphs;
}

function ProjectShowcase({ projects }) {
  return (
    <div className="linear-project-showcase">
      {projects.map((project) => (
        <article className="project-case-card" key={project.name}>
          {project.cover && (
            <a className="project-cover" href={project.href} rel="noreferrer" target="_blank">
              <img src={project.cover} alt={`Hero de ${project.name}`} />
            </a>
          )}

          <div className="project-description-panel">
            <div>
              <span>{project.type}</span>
              <h3>{project.name}</h3>
            </div>
            <div className="project-description-copy">
              {splitProjectDescription(project.description).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {project.href && (
              <a className="project-case-link" href={project.href} rel="noreferrer" target="_blank">
                Ver proyecto
                <Icon />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function AboutProfileModal({ onClose }) {
  return (
    <>
      <Motion.button
        aria-label="Cerrar perfil de Thiago Maneyro"
        className="about-profile-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        type="button"
      />

      <div className="about-profile-modal-shell">
        <Motion.article
          aria-labelledby="about-profile-title"
          aria-modal="true"
          className="about-profile-modal"
          layoutId="about-profile-card"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          transition={motionSpring}
        >
          <button aria-label="Cerrar" className="about-profile-close" onClick={onClose} type="button">
            <Icon name="close" />
          </button>

          <div className="about-profile-modal-header">
            <Motion.span className="about-profile-modal-initials" layoutId="about-profile-initials">
              TM
            </Motion.span>
            <div>
              <span className="section-eyebrow">About</span>
              <h2 id="about-profile-title">Thiago Maneyro</h2>
            </div>
          </div>

          <Motion.div
            className="about-profile-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.26, duration: 0.42 }}
          >
            <div className="about-profile-text-flow">
              {aboutProfileLong.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Motion.div>
        </Motion.article>
      </div>
    </>
  );
}

function SectionHeader({ eyebrow, title }) {
  return (
    <div className="section-header animate-on-scroll">
      <div>
        <span className="section-eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      <a className="view-all" href="#agenda">
        Agendar llamada
        <Icon />
      </a>
    </div>
  );
}
