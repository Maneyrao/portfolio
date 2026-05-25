import ExperienceAdmin from "../../../components/ExperienceAdmin.jsx";

export const metadata = {
  title: "Admin opiniones | Thiago Maneyro",
  description: "Panel para cargar, mostrar u ocultar opiniones del portfolio.",
};

export default function OpinionAdminPage() {
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
        <ExperienceAdmin />
      </main>
    </>
  );
}
