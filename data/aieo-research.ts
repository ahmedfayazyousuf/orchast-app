export type AieoEngine = {
  id: string;
  name: string;
  detail?: string;
  logo: string;
};

export type AieoRegion = {
  id: string;
  name: string;
  flag: string;
};

export const aieoEngines: AieoEngine[] = [
  {
    id: "chatgpt-gpt-6",
    name: "ChatGPT",
    detail: "GPT-6",
    logo: "/engines/chatgpt.svg",
  },
  {
    id: "chatgpt-gpt-5-6-sol",
    name: "ChatGPT",
    detail: "GPT-5.6 Sol",
    logo: "/engines/chatgpt.svg",
  },
  {
    id: "google-ai-overviews",
    name: "Google AI Overviews",
    logo: "/engines/google.svg",
  },
  {
    id: "google-ai-mode",
    name: "Google AI Mode",
    logo: "/engines/google-ai-mode.svg",
  },
];

export const aieoRegions: AieoRegion[] = [
  { id: "ae", name: "United Arab Emirates", flag: "/flags/ae.svg" },
  { id: "gb", name: "United Kingdom", flag: "/flags/gb.svg" },
  { id: "us", name: "United States", flag: "/flags/us.svg" },
  { id: "sa", name: "Saudi Arabia", flag: "/flags/sa.svg" },
  { id: "in", name: "India", flag: "/flags/in.svg" },
  { id: "de", name: "Germany", flag: "/flags/de.svg" },
  { id: "fr", name: "France", flag: "/flags/fr.svg" },
  { id: "sg", name: "Singapore", flag: "/flags/sg.svg" },
  { id: "au", name: "Australia", flag: "/flags/au.svg" },
  { id: "ca", name: "Canada", flag: "/flags/ca.svg" },
];

export const defaultAieoRegionId = "ae";

export function engineLabel(engine: AieoEngine) {
  return engine.detail ? `${engine.name} (${engine.detail})` : engine.name;
}
