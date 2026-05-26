"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contactEmail, contactWhatsappHref } from "../data/contact.js";
import {
  defaultExperienceForm,
  EXPERIENCE_REVIEWS_KEY,
  getPublicExperienceReviews,
  initialExperienceReviews,
  mergeExperienceReviewsWithDefaults,
  normalizeExperienceReviews,
} from "../data/experienceReviews.js";

function Icon() {
  return <ArrowUpRight size={18} strokeWidth={2} />;
}

function formatProjectUrl(projectUrl) {
  if (!projectUrl) return "Proyecto sin link";

  try {
    return new URL(projectUrl).hostname.replace(/^www\./, "");
  } catch {
    return projectUrl;
  }
}

function buildExperienceMessage(form, photos = []) {
  const photoNames = photos.map((photo) => photo.name).filter(Boolean).join(", ");

  return `Hola Thiago, quiero enviar una experiencia para revisión.

Nombre: ${form.firstName || "Sin completar"}
Apellido: ${form.lastName || "Sin completar"}
Negocio / proyecto: ${form.company || "Sin completar"}
URL del proyecto: ${form.projectUrl || "Sin completar"}
Fotos seleccionadas: ${photoNames || "Sin fotos"}

Problema inicial:
${form.challenge || "Sin completar"}

Qué cambió después:
${form.outcome || "Sin completar"}

Experiencia:
${form.review || "Sin completar"}

Autorizo que Thiago revise este material y decida si se publica en su portfolio.`;
}

function buildExperienceLinks(messageText) {
  const encodedMessage = encodeURIComponent(messageText);

  return {
    mailHref: `mailto:${contactEmail}?subject=${encodeURIComponent(
      "Solicitud de experiencia para el portfolio",
    )}&body=${encodedMessage}`,
    whatsappHref: `${contactWhatsappHref}?text=${encodedMessage}`,
  };
}

function ReviewPhotos({ photos = [] }) {
  if (photos.length === 0) {
    return (
      <div className="experience-review-media" aria-label="Espacio para fotos del proyecto">
        <span className="experience-review-photo">Foto</span>
        <span className="experience-review-photo">Antes</span>
      </div>
    );
  }

  return (
    <div className="experience-review-media" aria-label="Fotos del proyecto">
      {photos.slice(0, 3).map((photo, index) => (
        <span className="experience-review-photo" key={`${photo.name}-${index}`}>
          {photo.imageUrl ? (
            <img alt={photo.name || `Foto ${index + 1}`} src={photo.imageUrl} />
          ) : (
            photo.name || `Foto ${index + 1}`
          )}
        </span>
      ))}
    </div>
  );
}

