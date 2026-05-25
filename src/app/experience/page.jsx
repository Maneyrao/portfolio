import ExperienceSection from "../../components/ExperienceSection.jsx";

export const metadata = {
  title: "Experiencias | Thiago Maneyro",
  description: "Formulario para enviar una reseña de cliente al portfolio de Thiago Maneyro.",
};

export default function ExperiencePage() {
  return (
    <>
      <header className="experience-page-header">
        <div className="container experience-page-nav">
          <a className="logo" href="/" aria-label="Volver al portfolio">
            TM
          </a>
          <a className="experience-back-link" href="/">
            Volver al portfolio
          </a>
        </div>
      </header>

      <main className="experience-page-main">
        <ExperienceSection standalone />
      </main>
    </>
  );
}
