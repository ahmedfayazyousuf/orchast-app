export type WorkspaceMetric = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat" | "warn" | "good";
};

export type WorkspaceRow = {
  cells: string[];
  tone?: "good" | "warn" | "muted";
  engineId?: string;
};

export type Workspace = {
  slug: string;
  eyebrow: string;
  title: string;
  serif: string;
  lede: string;
  metrics: WorkspaceMetric[];
  columns: string[];
  rows: WorkspaceRow[];
  notes: { title: string; body: string }[];
  activity: { time: string; title: string; detail: string }[];
};

export const workspaces: Record<string, Workspace> = {
  seo: {
    slug: "seo",
    eyebrow: "Digital Performance / SEO",
    title: "Organic demand,",
    serif: "measured weekly.",
    lede: "Connect Analytics, Search Console and Ahrefs. The SEO agent reads rankings, indexation and content gaps from those accounts. The figures below are sample records.",
    metrics: [
      { label: "Organic sessions", value: "184.2k", delta: "+9.4%", trend: "up" },
      { label: "Avg. position", value: "12.4", delta: "−1.1", trend: "up" },
      { label: "Keywords in top 10", value: "326", delta: "+18", trend: "up" },
      { label: "Index coverage", value: "94%", delta: "stable", trend: "flat" },
    ],
    columns: ["Query", "Pos.", "Volume", "Page", "Intent"],
    rows: [
      { cells: ["ai operating layer", "3", "2.4k", "/platform", "Commercial"], tone: "good" },
      { cells: ["multi agent saas", "7", "1.1k", "/agents", "Commercial"] },
      { cells: ["queen governance ai", "11", "890", "/governance", "Informational"] },
      { cells: ["roi ledger for agents", "14", "540", "/finance", "Transactional"], tone: "warn" },
      { cells: ["aieo vs seo", "4", "3.2k", "/aieo", "Commercial"], tone: "good" },
    ],
    notes: [
      { title: "Content gap", body: "No cluster yet for 'approval centre for AI spend'. Draft brief queued." },
      { title: "Technical", body: "4 templates with LCP > 2.8s on mobile. Marketing agent notified." },
    ],
    activity: [
      { time: "09:14", title: "Title rewrite proposed", detail: "12 product URLs · awaiting editor" },
      { time: "08:02", title: "Sitemap delta", detail: "+18 URLs discovered in staging" },
      { time: "Yesterday", title: "Lost position", detail: "'agent orchestration' 8 → 14" },
    ],
  },
  aieo: {
    slug: "aieo",
    eyebrow: "Digital Performance / AIEO",
    title: "Cited in answers,",
    serif: "not just ranked.",
    lede: "Sample citations for the answer engines and region in view. No live prompt runs.",
    metrics: [
      { label: "AI citations / 7d", value: "86", delta: "+21", trend: "up" },
      { label: "Share of voice", value: "18%", delta: "+3.2pp", trend: "up" },
      { label: "Unbranded answers", value: "41", delta: "+7", trend: "up" },
      { label: "Stale facts flagged", value: "5", delta: "2 open", trend: "warn" },
    ],
    columns: ["Engine", "Prompt class", "Cited?", "Position", "Last seen"],
    rows: [
      {
        engineId: "chatgpt-gpt-6",
        cells: ["ChatGPT (GPT-6)", "Best AI ops platforms", "Yes", "2", "2h"],
        tone: "good",
      },
      {
        engineId: "chatgpt-gpt-6",
        cells: ["ChatGPT (GPT-6)", "Agent governance tools", "Yes", "3", "6h"],
        tone: "good",
      },
      {
        engineId: "chatgpt-gpt-5-6-sol",
        cells: ["ChatGPT (GPT-5.6 Sol)", "ROI proof for AI agents", "Partial", "4", "1d"],
      },
      {
        engineId: "google-ai-overviews",
        cells: ["Google AI Overviews", "Multi-agent operating layer", "Yes", "1", "4h"],
        tone: "good",
      },
      {
        engineId: "google-ai-overviews",
        cells: ["Google AI Overviews", "AIEO and SEO", "Yes", "2", "9h"],
        tone: "good",
      },
      {
        engineId: "google-ai-mode",
        cells: ["Google AI Mode", "Guarded multi-agent workflows", "No", "n/a", "3d"],
        tone: "warn",
      },
    ],
    notes: [
      { title: "Entity pack", body: "Publish organization schema and QUEEN mandate page to lift unbranded citations." },
      { title: "Fact sheet", body: "Two engines still quote the old 9-agent count. Push corrected brief." },
    ],
    activity: [
      { time: "11:40", title: "New citation", detail: "Perplexity · 'guarded multi-agent workflows'" },
      { time: "10:18", title: "Prompt watch", detail: "14 commercial prompts recrawled" },
      { time: "07:55", title: "Hallucination flag", detail: "Invented AED 12m ARR — suppressed in brief" },
    ],
  },
  "digital-marketing": {
    slug: "digital-marketing",
    eyebrow: "Digital Performance / Digital Marketing",
    title: "Spend with a ceiling.",
    serif: "Prove the margin.",
    lede: "Always-on paid mix with contribution-margin checks. Budgets, audiences and creatives are fictional.",
    metrics: [
      { label: "Media spend MTD", value: "AED 86.4k", delta: "72% of cap", trend: "flat" },
      { label: "Blended CAC", value: "AED 41", delta: "−8%", trend: "up" },
      { label: "Contribution", value: "AED 129k", delta: "+12%", trend: "up" },
      { label: "Approvals waiting", value: "3", delta: "creative + geo", trend: "warn" },
    ],
    columns: ["Channel", "Spend", "CPA", "ROAS", "Status"],
    rows: [
      { cells: ["Meta prospecting", "AED 22.1k", "38", "3.4x", "Live"], tone: "good" },
      { cells: ["Google Search", "AED 31.8k", "29", "4.1x", "Live"], tone: "good" },
      { cells: ["YouTube", "AED 14.0k", "61", "1.6x", "Review"], tone: "warn" },
      { cells: ["LinkedIn", "AED 9.4k", "88", "1.1x", "Paused"], tone: "muted" },
      { cells: ["TikTok tests", "AED 9.1k", "44", "2.2x", "Live"] },
    ],
    notes: [
      { title: "Policy", body: "YouTube exceeds CAC ceiling. Finance must approve before the next increment." },
      { title: "Creative", body: "Hook B outperforms on Meta by 22%. Rotate after 48h frequency." },
    ],
    activity: [
      { time: "12:05", title: "Budget shift proposed", detail: "AED 6k YouTube → Search" },
      { time: "09:48", title: "Audience refresh", detail: "Lookalike 2% rebuilt from Q3 buyers" },
      { time: "08:11", title: "Cap warning", detail: "Daily Meta 12% over pacing" },
    ],
  },
  outdoor: {
    slug: "outdoor",
    eyebrow: "Brand Advertising / Outdoor",
    title: "Presence in the city.",
    serif: "Accountable on paper.",
    lede: "Fictional OOH network across Dubai and Abu Dhabi. Impressions are modelled, not audited.",
    metrics: [
      { label: "Live faces", value: "42", delta: "3 in production", trend: "flat" },
      { label: "Est. weekly reach", value: "1.8m", delta: "+11%", trend: "up" },
      { label: "Share of frames", value: "6.4%", delta: "peak corridors", trend: "flat" },
      { label: "Production SLA", value: "5d", delta: "on track", trend: "good" },
    ],
    columns: ["Location", "Format", "Flight", "Est. impressions", "State"],
    rows: [
      { cells: ["SZR · DIFC", "Unipole", "Nov 3–30", "420k", "Live"], tone: "good" },
      { cells: ["DXB T3 arrivals", "Digital 6-sheet", "Nov 1–14", "610k", "Live"], tone: "good" },
      { cells: ["Yas Island loop", "48-sheet", "Nov 10–24", "190k", "Booked"] },
      { cells: ["Abu Dhabi Corniche", "Spectacular", "Dec hold", "—", "Pending art"], tone: "warn" },
      { cells: ["Mall of Emirates", "D6", "Nov 7–21", "240k", "Live"] },
    ],
    notes: [
      { title: "Proof of posting", body: "Week-1 photos due Friday. Risk agent will flag any dark frames." },
      { title: "Brand safety", body: "Corniche spectacular shares a sightline with a competitor. Legal reviewing." },
    ],
    activity: [
      { time: "13:22", title: "Artwork v3 uploaded", detail: "DIFC unipole · CMYK locked" },
      { time: "10:04", title: "Availability ping", detail: "Two digital 6-sheets on SZR next week" },
      { time: "Mon", title: "Flight started", detail: "DXB T3 · 10s loop" },
    ],
  },
  "influencer-marketing": {
    slug: "influencer-marketing",
    eyebrow: "Brand Advertising / Influencer Marketing",
    title: "Creators with a brief.",
    serif: "Brand-safe delivery.",
    lede: "Influencer marketing desk for creator partnerships. Talent, rates and views below are illustrative.",
    metrics: [
      { label: "Active creators", value: "18", delta: "4 in contracting", trend: "up" },
      { label: "Est. views", value: "6.2m", delta: "this flight", trend: "flat" },
      { label: "EMV", value: "AED 410k", delta: "modelled", trend: "up" },
      { label: "Brand-safety holds", value: "1", delta: "awaiting recut", trend: "warn" },
    ],
    columns: ["Creator", "Platform", "Deliverable", "Status", "Fee"],
    rows: [
      { cells: ["@lumen.studio", "Instagram", "3 reels + story", "Live", "AED 28k"], tone: "good" },
      { cells: ["Noor Al Farsi", "YouTube", "8-min integration", "Script", "AED 55k"] },
      { cells: ["Gulf Atlas", "TikTok", "Stitch series", "Hold", "AED 16k"], tone: "warn" },
      { cells: ["Hessa M.", "Snap", "4-story flight", "Live", "AED 12k"], tone: "good" },
      { cells: ["North Wharf", "LinkedIn", "Founder note", "Briefed", "AED 9k"] },
    ],
    notes: [
      { title: "Disclosure", body: "All paid posts must include partnership label before scheduling." },
      { title: "Whitelisting", body: "Meta spark ads approved for two creators; one pending usage rights." },
    ],
    activity: [
      { time: "14:10", title: "Cutdown received", detail: "@lumen.studio reel 02" },
      { time: "11:33", title: "Usage rights", detail: "90-day paid amplification · Hessa M." },
      { time: "09:01", title: "Safety hold", detail: "Gulf Atlas audio bed conflicts with brand" },
    ],
  },
  sales: {
    slug: "sales",
    eyebrow: "Internal tools / Sales",
    title: "Pipeline that",
    serif: "tells the truth.",
    lede: "Dummy CRM of a mid-market workspace. Stages, amounts and next actions are fictional.",
    metrics: [
      { label: "Open pipeline", value: "AED 4.8m", delta: "22 opportunities", trend: "up" },
      { label: "Win rate 90d", value: "31%", delta: "+4pp", trend: "up" },
      { label: "Stale deals", value: "5", delta: ">14 days silent", trend: "warn" },
      { label: "Meetings this week", value: "11", delta: "3 unbriefed", trend: "flat" },
    ],
    columns: ["Account", "Stage", "Amount", "Owner", "Next"],
    rows: [
      { cells: ["Sahara Retail", "Proposal", "AED 420k", "Mila", "ROI workshop"], tone: "good" },
      { cells: ["Portside Logistics", "Discovery", "AED 190k", "Omar", "Connector list"] },
      { cells: ["Aurelia Hotels", "Negotiate", "AED 610k", "Mila", "Legal redlines"] },
      { cells: ["Northbank Clinics", "Qualify", "AED 85k", "Ravi", "Budget check"], tone: "warn" },
      { cells: ["Kite Payments", "Verbal", "AED 250k", "Omar", "Order form"], tone: "good" },
    ],
    notes: [
      { title: "Coaching", body: "Three deals have no economic buyer tagged. Agent will not forecast them." },
      { title: "Handoff", body: "Aurelia needs Finance + Risk on the same call before discounting." },
    ],
    activity: [
      { time: "15:02", title: "Follow-up drafted", detail: "Sahara Retail · 4-line recap" },
      { time: "12:40", title: "Stage hygiene", detail: "Moved two 'verbal' deals back to negotiate" },
      { time: "08:26", title: "Meeting brief", detail: "Portside · 1-pager on connectors" },
    ],
  },
  procurement: {
    slug: "procurement",
    eyebrow: "Internal tools / Procurement",
    title: "Buy with a mandate.",
    serif: "Not a chat.",
    lede: "Vendor shortlists, RFQs and three-way match — all sample records for a fictional workspace.",
    metrics: [
      { label: "Open POs", value: "27", delta: "AED 1.2m committed", trend: "flat" },
      { label: "Savings identified", value: "8.6%", delta: "vs last award", trend: "up" },
      { label: "Vendors overdue KYC", value: "2", delta: "blocked", trend: "warn" },
      { label: "Cycle time", value: "6.4d", delta: "RFQ to PO", trend: "up" },
    ],
    columns: ["Request", "Category", "Preferred", "Amount", "State"],
    rows: [
      { cells: ["OOH production Q4", "Media ops", "Printwell", "AED 148k", "Awarded"], tone: "good" },
      { cells: ["LLM inference", "Compute", "Northcloud", "AED 62k", "RFQ"] },
      { cells: ["Creator legal pack", "Professional", "Hale Counsel", "AED 24k", "Draft"] },
      { cells: ["Laptop refresh", "IT", "—", "AED 91k", "Hold / KYC"], tone: "warn" },
      { cells: ["Event staging", "Brand", "Lumen Set", "AED 38k", "PO sent"], tone: "good" },
    ],
    notes: [
      { title: "Policy", body: "Any award above AED 50k requires two comparable quotes plus Risk sign-off." },
      { title: "Duplicate", body: "Two teams requested overlapping creative production. Merged into one RFQ." },
    ],
    activity: [
      { time: "16:18", title: "Quote scored", detail: "Northcloud 8.1 / 10 on unit price" },
      { time: "13:07", title: "KYC chase", detail: "IT reseller missing beneficial-owner form" },
      { time: "09:44", title: "PO released", detail: "Lumen Set · net 30" },
    ],
  },
  "risk-analysing": {
    slug: "risk-analysing",
    eyebrow: "Internal tools / Risk Analysing",
    title: "Stop the bad write.",
    serif: "Before it ships.",
    lede: "Policy simulation against a fictional tenant. Cross-entity reads are blocked in this prototype.",
    metrics: [
      { label: "Open findings", value: "9", delta: "2 critical", trend: "warn" },
      { label: "Blocked actions 7d", value: "14", delta: "policy engine", trend: "good" },
      { label: "Approvals SLA", value: "11h", delta: "median", trend: "flat" },
      { label: "Residual score", value: "Low", delta: "workspace A", trend: "good" },
    ],
    columns: ["Event", "Domain", "Severity", "Control", "State"],
    rows: [
      { cells: ["Cross-tenant report pull", "Data", "Critical", "Deny", "Blocked"], tone: "good" },
      { cells: ["Over-cap Meta increment", "Finance", "High", "Approve+", "Waiting"], tone: "warn" },
      { cells: ["Creator without disclosure", "Brand", "High", "Hold", "Open"], tone: "warn" },
      { cells: ["Vendor KYC stale", "Procurement", "Medium", "Pause PO", "Open"] },
      { cells: ["Quiet-hours push", "Marketing", "Low", "Defer", "Cleared"], tone: "muted" },
    ],
    notes: [
      { title: "Hard gate", body: "Models cannot override spend ceilings, tenant isolation or consent flags." },
      { title: "Simulation", body: "Try a forbidden action in the command centre — this UI only narrates the block." },
    ],
    activity: [
      { time: "16:55", title: "Denied write", detail: "Finance report · wrong tenant" },
      { time: "14:12", title: "Exception requested", detail: "YouTube CAC +18% · routed to CFO" },
      { time: "10:29", title: "Policy pack", detail: "Quiet hours 22:00–08:00 GST" },
    ],
  },
  finance: {
    slug: "finance",
    eyebrow: "Internal tools / Finance",
    title: "Every claim needs",
    serif: "a ledger line.",
    lede: "Workspace P&L, cash and ROI evidence for a fictional company. No live bank or ads accounts.",
    metrics: [
      { label: "Cash", value: "AED 2.14m", delta: "runway 11 mo", trend: "flat" },
      { label: "OpEx MTD", value: "AED 312k", delta: "94% of plan", trend: "flat" },
      { label: "Attributed margin", value: "AED 129k", delta: "media + organic", trend: "up" },
      { label: "Unproven claims", value: "4", delta: "held from reports", trend: "warn" },
    ],
    columns: ["Line", "Actual", "Plan", "Variance", "Evidence"],
    rows: [
      { cells: ["Paid acquisition", "86.4k", "90.0k", "−4%", "Ad platforms"], tone: "good" },
      { cells: ["Creator / Influencer marketing", "120.0k", "110.0k", "+9%", "Contracts"], tone: "warn" },
      { cells: ["OOH production", "148.0k", "150.0k", "−1%", "POs"], tone: "good" },
      { cells: ["Model inference", "18.2k", "22.0k", "−17%", "Usage meter"], tone: "good" },
      { cells: ["Claimed SEO lift", "—", "40.0k", "unproven", "Held"], tone: "muted" },
    ],
    notes: [
      { title: "ROI rule", body: "No dashboard tile may show return without a source document or meter." },
      { title: "Ceiling", body: "Growth workspace: AED 4,900/mo platform + metered overage. Illustrative only." },
    ],
    activity: [
      { time: "17:20", title: "Invoice matched", detail: "Printwell PO-184 · three-way ok" },
      { time: "15:11", title: "Claim withheld", detail: "SEO 'AED 40k lift' lacks counterfactual" },
      { time: "08:50", title: "Cash snapshot", detail: "No unexpected outflows overnight" },
    ],
  },
};

export const overviewMetrics = [
  { label: "Active workflows", value: "14", hint: "3 awaiting approval" },
  { label: "Spend vs ceiling", value: "72%", hint: "AED 86k of 120k" },
  { label: "Blocked writes", value: "14", hint: "Last 7 days" },
  { label: "Unproven ROI claims", value: "4", hint: "Held from reports" },
];

export const approvals = [
  { id: "A-184", title: "YouTube budget increment", owner: "Digital Marketing", amount: "AED 6,000", state: "Pending" },
  { id: "A-185", title: "Corniche spectacular artwork", owner: "Outdoor", amount: "AED 41,000", state: "Pending" },
  { id: "A-186", title: "Gulf Atlas recut waiver", owner: "Influencer Marketing", amount: "—", state: "Hold" },
  { id: "A-179", title: "Northcloud inference RFQ", owner: "Procurement", amount: "AED 62,000", state: "Approved" },
];

export const dummyUser = {
  name: "Orca",
  role: "Workspace owner",
  company: "Kestrel Commerce",
  email: "orca@kestrel.example",
};
