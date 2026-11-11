import { cn } from "@/lib/cn";

type MyInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
};

export function MyInput({
  label,
  hint,
  error,
  icon,
  className,
  id,
  ...props
}: MyInputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block space-y-1.5" htmlFor={inputId}>
      {label ? (
        <span className="text-[12px] font-semibold tracking-[-0.01em] text-ink">
          {label}
        </span>
      ) : null}
      <span className="relative block">
        {icon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-[14px] border border-line bg-white px-3.5 text-[13.5px] text-ink placeholder:text-muted/80 transition-colors",
            icon && "pl-10",
            error && "border-warn",
            className,
          )}
          {...props}
        />
      </span>
      {error ? <span className="text-[11px] text-warn">{error}</span> : null}
      {hint && !error ? (
        <span className="text-[11px] text-muted">{hint}</span>
      ) : null}
    </label>
  );
}