export function ExperienceReviewCarousel({
  copy,
  revealImmediately = false,
  reviews,
  showHeader = true,
  title = "Pasarela de comentarios",
}) {
  const carouselReviews = reviews.length > 0 ? reviews : initialExperienceReviews;
  const hasSingleReview = carouselReviews.length === 1;
  const loopReviews = hasSingleReview ? carouselReviews : [...carouselReviews, ...carouselReviews];
  const headerCopy =
    copy === undefined
      ? "Comentarios cortos, contexto del proyecto y material visual. La idea es que cada reseña se lea como una mini historia de trabajo."
      : copy;

  return (
    <div className={`experience-carousel animate-on-scroll${revealImmediately ? " animate-in" : ""}`}>
      {showHeader && (
        <div className="container experience-carousel-header">
          <div>
            <span className="section-eyebrow">Experiencias</span>
            <h3>{title}</h3>
          </div>
          {headerCopy && <p>{headerCopy}</p>}
        </div>
      )}

      <div className="experience-marquee" aria-label="Pasarela de reseñas">
        <div className={`experience-marquee-track${hasSingleReview ? " experience-marquee-track-static" : ""}`}>
          {loopReviews.map((review, index) => (
            <article className="experience-review-card" key={`${review.id}-${index}`}>
              <div className="experience-review-topline">
                <span>{review.status}</span>
                {review.projectUrl ? (
                  <a href={review.projectUrl} rel="noreferrer" target="_blank">
                    {formatProjectUrl(review.projectUrl)}
                  </a>
                ) : (
                  <span>{formatProjectUrl(review.projectUrl)}</span>
                )}
              </div>
              <ReviewPhotos photos={review.photos} />
              <p>{review.review}</p>
              <div className="experience-review-context">
                <span>Problema</span>
                <strong>{review.challenge}</strong>
              </div>
              {review.outcome && (
                <div className="experience-review-context">
                  <span>Qué cambió</span>
                  <strong>{review.outcome}</strong>
                </div>
              )}
              <div className="experience-review-author">
                {review.firstName} {review.lastName}
                {review.company && <span>{review.company}</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperiencePreview() {
  return (
    <section className="section proof-section experiences-home-section" id="experiencias">
      <div className="container experiences-preview-hero animate-on-scroll">
        <div className="experiences-preview-copy">
          <span className="section-eyebrow">Prueba social</span>
          <h2>Experiencias</h2>
          <p>
            Antes de agendar, quiero que se vea cómo fue trabajar conmigo: qué problema había, qué se construyó y qué
            cambió después. Esta sección queda preparada para publicar comentarios aprobados de clientes.
          </p>
        </div>

        <div className="experience-preview-card">
          <span>Formulario externo</span>
          <strong>/form</strong>
          <p>El cliente deja texto, fotos y link opcional del proyecto. Después se revisa antes de aparecer acá.</p>
          <div className="experiences-preview-actions">
            <a href="/form">
              Dejar experiencia
              <Icon />
            </a>
            <a href="#agenda">Agendar llamada</a>
          </div>
        </div>
      </div>

      <ExperienceReviewCarousel reviews={initialExperienceReviews} />
    </section>
  );
}

export function ExperiencePublicPreview() {
  const [approvedReviews, setApprovedReviews] = useState(() => getPublicExperienceReviews(initialExperienceReviews));

  useEffect(() => {
    const syncFrame = window.requestAnimationFrame(() => {
      try {
        const savedReviews = window.localStorage.getItem(EXPERIENCE_REVIEWS_KEY);
        const parsedReviews = savedReviews
          ? mergeExperienceReviewsWithDefaults(JSON.parse(savedReviews))
          : initialExperienceReviews;

        setApprovedReviews(getPublicExperienceReviews(parsedReviews));
      } catch {
        setApprovedReviews(getPublicExperienceReviews(initialExperienceReviews));
      }
    });

    return () => window.cancelAnimationFrame(syncFrame);
  }, []);

  if (approvedReviews.length === 0) return null;

  return (
    <section className="section proof-section public-experiences-section" id="experiencias">
      <div className="container public-experience-intro animate-on-scroll animate-in">
        <h2>Experiencias</h2>
      </div>

      <ExperienceReviewCarousel
        revealImmediately
        reviews={approvedReviews}
        showHeader={false}
      />
    </section>
  );
}

export default function ExperienceSection({ standalone = false }) {
  const deliveryPanelRef = useRef(null);
  const [experienceForm, setExperienceForm] = useState(defaultExperienceForm);
  const [experienceReviews, setExperienceReviews] = useState(initialExperienceReviews);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [experienceSubmission, setExperienceSubmission] = useState(null);
  const [experienceSubmitStatus, setExperienceSubmitStatus] = useState("");

  const activeExperience = experienceSubmission ?? experienceForm;
  const activeExperiencePhotos = experienceSubmission?.photos ?? selectedImages;
  const experienceMessageText = buildExperienceMessage(activeExperience, activeExperiencePhotos);
  const { mailHref: experienceMailHref, whatsappHref: experienceWhatsappHref } =
    buildExperienceLinks(experienceMessageText);
  const routeRevealClass = standalone ? " animate-in" : "";

  useEffect(() => {
    if (!standalone) return undefined;

    const animatedElements = Array.from(document.querySelectorAll("#form .animate-on-scroll"));

    if (!("IntersectionObserver" in window)) {
      animatedElements.forEach((element) => element.classList.add("animate-in"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [standalone]);

  useEffect(() => {
    try {
      const savedReviews = window.localStorage.getItem(EXPERIENCE_REVIEWS_KEY);
      const parsedReviews = savedReviews ? JSON.parse(savedReviews) : null;
      const approvedSavedReviews = Array.isArray(parsedReviews)
        ? normalizeExperienceReviews(parsedReviews).filter((review) => review.id !== "example-review")
        : [];

      if (approvedSavedReviews.length > 0) setExperienceReviews(approvedSavedReviews);
    } catch {
      setExperienceReviews(initialExperienceReviews);
    } finally {
      setReviewsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!reviewsLoaded) return;
    window.localStorage.setItem(EXPERIENCE_REVIEWS_KEY, JSON.stringify(experienceReviews));
  }, [experienceReviews, reviewsLoaded]);

  useEffect(() => {
    return () => {
      selectedImages.forEach((image) => {
        if (image.previewUrl) URL.revokeObjectURL(image.previewUrl);
      });
    };
  }, [selectedImages]);

  const updateExperienceForm = (event) => {
    const { checked, name: fieldName, type, value } = event.target;
    setExperienceSubmission(null);
    setExperienceForm((current) => ({ ...current, [fieldName]: type === "checkbox" ? checked : value }));
  };

  const updateSelectedImages = (event) => {
    const files = Array.from(event.target.files || []).slice(0, 4);
    selectedImages.forEach((image) => {
      if (image.previewUrl) URL.revokeObjectURL(image.previewUrl);
    });
    setExperienceSubmission(null);
    setSelectedImages(files.map((file) => ({ name: file.name, previewUrl: URL.createObjectURL(file) })));
  };

  const submitExperienceRequest = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const reviewRequest = {
      challenge: experienceForm.challenge.trim(),
      company: experienceForm.company.trim(),
      firstName: experienceForm.firstName.trim(),
      id: `review-${Date.now()}`,
      isVisible: false,
      lastName: experienceForm.lastName.trim(),
      outcome: experienceForm.outcome.trim(),
      photos: selectedImages.map((image) => ({ name: image.name })),
      projectUrl: experienceForm.projectUrl.trim(),
      review: experienceForm.review.trim(),
      status: "Solicitud pendiente",
    };

    setExperienceReviews((current) => [reviewRequest, ...current.filter((review) => review.id !== "example-review")]);
    setExperienceSubmitStatus(
      "Solicitud preparada. Revisá el texto y tocá WhatsApp o email para enviármela.",
    );
    setExperienceSubmission(reviewRequest);

    requestAnimationFrame(() => {
      deliveryPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const copyExperienceRequest = async () => {
    try {
      await navigator.clipboard.writeText(experienceMessageText);
      setExperienceSubmitStatus("Texto copiado. Ahora podés pegarlo en WhatsApp, email o donde prefieras enviarlo.");
    } catch {
      setExperienceSubmitStatus("No pude copiar automáticamente. Seleccioná el texto del panel y copialo manualmente.");
    }
  };

  const resetExperienceRequest = () => {
    setExperienceForm(defaultExperienceForm);
    setExperienceSubmission(null);
    setExperienceSubmitStatus("");
    selectedImages.forEach((image) => {
      if (image.previewUrl) URL.revokeObjectURL(image.previewUrl);
    });
    setSelectedImages([]);
  };

  return (
    <section className={`section proof-section${standalone ? " experience-route-section" : ""}`} id="form">
      <div className="container experiences-layout experience-form-shell">
        <div className={`experiences-copy animate-on-scroll${routeRevealClass}`}>
          <span className="section-eyebrow">Formulario para clientes</span>
          <h1 className="section-title">Contá tu experiencia</h1>
          <p>
            La mejor reseña no es perfecta: es concreta. Contá qué necesitabas, cómo fue el proceso y qué cambió después
            del proyecto.
          </p>
          <div className="experience-prompt-list">
            <span>Qué problema había antes</span>
            <span>Qué construimos o mejoramos</span>
            <span>Qué resultado te dejó</span>
          </div>
          <p className="experience-helper-copy">
            El link del proyecto es opcional. Las fotos sirven para armar después una publicación tipo mini caso/blog.
          </p>
        </div>

        <div className={`experience-request-card animate-on-scroll${routeRevealClass}`}>
          <form className="experience-request-form" onSubmit={submitExperienceRequest}>
            <label>
              <span>Nombre</span>
              <input
                name="firstName"
                onChange={updateExperienceForm}
                onInput={updateExperienceForm}
                placeholder="Tu nombre"
                required
                type="text"
                value={experienceForm.firstName}
              />
            </label>
            <label>
              <span>Apellido</span>
              <input
                name="lastName"
                onChange={updateExperienceForm}
                onInput={updateExperienceForm}
                placeholder="Tu apellido"
                required
                type="text"
                value={experienceForm.lastName}
              />
            </label>
            <label className="experience-request-wide">
              <span>Negocio o proyecto</span>
              <input
                name="company"
                onChange={updateExperienceForm}
                onInput={updateExperienceForm}
                placeholder="Ej: Club Amsterdam, IG Detail..."
                required
                type="text"
                value={experienceForm.company}
              />
            </label>
            <label className="experience-request-wide">
              <span>URL del proyecto opcional</span>
              <input
                name="projectUrl"
                onChange={updateExperienceForm}
                onInput={updateExperienceForm}
                placeholder="https://..."
                type="text"
                value={experienceForm.projectUrl}
              />
            </label>
            <label className="experience-request-wide">
              <span>Qué problema había antes</span>
              <textarea
                name="challenge"
                onChange={updateExperienceForm}
                onInput={updateExperienceForm}
                placeholder="Ej: necesitábamos ordenar reservas, vender online, mostrar mejor el servicio..."
                required
                value={experienceForm.challenge}
              />
            </label>
            <label className="experience-request-wide">
              <span>Qué cambió después</span>
              <textarea
                name="outcome"
                onChange={updateExperienceForm}
                onInput={updateExperienceForm}
                placeholder="Ej: ahora tenemos una página más clara, un sistema más cómodo o una forma mejor de recibir consultas."
                required
                value={experienceForm.outcome}
              />
            </label>
            <label className="experience-request-wide">
              <span>Tu experiencia trabajando conmigo</span>
              <textarea
                name="review"
                onChange={updateExperienceForm}
                onInput={updateExperienceForm}
                placeholder="Contalo natural. Qué te gustó del proceso, la comunicación, el diseño o el resultado."
                required
                value={experienceForm.review}
              />
            </label>

            <label className="experience-upload-zone experience-request-wide">
              <span>Fotos del proyecto</span>
              <input accept="image/*" multiple name="photos" onChange={updateSelectedImages} type="file" />
              <strong>Subí hasta 4 imágenes para previsualizar cómo quedaría la publicación.</strong>
            </label>

            {selectedImages.length > 0 && (
              <div className="experience-photo-preview experience-request-wide">
                {selectedImages.map((image) => (
                  <figure className="experience-photo-thumb" key={image.previewUrl}>
                    <img alt={`Vista previa ${image.name}`} src={image.previewUrl} />
                    <figcaption>{image.name}</figcaption>
                  </figure>
                ))}
              </div>
            )}

            <label className="experience-consent experience-request-wide">
              <input
                checked={experienceForm.permission}
                name="permission"
                onChange={updateExperienceForm}
                required
                type="checkbox"
              />
              <span>Autorizo que Thiago revise este material y decida si se publica en su portfolio.</span>
            </label>

            <p className="experience-form-note experience-request-wide">
              Al preparar la solicitud, abajo vas a ver el texto listo para enviar por WhatsApp o email. Las fotos se
              previsualizan acá; si querés enviarlas, adjuntalas después en el chat.
            </p>

            <div className="experience-request-actions">
              <button type="submit">
                Preparar solicitud
                <Icon />
              </button>
            </div>

            {experienceSubmitStatus && (
              <p className="experience-request-status" role="status">
                {experienceSubmitStatus}
              </p>
            )}

            {experienceSubmission && (
              <div className="experience-delivery-panel experience-request-wide" ref={deliveryPanelRef}>
                <span>Solicitud lista</span>
                <p>
                  No se envía nada en segundo plano: elegí WhatsApp o email para mandármela con tu texto ya armado.
                </p>
                <textarea readOnly value={experienceMessageText} />
                <div className="experience-delivery-actions">
                  <a href={experienceWhatsappHref} rel="noreferrer" target="_blank">
                    Enviar por WhatsApp
                    <Icon />
                  </a>
                  <a href={experienceMailHref}>
                    Abrir email
                    <Icon />
                  </a>
                  <button onClick={copyExperienceRequest} type="button">
                    Copiar texto
                  </button>
                  <button onClick={resetExperienceRequest} type="button">
                    Limpiar
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <ExperienceReviewCarousel
        copy="Así se vería una experiencia aprobada: texto escaneable, contexto real, link opcional y espacio visual del proyecto."
        revealImmediately={standalone}
        reviews={experienceReviews}
        title="Vista previa tipo blog"
      />
    </section>
  );
}
