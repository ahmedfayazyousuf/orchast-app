import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-ink text-mint-0 hover:bg-dark shadow-soft border border-transparent",
  secondary:
    "bg-white text-ink border border-line hover:bg-mint-0 hover:border-mint-3",
  ghost: "bg-transparent text-ink hover:bg-mint-0 border border-transparent",
  danger: "bg-white text-warn border border-line hover:bg-[#fff6f3]",
};

const sizes = {
  sm: "h-8 px-3 text-[11px] gap-1.5",
  md: "h-10 px-4 text-[13px] gap-2",
  lg: "h-12 px-5 text-[14px] gap-2",
};

type MyButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function MyButton({
  children,
  variant = "secondary",
  size = "md",
  href,
  className,
  type = "button",
  onClick,
  disabled,
}: MyButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-medium tracking-[-0.01em] transition-colors disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
