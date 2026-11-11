import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  href?: string;
  compact?: boolean;
  className?: string;
};

export function Logo({ href = "/", compact = false, className }: LogoProps) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src="/brand/logo.png"
        alt={compact ? "Orchast" : ""}
        width={32}
        height={32}
        className="size-8 shrink-0 object-contain"
      />
      {compact ? null : (
        <span className="text-[13px] font-semibold tracking-[0.14em] text-ink">
          ORCHAST
        </span>
      )}
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="inline-flex">
      {inner}
    </Link>
  );
}
