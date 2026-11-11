import type { Metadata } from "next";
import { AieoWorkspace } from "@/components/sections/dashboard/aieo/AieoWorkspace";
import { AgentWorkspace } from "@/components/sections/dashboard/AgentWorkspace";
import { workspaces } from "@/data/workspaces";

type AgentPageProps = {
  params: Promise<{ agent: string }>;
};

export async function generateMetadata({
  params,
}: AgentPageProps): Promise<Metadata> {
  const { agent } = await params;
  const workspace = workspaces[agent];
  if (!workspace) return { title: "Workspace" };
  return { title: workspace.eyebrow };
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { agent } = await params;
  if (agent === "aieo") return <AieoWorkspace />;
  return <AgentWorkspace slug={agent} />;
}
