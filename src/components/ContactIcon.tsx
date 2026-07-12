import type { ContactIconName } from "@/content/site";

export function ContactIcon({ name }: { name: ContactIconName }) {
  const common = {
    className: "contact-icon",
    viewBox: "0 0 24 24",
    width: 18,
    height: 18,
    "aria-hidden": true,
    focusable: false,
  } as const;

  if (name === "email") {
    return <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3.5 6 8.5 6.5L20.5 6" /></svg>;
  }

  if (name === "cv") {
    return <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2.75h8l4 4v14.5H6z" /><path d="M14 2.75V7h4M9 12h6M9 16h6" /></svg>;
  }

  if (name === "scholar") {
    return <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m2.5 9 9.5-5 9.5 5-9.5 5z" /><path d="M6 11.2v4.3c2.8 2.3 9.2 2.3 12 0v-4.3M21.5 9v6" /></svg>;
  }

  if (name === "github") {
    return <svg {...common} fill="currentColor"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.4-5.29 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>;
  }

  return <svg {...common} fill="currentColor"><path d="M5.2 7.9H1.5V22h3.7V7.9ZM3.35 2A2.17 2.17 0 1 0 3.35 6.34 2.17 2.17 0 0 0 3.35 2ZM22.5 13.9c0-4.25-2.27-6.23-5.3-6.23-2.44 0-3.53 1.34-4.14 2.28V7.9H9.37V22h3.69v-6.98c0-1.84.35-3.63 2.64-3.63 2.26 0 2.29 2.12 2.29 3.75V22h3.69l.82-8.1Z" /></svg>;
}
