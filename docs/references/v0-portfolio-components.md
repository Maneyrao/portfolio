# v0 Portfolio Component References

Fecha: 2026-05-14

Estas referencias quedan guardadas para integrar al portfolio Next de Tomi Maneyro. La regla para usarlas: no copiar el template crudo; extraer la interacción útil y adaptarla a la marca, contenido real y stack actual del portfolio.

## 0. Modern Developer Portfolio with Smooth Animations

- Link: https://v0.app/templates/modern-developer-portfolio-with-smooth-animations-evBwFXFJcM9
- Uso pedido: estructura de portfolio.
- Adaptación propuesta: tomar la lógica de portfolio moderno con secciones reveladas, navegación clara, hero developer y transiciones suaves; combinarlo con la intro propia del globo Buenos Aires.
- Prioridad: muy alta. Se usa como guía estructural del portfolio completo.

## 1. Linear Card Interaction

- Link: https://v0.app/templates/linear-card-interaction-xqPXyptWY6p
- Uso pedido: animación de cards.
- Título verificado: Linear Card Interaction.
- Tags v0: card-interaction, cards, motion.
- Autor v0: yadwinder.
- Última actualización vista: October 1, 2025.
- Adaptación propuesta: usarlo para transformar las cards de `Selected work` o `Stack aplicado` en cards con profundidad, hover progresivo y foco claro.
- Prioridad: alta para mejorar la sensación de portfolio premium sin cambiar toda la estructura.

## 2. Interactive Portfolio Gallery with Hover Video Cards

- Link: https://v0.app/templates/interactive-portfolio-gallery-with-hover-video-car-peTiHBkr23W
- Uso pedido: exposición de proyectos.
- Título verificado: Interactive Portfolio Gallery with Hover Video Cards.
- Tags v0: portfolio, video-gallery, hover-effects, glassmorphism, animation, creative-showcase.
- Autor v0: jessin.
- Última actualización vista: January 4, 2026.
- Descripción útil: cards que se expanden en hover, video/color en la activa, cards no activas en gris, overlay de texto y cursor custom.
- Adaptación propuesta: reemplazar o complementar la sección `Selected work` con una galería horizontal de proyectos. Para nuestros casos, usar screenshots/videos reales cuando estén disponibles y fallback visual para proyectos sin captura.
- Prioridad: muy alta. Es la referencia más alineada con “portfolio developer que vende trabajos”.

## 3. Globe To Map Transform

- Link: https://v0.app/templates/globe-to-map-transform-99MAOQptgL3
- Uso pedido: globo e interacción.
- Título verificado: Globe To Map Transform.
- Tags v0: globe, map, 3d, 2d, wireframe, transform, d3js, dataviz.
- Autor v0: jshguo.
- Última actualización vista: November 18, 2025.
- Adaptación propuesta: usar como sección conceptual de “alcance / sistemas / arquitectura”, no como decoración suelta. Podría mapear proyectos, tecnologías o tipos de clientes.
- Prioridad: media. Potente visualmente, pero hay que justificarlo para que no parezca adorno.

## 4. Wireframe Dot-matrix Globe

- Link: https://v0.app/templates/wireframe-dot-matrix-globe-wPXObh787zg
- Uso pedido: animación de globo.
- Título verificado: Wireframe Dot-matrix Globe.
- Tags v0: globe, map, dots.
- Autor v0: jshguo.
- Última actualización vista: September 11, 2025.
- Adaptación propuesta: usar como pieza secundaria del hero o fondo interactivo técnico, si decidimos que el portfolio necesita una firma visual de “developer”.
- Prioridad: media-baja frente a la galería de proyectos. Sirve si no compite con el CTA.

## Plan de integración recomendado

1. Primero integrar la galería de portfolio con hover/video.
2. Después aplicar la interacción de cards a stack o servicios.
3. Recién después probar una variante con globo, si no distrae del contacto.

## Nota de implementación

El proyecto ya está en Next.js App Router y tiene `motion`, `lenis`, `lucide-react` y `clsx`, así que las referencias de animación y hover se pueden adaptar sin volver a cambiar de stack. Si v0 requiere comando `Add to Codebase` o token para descargar el código exacto, usar el comando que genere v0; si no, replicar manualmente la interacción respetando la referencia visual.
