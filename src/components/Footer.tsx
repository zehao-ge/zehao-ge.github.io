"use client";

import { useRef, useState } from "react";
import { site } from "@/content/site";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  async function copy() {
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
    try {
      await navigator.clipboard.writeText(site.identity.email);
    } catch {
      try {
        const field = document.createElement("textarea");
        field.value = site.identity.email;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand?.("copy");
        field.remove();
      } catch {
        // The confirmation still reports the user's requested copy action.
      }
    }
  }
  return (
    <footer id="contact" className="section footer-section">
      <div className="content-width">
        <h2>{site.contact.heading}</h2>
        <p className="body-large footer-lede">{site.contact.lede}</p>
        <div className="email-row">
          <a href={`mailto:${site.identity.email}`}>{site.identity.email}</a>
          <button type="button" className="copy-button" onClick={copy} aria-label={site.ui.copyEmail}><span className="copy-icon" aria-hidden="true" /></button>
          <span className="copy-status" aria-live="polite">{copied ? site.ui.copied : ""}</span>
        </div>
        <div className="profile-links">{site.contact.profiles.map((profile) => profile.href ? <a className="text-link" href={profile.href} target="_blank" rel="noopener noreferrer" key={profile.label}>{profile.label}</a> : <span className="todo-inline-link" title={profile.todo} key={profile.label}>{profile.label}<sup>{site.ui.todoMarker}</sup></span>)}</div>
        <p className="caption footer-bottom">{site.contact.footer}</p>
      </div>
    </footer>
  );
}
