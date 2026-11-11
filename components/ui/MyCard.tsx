import { cn } from "@/lib/cn";

type MyCardProps = {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  hover?: boolean;
};

export function MyCard({
  children,
  className,
  padded = true,
  hover = false,
}: MyCardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-white shadow-soft",
        padded && "p-5 sm:p-6",
        hover && "transition-colors hover:border-mint-3 hover:bg-mint-0/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
