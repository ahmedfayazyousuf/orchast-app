import type { LucideIcon } from "lucide-react";
import { dashboardNav } from "@/data/navigation";
import { agentBriefs, defaultAgents } from "@/data/queen";

export type DelegationStatus = "queued" | "working" | "done";

export type Delegation = {
  href: string;
  label: string;
  icon: LucideIcon;
  task: string;
  status: DelegationStatus;
};

export type ReplyBlock =
  | { kind: "p"; text: string }
  | { kind: "li"; label: string; text: string };

export type QueenReply = {
  delegations: Delegation[];
  blocks: ReplyBlock[];
};

const agents = dashboardNav.flatMap((group) =>
  group.children.map((child) => ({ ...child, groupId: group.id })),
);

const GREETING = /^(hi|hey|hello|salam|salaam|yo|good (morning|afternoon|evening))\b[\s!.?]*$/i;

export function planReply(prompt: string, scope: string, firstName: string): QueenReply {
  const text = prompt.trim();

  if (GREETING.test(text)) {
    return {
      delegations: [],
      blocks: [
        {
          kind: "p",
          text: `Hi ${firstName}. I'm QUEEN — I coordinate your SEO, AIEO, marketing, brand, sales, procurement, risk and finance agents.`,
        },
        {
          kind: "p",
          text: "Give me a goal, a budget or a problem and I'll brief the right agents, then bring back one plan for you to approve.",
        },
      ],
    };
  }

  const pool = scope === "auto" ? agents : agents.filter((agent) => agent.groupId === scope);
  let picked = pool.filter((agent) => agentBriefs[agent.href]?.match.test(text));

  if (picked.length === 0) {
    picked =
      scope === "auto"
        ? agents.filter((agent) => defaultAgents.includes(agent.href))
        : pool;
  }

  const risk = agents.find((agent) => agent.href.endsWith("/risk-analysing"));
  if (
    scope === "auto" &&
    risk &&
    !picked.includes(risk) &&
    picked.some((agent) => agentBriefs[agent.href]?.spends)
  ) {
    picked = [...picked, risk];
  }

  const amount = text
    .match(/aed\s?\d[\d,.]*k?/i)?.[0]
    .replace(/[,.]+$/, "")
    .replace(/^aed\s?/i, "AED ");

  const delegations: Delegation[] = picked.map((agent) => ({
    href: agent.href,
    label: agent.label,
    icon: agent.icon,
    task: agentBriefs[agent.href].task,
    status: "queued",
  }));

  const count = delegations.length;
  const blocks: ReplyBlock[] = [
    {
      kind: "p",
      text: `Understood${amount ? ` — working inside ${amount}` : ""}. I've split this across ${count} ${count === 1 ? "agent" : "agents"}:`,
    },
    ...picked.map((agent) => ({
      kind: "li" as const,
      label: agent.label,
      text: agentBriefs[agent.href].line,
    })),
    {
      kind: "p",
      text: picked.some((agent) => agentBriefs[agent.href]?.spends)
        ? "Anything that spends money or publishes externally will land in your approval queue first. Want me to turn this into a dated plan?"
        : "I'll consolidate their findings into one summary. Want me to schedule this as a weekly check?",
    },
  ];

  return { delegations, blocks };
}

export function blockLength(block: ReplyBlock) {
  return block.kind === "li" ? block.label.length + 1 + block.text.length : block.text.length;
}
