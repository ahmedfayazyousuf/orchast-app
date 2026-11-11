import { MyBadge } from "@/components/ui/MyBadge";
import { MyCard } from "@/components/ui/MyCard";
import { MyHeading } from "@/components/ui/MyHeading";
import { MyStat } from "@/components/ui/MyStat";
import { MyTable } from "@/components/ui/MyTable";
import { SeoSources } from "@/components/sections/dashboard/SeoSources";
import { workspaces, type WorkspaceRow } from "@/data/workspaces";
import { notFound } from "next/navigation";

export function AgentWorkspace({
  slug,
  rows,
  lede,
  empty,
}: {
  slug: string;
  rows?: WorkspaceRow[];
  lede?: string;
  empty?: string;
}) {
  const workspace = workspaces[slug];
  if (!workspace) notFound();
  const tableRows = rows ?? workspace.rows;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
        <MyHeading as="h1" eyebrow={workspace.eyebrow} className="text-[32px] sm:text-[42px]">
          {workspace.title} <span className="serif">{workspace.serif}</span>
        </MyHeading>
        <MyBadge>Dummy records</MyBadge>
      </div>
      <p className="max-w-2xl">{lede ?? workspace.lede}</p>

      {slug === "seo" ? <SeoSources /> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {workspace.metrics.map((metric) => (
          <MyStat
            key={metric.label}
            label={metric.label}
            value={metric.value}
            delta={metric.delta}
            trend={metric.trend}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <MyCard>
          <h3 className="mb-4 text-[16px] font-semibold text-ink">Working table</h3>
          {tableRows.length === 0 ? (
            <p className="py-4 text-[13px]">{empty ?? "No records in this view."}</p>
          ) : (
            <MyTable columns={workspace.columns} rows={tableRows} />
          )}
        </MyCard>
        <div className="space-y-4">
          <MyCard>
            <h3 className="mb-3 text-[16px] font-semibold text-ink">Agent notes</h3>
            <div className="space-y-3">
              {workspace.notes.map((note) => (
                <div key={note.title}>
                  <div className="text-[13px] font-semibold text-ink">{note.title}</div>
                  <p className="mt-1 text-[13px]">{note.body}</p>
                </div>
              ))}
            </div>
          </MyCard>
          <MyCard>
            <h3 className="mb-3 text-[16px] font-semibold text-ink">Activity</h3>
            <ol className="space-y-3">
              {workspace.activity.map((item) => (
                <li key={item.title} className="flex gap-3 text-[13px]">
                  <span className="w-16 shrink-0 text-[11px] text-muted">{item.time}</span>
                  <span>
                    <span className="block font-medium text-ink">{item.title}</span>
                    <span className="text-muted">{item.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </MyCard>
        </div>
      </div>
    </div>
  );
}
