"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

type FormState = "idle" | "submitting" | "success" | "error";

const intents = [
  { value: "hiring", label: "Hiring / full-time role" },
  { value: "project", label: "Project / sprint work" },
  { value: "advisory", label: "Advisory / review" },
  { value: "other", label: "Other" },
] as const;

export function ContactForm() {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim();
  const searchParams = useSearchParams();
  const projectSlug = searchParams.get("project");
  const relatedProject = projectSlug ? getProject(projectSlug) : undefined;
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const mailto = useMemo(() => `mailto:${site.email}`, []);

  function openMailto(data: FormData) {
    const subject = encodeURIComponent(`Engagement inquiry — ${String(data.get("intent") || "general")}`);
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Company: ${data.get("company") || "—"}`,
        `Intent: ${data.get("intent")}`,
        relatedProject ? `Related project: ${relatedProject.title} (${relatedProject.slug})` : null,
        "",
        String(data.get("message") || ""),
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `${mailto}?subject=${subject}&body=${body}`;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    // Formspree honeypot — bots fill this; humans never see it.
    if (String(data.get("_gotcha") || "").trim()) {
      setState("success");
      return;
    }

    if (!formspreeId) {
      openMailto(data);
      setState("success");
      return;
    }

    // Help Formspree route replies + subject line.
    data.set("_replyto", String(data.get("email") || ""));
    data.set("_subject", `Portfolio contact — ${String(data.get("intent") || "inquiry")}`);

    setState("submitting");
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      let detail = "";
      try {
        const payload = (await response.json()) as {
          error?: string;
          errors?: Array<{ message?: string } | string>;
        };
        if (payload.error) detail = payload.error;
        else if (Array.isArray(payload.errors) && payload.errors.length) {
          detail = payload.errors
            .map((item) => (typeof item === "string" ? item : item.message || ""))
            .filter(Boolean)
            .join(" ");
        }
      } catch {
        // non-JSON body
      }

      if (!response.ok) {
        throw new Error(detail || `Formspree returned ${response.status}.`);
      }

      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      const detail = err instanceof Error && err.message ? ` ${err.message}` : "";
      setError(
        `Something went wrong sending the form.${detail} You can retry after activating the form in Formspree (confirm email + allow sauravrana646.github.io), or email me directly.`,
      );
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 shadow-soft" role="status">
        <h2 className="mb-3 text-[length:var(--text-h2)] font-semibold text-ink">
          {formspreeId ? "Message sent." : "Draft ready."}
        </h2>
        <p className="text-muted">
          {formspreeId
            ? `Thanks for reaching out. I’ll reply within ${site.responseDays} business days.`
            : `Your mail client should open with a draft. If it didn’t, email ${site.email} directly.`}
        </p>
      </div>
    );
  }

  return (
    <form
      className="relative rounded-lg border border-border bg-surface p-8 shadow-soft"
      onSubmit={onSubmit}
      action={formspreeId ? `https://formspree.io/f/${formspreeId}` : undefined}
      method="POST"
    >
      {relatedProject ? (
        <p className="mb-5 rounded-md border border-border bg-canvas-elevated px-3 py-2 text-sm text-muted">
          Regarding case study:{" "}
          <span className="font-semibold text-ink">{relatedProject.title}</span>
          <input type="hidden" name="project" value={relatedProject.slug} />
        </p>
      ) : null}

      <label className="mb-2 block text-sm font-medium text-ink-soft" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        required
        placeholder="Your name"
        className="field"
      />

      <label className="mb-2 block text-sm font-medium text-ink-soft" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="you@company.com"
        className="field"
      />

      <label className="mb-2 block text-sm font-medium text-ink-soft" htmlFor="company">
        Company
      </label>
      <input
        id="company"
        name="company"
        type="text"
        autoComplete="organization"
        placeholder="Company (optional)"
        className="field"
      />

      <label className="mb-2 block text-sm font-medium text-ink-soft" htmlFor="intent">
        Intent
      </label>
      <select id="intent" name="intent" required defaultValue="" className="field">
        <option value="" disabled>
          Select intent
        </option>
        {intents.map((intent) => (
          <option key={intent.value} value={intent.value}>
            {intent.label}
          </option>
        ))}
      </select>

      <label className="mb-2 block text-sm font-medium text-ink-soft" htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        required
        placeholder="Role, stack, timeline, or the constraint that hurts most…"
        className="field min-h-[140px] resize-y"
      />

      {/* Formspree spam honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="gotcha">Leave blank</label>
        <input id="gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mb-6 flex cursor-pointer items-start gap-2.5 text-sm text-muted" htmlFor="consent">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-mint-deep"
        />
        <span>
          I agree to be contacted about this inquiry
          {formspreeId ? " and understand messages are handled via Formspree" : ""}.
        </span>
      </label>

      <Button type="submit" className="w-full" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending…" : "Send message"}
      </Button>

      {error ? (
        <p className="mt-4 text-sm text-[var(--ds-danger)]" role="alert">
          {error}{" "}
          <a className="font-semibold text-mint-deep underline" href={mailto}>
            {site.email}
          </a>
        </p>
      ) : (
        <p className="mt-4 font-mono text-[length:var(--text-caption)] text-muted">
          {formspreeId ? "Form submissions go through Formspree. " : "No Formspree ID set — submit opens mailto. "}
          Prefer email?{" "}
          <a className="font-semibold text-mint-deep" href={mailto}>
            {site.email}
          </a>
        </p>
      )}
    </form>
  );
}
