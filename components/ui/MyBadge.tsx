import { cn } from "@/lib/cn";

const tones = {
  default: "bg-mint-0 text-deep border-mint-2",
  warn: "bg-[#fff4ef] text-warn border-[#f0d2c8]",
  good: "bg-[#e8f7ef] text-good border-[#c6e6d4]",
  muted: "bg-bg text-muted border-line",
  ink: "bg-ink text-mint-0 border-ink",
};

type MyBadgeProps = {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
};

export function MyBadge({ children, tone = "default", className }: MyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-[0.01em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
