"use client";

import { useEffect, useId, useState } from "react";
import { MyBadge } from "@/components/ui/MyBadge";
import { MyButton } from "@/components/ui/MyButton";
import { MyCard } from "@/components/ui/MyCard";
import { MyInput } from "@/components/ui/MyInput";

type Source = {
  id: string;
  name: string;
  logo: string;
  href: string;
  reads: string;
  field: string;
  placeholder: string;
  hint: string;
  validate: (value: string) => string | null;
};

const sources: Source[] = [
  {
    id: "analytics",
    name: "Google Analytics",
    logo: "/integrations/google-analytics.svg",
    href: "https://www.google.com/analytics",
    reads: "Sessions, channels and landing pages.",
    field: "GA4 property ID",
    placeholder: "123456789",
    hint: "Found in Admin, under Property settings.",
    validate: (value) =>
      /^\d{6,12}$/.test(value) ? null : "Enter the numeric GA4 property ID.",
  },
  {
    id: "search-console",
    name: "Google Search Console",
    logo: "/integrations/google-search-console.svg",
    href: "https://search.google.com/search-console",
    reads: "Queries, pages and index coverage.",
    field: "Property",
    placeholder: "https://example.com/",
    hint: "Use a URL prefix or a domain property such as sc-domain:example.com.",
    validate: (value) =>
      /^(https?:\/\/[^\s]+|sc-domain:[a-z0-9.-]+\.[a-z]{2,})$/i.test(value)
        ? null
        : "Enter a URL prefix or a domain property.",
  },
  {
    id: "ahrefs",
    name: "Ahrefs",
    logo: "/integrations/ahrefs.png",
    href: "https://ahrefs.com",
    reads: "Backlinks, keywords and competitors.",
    field: "Project domain",
    placeholder: "example.com",
    hint: "The domain of the Ahrefs project the SEO agent should read.",
    validate: (value) =>
      /^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i.test(value)
        ? null
        : "Enter the project domain, such as example.com.",
  },
];

const storageKey = "orchast.seo.sources";

export function SeoSources() {
  const titleId = useId();
  const [accounts, setAccounts] = useState<Record<string, string>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, string>;
      if (parsed && typeof parsed === "object") setAccounts(parsed);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    if (!activeId) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeId]);

  function persist(next: Record<string, string>) {
    setAccounts(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function open(source: Source) {
    setDraft(accounts[source.id] ?? "");
    setError(null);
    setActiveId(source.id);
  }

  function connect(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const source = sources.find((item) => item.id === activeId);
    if (!source) return;
    const value = draft.trim();
    const message = source.validate(value);
    if (message) {
      setError(message);
      return;
    }
    persist({ ...accounts, [source.id]: value });
    setActiveId(null);
  }

  const active = sources.find((item) => item.id === activeId) ?? null;
  const connectedCount = sources.filter((source) => accounts[source.id]).length;

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-[16px]! font-semibold tracking-[-0.02em] text-ink">Sources</h2>
          <p className="mt-1 text-[13px]">
            Connect the accounts the SEO agent should read for this business.
          </p>
        </div>
        <MyBadge tone={connectedCount === sources.length ? "good" : "muted"}>
          {connectedCount} of {sources.length} connected
        </MyBadge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {sources.map((source) => {
          const account = accounts[source.id];
          const connected = Boolean(account);
          return (
            <MyCard key={source.id} className="flex flex-col">
              <a
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-full items-center overflow-hidden"
              >
                <img
                  src={source.logo}
                  alt={source.name}
                  className="block h-auto max-h-10 w-auto max-w-full object-contain object-left"
                />
              </a>
              <h3 className="mt-4 text-[16px] font-semibold text-ink">{source.name}</h3>
              <p className="mt-1 flex-1 text-[13px]">{source.reads}</p>
              {connected ? (
                <p className="mt-3 truncate text-[12px] font-medium text-ink">{account}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <MyBadge tone={connected ? "good" : "muted"}>
                  {connected ? "Connected" : "Not connected"}
                </MyBadge>
                {connected ? (
                  <MyButton
                    size="sm"
                    onClick={() => {
                      const next = { ...accounts };
                      delete next[source.id];
                      persist(next);
                    }}
                  >
                    Disconnect
                  </MyButton>
                ) : (
                  <MyButton size="sm" variant="primary" onClick={() => open(source)}>
                    Connect
                  </MyButton>
                )}
              </div>
            </MyCard>
          );
        })}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-70 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
          onClick={() => setActiveId(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-md rounded-card border border-line bg-white p-5 shadow-soft sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <a href={active.href} target="_blank" rel="noreferrer" className="inline-flex h-12 max-w-full items-center">
              <img
                src={active.logo}
                alt=""
                className="block h-auto max-h-10 w-auto max-w-full object-contain object-left"
              />
            </a>
            <h3 id={titleId} className="mt-4 text-[22px] font-semibold tracking-[-0.03em] text-ink">
              Connect {active.name}
            </h3>
            <p className="mt-2 text-[13px]">
              {active.reads} The SEO agent uses this account for the business. The
              connection is kept in this browser.
            </p>
            <form onSubmit={connect} className="mt-4 space-y-4">
              <MyInput
                label={active.field}
                name={active.id}
                value={draft}
                placeholder={active.placeholder}
                hint={error ? undefined : active.hint}
                error={error ?? undefined}
                autoFocus
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => {
                  setDraft(event.target.value);
                  if (error) setError(null);
                }}
              />
              <div className="flex gap-2">
                <MyButton variant="primary" type="submit">
                  Connect
                </MyButton>
                <MyButton onClick={() => setActiveId(null)}>Cancel</MyButton>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
