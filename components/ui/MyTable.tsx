import { cn } from "@/lib/cn";

type MyTableProps = {
  columns: string[];
  rows: { cells: string[]; tone?: "good" | "warn" | "muted" }[];
};

export function MyTable({ columns, rows }: MyTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-line">
            {columns.map((column) => (
              <th
                key={column}
                className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-line/80 last:border-0">
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cn(
                    "py-3 pr-4 text-ink",
                    cellIndex === 0 && "font-medium",
                    row.tone === "good" && cellIndex === row.cells.length - 1 && "text-good",
                    row.tone === "warn" && cellIndex === row.cells.length - 1 && "text-warn",
                    row.tone === "muted" && "text-muted",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
