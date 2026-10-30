"use client";

import { useState } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { PillButton, PillLink } from "@/components/common/pill-button";
import { contact, deviceRequest } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Contact form.
 *
 * There is no backend yet, so on submit this composes a mailto to info@justusedtech.org
 * rather than pretending to post somewhere. Validation, pending, and error states are all
 * real. Labels sit above inputs, errors below. No placeholder-as-label anywhere.
 *
 * TODO: point `submit` at a real endpoint when one exists.
 *
 * Device requests are the exception. They go to the Google Form on /request-a-device, so
 * picking that topic swaps every field below it for a link there: a request sent by email
 * is one the team cannot track, and the form asks for the contact details itself. The
 * topic comes first for that reason, so nobody types a name the form then asks for again.
 */

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "pending" | "sent" | "error";

const TOPICS = [
  "General enquiry",
  "Donate a device",
  "Fund a programme",
  "Partnership",
  "Volunteering",
];

const DEVICE_TOPIC = "I need a device";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState(TOPICS[0]);
  const isDeviceRequest = topic === DEVICE_TOPIC;

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "Please enter an email address we can reply to.";
    if (message.length < 10)
      next.message = "A sentence or two about what you need is enough.";
    return next;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    /* Enter in a field still submits. A device request never becomes an email. */
    if (isDeviceRequest) return;
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("pending");
    try {
      const topic = String(data.get("topic") ?? TOPICS[0]);
      const body = [
        `From: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Organisation: ${data.get("organisation") || "Not given"}`,
        "",
        String(data.get("message")),
      ].join("\n");

      window.location.href = `mailto:${contact.emails[0].address}?subject=${encodeURIComponent(
        `${topic} via justusedtech.org`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div className="grid gap-2">
        <label
          htmlFor="topic"
          className="text-[0.875rem] font-extrabold text-ink"
        >
          What is this about?
        </label>
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(event) => {
            setTopic(event.target.value);
            /* A message from the last topic, or its errors, does not carry over. */
            setErrors({});
            setStatus("idle");
          }}
          className="h-[3.25rem] w-full rounded-[var(--radius-field)] border border-[color:var(--input)] bg-white px-4 font-semibold text-ink"
        >
          {[...TOPICS, DEVICE_TOPIC].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {isDeviceRequest ? (
        <div className="grid gap-5">
          <p className="text-[0.9375rem] leading-relaxed font-semibold text-ink-soft">
            {deviceRequest.emailNote}
          </p>
          <div>
            <PillLink href={deviceRequest.href} travel>
              {deviceRequest.cta}
            </PillLink>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Your name"
              name="name"
              autoComplete="name"
              error={errors.name}
              required
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              error={errors.email}
              required
            />
          </div>

          <Field
            label="Organisation"
            name="organisation"
            autoComplete="organization"
            hint="Optional."
          />

          <div className="grid gap-2">
            <label
              htmlFor="message"
              className="text-[0.875rem] font-extrabold text-ink"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={cn(
                "w-full resize-y rounded-[var(--radius-field)] border bg-white px-4 py-3.5 font-medium text-ink",
                "placeholder:text-ink-faint",
                errors.message
                  ? "border-[color:var(--destructive)]"
                  : "border-[color:var(--input)]",
              )}
            />
            {errors.message && (
              <p
                id="message-error"
                className="flex items-center gap-1.5 text-[0.8125rem] font-bold text-[color:var(--destructive)]"
              >
                <AlertCircle className="size-4" strokeWidth={2} aria-hidden />
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <PillButton type="submit" disabled={status === "pending"} travel>
              {status === "pending" ? "Opening your email" : "Send message"}
            </PillButton>

            {status === "pending" && (
              <span className="flex items-center gap-2 text-[0.875rem] font-bold text-ink-soft">
                <Loader2
                  className="size-4 animate-spin"
                  strokeWidth={2}
                  aria-hidden
                />
                Working
              </span>
            )}

            {status === "sent" && (
              <span
                role="status"
                className="flex items-center gap-2 text-[0.875rem] font-bold text-brand-green-dark"
              >
                <Check className="size-4" strokeWidth={2.5} aria-hidden />
                Your email client should now be open.
              </span>
            )}

            {status === "error" && Object.keys(errors).length > 0 && (
              <span
                role="alert"
                className="text-[0.875rem] font-bold text-[color:var(--destructive)]"
              >
                Please fix the fields marked above.
              </span>
            )}
          </div>

          <p className="text-[0.8125rem] leading-relaxed text-ink-soft">
            This form opens your email client with the message ready to send. If
            it does not, write to{" "}
            <a
              href={`mailto:${contact.emails[0].address}`}
              className="font-bold text-brand-green-dark underline underline-offset-4"
            >
              {contact.emails[0].address}
            </a>
            .
          </p>
        </>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  error,
  hint,
  type = "text",
  ...props
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-[0.875rem] font-extrabold text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${name}-error` : hint ? `${name}-hint` : undefined
        }
        className={cn(
          "h-[3.25rem] w-full rounded-[var(--radius-field)] border bg-white px-4 font-medium text-ink",
          "placeholder:text-ink-faint",
          error
            ? "border-[color:var(--destructive)]"
            : "border-[color:var(--input)]",
        )}
        {...props}
      />
      {hint && !error && (
        <p
          id={`${name}-hint`}
          className="text-[0.8125rem] font-semibold text-ink-soft"
        >
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${name}-error`}
          className="flex items-center gap-1.5 text-[0.8125rem] font-bold text-[color:var(--destructive)]"
        >
          <AlertCircle className="size-4" strokeWidth={2} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
