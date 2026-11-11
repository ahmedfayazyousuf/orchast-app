"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, ChevronDown, Route, Square } from "lucide-react";
import { dashboardNav } from "@/data/navigation";
import { cn } from "@/lib/cn";

export const scopeOptions = [
  { id: "auto", label: "Auto-route", hint: "QUEEN picks the agents" },
  ...dashboardNav.map((group) => ({
    id: group.id,
    label: group.label,
    hint: group.children.map((child) => child.label).join(" · "),
  })),
];

type QueenComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop: () => void;
  busy: boolean;
  scope: string;
  onScope: (scope: string) => void;
  autoFocus?: boolean;
};

export function QueenComposer({
  value,
  onChange,
  onSubmit,
  onStop,
  busy,
  scope,
  onScope,
  autoFocus,
}: QueenComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const canSend = value.trim().length > 0 && !busy;
  const current = scopeOptions.find((option) => option.id === scope) ?? scopeOptions[0];

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  useEffect(() => {
    if (!menuOpen) return;
    function onPointer(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (canSend) onSubmit();
      }}
      className="rounded-[26px] border border-line bg-white px-3 pb-2.5 pt-3 shadow-[0_12px_40px_rgba(29,72,63,0.08)] transition focus-within:border-mint-3 focus-within:ring-4 focus-within:ring-mint-0"
    >
      <label htmlFor="queen-prompt" className="sr-only">
        Message QUEEN
      </label>
      <textarea
        id="queen-prompt"
        ref={textareaRef}
        rows={1}
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            if (canSend) onSubmit();
          }
        }}
        placeholder="Ask QUEEN to plan, check or brief your agents…"
        className="block max-h-[200px] w-full resize-none bg-transparent px-2 text-[15px] leading-6 text-ink outline-none placeholder:text-muted/70"
      />

      <div className="mt-2 flex items-center gap-2">
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            className="flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-[12px] font-medium text-ink transition hover:bg-mint-0"
          >
            <Route size={13} className="text-deep" />
            <span className="max-w-[160px] truncate">{current.label}</span>
            <ChevronDown
              size={13}
              className={cn("text-muted transition-transform", menuOpen && "rotate-180")}
            />
          </button>
          {menuOpen ? (
            <ul
              role="listbox"
              aria-label="Route to"
              className="absolute bottom-full left-0 z-20 mb-2 w-[290px] rounded-[18px] border border-line bg-white p-1.5 shadow-[0_18px_50px_rgba(29,72,63,0.14)]"
            >
              {scopeOptions.map((option) => (
                <li key={option.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option.id === scope}
                    onClick={() => {
                      onScope(option.id);
                      setMenuOpen(false);
                      textareaRef.current?.focus();
                    }}
                    className="flex w-full items-start gap-2 rounded-[12px] px-3 py-2 text-left hover:bg-mint-0"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-ink">
                        {option.label}
                      </span>
                      <span className="block truncate text-[11px] text-muted">
                        {option.hint}
                      </span>
                    </span>
                    {option.id === scope ? (
                      <Check size={14} className="mt-1 shrink-0 text-deep" />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-[11px] text-muted sm:inline">
            Shift + Enter for a new line
          </span>

          {busy ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop QUEEN"
              className="grid size-9 place-items-center rounded-full bg-ink text-mint-0 transition hover:bg-dark"
            >
              <Square size={12} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canSend}
              aria-label="Send to QUEEN"
              className={cn(
                "grid size-9 place-items-center rounded-full transition",
                canSend
                  ? "bg-ink text-mint-0 hover:bg-dark"
                  : "cursor-not-allowed bg-line text-muted",
              )}
            >
              <ArrowUp size={16} strokeWidth={2.4} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
