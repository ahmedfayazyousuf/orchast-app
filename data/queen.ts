export type AgentBrief = {
  match: RegExp;
  task: string;
  line: string;
  spends?: boolean;
};

export const agentBriefs: Record<string, AgentBrief> = {
  "/dashboard/digital-performance/seo": {
    match: /\b(seo|organic|rank(ing)?s?|keywords?|crawl|content|blog)\b/i,
    task: "Pull ranking movement and crawl gaps",
    line: "is pulling ranking movement and crawl issues so content work targets pages that can actually move.",
  },
  "/dashboard/digital-performance/aieo": {
    match: /\b(aieo|ai answers?|chatgpt|perplexity|gemini|citations?|llms?|share of voice)\b/i,
    task: "Check share of voice in AI answers",
    line: "is checking how often Kestrel is cited in AI answers for the queries in this brief.",
  },
  "/dashboard/digital-performance/digital-marketing": {
    match: /\b(ads?|campaigns?|meta|google ads|paid|acquisition|marketing|cpa|roas|creative|media)\b/i,
    task: "Draft the paid media mix",
    line: "is drafting a channel mix across search and Meta, with contribution margin as the guardrail.",
    spends: true,
  },
  "/dashboard/brand-advertising/outdoor": {
    match: /\b(ooh|outdoor|billboards?|bus shelters?|spectaculars?|placements?)\b/i,
    task: "Shortlist OOH placements",
    line: "is shortlisting placements with reach estimates and holding any booking until artwork is approved.",
    spends: true,
  },
  "/dashboard/brand-advertising/influencer-marketing": {
    match: /\b(influencers?|creators?|tiktok|instagram|ugc|youtubers?)\b/i,
    task: "Shortlist brand-safe creators",
    line: "is shortlisting brand-safe creators and preparing a brief template for your review.",
    spends: true,
  },
  "/dashboard/internal-tools/sales": {
    match: /\b(sales|pipeline|deals?|leads?|crm|prospects?|follow[- ]?ups?)\b/i,
    task: "Review pipeline and follow-ups",
    line: "is cleaning the pipeline and flagging deals that need a follow-up this week.",
  },
  "/dashboard/internal-tools/procurement": {
    match: /\b(procure(ment)?|vendors?|suppliers?|rfqs?|purchases?|quotes?|tenders?)\b/i,
    task: "Prepare vendor shortlist",
    line: "is preparing a vendor shortlist and checking it against purchase controls.",
    spends: true,
  },
  "/dashboard/internal-tools/risk-analysing": {
    match: /\b(risks?|compliance|polic(y|ies)|consent|legal|breach(es)?|controls?|exposure)\b/i,
    task: "Run policy and consent checks",
    line: "is checking consent, policy and approval gates before anything goes live.",
  },
  "/dashboard/internal-tools/finance": {
    match: /\b(budgets?|aed|costs?|cash|roi|margins?|finance|spend|revenue|profit)\b/i,
    task: "Confirm the spend ceiling",
    line: "is confirming the spend ceiling and how ROI will be evidenced before money moves.",
  },
};

export const defaultAgents = [
  "/dashboard/digital-performance/digital-marketing",
  "/dashboard/internal-tools/finance",
  "/dashboard/internal-tools/risk-analysing",
];

export const queenSuggestions = [
  {
    lead: "/dashboard/digital-performance/digital-marketing",
    prompt:
      "Plan next month's marketing with AED 40,000, prioritising acquisition and positive contribution margin.",
  },
  {
    lead: "/dashboard/digital-performance/seo",
    prompt: "Why did organic traffic dip last week, and what should SEO fix first?",
  },
  {
    lead: "/dashboard/brand-advertising/influencer-marketing",
    prompt: "Shortlist creators and one outdoor placement for the Ramadan launch.",
  },
  {
    lead: "/dashboard/internal-tools/risk-analysing",
    prompt: "Check whether any pending supplier RFQs breach our purchase controls.",
  },
];
