import { cn } from "@/lib/cn";

type MyTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function MyTextarea({ label, className, id, ...props }: MyTextareaProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block space-y-1.5" htmlFor={inputId}>
      {label ? (
        <span className="text-[12px] font-semibold tracking-[-0.01em] text-ink">
          {label}
        </span>
      ) : null}
      <textarea
        id={inputId}
        className={cn(
          "min-h-[96px] w-full resize-y rounded-[14px] border border-line bg-white px-3.5 py-3 text-[13.5px] text-ink placeholder:text-muted/80",
          className,
        )}
        {...props}
      />
    </label>
  );
}
