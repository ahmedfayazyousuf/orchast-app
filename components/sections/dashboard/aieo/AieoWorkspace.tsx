"use client";

import { useState } from "react";
import { AgentWorkspace } from "@/components/sections/dashboard/AgentWorkspace";
import { AieoResearchBar } from "@/components/sections/dashboard/aieo/AieoResearchBar";
import { aieoRegions, defaultAieoRegionId, aieoEngines } from "@/data/aieo-research";
import { workspaces } from "@/data/workspaces";

export function AieoWorkspace() {
  const [regionId, setRegionId] = useState(defaultAieoRegionId);
  const [engineIds, setEngineIds] = useState(aieoEngines.map((engine) => engine.id));
  const region = aieoRegions.find((item) => item.id === regionId) ?? aieoRegions[0];
  const rows = workspaces.aieo.rows.filter(
    (row) => row.engineId && engineIds.includes(row.engineId),
  );

  return (
    <>
      <AieoResearchBar
        regionId={region.id}
        engineIds={engineIds}
        onRegion={setRegionId}
        onEngines={setEngineIds}
      />
      <AgentWorkspace
        slug="aieo"
        rows={rows}
        lede={`Sample citations for ${region.name}. The working table follows the engines selected above.`}
        empty="Select an engine in the bar above to see sample citations."
      />
    </>
  );
}
