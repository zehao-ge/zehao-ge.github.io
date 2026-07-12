"use client";

import { useRef, useState } from "react";
import { ContactIcon } from "@/components/ContactIcon";
import { site } from "@/content/site";

export function ConnectContent() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current);
    setCopied(true);
    timer.current = setTimeout(() => setCopied(false), 1600);

    try {
      await navigator.clipboard.writeText(site.identity.email);
    } catch {
      const field = document.createElement("textarea");
      field.value = site.identity.email;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand?.("copy");
      field.remove();
    }
  }

  return (
    <div className="connect-content site-container">
      <h1>{site.contact.heading}</h1>
      <p className="connect-lede">{site.contact.lede}</p>
      <div className="email-row connect-email">
        <a className="contact-link" href={`mailto:${site.identity.email}`}><ContactIcon name="email" />{site.identity.email}</a>
        <button type="button" className="copy-button" onClick={copyEmail} aria-label={site.ui.copyEmail}>
          <span className="copy-icon" aria-hidden="true" />
        </button>
        <span className="copy-status" aria-live="polite">{copied ? site.ui.copied : ""}</span>
      </div>
      <div className="connect-links">
        {site.contact.profiles.map((profile) => (
          <a
            className="text-link contact-link"
            href={profile.href}
            target={profile.href.startsWith("http") ? "_blank" : undefined}
            rel={profile.href.startsWith("http") ? "noopener noreferrer" : undefined}
            key={profile.label}
          >
            {profile.icon && <ContactIcon name={profile.icon} />}{profile.label}
          </a>
        ))}
      </div>
    </div>
  );
}
