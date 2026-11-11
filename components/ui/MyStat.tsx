import { cn } from "@/lib/cn";
import { MyCard } from "@/components/ui/MyCard";

type MyStatProps = {
  label: string;
  value: string;
  hint?: string;
  delta?: string;
  trend?: "up" | "down" | "flat" | "warn" | "good";
};

export function MyStat({ label, value, hint, delta, trend }: MyStatProps) {
  return (
    <MyCard>
      <div className="text-[11px] text-muted">{label}</div>
      <div className="mt-2 text-[28px] leading-none tracking-[-0.05em] text-ink">
        {value}
      </div>
      <div className="mt-2 flex items-center gap-2 text-[11px]">
        {delta ? (
          <span
            className={cn(
              trend === "down" && "text-warn",
              trend === "warn" && "text-warn",
              (trend === "up" || trend === "good") && "text-good",
              (!trend || trend === "flat") && "text-muted",
            )}
          >
            {delta}
          </span>
        ) : null}
        {hint ? <span className="text-muted">{hint}</span> : null}
      </div>
    </MyCard>
  );
}
