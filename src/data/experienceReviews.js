export const EXPERIENCE_REVIEWS_KEY = "tm-experience-reviews";
export const EXPERIENCE_PUBLIC_ENABLED_KEY = "tm-experience-public-enabled";

export const defaultExperienceForm = {
  challenge: "",
  company: "",
  firstName: "",
  lastName: "",
  outcome: "",
  permission: false,
  projectUrl: "",
  review: "",
};

export const defaultAdminReviewForm = {
  challenge: "",
  company: "",
  firstName: "",
  imageUrl: "",
  lastName: "",
  outcome: "",
  projectUrl: "",
  review: "",
  status: "Opinión aprobada",
  visible: true,
};

export const initialExperienceReviews = [
  {
    challenge:
      "Pagábamos mucho por un sistema web de agendas que no nos identificaba ni representaba.",
    company: "Club Amsterdam",
    firstName: "Matías",
    id: "club-amsterdam-matias-damonte",
    isVisible: true,
    lastName: "Damonte",
    outcome:
      "Ahora tenemos una página 100% personalizada y al detalle, que transmite la esencia de la marca y la impulsa a la perfección.",
    photos: [
      {
        imageUrl: "/images/work/club-amsterdam-hero.png",
        name: "Club Amsterdam",
      },
      {
        imageUrl: "/images/work/club-amsterdam-public-agenda.png",
        name: "Agenda pública",
      },
      {
        imageUrl: "/images/work/club-amsterdam-admin-agenda.png",
        name: "Panel admin",
      },
    ],
    projectUrl: "https://clubamsterdam.app",
    review:
      "En un principio ya había buen criterio, la página web quedó muy acorde. Le hicimos muchas modificaciones y la desarrollamos hasta llegar a su mejor versión. Valoro mucho el acompañamiento personalizado, que fue de mucha ayuda.",
    status: "Opinión aprobada",
  },
  {
    challenge: "Necesitábamos ordenar reservas, consultas y una experiencia digital que estuviera al nivel de la marca.",
    company: "Club Amsterdam",
    firstName: "Cliente",
    id: "club-amsterdam-preview",
    isVisible: false,
    lastName: "Demo",
    outcome: "La experiencia quedó más clara para el cliente y más cómoda para administrar internamente.",
    photos: [{ name: "Reservas" }, { name: "Dashboard" }],
    projectUrl: "https://clubamsterdam.app",
    review:
      "El proceso fue muy claro. Bajamos una necesidad bastante concreta a una solución funcional, personalizada y lista para usar con clientes reales.",
    status: "Vista previa",
  },
  {
    challenge: "La presencia online no transmitía el nivel real del servicio ni ayudaba a explicar bien la propuesta.",
    company: "Proyecto inmobiliario",
    firstName: "Cliente",
    id: "real-estate-preview",
    isVisible: false,
    lastName: "Demo",
    outcome: "El sitio quedó más moderno, más confiable y preparado para mostrar propiedades con mejor criterio visual.",
    photos: [{ name: "Home" }, { name: "Propiedades" }],
    projectUrl: "",
    review:
      "La diferencia se nota en cómo se presenta el negocio. No fue solo una web nueva: se trabajó la confianza, el orden y la manera de mostrar el servicio.",
    status: "Comentario aprobado",
  },
  {
    challenge: "Faltaba un espacio simple para vender productos y empezar a instalar la marca desde cero.",
    company: "E-commerce",
    firstName: "Cliente",
    id: "ecommerce-preview",
    isVisible: false,
    lastName: "Demo",
    outcome: "La marca ganó una base digital clara para mostrar productos, recibir consultas y seguir creciendo.",
    photos: [{ name: "Catálogo" }, { name: "Producto" }],
    projectUrl: "",
    review:
      "Me ayudó a ordenar la idea y convertirla en algo visible. La comunicación fue directa y el diseño quedó alineado a lo que buscaba vender.",
    status: "Entrada breve",
  },
];

export function normalizeExperienceReviews(reviews) {
  if (!Array.isArray(reviews)) return initialExperienceReviews;

  return reviews.map((review) => ({
    ...review,
    isVisible: review.isVisible ?? review.visible ?? true,
    photos: Array.isArray(review.photos) ? review.photos : [],
  }));
}

export function mergeExperienceReviewsWithDefaults(reviews) {
  const normalizedReviews = normalizeExperienceReviews(reviews);
  const defaultIds = new Set(initialExperienceReviews.map((review) => review.id));
  const customReviews = normalizedReviews.filter((review) => !defaultIds.has(review.id));

  return [...initialExperienceReviews, ...customReviews];
}

export function getVisibleExperienceReviews(reviews) {
  return normalizeExperienceReviews(reviews).filter((review) => review.isVisible !== false);
}

export function getPublicExperienceReviews(reviews) {
  return getVisibleExperienceReviews(reviews).filter((review) => review.id === "club-amsterdam-matias-damonte");
}
