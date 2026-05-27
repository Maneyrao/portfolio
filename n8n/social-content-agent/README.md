# Daily Social Agent para n8n

Sistema separado del portfolio para convertir tu resumen diario de trabajo en posts de marca personal para LinkedIn y X, con aprobacion por Telegram antes de publicar.

## Archivos

- `workflows/daily-social-reminder.workflow.json`: recordatorio diario a las 19:00 por Telegram.
- `workflows/daily-social-publisher.workflow.json`: formulario/webhook, generacion con OpenAI, aprobacion, reescritura y publicacion.
- `prompts/daily-social-agent.system.md`: prompt editorial fuente.
- `social-posts-data-table.schema.json`: columnas esperadas para la Data Table `social_posts`.

## Fuentes tecnicas usadas

- n8n importa/exporta workflows como JSON: https://docs.n8n.io/workflows/export-import/
- Schedule Trigger: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/
- Form Trigger: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger/
- Webhook: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/
- Wait: https://docs.n8n.io/flow-logic/waiting/
- Telegram message/inline keyboard: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/message-operations/
- Data Table: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable/
- Data Table rows: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable/rows/
- LinkedIn node: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.linkedin/
- LinkedIn Posts API: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api
- X Create Post API: https://docs.x.com/x-api/posts/create-post
- X OAuth/write scopes: https://docs.x.com/resources/fundamentals/authentication/guides/v2-authentication-mapping

## Setup en n8n Cloud

1. Importar los workflows:
   - n8n Cloud -> Workflows -> Import from File.
   - Importar `daily-social-reminder.workflow.json`.
   - Importar `daily-social-publisher.workflow.json`.

2. Configurar timezone:
   - En ambos workflows, verificar que la timezone sea `America/Argentina/Buenos_Aires`.
   - El recordatorio usa Schedule Trigger diario a las `19:00`.

3. Crear variables en n8n:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `N8N_DAILY_SOCIAL_FORM_URL`
   - `OPENAI_API_KEY`
   - `SOCIAL_AGENT_WEBHOOK_SECRET`

4. Crear Telegram Bot:
   - Crear bot con BotFather.
   - Guardar el token en `TELEGRAM_BOT_TOKEN`.
   - Mandarle un mensaje al bot y obtener tu chat id.
   - Guardar ese chat id en `TELEGRAM_CHAT_ID`.

5. Crear Data Table:
   - Nombre exacto: `social_posts`.
   - Crear columnas usando `social-posts-data-table.schema.json`.
   - `draft_id` debe ser unico a nivel operativo.

6. Configurar OpenAI:
   - Cargar API key en `OPENAI_API_KEY`.
   - El workflow usa `POST https://api.openai.com/v1/responses` con `gpt-4.1-mini`.
   - Si preferis usar el nodo OpenAI nativo, replicar el body del nodo `Build OpenAI Request` en la operacion Responses/Generate a Model Response.

7. Configurar LinkedIn:
   - Conectar credencial OAuth de LinkedIn en el nodo `LinkedIn - Publish Personal Post`.
   - Publicar como perfil personal.
   - Permiso esperado: `w_member_social` para publicar en nombre del miembro autenticado.
   - Si el nodo nativo no expone el campo correcto en tu version de n8n, reemplazarlo por HTTP Request a `POST https://api.linkedin.com/rest/posts` usando el ejemplo de LinkedIn Posts API.

8. Configurar X:
   - Crear/conectar X developer app para la cuenta IT.
   - Permisos: read/write. Para X API v2, el endpoint `POST /2/tweets` requiere `tweet.write`, `tweet.read` y `users.read`.
   - Conectar la credencial en `X - Publish IT Post`.
   - Si el nodo X nativo cambia de nombre/campos en tu version, reemplazar por HTTP Request a `POST https://api.x.com/2/tweets`.

9. Activar Telegram approval:
   - En `daily-social-publisher`, abrir `Telegram - Approval Callback`.
   - Conectar la credencial de Telegram.
   - Asegurar que capture `callback_query`.
   - Publicar el workflow.

10. Conectar el Form URL al recordatorio:
   - Abrir el workflow publisher.
   - Copiar el Production URL del Form Trigger.
   - Guardarlo en `N8N_DAILY_SOCIAL_FORM_URL`.

## Flujo operativo

1. Todos los dias a las 19:00 llega un Telegram con el link al formulario.
2. Completas el formulario con lo trabajado, problema, aprendizaje y contexto opcional.
3. El agente genera:
   - `linkedin_text`
   - `x_text`
   - `summary`
   - `risk_flags`
   - `content_pillar`
4. Telegram muestra preview con:
   - `Si, publicar`
   - `No, reescribir`
5. Si tocas `No, reescribir`, el agente intenta otra version.
6. Si rechazás 3 veces en total, guarda el draft como `DISCARDED` y no publica.
7. Si tocas `Si, publicar`, calcula el proximo slot recomendado y publica en LinkedIn + X.
8. Guarda resultado como `PUBLISHED`, `PARTIAL_FAILURE` o `FAILED` y avisa por Telegram.

## Webhook JSON opcional

Endpoint de produccion del nodo `Webhook - JSON Intake`:

```http
POST /webhook/social-daily-intake
X-Social-Agent-Secret: <SOCIAL_AGENT_WEBHOOK_SECRET>
Content-Type: application/json
```

Payload:

```json
{
  "date": "2026-05-27",
  "worked_on": "string",
  "problem_solved": "string",
  "lesson": "string",
  "client_or_project": "string",
  "technical_detail": "string",
  "business_angle": "string",
  "avoid": "string"
}
```

## Test manual recomendado

1. Importar ambos workflows sin publicarlos.
2. Ejecutar `daily-social-publisher` en modo test usando el Form Trigger.
3. Completar solo los campos requeridos.
4. Confirmar que llega preview a Telegram.
5. Tocar `No, reescribir` y confirmar que llega un nuevo preview.
6. Tocar `Si, publicar` con credenciales de LinkedIn/X en modo real solo cuando el contenido sea seguro.
7. Revisar la Data Table `social_posts`.
8. Probar webhook sin secret: debe rechazar o marcar error.
9. Probar webhook con secret: debe generar draft.
10. Probar un payload incompleto: debe pedir mas contexto por Telegram.

## Notas de seguridad

- No usar cookies, navegador automatizado ni scraping de LinkedIn/X.
- No publicar si `risk_flags` contiene datos sensibles hasta revisar el draft.
- No guardar tokens dentro del JSON exportado.
- Usar variables/credenciales de n8n Cloud.
- Mantener el workflow desactivado hasta validar Telegram, OpenAI y Data Table.
