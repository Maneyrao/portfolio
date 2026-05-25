"use client";

import { ArrowUpRight, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  defaultAdminReviewForm,
  EXPERIENCE_PUBLIC_ENABLED_KEY,
  EXPERIENCE_REVIEWS_KEY,
  initialExperienceReviews,
  normalizeExperienceReviews,
} from "../data/experienceReviews.js";

function formatProjectUrl(projectUrl) {
  if (!projectUrl) return "Sin URL";

  try {
    return new URL(projectUrl).hostname.replace(/^www\./, "");
  } catch {
    return projectUrl;
  }
}

function buildReviewFromForm(form) {
  return {
    challenge: form.challenge.trim(),
    company: form.company.trim(),
    firstName: form.firstName.trim(),
    id: `admin-review-${Date.now()}`,
    isVisible: form.visible,
    lastName: form.lastName.trim(),
    outcome: form.outcome.trim(),
    photos: form.imageUrl.trim()
      ? [
          {
            imageUrl: form.imageUrl.trim(),
            name: form.company.trim() || "Proyecto",
          },
        ]
      : [],
    projectUrl: form.projectUrl.trim(),
    review: form.review.trim(),
    status: form.status.trim() || "Opinión aprobada",
  };
}

function getInitialPublicEnabled() {
  if (typeof window === "undefined") return false;

  return window.localStorage.getItem(EXPERIENCE_PUBLIC_ENABLED_KEY) === "true";
}

function getInitialReviews() {
  if (typeof window === "undefined") return initialExperienceReviews;

  try {
    const savedReviews = window.localStorage.getItem(EXPERIENCE_REVIEWS_KEY);

    return savedReviews ? normalizeExperienceReviews(JSON.parse(savedReviews)) : initialExperienceReviews;
  } catch {
    return initialExperienceReviews;
  }
}

