import { cn } from "@/lib/cn";

type Level = "h1" | "h2" | "h3" | "h4";

const styles: Record<Level, string> = {
  h1: "text-[clamp(44px,6vw,79px)] font-[570] leading-[1.1] tracking-[-0.055em] text-ink",
  h2: "text-[clamp(31px,3.2vw,49px)] font-[550] leading-[1.1] tracking-[-0.055em] text-ink",
  h3: "text-[20px] leading-[1.27] tracking-[-0.025em] font-semibold text-ink",
  h4: "text-[14px] font-[720] tracking-[-0.02em] text-ink",
};

type MyHeadingProps = {
  as?: Level;
  children: React.ReactNode;
  className?: string;
  eyebrow?: string;
};

export function MyHeading({
  as = "h2",
  children,
  className,
  eyebrow,
}: MyHeadingProps) {
  const Tag = as;

  return (
    <div className={cn(eyebrow && "space-y-3")}>
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <Tag className={cn("m-0", styles[as], className)}>{children}</Tag>
    </div>
  );
}
