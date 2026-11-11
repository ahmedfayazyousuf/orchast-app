"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Crown, SquarePen } from "lucide-react";
import { dashboardNav } from "@/data/navigation";
import { queenSuggestions } from "@/data/queen";
import { dummyUser } from "@/data/workspaces";
import { blockLength, planReply } from "@/lib/queen";
import { QueenComposer } from "@/components/sections/command-centre/QueenComposer";
import {
  QueenMessage,
  UserMessage,
  type ChatMessage,
} from "@/components/sections/command-centre/QueenMessage";

const firstName = dummyUser.name.split(" ")[0];
const agentIndex = new Map(
  dashboardNav.flatMap((group) => group.children).map((child) => [child.href, child]),
);
const CHARS_PER_MS = 0.24;

export function CommandCentre() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [scope, setScope] = useState("auto");
  const timer = useRef<number | null>(null);
  const activeId = useRef<number | null>(null);
  const nextId = useRef(1);
  const pinToBottom = useRef(false);

  const last = messages[messages.length - 1];
  const busy = last?.role === "queen" && (last.phase === "thinking" || last.phase === "writing");

  const clearTimer = useCallback(() => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  useEffect(() => {
    if (messages.length === 0) return;
    const nearBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160;
    if (pinToBottom.current || nearBottom) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
      pinToBottom.current = false;
    }
  }, [messages]);

  function send(text: string) {
    const prompt = text.trim();
    if (!prompt || busy) return;

    const userId = nextId.current++;
    const queenId = nextId.current++;
    const reply = planReply(prompt, scope, firstName);
    const total = reply.blocks.reduce((sum, block) => sum + blockLength(block), 0);
    const count = reply.delegations.length;
    const routingEnd = count ? 1000 + (count - 1) * 350 + 250 : 700;
    const startedAt = performance.now();

    pinToBottom.current = true;
    activeId.current = queenId;
    setDraft("");
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", text: prompt },
      { id: queenId, role: "queen", reply, phase: "thinking", revealed: 0 },
    ]);

    clearTimer();
    timer.current = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const revealed = Math.min(
        total,
        Math.max(0, Math.floor((elapsed - routingEnd) * CHARS_PER_MS)),
      );
      const finished = revealed >= total;

      setMessages((current) =>
        current.map((message) =>
          message.id === queenId && message.role === "queen"
            ? {
                ...message,
                revealed,
                phase: finished ? "done" : elapsed < routingEnd ? "thinking" : "writing",
                reply: {
                  ...message.reply,
                  delegations: message.reply.delegations.map((delegation, index) => ({
                    ...delegation,
                    status:
                      elapsed >= 1000 + index * 350
                        ? "done"
                        : elapsed >= 300 + index * 350
                          ? "working"
                          : "queued",
                  })),
                },
              }
            : message,
        ),
      );

      if (finished) {
        clearTimer();
        activeId.current = null;
      }
    }, 32);
  }

  function stop() {
    clearTimer();
    const id = activeId.current;
    activeId.current = null;
    setMessages((current) =>
      current.map((message) =>
        message.id === id && message.role === "queen"
          ? { ...message, phase: "stopped" }
          : message,
      ),
    );
  }

  function newChat() {
    clearTimer();
    activeId.current = null;
    setMessages([]);
    setDraft("");
  }

  const composer = (
    <QueenComposer
      value={draft}
      onChange={setDraft}
      onSubmit={() => send(draft)}
      onStop={stop}
      busy={busy}
      scope={scope}
      onScope={setScope}
      autoFocus
    />
  );

  if (messages.length === 0) {
    return (
      <div className="mx-auto flex min-h-[calc(100dvh-112px)] w-full max-w-3xl flex-col items-center justify-center pb-10">
        <span className="orbit-pulse grid size-12 place-items-center rounded-full bg-ink text-mint-0">
          <Crown size={20} />
        </span>
        <h1 className="mt-5 text-center text-[30px] font-medium tracking-[-0.035em] sm:text-[36px]">
          Good to see you, <span className="serif">{firstName}.</span>
        </h1>
        <p className="mb-7 max-w-md text-center text-[14px]">
          I&apos;m QUEEN. Tell me the goal and I&apos;ll brief the right agents,
          then bring back one plan for you to approve.
        </p>

        <div className="w-full">{composer}</div>

        <ul className="mt-5 w-full space-y-0.5">
          {queenSuggestions.map((suggestion) => {
            const Icon = agentIndex.get(suggestion.lead)?.icon ?? Crown;
            return (
              <li key={suggestion.prompt}>
                <button
                  type="button"
                  onClick={() => send(suggestion.prompt)}
                  className="group flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left text-[13.5px] text-ink/85 transition hover:bg-white hover:text-ink"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-mint-0 text-deep">
                    <Icon size={14} />
                  </span>
                  <span className="flex-1">{suggestion.prompt}</span>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-muted opacity-0 transition group-hover:opacity-100"
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mb-0 mt-8 text-center text-[11px] text-muted">
          Prototype · QUEEN&apos;s replies are simulated locally. Nothing is sent
          to ad platforms, banks or customer data.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-112px)] w-full max-w-3xl flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12px] text-muted">
          <span className="size-1.5 rounded-full bg-good" />
          QUEEN · orchestrating {agentIndex.size} agents
        </div>
        <button
          type="button"
          onClick={newChat}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-white px-3 text-[12px] font-medium text-ink transition hover:bg-mint-0"
        >
          <SquarePen size={13} /> New chat
        </button>
      </div>

      <div className="flex-1 space-y-7 pb-6">
        {messages.map((message) =>
          message.role === "user" ? (
            <UserMessage key={message.id} text={message.text} />
          ) : (
            <QueenMessage
              key={message.id}
              reply={message.reply}
              phase={message.phase}
              revealed={message.revealed}
            />
          ),
        )}
      </div>

      <div className="sticky bottom-0 -mx-2 bg-linear-to-t from-bg from-75% to-transparent px-2 pb-3 pt-6">
        {composer}
        <p className="mb-0 mt-2 text-center text-[11px] text-muted">
          QUEEN&apos;s replies are simulated in this prototype.
        </p>
      </div>
    </div>
  );
}
