"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  aieoEngines,
  aieoRegions,
  engineLabel,
  type AieoEngine,
} from "@/data/aieo-research";
import { cn } from "@/lib/cn";

type OpenPanel = "region" | "engines" | null;

type AieoResearchBarProps = {
  regionId: string;
  engineIds: string[];
  onRegion: (id: string) => void;
  onEngines: (ids: string[]) => void;
};

function Mark({ src, className }: { src: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-6 shrink-0 place-items-center overflow-hidden rounded-md border border-line bg-white",
        className,
      )}
    >
      <img src={src} alt="" width={16} height={16} className="size-4 object-contain" />
    </span>
  );
}

export function AieoResearchBar({
  regionId,
  engineIds,
  onRegion,
  onEngines,
}: AieoResearchBarProps) {
  const [open, setOpen] = useState<OpenPanel>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const region = aieoRegions.find((item) => item.id === regionId) ?? aieoRegions[0];
  const selected = aieoEngines.filter((engine) => engineIds.includes(engine.id));

  useEffect(() => {
    if (!open) return;

    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(null);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggleEngine(engine: AieoEngine) {
    onEngines(
      engineIds.includes(engine.id)
        ? engineIds.filter((id) => id !== engine.id)
        : [...engineIds, engine.id],
    );
  }

  const engineSummary =
    selected.length === 0
      ? "No engines"
      : selected.length === aieoEngines.length
        ? "All engines"
        : selected.length === 1
          ? engineLabel(selected[0])
          : `${selected.length} engines`;

  return (
    <div className="sticky top-16 z-20 -mt-6 mb-6 w-[calc(100%+2rem)] -ml-4 border-b border-line bg-white/90 backdrop-blur-md sm:w-[calc(100%+3rem)] sm:-ml-6 lg:w-[calc(100%+4rem)] lg:-ml-8">
      <div ref={rootRef} className="mx-auto flex min-h-14 max-w-6xl flex-wrap items-center gap-2 px-4 py-2 sm:px-6 lg:px-8">
        <div className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open === "region"}
            onClick={() => setOpen(open === "region" ? null : "region")}
            className={cn(
              "inline-flex h-10 max-w-full items-center gap-2 rounded-full border bg-white px-3 text-[13px] text-ink",
              open === "region" ? "border-mint-3 bg-mint-0" : "border-line hover:border-mint-3",
            )}
          >
            <img
              src={region.flag}
              alt=""
              width={18}
              height={12}
              className="h-3 w-4.5 rounded-xs object-cover"
            />
            <span className="max-w-45 truncate sm:max-w-none">{region.name}</span>
            <ChevronDown size={14} className="text-muted" />
          </button>
          {open === "region" ? (
            <div
              role="menu"
              aria-label="Region"
              className="absolute left-0 top-[calc(100%+8px)] z-30 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-card border border-line bg-white py-1 shadow-soft"
            >
              <div className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                Region
              </div>
              <div className="max-h-80 overflow-y-auto p-1">
                {aieoRegions.map((item) => {
                  const active = item.id === region.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="menuitemradio"
                      aria-checked={active}
                      onClick={() => {
                        onRegion(item.id);
                        setOpen(null);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-[13px]",
                        active ? "bg-mint-0 text-ink" : "text-ink hover:bg-mint-0/70",
                      )}
                    >
                      <img
                        src={item.flag}
                        alt=""
                        width={18}
                        height={12}
                        className="h-3 w-4.5 rounded-xs object-cover"
                      />
                      <span className="min-w-0 flex-1 truncate">{item.name}</span>
                      {active ? <Check size={14} className="text-deep" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open === "engines"}
            onClick={() => setOpen(open === "engines" ? null : "engines")}
            className={cn(
              "inline-flex h-10 max-w-full items-center gap-2 rounded-full border bg-white px-2.5 text-[13px] text-ink",
              open === "engines" ? "border-mint-3 bg-mint-0" : "border-line hover:border-mint-3",
            )}
          >
            <span className="flex items-center pl-0.5">
              {selected.length === 0 ? (
                <span className="grid size-6 place-items-center rounded-md border border-dashed border-line text-[10px] text-muted">
                  0
                </span>
              ) : (
                selected.map((engine, index) => (
                  <Mark
                    key={engine.id}
                    src={engine.logo}
                    className={index > 0 ? "-ml-2" : undefined}
                  />
                ))
              )}
            </span>
            <span className="max-w-37.5 truncate sm:max-w-55">{engineSummary}</span>
            <ChevronDown size={14} className="text-muted" />
          </button>
          {open === "engines" ? (
            <div
              role="menu"
              aria-label="Answer engines"
              className="absolute left-0 top-[calc(100%+8px)] z-30 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-card border border-line bg-white shadow-soft"
            >
              <div className="flex items-center justify-between px-3 pb-1 pt-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                  Answer engines
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onEngines(aieoEngines.map((engine) => engine.id))}
                    className="text-[12px] font-medium text-deep"
                  >
                    Select all
                  </button>
                  <button
                    type="button"
                    onClick={() => onEngines([])}
                    className="text-[12px] font-medium text-muted"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="p-1">
                {aieoEngines.map((engine) => {
                  const checked = engineIds.includes(engine.id);
                  return (
                    <button
                      key={engine.id}
                      type="button"
                      role="menuitemcheckbox"
                      aria-checked={checked}
                      onClick={() => toggleEngine(engine)}
                      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-mint-0"
                    >
                      <span
                        className={cn(
                          "grid size-4 shrink-0 place-items-center rounded-sm border",
                          checked ? "border-deep bg-deep text-white" : "border-line bg-white",
                        )}
                      >
                        {checked ? <Check size={11} strokeWidth={3} /> : null}
                      </span>
                      <Mark src={engine.logo} className="size-7" />
                      <span className="min-w-0">
                        <span className="block text-[13px] font-medium text-ink">{engine.name}</span>
                        {engine.detail ? (
                          <span className="block text-[11px] text-muted">{engine.detail}</span>
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
