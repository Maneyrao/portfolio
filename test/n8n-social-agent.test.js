import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const workflowBase = new URL("../n8n/social-content-agent/workflows/", import.meta.url);
const reminder = JSON.parse(readFileSync(new URL("daily-social-reminder.workflow.json", workflowBase), "utf8"));
const publisher = JSON.parse(readFileSync(new URL("daily-social-publisher.workflow.json", workflowBase), "utf8"));
const schema = JSON.parse(
  readFileSync(new URL("../n8n/social-content-agent/social-posts-data-table.schema.json", import.meta.url), "utf8"),
);
const prompt = readFileSync(
  new URL("../n8n/social-content-agent/prompts/daily-social-agent.system.md", import.meta.url),
  "utf8",
);
const readme = readFileSync(new URL("../n8n/social-content-agent/README.md", import.meta.url), "utf8");

function nodeNames(workflow) {
  return workflow.nodes.map((node) => node.name);
}

function nodeTypes(workflow) {
  return workflow.nodes.map((node) => node.type);
}

describe("n8n daily social agent", () => {
  it("exports a daily Telegram reminder workflow", () => {
    assert.equal(reminder.name, "Daily Social Reminder - Thiago");
    assert.equal(reminder.settings.timezone, "America/Argentina/Buenos_Aires");
    assert.ok(nodeTypes(reminder).includes("n8n-nodes-base.scheduleTrigger"));
    assert.ok(nodeNames(reminder).includes("Telegram - Send Reminder"));
    assert.match(JSON.stringify(reminder), /N8N_DAILY_SOCIAL_FORM_URL/);
    assert.match(JSON.stringify(reminder), /TELEGRAM_BOT_TOKEN/);
    assert.match(JSON.stringify(reminder), /19/);
  });

  it("exports a publisher workflow with intake, approval, rewrite, scheduling, and posting", () => {
    const names = nodeNames(publisher);
    const types = nodeTypes(publisher);
    assert.equal(publisher.name, "Daily Social Publisher - Thiago");
    assert.equal(publisher.settings.timezone, "America/Argentina/Buenos_Aires");
    assert.ok(types.includes("n8n-nodes-base.formTrigger"));
    assert.ok(types.includes("n8n-nodes-base.webhook"));
    assert.ok(types.includes("n8n-nodes-base.telegramTrigger"));
    assert.ok(types.includes("n8n-nodes-base.dataTable"));
    assert.ok(types.includes("n8n-nodes-base.wait"));
    assert.ok(types.includes("n8n-nodes-base.merge"));
    assert.ok(names.includes("OpenAI - Draft Posts"));
    assert.ok(names.includes("Telegram - Send Approval"));
    assert.ok(names.includes("Prepare Rewrite"));
    assert.ok(names.includes("LinkedIn - Publish Personal Post"));
    assert.ok(names.includes("X - Publish IT Post"));
    assert.match(JSON.stringify(publisher), /social-daily-intake/);
    assert.match(JSON.stringify(publisher), /Si, publicar/);
    assert.match(JSON.stringify(publisher), /No, reescribir/);
    assert.match(JSON.stringify(publisher), /PARTIAL_FAILURE/);
  });

  it("documents the social_posts table contract and agent prompt guardrails", () => {
    const columns = schema.columns.map((column) => column.name);
    for (const column of [
      "draft_id",
      "date",
      "source_payload",
      "linkedin_text",
      "x_text",
      "status",
      "attempt_count",
      "scheduled_for",
      "linkedin_url",
      "x_url",
      "error_message",
    ]) {
      assert.ok(columns.includes(column), `${column} should exist`);
    }
    assert.deepEqual(
      schema.columns.find((column) => column.name === "status").allowedValues,
      ["DRAFTED", "REWRITE_REQUESTED", "APPROVED", "SCHEDULED", "PUBLISHED", "PARTIAL_FAILURE", "FAILED", "DISCARDED"],
    );
    assert.match(prompt, /No inventar clientes/);
    assert.match(prompt, /LinkedIn/);
    assert.match(prompt, /X/);
    assert.match(prompt, /JSON valido/);
  });

  it("includes setup documentation for credentials, imports, and manual tests", () => {
    assert.match(readme, /n8n Cloud/);
    assert.match(readme, /TELEGRAM_BOT_TOKEN/);
    assert.match(readme, /OPENAI_API_KEY/);
    assert.match(readme, /w_member_social/);
    assert.match(readme, /tweet\.write/);
    assert.match(readme, /Test manual recomendado/);
    assert.match(readme, /No usar cookies/);
  });
});
