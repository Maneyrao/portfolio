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
    challenge: "Necesitábamos ordenar reservas, consultas y una experiencia digital que estuviera al nivel de la marca.",
    company: "Club Amsterdam",
    firstName: "Cliente",
    id: "club-amsterdam-preview",
    isVisible: true,
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
    isVisible: true,
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
    isVisible: true,
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

export function getVisibleExperienceReviews(reviews) {
  return normalizeExperienceReviews(reviews).filter((review) => review.isVisible !== false);
}