export default function ExperienceAdmin() {
  const [adminForm, setAdminForm] = useState(defaultAdminReviewForm);
  const [publicEnabled, setPublicEnabled] = useState(getInitialPublicEnabled);
  const [reviews, setReviews] = useState(getInitialReviews);
  const [statusMessage, setStatusMessage] = useState("");
  const visibleReviews = useMemo(() => reviews.filter((review) => review.isVisible !== false), [reviews]);

  useEffect(() => {
    window.localStorage.setItem(EXPERIENCE_REVIEWS_KEY, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    window.localStorage.setItem(EXPERIENCE_PUBLIC_ENABLED_KEY, String(publicEnabled));
  }, [publicEnabled]);

  const updateAdminForm = (event) => {
    const { checked, name, type, value } = event.target;
    setAdminForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const addReview = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setReviews((current) => [buildReviewFromForm(adminForm), ...current]);
    setAdminForm(defaultAdminReviewForm);
    setStatusMessage("Opinion cargada. Ahora podés mostrarla u ocultarla desde el listado.");
  };

  const toggleReview = (reviewId) => {
    setReviews((current) =>
      current.map((review) => (review.id === reviewId ? { ...review, isVisible: review.isVisible === false } : review)),
    );
  };

  const deleteReview = (reviewId) => {
    setReviews((current) => current.filter((review) => review.id !== reviewId));
  };

  return (
    <section className="admin-dashboard-section">
      <div className="container admin-dashboard-layout">
        <div className="admin-dashboard-copy">
          <span className="section-eyebrow">Panel privado</span>
          <h1>Opiniones</h1>
          <p>
            Cargá reseñas, marcá cuáles se muestran y activá la pasarela pública cuando quieras usar prueba social en
            el portfolio.
          </p>

          <div className="admin-publish-card">
            <div>
              <span>Pasarela pública</span>
              <strong>{publicEnabled ? "Activa" : "Oculta"}</strong>
              <small>
                {visibleReviews.length} opinion{visibleReviews.length === 1 ? "" : "es"} visible
                {visibleReviews.length === 1 ? "" : "s"}
              </small>
            </div>
            <button
              aria-pressed={publicEnabled}
              className="admin-toggle-public"
              onClick={() => setPublicEnabled((enabled) => !enabled)}
              type="button"
            >
              {publicEnabled ? <EyeOff size={18} /> : <Eye size={18} />}
              {publicEnabled ? "Ocultar opiniones" : "Mostrar opiniones"}
            </button>
          </div>
        </div>

        <div className="admin-form-card">
          <form className="admin-review-form" onSubmit={addReview}>
            <div className="admin-form-heading">
              <span>Cargar opinión</span>
              <Plus size={18} />
            </div>

            <label>
              <span>Nombre</span>
              <input name="firstName" onInput={updateAdminForm} placeholder="Nombre del cliente" required value={adminForm.firstName} />
            </label>
            <label>
              <span>Apellido</span>
              <input name="lastName" onInput={updateAdminForm} placeholder="Apellido" value={adminForm.lastName} />
            </label>
            <label className="admin-wide-field">
              <span>Proyecto</span>
              <input name="company" onInput={updateAdminForm} placeholder="Ej: Club Amsterdam" required value={adminForm.company} />
            </label>
            <label className="admin-wide-field">
              <span>URL del proyecto</span>
              <input name="projectUrl" onInput={updateAdminForm} placeholder="https://..." value={adminForm.projectUrl} />
            </label>
            <label className="admin-wide-field">
              <span>URL de imagen opcional</span>
              <input name="imageUrl" onInput={updateAdminForm} placeholder="https://.../captura.png" value={adminForm.imageUrl} />
            </label>
            <label className="admin-wide-field">
              <span>Problema inicial</span>
              <textarea
                name="challenge"
                onInput={updateAdminForm}
                placeholder="Qué necesitaba resolver antes de trabajar con vos."
                value={adminForm.challenge}
              />
            </label>
            <label className="admin-wide-field">
              <span>Resultado</span>
              <textarea
                name="outcome"
                onInput={updateAdminForm}
                placeholder="Qué cambió después del proyecto."
                value={adminForm.outcome}
              />
            </label>
            <label className="admin-wide-field">
              <span>Reseña</span>
              <textarea
                name="review"
                onInput={updateAdminForm}
                placeholder="Opinión del cliente, natural y concreta."
                required
                value={adminForm.review}
              />
            </label>
            <label className="admin-visible-check admin-wide-field">
              <input checked={adminForm.visible} name="visible" onChange={updateAdminForm} type="checkbox" />
              <span>Mostrar esta opinión al cargarla</span>
            </label>

            <button className="admin-submit-button admin-wide-field" type="submit">
              Cargar opinión
              <ArrowUpRight size={18} />
            </button>
            {statusMessage && (
              <p className="admin-status-message admin-wide-field" role="status">
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="container admin-review-list-shell">
        <div className="admin-review-list-header">
          <span className="section-eyebrow">Listado</span>
          <h2>Control de publicación</h2>
        </div>

        <div className="admin-review-list">
          {reviews.map((review) => (
            <article className="admin-review-item" data-visible={review.isVisible !== false} key={review.id}>
              <div>
                <span>{review.status}</span>
                <h3>
                  {review.firstName} {review.lastName}
                </h3>
                <small>{review.company}</small>
              </div>

              <p>{review.review}</p>

              <div className="admin-review-meta">
                <span>{formatProjectUrl(review.projectUrl)}</span>
                <strong>{review.isVisible === false ? "Oculta" : "Visible"}</strong>
              </div>

              <div className="admin-review-actions">
                <button onClick={() => toggleReview(review.id)} type="button">
                  {review.isVisible === false ? <Eye size={16} /> : <EyeOff size={16} />}
                  {review.isVisible === false ? "Mostrar" : "Ocultar"}
                </button>
                <button onClick={() => deleteReview(review.id)} type="button">
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
