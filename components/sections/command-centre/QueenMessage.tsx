"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Crown, LoaderCircle } from "lucide-react";
import { blockLength, type QueenReply } from "@/lib/queen";
import { cn } from "@/lib/cn";

export type QueenPhase = "thinking" | "writing" | "done" | "stopped";

export type ChatMessage =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "queen"; reply: QueenReply; phase: QueenPhase; revealed: number };

export function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] whitespace-pre-wrap rounded-[22px] rounded-br-md border border-mint-1 bg-mint-0 px-4 py-2.5 text-[14.5px] leading-relaxed text-ink">
        {text}
      </div>
    </div>
  );
}

export function QueenMessage({
  reply,
  phase,
  revealed,
}: {
  reply: QueenReply;
  phase: QueenPhase;
  revealed: number;
}) {
  const [copied, setCopied] = useState(false);
  const live = phase === "thinking" || phase === "writing";
  const { delegations, blocks } = reply;

  const visible = blocks
    .reduce<{ block: (typeof blocks)[number]; start: number }[]>((acc, block) => {
      const prev = acc[acc.length - 1];
      const start = prev ? prev.start + blockLength(prev.block) : 0;
      return [...acc, { block, start }];
    }, [])
    .map(({ block, start }) => ({
      block,
      shown: Math.max(0, Math.min(blockLength(block), revealed - start)),
    }))
    .filter((item) => item.shown > 0);

  function copy() {
    const text = blocks
      .map((block) => (block.kind === "li" ? `• ${block.label} ${block.text}` : block.text))
      .join("\n");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="flex gap-3">
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full bg-ink text-mint-0",
          live && "orbit-pulse",
        )}
      >
        <Crown size={14} />
      </span>

      <div className="min-w-0 flex-1 space-y-3 pt-1">
        <div className="flex items-center gap-2 text-[12px]">
          <span className="font-semibold tracking-[0.08em] text-ink">QUEEN</span>
          <span className="text-muted">Orchestrator</span>
        </div>

        {delegations.length > 0 ? (
          <div className="rounded-[18px] border border-line bg-white p-1.5">
            <div className="px-2.5 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              Delegating to {delegations.length}{" "}
              {delegations.length === 1 ? "agent" : "agents"}
            </div>
            <ul>
              {delegations.map((delegation) => {
                const Icon = delegation.icon;
                return (
                  <li key={delegation.href}>
                    <Link
                      href={delegation.href}
                      className="flex items-center gap-3 rounded-[12px] px-2.5 py-2 transition hover:bg-mint-0"
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-mint-0 text-deep">
                        <Icon size={14} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-ink">
                          {delegation.label}
                        </span>
                        <span className="block truncate text-[11px] text-muted">
                          {delegation.task}
                        </span>
                      </span>
                      <DelegationState status={delegation.status} stopped={phase === "stopped"} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {visible.length === 0 && live ? (
          <div className="flex h-6 items-center gap-1" aria-label="QUEEN is thinking">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="size-1.5 animate-bounce rounded-full bg-mint-4"
                style={{ animationDelay: `${dot * 140}ms` }}
              />
            ))}
          </div>
        ) : null}

        {visible.length > 0 ? (
          <div className="space-y-3 text-[14.5px] leading-relaxed text-ink">
            {visible.map(({ block, shown }, index) => {
              const caret =
                phase === "writing" && index === visible.length - 1 ? (
                  <span className="ml-0.5 inline-block size-2 animate-pulse rounded-full bg-ink align-middle" />
                ) : null;

              if (block.kind === "p") {
                return (
                  <p key={index} className="mb-0 text-ink">
                    {block.text.slice(0, shown)}
                    {caret}
                  </p>
                );
              }

              const label = block.label.slice(0, shown);
              const rest = block.text.slice(0, Math.max(0, shown - block.label.length - 1));
              return (
                <div key={index} className="flex gap-2.5 pl-1">
                  <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-mint-4" />
                  <p className="mb-0 text-ink">
                    <span className="font-semibold">{label}</span>
                    {rest ? ` ${rest}` : null}
                    {caret}
                  </p>
                </div>
              );
            })}
          </div>
        ) : null}

        {phase === "done" || phase === "stopped" ? (
          <div className="flex items-center gap-3 text-[11px] text-muted">
            {phase === "stopped" ? <span>Stopped</span> : null}
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 transition hover:bg-white hover:text-ink"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DelegationState({
  status,
  stopped,
}: {
  status: "queued" | "working" | "done";
  stopped: boolean;
}) {
  if (status === "done") {
    return (
      <span className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-good">
        <Check size={13} /> Briefed
      </span>
    );
  }
  if (stopped) {
    return <span className="shrink-0 text-[11px] text-muted">Cancelled</span>;
  }
  if (status === "working") {
    return (
      <span className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-deep">
        <LoaderCircle size={13} className="animate-spin" /> Briefing
      </span>
    );
  }
  return <span className="shrink-0 text-[11px] text-muted">Queued</span>;
}
