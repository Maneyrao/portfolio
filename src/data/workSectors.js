export const workSectors = [
  {
    id: "software-empresas",
    index: "01",
    title: "Software para Empresas",
    label: "Sistemas internos",
    visual: "operations-dashboard",
    href: "",
    projects: [
      {
        name: "Club Amsterdam",
        type: "Sistema de reservas",
        href: "https://clubamsterdam.app/",
        cover: "/images/work/club-amsterdam-public-agenda.png",
        description:
          "Club Amsterdam tenía una barbería con una identidad muy cuidada: personalizada, distinta y pensada al detalle. El problema era que su sistema de reservas no acompañaba esa marca. Era genérico, poco memorable y no ayudaba a que el cliente sintiera la misma calidad desde el primer contacto. Me reuní con Matías Damonte para entender cómo trabajaban, qué necesitaban ordenar y qué experiencia querían darle a sus clientes. A partir de eso diseñamos y desarrollamos un sistema de reservas cómodo, intuitivo y completamente adaptado a la estética de Club Amsterdam. También creamos un dashboard administrativo para que Mati y Rodri puedan gestionar turnos, servicios y disponibilidad desde un solo lugar, sin depender de herramientas externas ni procesos manuales.",
      },
      {
        name: "Panel Admin Club Amsterdam DEMO",
        type: "Dashboard administrativo",
        href: "https://club-amsterdam-frontend-ionn7bhpi-maneyraos-projects.vercel.app/demo-admin?tab=agenda&date=2026-05-22&range=day",
        cover: "/images/work/club-amsterdam-admin-agenda.png",
        description:
          "Demo del panel administrativo hecho a medida para Club Amsterdam. Es un dashboard interno pensado para que los dueños puedan ver la agenda por día, revisar reservas, ordenar turnos, servicios y disponibilidad desde un mismo lugar. El objetivo no fue sumar una pantalla más, sino bajar la fricción de la operación diaria: menos planillas, menos mensajes sueltos y más control sobre lo que pasa en el negocio. La interfaz acompaña la identidad de la marca y muestra cómo una herramienta interna también puede sentirse cuidada, rápida y profesional.",
      },
    ],
  },
  {
    id: "ecommerce",
    index: "02",
    title: "E-commerce",
    label: "Tiendas y catalogos",
    visual: "commerce-checkout",
    href: "",
    projects: [
      {
        name: "IG Detail",
        type: "E-commerce",
        href: "https://front-end-igdetailing-shop.vercel.app/",
        cover: "/images/work/ig-detail-hero.png",
        description:
          "IG Detail era un negocio que estaba empezando desde cero y necesitaba un espacio digital para presentar y vender sus productos de forma profesional. Después de reunirnos y analizar distintas opciones de diseño, definimos una identidad visual equilibrada: moderna, clara y alineada con el tipo de producto que la marca quería vender. El proyecto permitió instalar una primera presencia digital sólida, con una estética propia, colores definidos y una estructura preparada para mostrar productos, generar confianza y facilitar el contacto con potenciales clientes.",
      },
    ],
  },
  {
    id: "inmobiliarias",
    index: "03",
    title: "Inmobiliarias",
    label: "Portales y landings",
    visual: "real-estate-blueprint",
    href: "https://sebastian-esquivel-propiedades.vercel.app/",
    projects: [
      {
        name: "Sebastian Esquivel Propiedades",
        type: "Web Institucional",
        href: "https://sebastian-esquivel-propiedades.vercel.app/",
        cover: "/images/work/sebastian-esquivel-hero.png",
        description:
          "Sebastián Esquivel Propiedades tenía un problema claro: ofrecía un servicio premium, pero su presencia digital no transmitía esa calidad. El objetivo fue construir una web que estuviera a la altura de su forma de trabajar. Buscamos una dirección visual más elegante, cuidada y profesional, donde el diseño, las animaciones y la estructura ayudaran a comunicar confianza, detalle y valor. La página fue pensada para que el usuario perciba desde el primer momento que está frente a un servicio inmobiliario serio, de alta calidad y con una atención diferenciada.",
      },
      {
        name: "De Fazio Propiedades",
        type: "Landing inmobiliaria",
        href: "https://landing-de-fazio.vercel.app/index.html",
        cover: "/images/work/de-fazio-hero.png",
        description:
          "De Fazio tenía una página institucional desarrollada en 2017 que ya no representaba el nivel actual de la inmobiliaria ni respondía a los estándares digitales de hoy. Nos reunimos en persona para entender los objetivos, revisar las limitaciones de la web anterior y definir una nueva dirección. El proyecto incluyó un rediseño completo, respetando la identidad visual, los colores y el logo solicitados por Adrián. También integramos la API de Xintel, una herramienta clave para el rubro inmobiliario, permitiendo mostrar propiedades de forma más ordenada, dinámica y profesional. El resultado fue una web moderna, más clara y más alineada con la marca: una presencia digital que mejora la experiencia del usuario y le da a De Fazio una imagen más actual, sólida y confiable.",
      },
    ],
  },
];

export function getSectorPrimaryHref(sector) {
  return sector.href || sector.projects.find((project) => project.href)?.href || "";
}

export function sectorHasLink(sector) {
  return Boolean(getSectorPrimaryHref(sector));
}
