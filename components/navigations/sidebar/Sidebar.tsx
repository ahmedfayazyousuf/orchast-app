"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, MessageSquareText } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { dashboardNav, overviewNav, settingsNav } from "@/data/navigation";
import { dummyUser } from "@/data/workspaces";
import { cn } from "@/lib/cn";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string[]>(
    dashboardNav.map((group) => group.id),
  );

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  function toggle(id: string) {
    setExpanded((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-ink/30 md:hidden",
          open ? "block" : "hidden",
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-[255px] max-w-[85vw] flex-col border-r border-line bg-white transition-transform duration-200 md:sticky md:top-0 md:max-w-none md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-[64px] items-center border-b border-line px-4">
          <Logo href={overviewNav.href} />
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <Link
            href={overviewNav.href}
            className={cn(
              "mb-4 flex items-center gap-2 rounded-[14px] px-3 py-2 text-[13px] font-medium",
              pathname === overviewNav.href
                ? "bg-ink text-mint-0"
                : "text-ink hover:bg-mint-0",
            )}
          >
            <MessageSquareText size={15} />
            {overviewNav.label}
          </Link>

          <div className="space-y-4">
            {dashboardNav.map((group) => {
              const isOpen = expanded.includes(group.id);
              const groupActive = pathname.startsWith(group.href);

              return (
                <div key={group.id}>
                  <button
                    type="button"
                    onClick={() => toggle(group.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-[14px] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.08em]",
                      groupActive ? "text-deep" : "text-muted hover:text-ink",
                    )}
                  >
                    <span className="flex-1">{group.label}</span>
                    <ChevronDown
                      size={14}
                      className={cn("transition-transform", isOpen && "rotate-180")}
                    />
                  </button>
                  {isOpen ? (
                    <div className="mt-1 space-y-0.5 pl-2">
                      {group.children.map((child) => {
                        const ChildIcon = child.icon;
                        const active = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-2 rounded-[12px] px-3 py-2 text-[13px]",
                              active
                                ? "bg-mint-0 text-ink font-medium"
                                : "text-muted hover:bg-bg hover:text-ink",
                            )}
                          >
                            <ChildIcon size={14} />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-line p-3">
          <Link
            href={settingsNav.href}
            className={cn(
              "mb-3 flex items-center gap-2 rounded-[14px] px-3 py-2 text-[13px] font-medium",
              pathname === settingsNav.href
                ? "bg-ink text-mint-0"
                : "text-ink hover:bg-mint-0",
            )}
          >
            <settingsNav.icon size={15} />
            {settingsNav.label}
          </Link>
          <div className="flex items-center gap-2 rounded-[14px] bg-mint-0 px-3 py-2">
            <span className="grid size-8 place-items-center rounded-full bg-ink text-[11px] font-semibold text-mint-0">
              O
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[12px] font-semibold text-ink">
                {dummyUser.name}
              </span>
              <span className="block truncate text-[10px] text-muted">
                {dummyUser.company}
              </span>
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
